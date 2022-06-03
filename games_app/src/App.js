import GamesList from "./components/GamesList";
import NavBar from "./components/NavBar";
import styled from "styled-components";
import { Route, Routes } from 'react-router-dom'

const Container = styled.div`
  margin: 50px 5%;
`;

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/games" element={<GamesList />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
