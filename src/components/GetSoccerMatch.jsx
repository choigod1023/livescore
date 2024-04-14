import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import React from 'react'

const StyledScore = styled.div`
text-align:center;
table,tr,th,td{
  margin-left:auto;
  margin-right:auto;
  text-align: center;
  border :1px solid #c8c8c8;
  border-collapse:collapse;
  padding:10px;
}
`
function getStringTime(time) {
  let displayTime = time.split(":");
  console.log(displayTime);
  let intTime = (parseInt(displayTime[0]) * 60 + parseInt(displayTime[1]));
  if (intTime == 720) {
    return ""
  }
  else {
    return String(intTime + "분 ")
  }
}
const GetSoccerMatch = (item) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios.get(
        `https://sports-api.named.com/v1.0/sports/soccer/games/${id}/broadcasts`
      );
      const Info = result.data
      //   console.log(Info);
      setData(result.data);
    })();
  }, []);
  //   console.log(data[1]);
  return (
    <div>

      <StyledScore>
        <table>
          {
            Object.values(data).map((item, idx) => {
              console.log(item)

              let resultTime = getStringTime(item.displayTime);
              return (


                <tr key={idx}>
                  <th>{resultTime}</th>
                  {item.eventType === "SUBSTITUTE" ? <td><img width="20rem" height="20rem" src={`${process.env.PUBLIC_URL}/substitution.png`} alt="sub" /></td> : ""}
                  {item.eventType === "GOAL" || item.eventType === "OWN_GOAL" ? <td><img width="20rem" height="20rem" src={`${process.env.PUBLIC_URL}/soccer.png`} alt="goal" /></td> : ""}
                  {item.eventType === "YELLOW_CARD" ? <td><img width="20rem" height="20rem" src={`${process.env.PUBLIC_URL}/yellowcard.png`} alt="yellowcard" /></td> : ""}
                  {item.eventType === "RED_CARD" ? <td><img width="20rem" height="20rem" src={`${process.env.PUBLIC_URL}/redcard.png`} alt="redcard" /></td> : ""}
                  {item.eventType !== "" ? <td colSpan={2}>{item.playText}</td> : ""}
                </tr>
              )


            })
          }

        </table>

      </StyledScore>
    </div >
  );
};
export default GetSoccerMatch;
