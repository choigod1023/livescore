// https://sports-api.named.com/v1.0/sports/baseball/games/11386720/lineup

import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GetbaseballPitcher from "./GetBaseballPitcher.tsx";
import GetbaseballBatter from "./GetBaseballBatter";
import styled from "styled-components";

import { Button, Switch } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
const label = {
  inputProps: { "aria-label": "Switch demo" },
};
const LineupStyle = styled.div`
  & {
    text-align: center;
  }
  .active {
    background-color: #003366;
    color: white;
  }
`;
export default function GetBaseballLineup() {
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);

  const [data, setData] = useState({
    homeData: {
      pitchings: {},
      batters: {},
    },
    awayData: {
      pitchings: {},
      batters: {},
    },
    active: "home",
  });
  const { id } = useParams();
  let homeData = {};
  let awayData = {};
  useEffect(() => {
    let interval;

    const fetchdata = async () => {
      const result = await axios.get(
        `https://sports-api.named.com/v1.0/sports/baseball/games/${id}/lineup`
      );
      homeData = result.data.home;
      awayData = result.data.away;
      console.log("homedata");
      console.log(homeData);
      setData((prev: any) => {
        return {
          ...prev,
          homeData: homeData,
          awayData: awayData,
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
  console.log(data.homeData.pitchings);
  const toggleInterval = () => {
    setIsIntervalRunning((prevState) => !prevState);
  };
  const onclickEvent = (e, message) => {
    setData((prev) => {
      return {
        ...prev,
        active: message,
      };
    });
  };
  const Component = {
    home: (
      <>
        <GetbaseballPitcher data={data.homeData.pitchings} />{" "}
        <GetbaseballBatter data={data.homeData.batters} />
      </>
    ),

    away: (
      <>
        <GetbaseballPitcher data={data.awayData.pitchings} />{" "}
        <GetbaseballBatter data={data.awayData.batters} />
      </>
    ),
  };
  console.log("lineup");
  console.log(Object.keys(data.homeData.pitchings));

  return (
    <LineupStyle>
      <div>
        <FormControlLabel
          control={
            <Switch onClick={toggleInterval} {...label} defaultChecked />
          }
          label="자동새로고침"
        />
      </div>

      <Button
        onClick={(e) => {
          onclickEvent(e, "away");
        }}
        sx={{ mx: 1, minWidth: "300px", border: 1, margin: 1 }}
        className={data.active === "away" ? "active" : ""}
      >
        어웨이
      </Button>
      <Button
        onClick={(e) => {
          onclickEvent(e, "home");
        }}
        sx={{ mx: 1, minWidth: "300px", border: 1, margin: 1 }}
        className={data.active === "home" ? "active" : ""}
      >
        홈
      </Button>

      {Object.keys(data.homeData.pitchings).length !== 0 &&
        Component[data.active]}
    </LineupStyle>
  );
}
