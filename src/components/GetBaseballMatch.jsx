import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseballFullPeriod from './BaseballFullPeriod';
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import React from 'react'
import { Button } from '@mui/material';
import { useTheme } from "@material-ui/core";

const BaseballMatchStyle = styled.div`
&{
  text-align:center;
  margin:3px;
}

`
const InningContainer = styled.div`
&{
}
`
const GetBaseballMatch = () => {
  const theme = useTheme();
  const inningStyle = () => {
    const updateStyle = document.querySelector(`#inning_${data.inning}`);
    const allUpdate = document.querySelectorAll(`.period_button`);
    if (updateStyle && updateStyle.style) {
      for (let item of allUpdate) {
        console.log(item);
        item.style.backgroundColor = ``;
        item.style.color = "#003366"
      }
      updateStyle.style.backgroundColor = "#003366";
      updateStyle.style.color = "white";

    }
  }
  const location = useLocation();
  console.log(location);
  const { id } = useParams();
  const [data, setData] = useState({
    axios_data: {},
    inning_data: {},
    event: "period_full",
    inning: 1,
  });
  inningStyle();
  let axios_data = {};
  useEffect(() => {
    (async () => {
      const result = await axios.get(
        `https://sports-api.named.com/v1.0/sports/baseball/games/${id}/broadcasts`
      );
      axios_data = result.data;
      console.log(axios_data);
      setData(() => {
        return {
          axios_data: axios_data,
          inning_data: axios_data[location.state.period],
          event: "display",
          inning: location.state.period,
        }
      });
    })();
  }, []);
  useEffect(() => {
    inningStyle();
  }, [data.inning]);
  const periodButtonClickEvent = (e, message, item, inning) => {

    console.log("item")
    setData(prev => {
      return {
        ...prev,
        inning_data: item,
        event: message,
        inning: inning,
      }
    })

  }
  const selectComponent = {

    display: <BaseballFullPeriod data={data} />

  }

  return (

    <BaseballMatchStyle>
      <InningContainer>
        {

          Object.values(data.axios_data).map((item, idx) => {
            console.log(idx);
            return (<Button sx={{ mx: 1, border: 1, margin: 1 }} id={"inning_" + (idx + 1)} style={{ color: "#003366" }} className="period_button" onClick={(e) => periodButtonClickEvent(e, 'display', item, idx + 1)}>{idx + 1}회</Button>);

          })

        }
      </InningContainer>
      {data && <div>{selectComponent[data.event]}</div>}


    </BaseballMatchStyle>
  );
};
export default GetBaseballMatch;
