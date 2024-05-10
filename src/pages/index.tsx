import GetBaseballList from "../components/GetBaseballListTable.tsx";
import GetSoccerList from "../components/GetSoccerList";
import LoginBar from "../components/LoginBar";
import styled from "styled-components";
import { useState } from "react";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SvgIcon from "@mui/material/SvgIcon";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
  }
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  & > img {
    margin-bottom: 10px;
    margin-right: 10px;
    width: 10%;
    height: 10%;
    border: 1px solid #cccccc;
    border-radius: 100%;
  }
  & > img:hover {
    border: 1px solid black;
  }
  & > img:active {
    border: 1px solid black;
  }
`;

function YeardateFormat(date: Date) {
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;

  return date.getFullYear() + "-" + month + "-" + day;
}
let currentPath = "";
const MainPage = () => {
  let date: Date | string = new Date();
  let originalDate = date;
  date = YeardateFormat(date).replace(" ", "");
  const [data, setData] = useState({
    message: "baseball",
    date: date,
    originalDate: originalDate,
  });

  const handleClickEvent = (message: string) => {
    setData((prev: any) => {
      return {
        ...prev,
        message: message,
      };
    });
  };

  const selectComponent = {
    baseball: <GetBaseballList date={data.date} />,
    soccer: <GetSoccerList date={data.date} />,
  };
  const prevDate = () => {
    let dd = new Date(data.originalDate);
    originalDate = new Date(dd.setDate(dd.getDate() - 1));
    date = YeardateFormat(originalDate);
    setData((prev: any) => {
      return {
        ...prev,
        date: date,
        originalDate: originalDate,
      };
    });
  };
  const nextDate = () => {
    let dd = new Date(data.originalDate);
    originalDate = new Date(dd.setDate(dd.getDate() + 1));
    date = YeardateFormat(originalDate);
    setData((prev: any) => {
      return {
        ...prev,
        date: date,
        originalDate: originalDate,
      };
    });
  };
  return (
    <Container>
      <LoginBar></LoginBar>

      <h1>
        <SvgIcon
          onClick={prevDate}
          component={ArrowBackIosNewIcon}
          inheritViewBox
        />{" "}
        <span>{data.date}</span>
        <SvgIcon
          onClick={nextDate}
          component={ArrowForwardIosIcon}
          inheritViewBox
        />
      </h1>
      <h1>경기 일정</h1>
      <Image>
        <img
          src={`./baseball.webp`}
          alt=""
          onClick={(e) => handleClickEvent("baseball")}
        />
        <img src={`./soccer.png`} onClick={() => handleClickEvent("soccer")} />
      </Image>
      {data && <div>{selectComponent[data.message]}</div>}
    </Container>
  );
};

export default MainPage;
