import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseballFullPeriod from "./BaseballFullPeriod";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { useTheme } from "@material-ui/core";

import { Button, Switch } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
const label = {
  inputProps: { "aria-label": "Switch demo" },
};
const BaseballMatchStyle = styled.div`
  & {
    text-align: center;
    margin: 3px;
  }
`;
const InningContainer = styled.div`
  & {
  }
`;
const GetBaseballMatch = () => {
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);

  const theme = useTheme();
  const inningStyle = () => {
    const updateStyle = document.querySelector(
      `#inning_${data.inning}`
    ) as HTMLElement;
    console.log(updateStyle);
    const allUpdate = Array.from(
      document.querySelectorAll(`.period_button`)
    ) as HTMLElement[];
    console.log(allUpdate);
    for (let item of allUpdate) {
      if (item instanceof HTMLElement) {
        item.style.backgroundColor = ``;
        item.style.color = "#003366";
      }
    }
    if (updateStyle instanceof HTMLElement) {
      updateStyle.style.backgroundColor = "#003366";
      updateStyle.style.color = "white";
    }
  };
  const location = useLocation();
  console.log(location);
  const { id } = useParams();
  const [data, setData] = useState({
    axios_data: {},
    inning_data: {},
    event: "period_full",
    inning: 0,
  });
  inningStyle();
  let axios_data = {};
  useEffect(() => {
    let interval;

    const fetchdata = async () => {
      const res = await axios.get(
        `https://sports-api.named.com/v1.0/sports/baseball/games/${id}/broadcasts`
      );
      console.log("hi");
      axios_data = res.data;
      let data_length = Object.keys(axios_data).length;
      console.log(data);
      setData(() => {
        return {
          axios_data: axios_data,
          inning_data: axios_data[data_length],
          event: "display",
          inning: data_length,
        };
      });
    };
    fetchdata();
    if (!isIntervalRunning) {
      interval = setInterval(fetchdata, 5000);
      fetchdata();
    }
    return () => {
      clearInterval(interval);
    };
  }, [isIntervalRunning]);
  useEffect(() => {
    inningStyle();
  }, [data.inning]);
  const toggleInterval = () => {
    setIsIntervalRunning((prevState) => !prevState);
  };
  const periodButtonClickEvent = (e, message, item, inning) => {
    console.log("item");
    setData((prev) => {
      return {
        ...prev,
        inning_data: item,
        event: message,
        inning: inning,
      };
    });
  };
  const selectComponent = {
    display: <BaseballFullPeriod data={data} />,
  };

  return (
    <BaseballMatchStyle>
      <FormControlLabel
        control={<Switch onClick={toggleInterval} {...label} defaultChecked />}
        label="새로고침"
      />

      <InningContainer>
        {data.axios_data &&
          Object.values(data.axios_data).map((item, idx) => {
            console.log(idx);
            return (
              <Button
                sx={{ mx: 1, border: 1, margin: 1 }}
                id={"inning_" + (idx + 1)}
                style={{ color: "#003366" }}
                className="period_button"
                onClick={(e) =>
                  periodButtonClickEvent(e, "display", item, idx + 1)
                }
              >
                {idx + 1}회
              </Button>
            );
          })}
      </InningContainer>
      {data && <div>{selectComponent[data.event]}</div>}
    </BaseballMatchStyle>
  );
};
export default GetBaseballMatch;
