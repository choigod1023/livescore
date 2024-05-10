import GetBaseballMatch from "../components/GetBaseballMatch";
import { useState, useEffect } from "react";
import styled from "styled-components";
import LoginBar from "../components/LoginBar";
import { useLocation } from "react-router-dom";
import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import GetBaseballLineup from "../components/GetBaseballLineup";
import axios from "axios";
import { useParams } from "react-router-dom";
import BaseballScoreBoard from "../components/BaseballScoreBoard";
const theme = createTheme({
  palette: {
    primary: {
      main: "#003366",
    },
  },
});
const StyledNavigation = styled.nav`
  & {
    text-align: center;
  }
  #matchMenu {
    margin-top: 3%;
    margin-right: 3%;
    margin-bottom: 3%;
  }
  #matchMenu > li {
    display: inline;
    list-style: none;
    border: 1px solid #003366;
    border-radius: 5px;
    padding: 20px 25px 20px 25px;
    margin: 4px;
  }

  #matchMenu > li:hover {
    background-color: #003366;
    cursor: pointer;
    color: white;
  }

  .active {
    background-color: #003366;
    color: white;
  }
`;

const BaseballMatchPage = () => {
  const { id } = useParams();
  const [data, setData] = useState("broadcast");
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);
  const [score, setScore] = useState({
    homeScore: 0,
    awayScore: 0,
    period: 0,
    homeName: "",
    awayName: "",
    inningDivision: "",
    gameStatus: "",
    homePeriodData: [],
    awayPeriodData: [],
    homeHitCount: 0,
    homeErrorCount: 0,
    homeBaseOnBallCount: 0,
    awayHitCount: 0,
    awayErrorCount: 0,
    awayBaseOnBallCount: 0,
  });
  const location = useLocation();
  let axios_data: any;

  useEffect(() => {
    let interval;

    const fetchdata = async () => {
      const res = await axios.get(
        `https://sports-api.named.com/v1.0/sports/baseball/games/${id}`
      );
      console.log("score");
      axios_data = res.data;
      console.log(axios_data);
      let homeScore = 0,
        awayScore = 0;
      if (axios_data.broadcast !== null) {
        homeScore = axios_data.broadcast.score.home;
        awayScore = axios_data.broadcast.score.away;
      } else {
        homeScore = location.state.homeScore;
        awayScore = location.state.awayScore;
      }
      let inningDivision = axios_data.inningDivision === "TOP" ? "초" : "말";
      let period: number = axios_data.period;
      let gameStatus = axios_data.gameStatus;
      let homePeriodData = axios_data.teams.home.periodData;
      let awayPeriodData = axios_data.teams.away.periodData;
      let homeHitcount = axios_data.teams.home.hitCount;
      let awayHitCount = axios_data.teams.away.hitCount;
      let homeErrorCount = axios_data.teams.home.errorCount;
      let awayErrorCount = axios_data.teams.away.errorCount;
      let homeBaseOnBallCount = axios_data.teams.home.baseOnBallCount;
      let awayBaseOnBallCount = axios_data.teams.away.baseOnBallCount;
      setScore(() => {
        return {
          homeScore: homeScore,
          awayScore: awayScore,
          homeName: location.state.homeName,
          awayName: location.state.awayName,
          period: period,
          inningDivision: inningDivision,
          gameStatus: gameStatus,
          homePeriodData: homePeriodData,
          awayPeriodData: awayPeriodData,
          homeHitCount: homeHitcount,
          homeErrorCount: homeErrorCount,
          homeBaseOnBallCount: homeBaseOnBallCount,
          awayHitCount: awayHitCount,
          awayErrorCount: awayErrorCount,
          awayBaseOnBallCount: awayBaseOnBallCount,
        };
      });
    };
    fetchdata();
    if (!isIntervalRunning) {
      interval = setInterval(fetchdata, 5000);
      fetchdata();
    }
    return () => {
      clearInterval(interval);
    };
  }, [isIntervalRunning]);

  const selectComponent = {
    broadcast: <GetBaseballMatch />,
    lineup: <GetBaseballLineup />,
  };
  console.log("State");
  console.log(location);
  // setCookie('location', JSON.stringify(location))
  // console.log(getCookie('location'));
  // if (location.state === null) {

  // }
  const handleClickEvent = (e, message) => {
    setData(message);
  };
  console.log(score);
  return (
    <>
      <ThemeProvider theme={theme}>
        <LoginBar />
        <StyledNavigation>
          <h1>
            {location.state.awayName +
              " " +
              score.awayScore +
              " : " +
              score.homeScore +
              " " +
              location.state.homeName}
          </h1>
          <h2>
            {score.gameStatus !== "FINAL" && score.gameStatus !== "READY"
              ? score.period + "회 " + score.inningDivision
              : score.gameStatus}
          </h2>
          {score.homePeriodData && <BaseballScoreBoard state={{ score }} />}

          <ul id="matchMenu">
            <li
              id="lineup"
              className={data === "lineup" ? "active" : ""}
              onClick={(e) => handleClickEvent(e, "lineup")}
            >
              라인업
            </li>
            <li
              id="broadcast"
              className={data === "broadcast" ? "active" : ""}
              onClick={(e) => handleClickEvent(e, "broadcast")}
            >
              중계
            </li>
            <Button
              sx={{ border: 1, margin: 1, borderRadius: 5 }}
              onClick={(e) => {
                window.location.reload();
              }}
            >
              새로고침
            </Button>
          </ul>
        </StyledNavigation>
        {data && <div>{selectComponent[data]}</div>}
      </ThemeProvider>
    </>
  );
};

export default BaseballMatchPage;
