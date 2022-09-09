import styled from "styled-components";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { getFormattedDate } from "../services/service";
import { Platforms } from "./Platforms";

const GameContainer = styled.div`
  display: grid;
  grid-template-areas: "title title score" "publisher publisher developer" "platforms platforms platforms" "comments comments comments" ;
  gap: 20px 10px;

  @media (max-width: 768px) {
    grid-template-areas: "title title score" "publisher publisher publisher" "developer developer developer" "platforms platforms platforms" "comments comments comments";
    gap: 15px 10px;
  }

  h2 {
    grid-area: title;
  }

  .label {
    display: flex;
    gap: 5px;
  }

  .publisher {
    grid-area: publisher;
    h3 {
      font-weight: 700;
      font-size: 20px;
    }

    p {
      font-size: 20px;
    }

    @media (max-width: 768px) {
      h3, p {
        font-size: 15px;
      }
    }
  }

  span {
    color: #fff;
    background: linear-gradient(153deg,rgb(30 140 20) 12%,hsl(115deg 75% 40%) 50%,hsl(115deg 75% 55%) 85%);
    border-radius: 35%;
    width: 2em;
    align-self: end;
    text-align: center;
    height: 2em;
    line-height: 2em;
    font-size: 20px;

    @media (max-width: 768px) {
      font-size: 15px;
    }
  }

  .developer {
    grid-area: developer;
    justify-self: end;
    h4 {
      font-size: 20px;
      font-weight: 700;
    }

    p {
      font-size: 20px;
    }

    @media (max-width: 768px) {
      justify-self: start;
      p, h4 {
        font-size: 15px;
      }
    }
  }

  .platforms {
    grid-area: platforms;
    display: flex;
    flex-direction: column;
    font-size: 15px;
    gap: 5px;

    ul {
      padding: 0;
      list-style: none;
      margin: 0;
      display: flex;
      gap: 7px;
      flex-wrap: wrap;
      margin-top: 5px;

      li {
        white-space: nowrap;
        padding: .2em .5em;
        border-radius: .7em;
        background: rgb(255,244,0);
        background: linear-gradient(153deg,rgb(30 140 20) 12%,hsl(115deg 75% 40%) 50%,hsl(115deg 75% 55%) 85%);
      }
    }

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  .reviews {
    grid-area: comments;
  }
  
  .floating {
    justify-self: end;
    grid-area: score;
    display: flex;
    flex-direction: column;
    gap: 5px;

    @media (max-width: 550px) {
      p {
        font-size: 10px;
      }
    }

  }

  .reviews {
    #commentForm {
      overflow: hidden;
      transition: 0.5s;
      margin-top: 5px;
      border-bottom: 2px solid #e0e0e0;

      form {
        height: 195px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      @media (max-width: 768px) {
        form {
          height: 120px;
        }
      }

      .inputs-container {
        display: grid;
        grid-template-columns: 1fr 150px;
        gap: 5%;

        @media (max-width: 768px) {
          grid-template-columns: 1fr 70px;
        }
        
        div {
          padding: 0 1px;
          width: 98%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          p {
            font-size: 20px;
          }

          textarea {
            width: 98%;
            resize: none;
          }

          @media (max-width: 768px) {
            p, textarea {
              font-size: 12px
            }

            textarea {
              height: 30px;
            }
          }
        }
      }

      button {
        background-color: #59e64c;
        border: none;
        font-size: 18px;
        padding: 0.5em 1em;
        border-radius: 1em;
        margin-right: 1px;

        @media (hover: hover) and (pointer: fine) {
            :hover {
              background-color: #acf2a6;
              outline: 1px solid #1e8c18;
              cursor: pointer;
            }
        }

        @media (max-width: 768px) {
          font-size : 15px;
        }
        
      }
    }

    .reviews-list {
      margin-top: 50px;
      max-height: 500px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .paragraph {
        font-size: 20px;
      }

      @media (max-width: 768px) {
        margin-top: 25px;
        p, .paragraph {
          font-size: 12px;
        }
      }
    }
  }
`;

const ButtonOpenCommentForm = styled.button`
  color: #187010;
  background-color: transparent;
  border: none;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  display: flex;

  ::after {
    font-size: 25px;
    margin-top: -0.18em;
    font-weight: 400;
    content: '>';
    transform: ${props => props.open ? "rotate(-90deg)" : "rotate(90deg)" };
    transition: transform 0.5s ease-out;
    margin-left: 0.5em;
  }

  @media (max-width: 768px) {
    font-size: 12px;

    ::after {
      font-size: 15px;
    }
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 2px solid #1e8c14;

  div {
    display: grid;
    grid-template-columns: 1fr 40px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  .user {
    font-weight: 700;
    font-size: 22px;
  }

  .comment {
    color: #444;
    font-size: 15px;
  }

  span {
    align-self: flex-start;
  }

  @media (max-width: 550px) {
    gap: 5px;
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
      <div className="inputs-container">
        <div>
          <p>Comentario</p>
          <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <div>
          <p>Puntuación</p>
          <input type="number" max={10} value={score} onChange={(e) => setScore(e.target.value)} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button type="submit">Enviar reseña</button>
      </div>
    </form>
  )
}

const Reviews = ({reviews}) => {
  if ( reviews.length > 0) {
    return (
      <>
        {
          reviews.map((review, i) => (
            <ReviewContainer key={i}>
              <p className="user">{review.user.username}</p>
              <div>
                <p className="comment">{review.comment}</p>
                <span>{review.score}</span>
              </div>
            </ReviewContainer>
          ))
        }
      </>
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
      <h2>{game.title}</h2>
      <div className="label publisher">
        <h3>Publicado por:</h3><p>{ game.publisher.name }</p>
      </div>
      <div className="label developer">
        <h4>Desarrollador:</h4><p>{ game.developer }</p>
      </div>
      <div className="platforms">Plataformas disponibles<Platforms platforms={game.platforms} /></div>
      <div className="reviews">
        <ButtonOpenCommentForm onClick={handleOpenCommentForm} open={open} id="openCommentForm">Agregar reseña</ButtonOpenCommentForm>
        <div id="commentForm" style={ open? { height: "200px" } : { height: "0" } }>
          <CommentForm id={id} setGame={setGame}  setNotification={setNotification} />
        </div>
        <div className="reviews-list">
          <p className="paragraph" style= {{borderBottom: "2px solid #1e8c14", paddingBottom: "5px" }}>Reseñas de los usuarios: </p>
          <Reviews reviews={game.reviews}/>
        </div>
      </div>
      <div className="floating">
        <span id="score">
            { game.score ? game.score : 0}
        </span>
        <p>Salida: {getFormattedDate(game.releaseDate)}</p>
      </div>
    </GameContainer>
    )
  }

  return (null)
}

export default Game;