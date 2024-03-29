import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import styled from 'styled-components';
import AddGameForm from "./AddGameForm";

const GamesContainer = styled.div`
  position: relative;
  padding-top: 75px;

  #AddGame {
    background-color: #59e64c;
    box-shadow: 0px 0px 12px 1px rgba(0,0,0,0.5);
    border: none;
    font-size: 18px;
    padding: 0.5em 1em;
    border-radius: 1em;
    position: absolute;
    right: 0;
    margin-top: -75px;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        :hover {
          background-color: #acf2a6;
          outline: 1px solid #1e8c18;
          cursor: pointer;
        }
      }
  }
`;

function GamesList({ user, setNotification }) {
  const [games, setGames] = useState(null)
  const [visible, setVisible] = useState(null)

  const handleClick = () => {
    if (!user) {
      setNotification({ message: "Inicia sesión para añadir un juego", type: "info", url: null })
    }
    if (user) {
      setVisible (true)
      document.body.style.overflow = "hidden";
    }
  }

  useEffect(() => {
    axios.get('api/games').then(response => setGames(response.data))
  }, []);

  if (games)
  return (
    <GamesContainer>
      <button id="AddGame" onClick={handleClick}>Añadir juego</button>
      <AddGameForm setNotification={setNotification} visible={visible} setVisible={setVisible} setGames={setGames} games={games} />
      <Cards games={games} />
    </GamesContainer>
  )

  return (null)
}

export default GamesList