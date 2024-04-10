import GetBaseballList from "../components/GetBaseballListTable";
import GetSoccerList from "../components/GetSoccerList";
import LoginBar from "../components/LoginBar"
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
  
margin-bottom:10px;
margin-right:10px;
  width:10%;
  height:10%;
  border:1px solid #cccccc;
  border-radius:100%;
}
&>img:hover{
  border:1px solid black;
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

      <LoginBar>
      </LoginBar>
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
