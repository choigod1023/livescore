import * as React from "react";
import axios from "axios";
import Link from "@mui/material/Link";
import { Button, Switch } from "@mui/material";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
const BaseballRankTable = ({ Data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">순위</TableCell>
            <TableCell align="center">팀</TableCell>
            <TableCell align="center">경기</TableCell>
            <TableCell align="center">승</TableCell>
            <TableCell align="center">무</TableCell>
            <TableCell align="center">패</TableCell>
            <TableCell align="center">득점</TableCell>
            <TableCell align="center">실점</TableCell>
            <TableCell align="center">득실차</TableCell>
            <TableCell align="center">승점</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.list &&
            Data.list.map((item, idx) => {
              console.log(item);
              return (
                <TableRow key={item.rank.rank}>
                  <TableCell align="center">{item.rank.rank}</TableCell>
                  <TableCell align="center">
                    <img
                      src={item.imageUrl}
                      width="40px"
                      height="40px"
                      alt=""
                    />
                    {item.shortNameKo}
                  </TableCell>
                  <TableCell align="center">{item.rank.game}</TableCell>
                  <TableCell align="center">{item.rank.win}</TableCell>
                  <TableCell align="center">{item.rank.draw}</TableCell>
                  <TableCell align="center">{item.rank.loss}</TableCell>
                  <TableCell align="center">{item.rank.gf}</TableCell>
                  <TableCell align="center">{item.rank.ga}</TableCell>
                  <TableCell align="center">{item.rank.gd}</TableCell>
                  <TableCell align="center">{item.rank.pts}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BaseballRankTable;
