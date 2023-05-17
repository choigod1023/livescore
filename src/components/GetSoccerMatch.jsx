import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
      <h1>Soccer Match</h1>
      {
        Object.values(data).map((item, idx) => {
          console.log(item)
          let resultTime = getStringTime(item.displayTime);
          return (
            <div key={idx}>
              <span>{resultTime}</span>
              <span>{item.playText}</span>
            </div>
          )


        })
      }
    </div >
  );
};
export default GetSoccerMatch;
