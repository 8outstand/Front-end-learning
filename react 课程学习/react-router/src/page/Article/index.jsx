import { useSearchParams } from "react-router-dom"


export const Article = () => {
    const [params] = useSearchParams()
    const id = params.get('id')
    return(
        <div>我是文章页面{id}</div>
    )
}