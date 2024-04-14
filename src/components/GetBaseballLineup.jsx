// https://sports-api.named.com/v1.0/sports/baseball/games/11386720/lineup

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GetbaseballPitcher from './GetBaseballPitcher'
import GetbaseballBatter from './GetBaseballBatter';
import { Button } from '@mui/material';
import styled from "styled-components";

import axios from 'axios';

const LineupStyle = styled.div`
&{
    text-align: center;
}
.active{
    background-color:#003366;
    color:white;
}
`
export default function GetBaseballLineup() {
    const [data, setData] = useState({
        homeData: {},
        awayData: {},
        active: "home"

    });
    const { id } = useParams();
    let homeData = {};
    let awayData = {};
    useEffect(() => {
        (async () => {
            const result = await axios.get(`https://sports-api.named.com/v1.0/sports/baseball/games/${id}/lineup`);
            homeData = result.data.home;
            awayData = result.data.away;
            console.log(homeData);
            setData((prev) => {
                return {
                    ...prev,
                    homeData: homeData,
                    awayData: awayData
                }
            })
        })();
    }, []);
    console.log("data");
    console.log(data.homeData.pitchings);
    const onclickEvent = (e, message) => {
        setData((prev) => {
            return {
                ...prev,
                active: message,
            }
        })
    };
    const Component = {
        home: <><GetbaseballPitcher data={data.homeData.pitchings} /> <GetbaseballBatter data={data.homeData.batters} /></>,

        away: <><GetbaseballPitcher data={data.awayData.pitchings} /> <GetbaseballBatter data={data.awayData.batters} /></>,
    }

    return (
        <LineupStyle>
            <Button onClick={(e) => {
                onclickEvent(e, "home");
            }} sx={{ mx: 1, minWidth: '300px', border: 1, margin: 1 }} className={data.active === "home" ? "active" : null}>홈</Button>
            <Button onClick={(e) => {
                onclickEvent(e, "away");
            }} sx={{ mx: 1, minWidth: '300px', border: 1, margin: 1 }} className={data.active === "away" ? "active" : null}>어웨이</Button>

            {data.homeData && Component[data.active]}
        </LineupStyle >
    );
}
