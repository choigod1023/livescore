import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { useTheme } from "@material-ui/core";
import { Button, Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
const BasebasllScoreBoard = ({ state }) => {
  const { id } = useParams();
  //   const [isIntervalRunning, setIsIntervalRunning] = useState(false);
  console.log("STAT");
  console.log(state.score);
  useEffect(() => {});
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">팀명</TableCell>
              {state.score.awayPeriodData &&
                state.score.awayPeriodData.map((item, idx) => {
                  console.log(item, "회");
                  return (
                    <TableCell align="center">{item.period + "회"}</TableCell>
                  );
                })}
              <TableCell align="center">H</TableCell>
              <TableCell align="center">E</TableCell>
              <TableCell align="center">B</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{state.score.awayName}</TableCell>
              {state.score.awayPeriodData &&
                state.score.awayPeriodData.map((item, idx) => {
                  console.log(item);
                  return <TableCell align="center">{item.score}</TableCell>;
                })}
              <TableCell align="center">{state.score.awayHitCount}</TableCell>
              <TableCell align="center">{state.score.awayErrorCount}</TableCell>
              <TableCell align="center">
                {state.score.homeBaseOnBallCount}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{state.score.homeName}</TableCell>
              {state.score.homePeriodData &&
                state.score.homePeriodData.map((item, idx) => {
                  console.log(item);
                  return <TableCell align="center">{item.score}</TableCell>;
                })}
              {state.score.awayPeriodData > state.score.homePeriodData ? (
                <TableCell align="center">{}</TableCell>
              ) : null}
              <TableCell align="center">{state.score.homeHitCount}</TableCell>
              <TableCell align="center">{state.score.homeErrorCount}</TableCell>
              <TableCell align="center">
                {state.score.awayBaseOnBallCount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BasebasllScoreBoard;
