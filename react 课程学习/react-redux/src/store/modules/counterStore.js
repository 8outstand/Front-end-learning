import { createSlice } from '@reduxjs/toolkit'

const counterStore = createSlice({
    name: 'counter',
    //初始化 state
    initialState: {
        count: 0
    },
    //修改状态方法 同步方法 支持直接修改
    reducers: {
        inscrement(state) {
            state.count++
        },
        decrement(state) {
            state.count--
        }
    }
})
//解构出来 actionCreater 函数
const { inscrement, decrement } = counterStore.actions
//获取 reducer
const reducers = counterStore.reducer
//以按需求导出的方式导出 actionCreater
export { inscrement, decrement }
//已默认的方式导出 reducer
export default reducers