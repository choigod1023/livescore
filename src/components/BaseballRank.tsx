//https://sports.daum.net/prx/hermes/api/team/rank.json?leagueCode=kbo&seasonKey=2024
import * as React from "react";
import axios from "axios";
import Link from "@mui/material/Link";
import { Button, Switch } from "@mui/material";
import styled from "styled-components";
import BaseballRankTable from "./BaseballRankTable";
import { useState, useEffect } from "react";
import BaseballMLB from "./BaseballMLB";

const BaseballRankStyle = styled.div`
  & {
    display: inline-block;
  }
  .hidden {
    display: none;
  }
`;
export default function BaseballRank() {
  const [data, setData] = useState({
    list: [],
    league: "kbo",
    mlb_league: "national",
    wildcard: [],
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
        mlb_league: "national",
      };
    });
  };
  const MLBButtonClickEvent = (e, message) => {
    setData((prev) => {
      return {
        ...prev,
        mlb_league: message,
      };
    });
  };
  useEffect(() => {
    let rankList = [];
    let wildcardList = [];
    console.log(data.league);

    const fetchdata = async () => {
      const result = await axios.get(
        `/api/team/rank.json?leagueCode=${data.league}&seasonKey=2024`
      );
      rankList = result.data.list;
      wildcardList = result.data.wildcard;
      setData((prev: any) => {
        return {
          ...prev,
          list: rankList,
          wildcard: wildcardList,
        };
      });
    };
    fetchdata();
  }, [data.league, data.mlb_league]);

  const selectComponent = {
    kbo: <BaseballRankTable Data={data} />,
  };
  const MLBSelectComponent = (list: any) => {
    return <BaseballMLB Props={list} />;
  };
  let americanLeague: any = [];
  let nationalLeague: any = [];
  let americanLeagueWildcard: any = [];
  let nationalLeagueWildcard: any = [];
  if (data && data.league == "mlb") {
    data.list.map((item: any, idx) => {
      if (
        item.subLeague1depth &&
        item.subLeague1depth.nameKo === "내셔널 리그"
      ) {
        nationalLeague.push(item);
      } else {
        americanLeague.push(item);
      }
    });
    data.wildcard &&
      data.wildcard.map((item: any, idx) => {
        if (
          item.subLeague1depth &&
          item.subLeague1depth.nameKo === "내셔널 리그"
        ) {
          nationalLeagueWildcard.push(item);
        } else {
          americanLeagueWildcard.push(item);
        }
      });
  }
  return (
    <BaseballRankStyle>
      <Button
        className="league_button"
        sx={{ mx: 1, border: 1, margin: 1 }}
        style={{ color: "#003366" }}
        onClick={(e) => ButtonClickEvent(e, "kbo")}
      >
        KBO
      </Button>
      <Button
        className="league_button"
        sx={{ mx: 1, border: 1, margin: 1 }}
        style={{ color: "#003366" }}
        onClick={(e) => ButtonClickEvent(e, "mlb")}
      >
        MLB
      </Button>
      <br />
      <Button
        className={data.league === "mlb" ? "mlb_league_button" : "hidden"}
        sx={{ mx: 1, border: 1, margin: 1 }}
        style={{ color: "#003366" }}
        onClick={(e) => MLBButtonClickEvent(e, "national")}
      >
        내셔널리그
      </Button>
      <Button
        className={data.league === "mlb" ? "mlb_league_button" : "hidden"}
        sx={{ mx: 1, border: 1, margin: 1 }}
        style={{ color: "#003366" }}
        onClick={(e) => MLBButtonClickEvent(e, "american")}
      >
        아메리칸리그
      </Button>
      {data.league === "kbo" && selectComponent[data.league]}
      {data.league === "mlb" &&
        data.mlb_league &&
        (data.mlb_league === "national"
          ? MLBSelectComponent({
              league: nationalLeague,
              wildcard: nationalLeagueWildcard,
            })
          : MLBSelectComponent({
              league: americanLeague,
              wildcard: americanLeagueWildcard,
            }))}
    </BaseballRankStyle>
  );
}
