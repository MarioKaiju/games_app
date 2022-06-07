import { Link } from "react-router-dom";
import styled from "styled-components"
import logo from '../images/Logo.svg'

const NavBarContainer = styled.div`
  width: 90%;
  height: 75px;
  background-color: #1e8c14;
  padding: 0 5%;
  display: grid;
  grid-auto-rows: 50px;
  align-content: center;
  grid-template-columns: 4fr repeat(3, min(150px, 20%));
  gap: 25px;
  text-align: center;

  a:not(#logo), button {
    background-color: transparent;
    outline: none;
    border: none;
    line-height: 1.5;
    align-self: center;
    text-decoration: none;
    color: #fff;
    width: fit-content;
    place-self: center;
    padding: .5em 1em;
    white-space: nowrap;
    font-size: 16px;
    @media (hover: hover) and (pointer: fine) {
      :hover {
        background-color: #219c16;
        cursor: pointer;
      }
    }
  }

  #logo {
    height: 100%;
    width: 75px;
    background-image: url(${logo});
    background-repeat: no-repeat;
  }
`;

const NavBar = ({ user }) => {
  return (
    <NavBarContainer>
      <Link to={'/'} id="logo">
      </Link>
      <Link to={'/games'}>
        Juegos
      </Link>
      <Link to={'/publishers'}>
        Distribuidores
      </Link>
      {
        user ?
          <button >{ user.username }</button>
        :
          <Link to={'/login'}>
            Iniciar Sesión
          </Link>
      }
      
    </NavBarContainer>
  )
}

export default NavBar