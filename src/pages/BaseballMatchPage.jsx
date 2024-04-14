import GetBaseballMatch from '../components/GetBaseballMatch';
import { useState } from "react";
import styled from 'styled-components';
import LoginBar from "../components/LoginBar"
import { useLocation } from "react-router-dom";
import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import GetBaseballLineup from '../components/GetBaseballLineup'
const theme = createTheme({
    palette: {
        primary: {
            main: "#003366",
        },
    },
})
const StyledNavigation = styled.nav`
&{
    text-align : center;
}
#matchMenu {
    margin-top:3%;
    margin-right:3%;
    margin-bottom:3%;

}
#matchMenu > li{
    display:inline;
    list-style : none;
    border : 1px solid #003366;
    border-radius :5px;
    padding:20px 25px 20px 25px;
    margin : 4px;
}

#matchMenu > li:hover{
    background-color : #003366;
    cursor:pointer;
    color:white;
}

.active{
    background-color:#003366;
    color:white;
}
`
const BaseballMatchPage = () => {
    const [data, setData] = useState('broadcast');
    const location = useLocation();

    const selectComponent = {
        broadcast: <GetBaseballMatch />,
        lineup: <GetBaseballLineup />
    }
    console.log(location.state)
    const handleClickEvent = (e, message) => {
        setData(message);

    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <LoginBar />

                <StyledNavigation>
                    <h1>{location.state.awayName + location.state.awayScore + ":" + location.state.homeScore + location.state.homeName}</h1>
                    <h2>{location.state.matchTime === "경기 중" ? location.state.period + "회 " + location.state.inningDivision : location.state.matchTime}</h2>

                    <ul id="matchMenu">
                        <li id="lineup" className={data === "lineup" ? "active" : ""} onClick={(e) => handleClickEvent(e, 'lineup')}>라인업</li>
                        <li id="broadcast" className={data === "broadcast" ? "active" : ""} onClick={(e) => handleClickEvent(e, 'broadcast')}>중계</li>
                        <Button sx={{ border: 1, margin: 1, borderRadius: 5 }} onClick={(e) => { window.location.reload() }}>새로고침</Button>

                    </ul>

                </StyledNavigation>
                {data && <div>{selectComponent[data]}</div>}
            </ThemeProvider >
        </>
    )
}

export default BaseballMatchPage;