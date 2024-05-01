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


export default function GetBaseballPitcherRecord({ data }) {
    console.log(data);
    return (
        <>
            <h1>투수 기록</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>선수명</TableCell>
                            <TableCell align="center">이닝</TableCell>
                            <TableCell align="center">투구수</TableCell>
                            <TableCell align="center">피안타</TableCell>
                            <TableCell align="center">피홈런</TableCell>
                            <TableCell align="center">볼넷</TableCell>
                            <TableCell align="center">삼진</TableCell>
                            <TableCell align="center">실점</TableCell>
                            <TableCell align="center">자책점</TableCell>
                            <TableCell align="center">승</TableCell>
                            <TableCell align="center">패</TableCell>
                            <TableCell align="center">세이브</TableCell>
                            <TableCell align="center">홀드</TableCell>
                            <TableCell align="center">오늘평자책</TableCell>
                            <TableCell align="center">시즌평자책</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((row) => (

                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.player.displayName}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.inningPitched}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.pitchCount}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.hit}
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
                                    {row.run}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.earnedRun}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.wins}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.losses}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.saves}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.holds}
                                </TableCell>

                                <TableCell align="center" component="th" scope="row">
                                    {row.todayEarnedRunAverage}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.earnedRunAverage}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
