import styled from "styled-components";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { getFormattedDate } from "../services/service";
import { Platforms } from "./Platforms";

const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.6);

  #commentForm {
    overflow: hidden;
    transition: 1s;
  }
`;

const CommentForm = ({ id, setGame, setNotification }) => {
  const [comment, setComment] = useState('')
  const [score, setScore] = useState(0)

  const addReview = (e) => {
    e.preventDefault()
    axios.post(`/api/games/comment/${id}`, { comment, score: parseFloat(score) }).then((response) => {
      setGame(response.data.game)
    }).catch((exception) => {
      setNotification({ message: "Ya ha comentado este juego", type: "error", url: null })
    })
    setComment('')
    setScore(0)
  }

  return (
    <form onSubmit={addReview}>
      <p>Comentario</p>
      <textarea cols={50} rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
      <p>Puntuación</p>
      <input type="number" max={10} value={score} onChange={(e) => setScore(e.target.value)} />
      <button type="submit">Enviar reseña</button>
    </form>
  )
}

const Reviews = ({reviews}) => {
  if ( reviews.length > 0) {
    return (
      <div>
        {
          reviews.map((review, i) => (
            <div key={i}>
              {review.comment}
              {review.score}
              {review.user.username}
            </div>
          ))
        }
      </div>
    )
  }

  return (<p>No hay reseñas aún, sé el primero en agregar una</p>)
}

const Game = ({ user, setNotification }) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false)
  const [game, setGame] = useState(null);

  console.log(game)
  
  useEffect(() => {
    axios.get(`/api/games/${id}`).then(response => setGame(response.data))
  }, [id])

  const handleOpenCommentForm = () => {
    if (user) {
      setOpen	(!open)
    }
    if (!user) {
      setNotification({ message: "Inicia sesión para añadir comentarios", type: "info", url: '' })
    }
  }

  if (game) {
    return (
    <GameContainer>
      <div>
        <h2>{game.title}</h2>
        <h3>Publicado por: {game.publisher.name}</h3>
        <h4>Desarrollador: {game.developer}</h4>
        <div>Plataformas disponibles<Platforms platforms={game.platforms} /></div>
        <button onClick={handleOpenCommentForm}>Agregar reseña</button>
        <div id="commentForm" style={ open? { height: "200px" } : { height: "0" } }>
          <CommentForm id={id} setGame={setGame}  setNotification={setNotification} />
        </div>
        <p>Reseñas de los usuarios: </p>
        <Reviews reviews={game.reviews}/>
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