import * as DocumentPicker from "expo-document-picker";
import { Directory, File, Paths } from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { createVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, Spacing } from "@/constants/theme";

interface VideoItem {
  id: number;
  name: string;
  uri: string;
  createdAt: string;
}

export default function VideoScreen() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [player, setPlayer] = useState<any>(null);

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
          createdAt TEXT DEFAULT (datetime('now'))
        );
      `);
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
          "INSERT INTO videos (name, uri) VALUES (?, ?)",
          name,
          destFile.uri,
        );
        await loadVideos(db);
      }
    } catch (error) {
      console.error("选择视频失败:", error);
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

        {/* 上传按钮 */}
        <Button title="选择并上传视频" onPress={pickAndSaveVideo} />

        {/* 视频列表 */}
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.videoItem}>
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
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>暂无视频，点击上方按钮上传</Text>
          }
        />
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
});
