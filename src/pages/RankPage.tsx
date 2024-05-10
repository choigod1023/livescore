import React from "react";
import { useState, useEffect } from "react";
import LoginBar from "../components/LoginBar";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import BaseballRank from "../components/BaseballRank.tsx";
import SoccerRank from "../components/SoccerRank.tsx";
import styled from "styled-components";
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
const theme = createTheme({
  palette: {
    primary: {
      main: "#003366",
    },
  },
});

const RankPage = () => {
  const [data, setData] = useState({
    sports: "baseball",
  });

  useEffect(() => {}, [data]);
  const Component = {
    baseball: (
      <>
        <BaseballRank />
      </>
    ),

    soccer: (
      <>
        <SoccerRank />
      </>
    ),
  };
  const onclickEvent = (e, message) => {
    setData(() => {
      return {
        sports: message,
      };
    });
  };
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <LoginBar />
      </ThemeProvider>
      <h1>순위표</h1>
      <Image>
        <img
          src={`./baseball.webp`}
          alt=""
          onClick={(e) => {
            onclickEvent(e, "baseball");
          }}
        />
        <img
          src={`./soccer.png`}
          onClick={(e) => {
            onclickEvent(e, "soccer");
          }}
        />
      </Image>
      {data && Component[data.sports]}
    </Container>
  );
};
export default RankPage;
