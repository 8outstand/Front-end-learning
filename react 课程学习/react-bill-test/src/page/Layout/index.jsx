import { Outlet } from "react-router-dom"
import { Button } from "antd-mobile"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getBillList } from "../../store/modules/billstore"

const Layout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillList())
    },[dispatch])
    return (
        <div>
            <Outlet />
            我是 Layout
            <Button color = "primary">全局样式按钮</Button>
        </div>
    )
}

export default Layout