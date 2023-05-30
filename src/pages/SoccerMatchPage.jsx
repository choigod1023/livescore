import GetSoccerMatch from '../components/GetSoccerMatch';
import { useState } from "react";
import styled from 'styled-components';

const StyledNavigation = styled.nav`
&{
    text-align : center;
}
#matchMenu > li{
    display:inline;
    list-style : none;
    margin-right : 10px;
    border : 1px solid grey;
}


#matchMenu > li:hover{
    background-color : #c8c8c8;
    cursor:pointer;
}
`
const SoccerMatchPage = () => {
    const [data, setData] = useState('broadcast');
    const selectComponent = {
        broadcast: <GetSoccerMatch />,
        // lineup: <GetMatchLineup />
    }
    const handleClickEvent = (e, message) => {
        setData(message);

    }
    return (
        <>
            <StyledNavigation>
                <ul id="matchMenu">
                    <li id="lineup" onClick={(e) => handleClickEvent(e, 'gif')}>전력</li>
                    <li id="broadcast" onClick={(e) => handleClickEvent(e, 'broadcast')}>중계</li>
                </ul>
            </StyledNavigation>
            {data && <div>{selectComponent[data]}</div>}
        </>
    )
}

export default SoccerMatchPage;