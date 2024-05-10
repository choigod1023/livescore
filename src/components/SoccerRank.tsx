//https://sports.daum.net/prx/hermes/api/team/rank.json?leagueCode=kbo&seasonKey=2024
import * as React from "react";
import axios from "axios";
import Link from "@mui/material/Link";
import { Button, Switch } from "@mui/material";
import styled from "styled-components";
import SoccerRankTable from "./SoccerRankTable";
import { useState, useEffect } from "react";

const SoccerRankStyle = styled.div`
  & {
    display: inline-block;
  }
`;
export default function SoccerRank() {
  const [data, setData] = useState({
    list: [],
    league: "kl",
    seasonKey: "2024",
  });
  const inningStyle = () => {
    const updateStyle = document.querySelector(
      `#${data.league}`
    ) as HTMLElement;
    console.log(updateStyle);
    const allUpdate = Array.from(
      document.querySelectorAll(`.league_button`)
    ) as HTMLElement[];
    console.log(allUpdate);
    for (let item of allUpdate) {
      if (item instanceof HTMLElement) {
        item.style.backgroundColor = ``;
        item.style.color = "#003366";
      }
    }
    if (updateStyle instanceof HTMLElement) {
      updateStyle.style.backgroundColor = "#003366";
      updateStyle.style.color = "white";
    }
  };
  const ButtonClickEvent = (e, message) => {
    setData((prev) => {
      return {
        ...prev,
        league: message,
      };
    });
  };
  useEffect(() => {
    let rankList = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // January is 0
    if (currentMonth >= 7 && data.league !== "kl" && data.league !== "kl2") {
      setData((prev) => {
        return {
          ...prev,
          seasonKey: "2024-2025",
        };
      });
    } else if (
      data.league !== "kl" &&
      data.league !== "kl2" &&
      currentMonth < 7
    ) {
      setData((prev) => {
        return { ...prev, seasonKey: "2023-2024" };
      });
    } else {
      setData((prev) => {
        return { ...prev, seasonKey: "2024" };
      });
    }
    const fetchdata = async () => {
      const result = await axios.get(
        `/api/team/rank.json?leagueCode=${data.league}&seasonKey=${data.seasonKey}`
      );
      rankList = result.data.list;
      setData((prev: any) => {
        return {
          ...prev,
          list: rankList,
        };
      });
    };
    fetchdata();
  }, [data.league, data.seasonKey]);
  useEffect(() => {}, [data.league]);
  const selectComponent = <SoccerRankTable Data={data} />;
  return (
    <SoccerRankStyle>
      <h1>{data.seasonKey}</h1>
      <Button
        className="league_button"
        sx={{ mx: 1, border: 1, margin: 1 }}
        style={{ color: "#003366" }}
        onClick={(e) => ButtonClickEvent(e, "kl")}
      >
        K리그1
      </Button>
      <Button
        className="league_button"
        sx={{ mx: 1, border: 1, margin: 1 }}
        style={{ color: "#003366" }}
        onClick={(e) => ButtonClickEvent(e, "kl2")}
      >
        K리그 2
      </Button>{" "}
      <Button
        className="league_button"
        sx={{ mx: 1, border: 1, margin: 1 }}
        style={{ color: "#003366" }}
        onClick={(e) => ButtonClickEvent(e, "epl")}
      >
        EPL
      </Button>{" "}
      <Button
        className="league_button"
        sx={{ mx: 1, border: 1, margin: 1 }}
        style={{ color: "#003366" }}
        onClick={(e) => ButtonClickEvent(e, "primera")}
      >
        라리가
      </Button>{" "}
      <Button
        className="league_button"
        sx={{ mx: 1, border: 1, margin: 1 }}
        style={{ color: "#003366" }}
        onClick={(e) => ButtonClickEvent(e, "bundesliga")}
      >
        분데스리가
      </Button>{" "}
      <Button
        className="league_button"
        sx={{ mx: 1, border: 1, margin: 1 }}
        style={{ color: "#003366" }}
        onClick={(e) => ButtonClickEvent(e, "seriea")}
      >
        세리에A
      </Button>
      <Button
        className="league_button"
        sx={{ mx: 1, border: 1, margin: 1 }}
        style={{ color: "#003366" }}
        onClick={(e) => ButtonClickEvent(e, "ligue1")}
      >
        리그1
      </Button>
      {data && selectComponent}
    </SoccerRankStyle>
  );
}
