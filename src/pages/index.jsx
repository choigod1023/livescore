import GetBaseballList from "../components/GetBaseballList";
import GetSoccerList from "../components/GetSoccerList";
import styled from "styled-components";
import { useState } from "react";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
display: flex;
justify-content: center;
&>img{
  width:10%;
  height:10%;
  border:1px solid #cccccc;
}
&>img:active{
  border:1px solid black;
}

`

function YeardateFormat(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;

  return date.getFullYear() + "-" + month + "-" + day;
}

const MainPage = () => {
  const [data, setData] = useState('baseball');

  const handleClickEvent = (e, message) => {
    setData(message);
  };

  const selectComponent = {
    baseball: <GetBaseballList />,
    soccer: <GetSoccerList />,
  };

  let date = new Date();
  date = YeardateFormat(date);
  return (
    <Container>
      <h1>{date + " 오늘의 경기"}</h1>
      <Image>
        <img src={`${process.env.PUBLIC_URL}/baseball.webp`} alt="" onClick={(e) => handleClickEvent(e, 'baseball')} />
        <img src={`${process.env.PUBLIC_URL}/soccer.png`} onClick={(e) => handleClickEvent(e, 'soccer')} name="soccer" />
      </Image>
      {data && <div>{selectComponent[data]}</div>}
    </Container>
  );
};

export default MainPage;
