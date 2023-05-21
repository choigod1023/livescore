import GetBaseballList from "../components/GetBaseballList";
import GetSoccerList from "../components/GetSoccerList";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color:grey;
`;
const MainPage = () => {
  return (
    <Container>
      <GetBaseballList />
      <GetSoccerList />
    </Container>
  );
};

export default MainPage;
