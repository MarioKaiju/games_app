import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import styled from "styled-components";
import axios from "axios";
import Cards from "./Cards";

const TopGamesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px
`;

const Top = ({ user }) => {
  const [topGames, setTopGames] = useState([])
  
  useEffect(() => {
    axios.get('/api/games/top').then(response => setTopGames(response.data))
  }, [])

  if (topGames) {
    return (
      <TopGamesContainer>
        <h1>Los juegos con mejores reseñas de los usuarios</h1>
        <Cards games={topGames} />
      </TopGamesContainer>
    );
  }

  return (<NavBar user={user} />)
}

export default Top