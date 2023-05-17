import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function dateFormat(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;

  return date.getFullYear() + '-' + month + '-' + day;
}
function GetSoccer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let today = new Date();
    let string_today = dateFormat(today);
    (async () => {
      const res = await axios.get(`https://sports-api.named.com/v1.0/popular-games?date=${string_today}&tomorrow-game-flag=true`)
      setData(res.data);
    })();
  }, []);
  return (
    <div>
      <h1>축구</h1>
      <div>

        {data.soccer && data.soccer.map((item, index) => {
          return (
            <div>
              <Link to={{
                pathname: `/match/soccer/${item.id}`,
                state: {
                  id: item.id,
                  name: item.name,
                  date: item.date
                }
              }} key={index}>
                <strong>{item.teams.away.name}</strong>
                <strong> VS </strong>
                <strong>{item.teams.home.name}</strong>
              </Link>
            </div>
          )
        })}
      </div>

    </div >
  );
}
export default GetSoccer
