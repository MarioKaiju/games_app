import styled from "styled-components";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { getFormattedDate } from "../services/service";
import { Platforms } from "./Platforms";

const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Reviews = ({reviews}) => {
  if ( reviews.length > 0) {
    return (
      <div>
        {
          reviews.map((review, i) => (
            <>
              {review.comment}
              {review.score}
              {review.user.username}
            </>
          ))
        }
      </div>
    )
  }

  return (<p>No hay reseñas aún, sé el primero en agregar una</p>)
}

const Game = ({ user }) => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  console.log(game)
  
  useEffect(() => {
    axios.get(`/api/games/${id}`).then(response => setGame(response.data))
  }, [id])

  if (game) {
    return (
    <GameContainer>
      <div>
        <h2>{game.title}</h2>
        <h3>Publicado por: {game.publisher.name}</h3>
        <h4>Desarrollador: {game.developer}</h4>
        <div>Plataformas disponibles<Platforms platforms={game.platforms} /></div>
        <div>
          <button>Añadir comentario</button>
          <p>Comentarios de los usuarios: </p>
          <Reviews reviews={game.reviews}/>
        </div>
      </div>
      <div>
        <p>Fecha de lanzamiento: {getFormattedDate(game.releaseDate)}</p>
        <div>Puntuacion de los usuarios: {game.score}</div>
      </div>
    </GameContainer>
    )
  }

  return (null)
}

export default Game;