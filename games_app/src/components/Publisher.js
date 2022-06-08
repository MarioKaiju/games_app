import styled from "styled-components";
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { getFormattedDate } from "../services/service";

const PublisherContainer = styled.div`
  
`;

const GamesList = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 550px) {
    margin-top: 25px;
  }

  .games-list-container {
    display: flex;
    flex-direction: column;
    gap: 25px;

    a {
      font-size: 20px;
      text-decoration: none;
      color: #187010;
      text-decoration: underline 0.15em rgba(0, 0, 0, 0);
      transition: text-decoration-color 300ms;
      @media (hover: hover) and (pointer: fine) {
        :hover {
          color: #27b71a;
          text-decoration-color: #27b71a;
        }
      }

      @media (max-width: 550px) {
        font-size: 15px;
      }
    }


    div {
      padding-bottom: 10px;
      border-bottom: 2px solid #ccc;
    }
  }
`;

const Games = ({ games }) => {

  if ( games.length > 0 ) {
    return (
      <GamesList>
        <h3>Lista de juegos:</h3>
        <div className="games-list-container">
          {
            games.map((game, i) => (
              <div key={i}>
                <Link to={`/games/${game.id}`}> {game.title}</Link>
                <p>Fecha de lanzamiento: {getFormattedDate(game.releaseDate)}</p>
              </ div>
            ))
          }
        </div>
      </GamesList>
    )
  }

  return (
    <h3>No hay juegos para este distribuidor</h3>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>{publisher.name}</h2>
          <p>Total de juegos: {publisher.games.length}</p>
        </div>
        <Games games={publisher.games} />
      </PublisherContainer>
    )
  }

  return (null)
}

export default Publisher;