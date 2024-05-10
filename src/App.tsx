import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/index";
import BaseballMatchPage from "./pages/BaseballMatchPage";
import SoccerMatchPage from "./pages/SoccerMatchPage";
import styled from "styled-components";
import React from "react";
import CustomMuiTheme from "./CustomMuiTheme";
import { ThemeProvider } from "@material-ui/styles";
import "react-toastify/dist/ReactToastify.css";
import RankPage from "./pages/RankPage";
import { ToastContainer, toast } from "react-toastify";

const BodyStyle = styled.body`
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&family=Noto+Sans+KR&display=swap");

  font-family: "Nanum Gothic Coding", sans-serif;
`;
function App() {
  return (
    <ThemeProvider theme={CustomMuiTheme}>
      <ToastContainer autoClose={2500} />

      <BodyStyle>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/match/baseball/:id" element={<BaseballMatchPage />} />
            <Route path="/match/soccer/:id" element={<SoccerMatchPage />} />
            <Route path="/rank" element={<RankPage />} />
          </Routes>
        </BrowserRouter>
      </BodyStyle>
    </ThemeProvider>
  );
}

export default App;
