import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

const Container = styled.div`
  margin: 50px 5%;
`;

const Platforms = ({ platforms }) => {
  return (
    <ul>
    {
      platforms.map((platform) => (
        <li key={platform.name}>
          { platform.name }
        </li>
      ))
    }
    </ul>
  )
}

function GamesList() {
  const [games, setGames] = useState(null)
  console.log(games)

  const getFormattedDate = (date) => {
    const utcDate = new Date(date)
    return `${utcDate.getDate()}/${utcDate.getMonth()}/${utcDate.getFullYear()}`
  }

  useEffect(() => {
    axios.get('api/games').then(games => setGames(games.data))
  }, []);

  if (games)
  return (
    <>
      <NavBar />
      <Container>
        { games.map(({title, developer, publisher, releaseDate, platforms}, i) => (
          <div key={i}>
            {title}<br />
            Desarrollador: {developer}<br />
            Distribuidor: {publisher.name}<br />
            Fecha de lanzamiento: {getFormattedDate(releaseDate)}<br />
            <Platforms platforms={platforms} />
          </div>
        ))
        }
      </Container>
    </>
  );

  return (null)
}

export default GamesList