import styled from "styled-components";
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { getFormattedDate } from "../services/service";

const PublisherContainer = styled.div`
`;

const Games = ({ games }) => {
  console.log(games)

  return (
    <>
      <h3>Lista de juegos:</h3>
      <div>
        {
          games.map((game, i) => (
            <div key={i}>
              <p>Titulo del juego: </p><Link to={`/games/${game.id}`}> {game.title}</Link>
              <p>Fecha de lanzamiento: {getFormattedDate(game.releaseDate)}</p>
            </ div>
          ))
        }
      </div>
    </>
  )
}

const Publisher = ({ user }) => {
  const { name } = useParams();
  const [publisher, setPublisher] = useState(null);
  
  useEffect(() => {
    axios.get(`/api/publishers/${name}`).then(response => setPublisher(response.data))
  }, [name])

  if (publisher) {
    return (
      <PublisherContainer>
        <div>
          <h2>Distribuidor: {publisher.name}</h2>
          <p>Total de juegos: {publisher.games.length}</p>
        </div>
        <Games games={publisher.games} />
      </PublisherContainer>
    )
  }

  return (null)
}

export default Publisher;