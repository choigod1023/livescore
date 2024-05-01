//not use this component 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Switch } from '@mui/material';

import FormControlLabel from '@mui/material/FormControlLabel';
const label = {
  inputProps: { 'aria-label': 'Switch demo' }
};

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

const TableStyle = styled.div`
&{
  text-align:center;
}
table,tr,th,td
{
  margin:5px;
  text-align: center;
  border : 1px solid #c8c8c8;
  padding:5px;
}


tr:hover:not(.tableHeader){
  background-color: yellow;
  cursor: pointer;
}
.tableHeader{
  background-color:#003366;
  color:white;
}
table{
  border-collapse: collapse;
}
.active{
  font-weight: bold;
}
`

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

function GetBaseball({ date }) {
  const [data, setData] = useState([]);
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);
  const navigate = useNavigate();
  const onClickPage = (state) => {
    navigate(`/match/baseball/${state.id}`, { state: state });
  }
  useEffect(() => {
    let interval;
    let today = new Date();
    let string_today = YeardateFormat(today);
    const fetchdata = async () => {
      const res = await axios.get(
        `https://sports-api.named.com/v1.0/popular-games?date=${date}&tomorrow-game-flag=true`
      );
      console.log("hi");
      setData(res.data);
    };
    fetchdata();
    if (!isIntervalRunning) {
      interval = setInterval(fetchdata, 5000);
      fetchdata();
    }
    return () => {
      clearInterval(interval);
    }
  }, [date, isIntervalRunning]);
  console.log(data);
  const toggleInterval = () => {
    setIsIntervalRunning(prevState => !prevState);
  };
  return (
    <TableStyle>
      <FormControlLabel control={<Switch onClick={toggleInterval} {...label} defaultChecked />} label="새로고침" />


      <table>
        <thead>
          <tr className="tableHeader">
            <th>리그</th>
            <th>일정</th>
            <th>어웨이</th>
            <th>점수</th>
            <th>홈</th>
            <th colSpan={3}>중계</th>
          </tr>
        </thead>
        <tbody>
          {data.baseball &&
            data.baseball.map((item, index) => {
              let homeScoreData = item.teams.home.periodData;
              let awayScoreData = item.teams.away.periodData;
              let homeScore = 0;
              let awayScore = 0;
              homeScore = " " + totalScore(homeScoreData) + " ";
              awayScore = " " + totalScore(awayScoreData) + " ";
              let matchResult = item.result;
              let objectMatchTime = new Date(item.startDatetime);
              let inningDivision = item.inningDivision === "TOP" ? "초" : "말";
              let period = item.period;
              let nowTime = new Date();
              let matchTime = "몰라용";
              if ((nowTime > objectMatchTime) && (matchResult === "LOSE" || matchResult === "WIN" || matchResult === "DRAW")) {
                matchTime = "경기 종료";
              }
              else if (matchResult === "CANCEL") {
                matchTime = "경기 취소";
              }
              else if (nowTime > objectMatchTime && matchResult === "UNKNOWN") {
                matchTime = "경기 중";
              }
              else {
                matchTime = TimedateFormat(objectMatchTime);
              }
              let State = {
                id: item.id,
                name: item.name,
                date: item.date,
                homeName: item.teams.home.name,
                awayName: item.teams.away.name,
                homeScore: homeScore,
                awayScore: awayScore,
                period: period,
                inningDivision: inningDivision,
                matchTime: matchTime,
              }

              return (<>
                <tr className="match" onClick={(e) => onClickPage(State)} >
                  <td className="league">{item.league.shortName}</td>
                  <td className="matchTime">{matchTime}</td>
                  <td className="home">{item.teams.away.name}</td>
                  <td className="score">{awayScore + " : " + homeScore}</td>
                  <td className="away">{item.teams.home.name}</td>
                  <td colSpan={matchTime !== "경기 중" || !(item.currentPitcher && item.currentPitcher.name) ? 2 : 1}><Link
                    style={linkStyle}
                    className={matchTime === "경기 중" ? "active" : ""}
                    to={{
                      pathname: `/match/Baseball/${item.id}`
                    }}
                    state={
                      {
                        id: item.id,
                        name: item.name,
                        date: item.date,
                        homeName: item.teams.home.name,
                        awayName: item.teams.away.name,
                        homeScore: item.teams.home.score,
                        awayScore: item.teams.away.score,
                        period: period,
                        inningDivision: inningDivision,
                        matchTime: matchTime,

                      }
                    }
                    key={index}
                  >{matchTime === "경기 종료" ? "기록 보기" : matchTime === "경기 중" ? period + "회 " + inningDivision : "바로가기"}</Link></td>
                  {matchTime === "경기 중" && item.currentPitcher !== null ? <td className="current_pitcher">{(item.currentPitcher && item.currentPitcher.name) + " vs " + (item.currentBatter && item.currentBatter.name)}</td> : ""}
                </tr >
              </>);
            })}
        </tbody>
      </table>
    </TableStyle >
  );
}


export default GetBaseball;
