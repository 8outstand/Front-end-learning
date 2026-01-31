//列表相关 state
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    name: 'bill',
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload
        }
    }
})

const { setBillList } = billStore.actions
//编写异步
export const getBillList = () => {
    return (dispatch) => {
        //编写异步请求
        const res = axios.get('http://localhost:8888/ka')
        //触发同步 reducer
        dispatch(setBillList(res.data))
    }
}

const reducer = billStore.reducer

export default reducer



