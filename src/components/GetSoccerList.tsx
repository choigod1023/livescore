import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button, Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
const label = {
  inputProps: { "aria-label": "Switch demo" },
};

const GetSoccerContainer = styled.li`
  & {
    text-align: center;
    text-decoration: none;
    list-style-type: none;
  }
`;
const StyledList = styled.li`
  width: 800px;
  padding: 10px;
  text-align: center;
  height: 30px;
  border: 1px solid #eceff3;
  border-radius: 5px;
  text-decoration: none;
  list-style-type: none;
  position: relative;

  &:hover {
    background-color: #eceff3;
    // background-color:grey;
  }
`;
const StyledLeague = styled.div`
  float: left;
  width: 300px;
  font-size: 15px;
  .time {
    float: right;
    width: 80px;
    border: 1px solid #eceff3;
    border-radius: 10px;
    background-color: grey;
    color: white;
  }
`;
const StyledMatch = styled.div`
  .home_teams {
    margin-left: 10px;
  }
`;

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

const timeStyle = {
  marginTop: "5px",
};
const leagueNameStyle = {};

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
  let timeFormat = date.getTime();
  let today = new Date();
  let todayDay = today.getDate();
  let todayTime = today.getTime();
  console.log(timeFormat, todayTime);
  let todayString = "오늘 ";
  if (timeFormat > todayTime) {
    todayString = dayFormat + "일 ";
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

function GetSoccer({ date }) {
  const [data, setData] = useState([
    {
      teams: {
        home: { periodData: "", name: "", score: "" },
        away: { periodData: "", name: "", score: "" },
      },
      league: {
        shortName: "",
      },
      result: "",
      startDatetime: "",
      inningDivision: "",
      period: "",
      id: 0,
      name: "",
      date: "",
    },
  ]);
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);

  useEffect(() => {
    let interval;
    const fetchdata = async () => {
      const res = await axios.get(
        `https://sports-api.named.com/v1.0/popular-games?date=${date}&tomorrow-game-flag=true`
      );
      setData(res.data.soccer);
    };
    fetchdata();
    if (!isIntervalRunning) {
      interval = setInterval(fetchdata, 5000);
      fetchdata();
    }
    return () => {
      clearInterval(interval);
    };
  }, [date, isIntervalRunning]);
  console.log(data);
  const toggleInterval = () => {
    setIsIntervalRunning((prevState) => !prevState);
  };
  return (
    <GetSoccerContainer>
      <FormControlLabel
        control={<Switch onClick={toggleInterval} {...label} defaultChecked />}
        label="새로고침"
      />

      <div>
        {data &&
          data.map((item, index) => {
            let homeScoreData = item.teams.home.periodData;
            let awayScoreData = item.teams.away.periodData;
            let homeScore: String | number = 0;
            let awayScore: String | number = 0;
            homeScore = " " + totalScore(homeScoreData) + " ";
            awayScore = " " + totalScore(awayScoreData) + " ";

            let matchResult = item.result;
            let objectMatchTime = new Date(item.startDatetime);
            let nowTime = new Date();

            let matchTime = "몰라용";
            if (
              item.league.shortName !== "일본 YBC 르방컵" &&
              item.league.shortName !== "AFC선수권 U23" &&
              item.league.shortName !== "한국 FA컵" &&
              item.league.shortName !== "J리그 1" &&
              item.league.shortName !== "K리그 1" &&
              item.league.shortName !== "K리그 2" &&
              item.league.shortName !== "세리에 A" &&
              item.league.shortName !== "리그앙" &&
              item.league.shortName !== "EPL" &&
              item.league.shortName !== "국제친선경기" &&
              item.league.shortName !== "분데스리가" &&
              item.league.shortName !== "클럽친선경기" &&
              item.league.shortName !== "UEFA 챔피언스리그"
            ) {
              return;
            }
            if (
              nowTime > objectMatchTime &&
              (matchResult === "LOSE" ||
                matchResult === "DRAW" ||
                matchResult === "WIN")
            ) {
              matchTime = " 경기 종료";
            } else if (nowTime > objectMatchTime && matchResult === "CANCEL") {
              return;
            } else if (nowTime > objectMatchTime && matchResult === "UNKNOWN") {
              matchTime = "경기 중";
            } else {
              matchTime = TimedateFormat(objectMatchTime);
            }
            return (
              <Link
                style={linkStyle}
                to={{
                  pathname: `/match/Soccer/${item.id}`,
                }}
                state={{
                  id: item.id,
                  name: item.name,
                  date: item.date,
                  homeName: item.teams.home.name,
                  awayName: item.teams.away.name,
                  homeScore: homeScore,
                  awayScore: awayScore,
                }}
                key={index}
              >
                <StyledList>
                  <div className="SoccerMatches">
                    <div className="LeagueTime" style={timeStyle}>
                      <StyledLeague>
                        <span className="league" style={leagueNameStyle}>
                          {item.league.shortName}
                        </span>
                        <span className="time">{matchTime}</span>
                      </StyledLeague>
                    </div>
                    <StyledMatch>
                      <span className="home_teams">{item.teams.home.name}</span>
                      <span className="score">{homeScore + " : "}</span>
                      <span className="score">{awayScore}</span>
                      <span className="away_teams">{item.teams.away.name}</span>
                    </StyledMatch>
                  </div>
                </StyledList>
              </Link>
            );
          })}
      </div>
    </GetSoccerContainer>
  );
}
export default GetSoccer;
