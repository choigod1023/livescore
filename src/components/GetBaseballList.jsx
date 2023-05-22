import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

const TableStyle = styled.div`
table,tr,th,td
{
  text-align: center;
  border : 1px solid #c8c8c8;
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
  let today = new Date();
  let todayDay = today.getDate();
  let todayString = "오늘 ";
  if (dayFormat >= todayDay) {
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
  const navigate = useNavigate();
  const onClickPage = (state) => {
    navigate(`/match/baseball/${state.id}`, state);
  }
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
    <TableStyle>
      <table>
        <thead>
          <tr className="tableHeader">
            <th>리그</th>
            <th>일정</th>
            <th>홈</th>
            <th>점수</th>
            <th>어웨이</th>
            <th>중계</th>
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

              let objectMatchTime = new Date(item.startDatetime);
              let nowTime = new Date();
              let State = {
                id: item.id,
                name: item.name,
                date: item.date,
                homeName: item.teams.home.name,
                awayName: item.teams.away.name,
                homeScore: item.teams.home.score,
                awayScore: item.teams.away.score,
              }
              let matchTime = "몰라용";
              if (nowTime > objectMatchTime) {
                matchTime = " 경기 종료 ";
              } else {
                matchTime = TimedateFormat(objectMatchTime);
              }
              return (<>
                <tr className="match" onClick={(e) => onClickPage(State)} >
                  <td className="league">{item.league.shortName}</td>
                  <td className="matchTime">{matchTime}</td>
                  <td className="home">{item.teams.home.name}</td>
                  <td className="score">{awayScore + " : " + homeScore}</td>
                  <td className="away">{item.teams.away.name}</td>
                  <td><Link
                    style={linkStyle}
                    to={{
                      pathname: `/match/Baseball/${item.id}`,
                      state: State,
                    }}
                    key={index}
                  >바로가기</Link></td>
                </tr>
              </>);
            })}
        </tbody>
      </table>
    </TableStyle>
  );
}
export default GetBaseball;
