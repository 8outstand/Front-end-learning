import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const channelStore = createSlice({
  name: "channel",
  initialState: {
    channelList: [],
  },
  reducers: {
    setChannel(state, action) {
      state.channelList = action.payload;
    },
  },
});

//异步请求部分
const { setChannel } = channelStore.actions;

const fetchChannel = () => {
  return async (dispatch) => {
    const res = await axios.get("http://geek.itheima.net/v1_0/channels");
    dispatch(setChannel(res.data.data.channels));
  };
};

export { fetchChannel };

const reducer = channelStore.reducer;

export default reducer;
