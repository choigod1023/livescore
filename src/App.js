import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from "./pages";
import BaseballMatchPage from './pages/BaseballMatchPage';
import SoccerMatchPage from './pages/SoccerMatchPage';
import styled from 'styled-components'

const bodyStyle = styled.body`
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&family=Noto+Sans+KR&display=swap');

font-family: 'Nanum Gothic Coding', sans-serif;
`
function App() {
  return (
    <bodyStyle>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path='/match/baseball/:id' element= {<BaseballMatchPage />} />
              <Route path='/match/soccer/:id' element={<SoccerMatchPage />} />
          </Routes>
      </BrowserRouter>
      </bodyStyle>
  );
}

export default App;