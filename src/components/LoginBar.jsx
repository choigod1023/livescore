import { Link } from "react-router-dom";
import styled from "styled-components";
const HeaderStyles = styled.header`
&{
    width:100%;
    height:80px;
    margin:0 auto;
    border-bottom : 1px solid #c8c8c8;
}
ul{
    float:right;
    list-style: none;
}
#Logo{
    height:100%;
    line-height:3.0;
    font-size:1.7em;
    text-decoration: none;
    font-weight:bold;
    margin-left:20px;
    
}
.nav_link{
    text-decoration:none;
    color:black;
}
.nav_link:hover{
    color:#999999;
}
ul li{
    line-height:3.2;
    display: inline-block;
    font-size:1.1em;
    margin-right : 20px;
}
`
const LoginBar = () => {
    return (
        <HeaderStyles>
            <Link id="Logo" to={'/'}>LiveScore</Link>

            <ul>

                <li>
                    {"test"}님 어서오세요.
                </li>
                <li><Link to={'/login'} className="nav_link">Login</Link></li>
                <li><Link to={'/register'} className="nav_link">Register</Link></li>
            </ul>
        </HeaderStyles>
    )
}

export default LoginBar;