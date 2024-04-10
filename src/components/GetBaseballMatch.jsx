import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseballFullPeriod from './BaseballFullPeriod';
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const BaseballMatchStyle = styled.div`
&{
  text-align:center;
}
`
const GetBaseballMatch = () => {
  const location = useLocation();
  console.log(location);
  const { id } = useParams();
  const [data, setData] = useState({
    axios_data: {},
    inning_data: {},
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
          inning_data: axios_data[location.state.period],
          event: "display"
        }
      });
    })();

  }, []);

  const periodButtonClickEvent = (e, message, item) => {
    console.log("item")
    console.log(item)

    setData(prev => {
      return {
        ...prev,
        inning_data: item,
        event: message,
      }
    })

  }
  const selectComponent = {

    display: <BaseballFullPeriod data={data} />

  }

  return (

    <BaseballMatchStyle>
      {/* <button className="period_button" onClick={(e) => periodButtonClickEvent(e, "period_full")}>전체</button> */}
      {

        Object.values(data.axios_data).map((item, idx) => {
          console.log(idx);
          return (<button className="period_button" onClick={(e) => periodButtonClickEvent(e, 'display', item)}>{idx + 1}회</button>);

        })

      }
      {data && <div>{selectComponent[data.event]}</div>}


    </BaseballMatchStyle>
  );
};
export default GetBaseballMatch;
