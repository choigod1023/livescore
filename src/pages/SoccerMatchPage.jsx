import GetSoccerMatch from '../components/GetSoccerMatch';
import { useState } from "react";
import styled from 'styled-components';
import LoginBar from "../components/LoginBar"
import { useLocation } from "react-router-dom";


const StyledNavigation = styled.nav`
&{
    text-align : center;
}
#matchMenu {
    margin-top:5%;
    margin-bottom:3%;

}
#matchMenu > li{
    display:inline;
    list-style : none;
    margin-right : 10px;
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
const SoccerMatchPage = () => {
    const [data, setData] = useState('broadcast');
    const location = useLocation();

    const selectComponent = {
        broadcast: <GetSoccerMatch />,
        // lineup: <GetMatchLineup />
    }
    const handleClickEvent = (e, message) => {
        setData(message);

    }
    return (
        <>
            <LoginBar />

            <StyledNavigation>
                <h1>{location.state.homeName + location.state.homeScore + ":" + location.state.awayScore + location.state.awayName}</h1>

                <ul id="matchMenu">
                    <li id="lineup" className={data === "gif" ? "active" : ""} onClick={(e) => handleClickEvent(e, 'gif')}>전력</li>
                    <li id="broadcast" className={data === "broadcast" ? "active" : ""} onClick={(e) => handleClickEvent(e, 'broadcast')}>중계</li>
                </ul>
            </StyledNavigation>
            {data && <div>{selectComponent[data]}</div>}
        </>
    )
}

export default SoccerMatchPage;