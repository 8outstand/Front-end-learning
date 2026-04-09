//列表相关 state
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { data } from "react-router-dom";

const billStore = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
    //同步添加账单方法
    addBill(state, action) {
      state.billList.push(action)
    }
  },
});

const { setBillList, addBill } = billStore.actions;
//编写异步
const getBillList = () => {
  return async (dispatch) => {
    //编写异步请求
    const res = await axios.get("http://localhost:8888/ka");
    //触发同步 reducer
    dispatch(setBillList(res.data));
  };
};

const addBillList = (data) => {  // ✅ 添加参数
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:8888/ka", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch(addBill(res.data));
    } catch (error) {
      console.error('保存失败:', error);
    }
  }
}

export {addBillList, getBillList}

const reducer = billStore.reducer;

export default reducer;
