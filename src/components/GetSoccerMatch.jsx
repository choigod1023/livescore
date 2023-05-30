import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

const StyledScore = styled.div`
text-align: center;
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
const GetSoccerMatch = () => {
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
      {
        Object.values(data).map((item, idx) => {
          console.log(item)

          let resultTime = getStringTime(item.displayTime);
          return (

            <StyledScore>
              <div key={idx}>
                <span>{resultTime}</span>
                {item.eventType === "SUBSTITUTE" ? <img width="20rem" height="20rem" src={`${process.env.PUBLIC_URL}/substitution.png`} alt="sub" /> : ""}
                {item.eventType === "GOAL" ? <img width="20rem" height="20rem" src={`${process.env.PUBLIC_URL}/soccer.png`} alt="goal" /> : ""}
                {item.eventType === "YELLOW_CARD" ? <img width="20rem" height="20rem" src={`${process.env.PUBLIC_URL}/yellowcard.png`} alt="yellowcard" /> : ""}
                {item.eventType === "RED_CARD" ? <img width="20rem" height="20rem" src={`${process.env.PUBLIC_URL}/yellowcard.png`} alt="redcard" /> : ""}
                <span>{item.playText}</span>
              </div>
            </StyledScore>
          )


        })
      }
    </div >
  );
};
export default GetSoccerMatch;
