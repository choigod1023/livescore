//https://sports.daum.net/prx/hermes/api/team/rank.json?leagueCode=kbo&seasonKey=2024
import * as React from "react";
import axios from "axios";
import Link from "@mui/material/Link";
import { Button, Switch } from "@mui/material";
import styled from "styled-components";
import BaseballRankTable from "./BaseballRankTable";
import { useState, useEffect } from "react";
const BaseballRankStyle = styled.div`
  & {
    display: block;
  }
`;
export default function BaseballMLB({ Props }) {
  let East: any = [];
  let Middle: any = [];
  let West: any = [];
  let Wildcard: any = Props.wildcard;
  console.log(Props);
  Props.league.map((item, idx) => {
    if (
      item.subLeague2depth.nameKo &&
      item.subLeague2depth.nameKo === "동부지구"
    ) {
      East.push(item);
    } else if (
      item.subLeague2depth.nameKo &&
      item.subLeague2depth.nameKo === "중부지구"
    ) {
      Middle.push(item);
    } else {
      West.push(item);
    }
  });
  return (
    <BaseballRankStyle>
      <h1>동부지구</h1>
      <BaseballRankTable Data={{ list: East }} />
      <h1>중부지구</h1>
      <BaseballRankTable Data={{ list: Middle }} />
      <h1>서부지구</h1>
      <BaseballRankTable Data={{ list: West }} />
      <h1>와일드카드</h1>
      <BaseballRankTable Data={{ list: Wildcard }} />
    </BaseballRankStyle>
  );
}
