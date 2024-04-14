// https://sports-api.named.com/v1.0/sports/baseball/games/11386720/lineup

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import axios from 'axios';


export default function GetBaseballBatterRecord({ data }) {
    console.log(data);
    return (
        <>
            <h1>타자 기록</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">타순</TableCell>
                            <TableCell algin="center">선수명</TableCell>
                            <TableCell align="center">포지션</TableCell>
                            <TableCell align="center">타수</TableCell>
                            <TableCell align="center">득점</TableCell>
                            <TableCell align="center">안타</TableCell>
                            <TableCell align="center">타점</TableCell>
                            <TableCell align="center">홈런</TableCell>
                            <TableCell align="center">볼넷</TableCell>
                            <TableCell align="center">삼진</TableCell>
                            <TableCell align="center">타율</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((row) => (

                            <TableRow
                                key={row.player.displayName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.battingSlot}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.player.displayName}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.position}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.atBat}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.run}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.hit}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.runBattedIn}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.homeRun}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.baseOnBalls}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.strikeOuts}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.seasonBattingAverage}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
