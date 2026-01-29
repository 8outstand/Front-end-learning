import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div>我是登录页面</div>
            <Link to= "/article">跳转到文章页面</Link>
            <button onClick={() => navigate('/article')}>跳转到文章页</button>
            <button onClick={() => navigate('/article?id=1001&name=tom')}>跳转到文章页</button>
        </div>
    )
}