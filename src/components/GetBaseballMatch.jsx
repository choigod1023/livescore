import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseballFullPeriod from './BaseballFullPeriod';
const GetBaseballMatch = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    axios_data: {},
    event: "period_full",
  });
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
          event: "",
        }
      });
    })();
  }, []);
  const periodButtonClickEvent = (e, message) => {
    setData(() => {
      return {
        axios_data: data.axios_data,
        event: message
      }
    });
  }
  const selectComponent = {

    period_full: <BaseballFullPeriod data={data} />
  }

  //   console.log(data[1]);
  return (
    <div>
      <h1>Baseball Match</h1>
      <button className="period_button" onClick={(e) => periodButtonClickEvent(e, "period_full")}>전체</button>
      <button className="period_button" onClick={(e) => periodButtonClickEvent(e, "period_1")}>1회</button>
      <button className="period_button" onClick={(e) => periodButtonClickEvent(e, "period_2")}>2회</button>
      <button className="period_button" onClick={(e) => periodButtonClickEvent(e, "period_3")}>3회</button>
      <button className="period_button" onClick={(e) => periodButtonClickEvent(e, "period_4")}>4회</button>
      <button className="period_button" onClick={(e) => periodButtonClickEvent(e, "period_5")}>5회</button>
      <button className="period_button" onClick={(e) => periodButtonClickEvent(e, "period_6")}>6회</button>
      <button className="period_button" onClick={(e) => periodButtonClickEvent(e, "period_7")}>7회</button>
      <button className="period_button" onClick={(e) => periodButtonClickEvent(e, "period_8")}>8회</button>
      <button className="period_button" onClick={(e) => periodButtonClickEvent(e, "period_9")}>9회</button>
      <button className="period_button" onClick={(e) => periodButtonClickEvent(e, "period_ext")}>연장</button>
      {data && <div>{selectComponent[data.event]}</div>}


    </div>
  );
};
export default GetBaseballMatch;
