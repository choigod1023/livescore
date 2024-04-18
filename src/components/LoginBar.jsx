import { Link } from "react-router-dom";
import styled from "styled-components";
import * as React from 'react';
import { useState } from "react";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { useLocation } from "react-router-dom";

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
    color:black;    
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
    const location = useLocation();
    console.log("login");
    console.log(location);
    const [isInModalOpen, setIsInModalOpen] = useState(false);
    const [isUpModalOpen, setIsUpModalOpen] = useState(false);

    const openInModal = () => setIsInModalOpen(true);
    const openUpModal = () => setIsUpModalOpen(true);
    const closeInModal = () => setIsInModalOpen(false);
    const closeUpModal = () => setIsUpModalOpen(false);

    return (<>        <HeaderStyles>
        <Link id="Logo" to={'/'}>LiveScore</Link>

        <ul>

            <li>
                {"test"}님 어서오세요.
            </li>
            <li><Link state={location.state} onClick={openInModal} className="nav_link">Sign In</Link></li>
            <li><Link state={location.state} onClick={openUpModal} className="nav_link">Sign Up</Link></li>
        </ul>
    </HeaderStyles>
        <SignInModal isOpen={isInModalOpen} closeModal={closeInModal}></SignInModal >
        <SignUpModal isOpen={isUpModalOpen} closeModal={closeUpModal}></SignUpModal >
    </>


    )
}

export default LoginBar;