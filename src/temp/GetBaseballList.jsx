import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import React from 'react'

const StyledList = styled.li`
  width: 800px;
  padding: 10px;
  text-align: center;
  height: 30px;
  border: 1px solid #eceff3;
  text-decoration: none;
  list-style-type: none;
  position: relative;

  &:hover {
    background-color: #eceff3;
  }
`;
const StyledLeague = styled.div`
float:left;
width:300px;
font-size: 15px;
  .time{
    float:right;
    width: 80px;
    border: 1px solid #eceff3;
    border-radius: 5px;
    background-color : grey;
    color : white;
  }
`;
const StyledMatch = styled.div
  `
.away_teams{
  margin-left:10px;
  
}
`;


const linkStyle = {
  textDecoration: "none",
  color: "black",
};

const timeStyle = {

  marginTop: "5px"
};
const leagueNameStyle = {
};

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
  let dayFormat = date.getDate();
  let today = new Date();
  let todayDay = today.getDate();
  let todayString = "오늘 ";
  console.log(dayFormat)
  if (dayFormat > todayDay) {
    todayString = "내일 ";
  }
  let hour = "0";
  let minute = "0";
  hour = hourFormat >= 10 ? hourFormat : "0" + hourFormat;
  minute = minuteFormat >= 10 ? minuteFormat : "0" + minute;
  return todayString + hour + ":" + minute;
}

function totalScore(periodData) {
  let score = 0;
  periodData &&
    periodData.map((item, index) => {
      score += item.score;
    });
  return score;
}

function GetBaseball() {
  const [data, setData] = useState([]);

  let today = new Date();
  let string_today = YeardateFormat(today);
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://sports-api.named.com/v1.0/sports/baseball/games?date=${string_today}&status=ALL`
      );
      setData(res.data);
    })();
  }, []);
  console.log(data);

  return (
    <div>
      <div>
        {data &&
          data.map((item, index) => {
            let homeScoreData = item.teams.home.periodData;
            let awayScoreData = item.teams.away.periodData;
            let homeScore = 0;
            let awayScore = 0;
            homeScore = " " + totalScore(homeScoreData) + " ";
            awayScore = " " + totalScore(awayScoreData) + " ";

            let matchResult = item.result;
            let objectMatchTime = new Date(item.startDatetime);
            let nowTime = new Date();

            let matchTime = "몰라용";
            if ((nowTime > objectMatchTime) && (matchResult === "LOSE" || matchResult === "WIN")) {
              matchTime = " 경기 종료 ";
            }
            else if (nowTime > objectMatchTime && matchResult === "UNKNOWN") {
              matchTime = "경기 중";
            }
            else {
              matchTime = TimedateFormat(objectMatchTime);
            }
            return (
              <Link
                style={linkStyle}
                to={{
                  pathname: `/match/Baseball/${item.id}`,
                  state: {
                    id: item.id,
                    name: item.name,
                    date: item.date,
                    homeName: item.teams.home.name,
                    awayName: item.teams.away.name,
                    homeScore: item.teams.home.score,
                    awayScore: item.teams.away.score,
                  },
                }}
                key={index}
              >
                <StyledList>
                  <div className="BaseballMatches">
                    <div className="LeagueTime" style={timeStyle}>
                      <StyledLeague>
                        <span className="league" style={leagueNameStyle}>
                          {item.league.shortName}
                        </span>
                        <span className="time">{matchTime}</span>
                      </StyledLeague>
                    </div>
                    <StyledMatch>
                      <span className="away_teams">{item.teams.away.name}</span>
                      <span className="score">{awayScore + " : "}</span>
                      <span className="score">{homeScore}</span>
                      <span className="home_teams">{item.teams.home.name}</span>
                    </StyledMatch>
                  </div>
                </StyledList>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
export default GetBaseball;
