import { Image } from "expo-image";
import * as DocumentPicker from "expo-document-picker";
import { Directory, DownloadTask, File, Paths } from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { createVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, Spacing } from "@/constants/theme";

const API_URL =
  "http://115.190.99.237:8900/dev-api/flowable/video/getProcessVideoPage";

interface VideoItem {
  id: number;
  name: string;
  uri: string;
  createdAt: string;
  source: "local" | "cloud";
  remoteId?: string;
  remoteCoverUrl?: string;
}

interface CloudVideo {
  id: string;
  name: string;
  duration: string;
  professional: string;
  coverInfo?: { fileUrl: string };
  attachmentList?: {
    fileName: string;
    fileUrl: string;
    fileType: string;
  }[];
}

export default function VideoScreen() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [token, setToken] = useState("");
  const [cloudVideos, setCloudVideos] = useState<CloudVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [cacheStatus, setCacheStatus] = useState<Record<string, string>>({});

  // 初始化数据库
  useEffect(() => {
    async function initDB() {
      const database = await SQLite.openDatabaseAsync("videos.db");
      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS videos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          uri TEXT NOT NULL,
          createdAt TEXT DEFAULT (datetime('now')),
          source TEXT DEFAULT 'local',
          remoteId TEXT,
          remoteCoverUrl TEXT
        );
      `);
      // 兼容旧表：尝试添加新列
      try {
        await database.execAsync(
          `ALTER TABLE videos ADD COLUMN source TEXT DEFAULT 'local'`
        );
      } catch {}
      try {
        await database.execAsync(
          `ALTER TABLE videos ADD COLUMN remoteId TEXT`
        );
      } catch {}
      try {
        await database.execAsync(
          `ALTER TABLE videos ADD COLUMN remoteCoverUrl TEXT`
        );
      } catch {}
      setDb(database);
      await loadVideos(database);
    }
    initDB();
  }, []);

  // 加载视频列表
  const loadVideos = async (database: SQLite.SQLiteDatabase) => {
    const result = await database.getAllAsync<VideoItem>(
      "SELECT * FROM videos ORDER BY createdAt DESC",
    );
    setVideos(result);
  };

  // 选择并保存视频
  const pickAndSaveVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets[0]) return;

      const { uri, name } = result.assets[0];

      // 创建视频存储目录
      let videoDir = new Directory(Paths.document, "videos");

      try {
        // 如果存在同名文件，先删除
        if (!videoDir.exists) {
          // 检查是否存在同名文件
          const videoFile = new File(Paths.document, "videos");
          if (videoFile.exists) {
            videoFile.delete();
          }
          videoDir.create();
        }
      } catch (e) {
        console.error("创建视频目录失败:", e);
        // 尝试使用 cache 目录作为备选
        try {
          videoDir = new Directory(Paths.cache, "videos");
          if (!videoDir.exists) {
            videoDir.create();
          }
        } catch (cacheError) {
          console.error("创建缓存目录也失败:", cacheError);
          return;
        }
      }

      // 复制视频到本地存储
      const destFile = new File(videoDir, `${Date.now()}_${name}`);
      const sourceFile = new File(uri);
      sourceFile.copy(destFile);

      // 保存到数据库
      if (db) {
        await db.runAsync(
          "INSERT INTO videos (name, uri, source) VALUES (?, ?, 'local')",
          name,
          destFile.uri,
        );
        await loadVideos(db);
      }
    } catch (error) {
      console.error("选择视频失败:", error);
    }
  };

  // 查询云端视频
  const fetchCloudVideos = async () => {
    if (!token.trim()) {
      Alert.alert("提示", "请输入Token");
      return;
    }
    setLoading(true);
    setCloudVideos([]);
    try {
      console.log("请求URL:", API_URL);
      console.log("请求方法: POST");
      console.log("请求头:", { Authorization: token.trim() });

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.trim(),
        },
        body: JSON.stringify({ pageNum: 1, pageSize: 10, status: "1" }),
      });
      const text = await res.text();
      console.log("HTTP状态码:", res.status);
      console.log("响应内容:", text);

      if (res.status === 404) {
        Alert.alert(
          "404 接口未找到",
          `URL: ${API_URL}\n方法: POST\n\n请确认接口地址和请求方法是否正确`,
        );
        return;
      }

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        Alert.alert("响应解析失败", `HTTP ${res.status}\n${text.substring(0, 300)}`);
        return;
      }

      if (data.code === 200) {
        setCloudVideos(data.rows || []);
        if (!data.rows?.length) {
          Alert.alert("查询成功", "暂无云端视频");
        }
      } else {
        Alert.alert(
          "查询失败",
          `code: ${data.code}\nmsg: ${data.msg || "无"}\nHTTP: ${res.status}`,
        );
      }
    } catch (e) {
      Alert.alert("网络错误", String(e));
    } finally {
      setLoading(false);
    }
  };

  // 缓存云端视频到本地
  const cacheVideo = async (cloudVideo: CloudVideo) => {
    const attachment = cloudVideo.attachmentList?.[0];
    if (!attachment) {
      Alert.alert("提示", "该视频无附件");
      return;
    }
    if (!db) return;

    // 检查是否已缓存
    const existing = await db.getFirstAsync<{ id: number }>(
      "SELECT id FROM videos WHERE remoteId = ?",
      cloudVideo.id,
    );
    if (existing) {
      Alert.alert("提示", "该视频已缓存");
      return;
    }

    setCacheStatus((prev) => ({ ...prev, [cloudVideo.id]: "downloading" }));

    try {
      // 确保视频目录存在
      let videoDir = new Directory(Paths.document, "videos");
      if (!videoDir.exists) {
        try {
          const videoFile = new File(Paths.document, "videos");
          if (videoFile.exists) videoFile.delete();
          videoDir.create();
        } catch {
          videoDir = new Directory(Paths.cache, "videos");
          if (!videoDir.exists) videoDir.create();
        }
      }

      const fileName = `${Date.now()}_${attachment.fileName}`;
      const destFile = new File(videoDir, fileName);

      // 下载远程文件
      const downloadTask = new DownloadTask(attachment.fileUrl, destFile);
      const downloadedFile = await downloadTask.downloadAsync();

      if (!downloadedFile) {
        throw new Error("下载失败");
      }

      // 保存到数据库
      await db.runAsync(
        "INSERT INTO videos (name, uri, source, remoteId, remoteCoverUrl) VALUES (?, ?, 'cloud', ?, ?)",
        cloudVideo.name,
        downloadedFile.uri,
        cloudVideo.id,
        cloudVideo.coverInfo?.fileUrl || "",
      );

      setCacheStatus((prev) => ({ ...prev, [cloudVideo.id]: "done" }));
      await loadVideos(db);
      Alert.alert("缓存成功", `"${cloudVideo.name}" 已保存到本地`);
    } catch (e) {
      setCacheStatus((prev) => ({ ...prev, [cloudVideo.id]: "error" }));
      Alert.alert("缓存失败", String(e));
    }
  };

  // 关闭视频
  const closeVideo = () => {
    if (player) {
      player.release();
      setPlayer(null);
    }
    setSelectedVideo(null);
  };

  // 播放视频
  const playVideo = async (uri: string) => {
    try {
      // 检查文件是否存在
      const file = new File(uri);
      if (!file.exists) {
        console.error("视频文件不存在:", uri);
        return;
      }

      // 如果点击的是同一个视频，先关闭再重新打开
      if (selectedVideo === uri) {
        closeVideo();
        // 延迟一下再重新设置，确保状态重置
        setTimeout(() => {
          setSelectedVideo(uri);
        }, 100);
        return;
      }

      // 释放旧播放器
      closeVideo();

      // 设置新视频
      setSelectedVideo(uri);
    } catch (error) {
      console.error("播放视频失败:", error);
    }
  };

  // 创建播放器（当 selectedVideo 变化时）
  useEffect(() => {
    if (!selectedVideo) return;

    const newPlayer = createVideoPlayer(selectedVideo);
    newPlayer.play();
    setPlayer(newPlayer);

    return () => {
      newPlayer.release();
    };
  }, [selectedVideo]);

  // 删除视频
  const deleteVideo = async (id: number, uri: string) => {
    try {
      // 如果正在播放这个视频，先停止
      if (selectedVideo === uri) {
        if (player) {
          player.release();
          setPlayer(null);
        }
        setSelectedVideo(null);
      }

      // 删除文件
      const file = new File(uri);
      if (file.exists) {
        file.delete();
      }

      // 删除数据库记录
      if (db) {
        await db.runAsync("DELETE FROM videos WHERE id = ?", id);
        await loadVideos(db);
      }
    } catch (error) {
      console.error("删除视频失败:", error);
    }
  };

  // 分离本地和云端视频
  const localVideos = videos.filter((v) => v.source !== "cloud");
  const cachedVideos = videos.filter((v) => v.source === "cloud");

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Video</ThemedText>

        {/* 视频播放器 */}
        {selectedVideo && player && (
          <View style={styles.videoContainer}>
            <VideoView
              style={styles.video}
              player={player}
              fullscreenOptions={{ enable: true }}
              allowsPictureInPicture
            />
            <Button title="关闭视频" onPress={closeVideo} />
          </View>
        )}

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* ===== 本地视频区域 ===== */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            本地视频
          </ThemedText>
          <Button title="选择并上传视频" onPress={pickAndSaveVideo} />
          {localVideos.length === 0 ? (
            <Text style={styles.emptyText}>暂无本地视频，点击上方按钮上传</Text>
          ) : (
            localVideos.map((item) => (
              <View key={item.id} style={styles.videoItem}>
                <TouchableOpacity
                  onPress={() => playVideo(item.uri)}
                  style={styles.videoInfo}
                >
                  <Text style={styles.videoName}>{item.name}</Text>
                  <Text style={styles.videoDate}>{item.createdAt}</Text>
                </TouchableOpacity>
                <Button
                  title="删除"
                  color="red"
                  onPress={() => deleteVideo(item.id, item.uri)}
                />
              </View>
            ))
          )}

          {/* ===== 已缓存视频区域 ===== */}
          {cachedVideos.length > 0 && (
            <>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                已缓存的云端视频
              </ThemedText>
              {cachedVideos.map((item) => (
                <View key={item.id} style={styles.videoItem}>
                  <TouchableOpacity
                    onPress={() => playVideo(item.uri)}
                    style={styles.videoInfo}
                  >
                    <Text style={styles.videoName}>{item.name}</Text>
                    <Text style={styles.videoDate}>{item.createdAt}</Text>
                  </TouchableOpacity>
                  <Button
                    title="删除"
                    color="red"
                    onPress={() => deleteVideo(item.id, item.uri)}
                  />
                </View>
              ))}
            </>
          )}

          {/* ===== 云端视频查询区域 ===== */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            云端视频
          </ThemedText>
          <View style={styles.tokenRow}>
            <TextInput
              style={styles.tokenInput}
              placeholder="请输入Token"
              value={token}
              onChangeText={setToken}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button title="查询" onPress={fetchCloudVideos} />
          </View>

          {loading && (
            <ActivityIndicator size="large" style={styles.loadingIndicator} />
          )}

          {cloudVideos.length > 0 && (
            <View style={styles.cloudList}>
              {cloudVideos.map((cv) => {
                const status = cacheStatus[cv.id] || "idle";
                return (
                  <View key={cv.id} style={styles.cloudVideoItem}>
                    {cv.coverInfo?.fileUrl ? (
                      <Image
                        source={{ uri: cv.coverInfo.fileUrl }}
                        style={styles.coverImage}
                        contentFit="cover"
                      />
                    ) : (
                      <View
                        style={[styles.coverImage, styles.coverPlaceholder]}
                      >
                        <Text style={styles.coverPlaceholderText}>🎬</Text>
                      </View>
                    )}
                    <View style={styles.cloudVideoInfo}>
                      <Text style={styles.videoName}>{cv.name}</Text>
                      <Text style={styles.cloudVideoMeta}>
                        {cv.professional && `${cv.professional} · `}
                        {cv.duration && `${cv.duration}秒`}
                      </Text>
                    </View>
                    {status === "downloading" ? (
                      <ActivityIndicator size="small" />
                    ) : status === "done" ? (
                      <Text style={styles.cacheDoneText}>已缓存</Text>
                    ) : (
                      <Button
                        title="缓存"
                        onPress={() => cacheVideo(cv)}
                        disabled={status === "downloading"}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  videoContainer: {
    width: "100%",
    gap: 8,
  },
  video: {
    width: "100%",
    height: 200,
    backgroundColor: "black",
  },
  scrollContent: {
    paddingBottom: Spacing.three,
  },
  sectionTitle: {
    marginTop: Spacing.two,
  },
  videoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  videoInfo: {
    flex: 1,
  },
  videoName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  videoDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  tokenRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tokenInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  cloudList: {
    gap: 8,
  },
  cloudVideoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    gap: 10,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  coverPlaceholder: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  coverPlaceholderText: {
    fontSize: 24,
  },
  cloudVideoInfo: {
    flex: 1,
  },
  cloudVideoMeta: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  cacheDoneText: {
    color: "green",
    fontSize: 14,
    fontWeight: "bold",
  },
});
