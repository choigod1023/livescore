import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledList = styled.li`

width: 400px;
padding : 10px;
text-align : center;
height:50px;
border : 1px solid #eceff3; 
text-decoration: none;
list-style-type: none;
position : relative;

&:hover {
  background-color:#eceff3;
}
`;
const StyledLeague = styled.span`
text-align : left;
`
const StyledMatch = styled.span`
padding-left : 10px;
`


const linkStyle = {
  textDecoration: 'none',
  color: 'black',
}

const timeStyle = {
  marginBottom: '5px'
}
const leagueNameStyle = {
  marginRight: '5px'
}

function YeardateFormat(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;

  return date.getFullYear() + "-" + month + "-" + day;
}
function TimedateFormat(date) {
  let hourFormat = date.getHours();
  let minuteFormat = date.getMinutes();
  let hour = "0"
  let minute = "0";
  hour = hourFormat >= 10 ? hourFormat : "0" + hourFormat;
  minute = minuteFormat >= 10 ? minuteFormat : "0" + minute;
  return hour + ":" + minute
}

function GetBaseball() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let today = new Date();
    let string_today = YeardateFormat(today);
    (async () => {
      const res = await axios.get(
        `https://sports-api.named.com/v1.0/popular-games?date=${string_today}&tomorrow-game-flag=true`
      );
      setData(res.data);
    })();
  }, []);
  console.log(data);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>야구</h1>
      <div>
        {data.baseball &&
          data.baseball.map((item, index) => {
            let objectMatchTime = new Date(item.startDatetime)
            let matchTime = TimedateFormat(objectMatchTime)
            return (
              <Link style={linkStyle}
                to={{
                  pathname: `/match/baseball/${item.id}`,
                  state: {
                    id: item.id,
                    name: item.name,
                    date: item.date,
                  },
                }}
                key={index}
              >
                <StyledList>

                  <div className="BaseballMatches">
                    <div className="LeagueTime" style={timeStyle}>
                      <StyledLeague>
                        <span className="league" style={leagueNameStyle}>{item.league.shortName}</span>
                        <span className="time">{matchTime}</span>
                      </StyledLeague>
                    </div>

                    <StyledMatch>
                      <span className="teams">{item.teams.away.name}</span>
                      <span className="versus"> VS </span>
                      <span className="teams">{item.teams.home.name}</span>
                    </StyledMatch>
                  </div>
                </StyledList>
              </Link>
            );
          })}
      </div>
    </div >
  );
}
export default GetBaseball;
