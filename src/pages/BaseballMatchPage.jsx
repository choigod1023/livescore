import GetBaseballMatch from '../components/GetBaseballMatch';
import { useState } from "react";
import styled from 'styled-components';
import LoginBar from "../components/LoginBar"
import { useLocation } from "react-router-dom";


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
    border : 1px solid #c8c8c8;
    border-radius :5px;
    padding:20px 25px 20px 25px;
}

#matchMenu > li:hover{
    background-color : #c8c8c8;
    cursor:pointer;
}

.active{
    background-color:#666666;
    color:white;
}
`
const BaseballMatchPage = () => {
    const [data, setData] = useState('broadcast');
    const location = useLocation();

    const selectComponent = {
        broadcast: <GetBaseballMatch />,
        // lineup: <GetMatchLineup />
    }
    console.log(location.state)
    const handleClickEvent = (e, message) => {
        setData(message);

    }
    return (
        <>
            <LoginBar />

            <StyledNavigation>
                <h1>{location.state.awayName + location.state.awayScore + ":" + location.state.homeScore + location.state.homeName}</h1>
                <h2>{location.state.matchTime === "경기 중" ? location.state.period + "회 " + location.state.inningDivision : location.state.matchTime}</h2>

                <ul id="matchMenu">
                    <li id="lineup" className={data === "gif" ? "active" : ""} onClick={(e) => handleClickEvent(e, 'gif')}>전력</li>
                    <li id="broadcast" className={data === "broadcast" ? "active" : ""} onClick={(e) => handleClickEvent(e, 'broadcast')}>중계</li>
                </ul>
            </StyledNavigation>
            {data && <div>{selectComponent[data]}</div>}
        </>
    )
}

export default BaseballMatchPage;