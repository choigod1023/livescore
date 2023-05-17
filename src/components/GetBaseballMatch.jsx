import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const GetBaseballMatch = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios.get(
        `https://sports-api.named.com/v1.0/sports/baseball/games/${id}/broadcasts`
      );
      const Info = result.data
      //   console.log(Info);
      setData(result.data);
    })();
  }, []);
  //   console.log(data[1]);
  return (
    <div>
      <h1>Baseball Match</h1>
      {
        Object.values(data).map((item, idx) => {
          console.log(item)
          return (
            Object.values(item).map((item1, idx1) => {
              // console.log(item1.eventType);
              if (item1.eventType === "PERIOD_INFO") {
                console.log('hi')
                return (
                  <div>
                    <h1>--------------</h1>
                    <h1>{item1.playText}</h1>
                  </div>
                )
              }
              else {
                return (
                  <div>{item1.playText}</div>
                )
              }
            }))

        })
      }
    </div>
  );
};
export default GetBaseballMatch;
