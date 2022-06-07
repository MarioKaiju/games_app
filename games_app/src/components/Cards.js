import { Link } from "react-router-dom";
import styled from 'styled-components'
import { getFormattedDate } from "../services/service";

const Card = styled.div`
  background-color: transparent;
  box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.6);
  padding: 25px;
  display: grid;
  grid-template-areas: "game game score"
                       "developer developer date"
                       "publisher publisher publisher"
                       "platforms platforms platforms";
  grid-template-rows: 60px 15px 15px 1fr;
  grid-template-columns: 1fr 1fr 75px;
  font-size: 18px;
  line-height: 1.5;
  row-gap: 5px;
  border-radius: 12.5px;

  a {
    text-decoration: none;
  }

  #game {
    grid-area: game;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  #score {
    color: #fff;
    grid-area: score;
    background: rgb(255,244,0);
    background: linear-gradient(153deg,rgb(30 140 20) 12%,hsl(115deg 75% 40%) 50%,hsl(115deg 75% 55%) 85%);
    border-radius: 35%;
    width: 1.75em;
    text-align: center;
    height: 2em;
    line-height: 2em;
    align-self: top;
    justify-self: end;
    font-size: 20px;
  }
  #developer, #publisher {
    grid-area: developer;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  #date {
    grid-area: date;
    font-size: 12px;
    justify-self: end;
  }
  #publisher {
    grid-area: publisher;
    font-size: 12px;
  }
  #platforms {
    grid-area: platforms;
    font-size: 12px;
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
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, max(350px, 30%));
  justify-content: space-between;
  gap: 50px 25px;
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

const Cards = ({ games }) => {
  return (
    <CardsContainer >
      { games.map(({title, developer, publisher, releaseDate, platforms, id, score}, i) => (
        <Card key={id}>
          <Link id="game" to={`/games/${id}`}>{title}<br /></Link>
          <span id="score">
            { score ? score : 0}
          </span>
          <p id="developer">
            Desarrollador: {developer}
          </p>
          <p id="date">
            {getFormattedDate(releaseDate)}
          </p>
          <Link id="publisher" to={`/publishers/${publisher.name}`}>Distribuidor: {publisher.name}<br /></Link>
          <div id="platforms">
            Disponible en:
            <Platforms platforms={platforms} />
          </div>
        </Card>
      ))
      }
    </CardsContainer>
  )
}

export default Cards