import { useState } from "react";
import { useMediaQuery } from "react-responsive";
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

  a:not(#logo), button, p {
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
  }

  a:not(#logo), button {
    @media (hover: hover) and (pointer: fine) {
      :hover {
        background-color: #219c16;
        cursor: pointer;
      }
    }
  }

  #userMenu {
    position: relative;
    line-height: 1.5;
    display: flex;
    flex-direction: column;

    button {
      height: 100%;
      width: 100%;
    }
  }

  #logo {
    height: 100%;
    width: 75px;
    background-image: url(${logo});
    background-repeat: no-repeat;
  }

  @media (max-width: 550px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    #logo {
      height: 50px;
    }
    overflow-x: hidden;
  }
`;

const UserMenu = styled.div`
  position: absolute;
  top: calc(100%);
  height: ${ props => props.open ? "62.5px" : 0 };
  width: 100%;
  background-color: #1e8c18;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-x: hidden;

  #logout {
    width: 100%;
    height: 50px!important;
  }
`;

const Menu = styled.button`
  height: 50px;
  width: 50px !important;
  z-index: 200;
  display: flex;
  position: relative;
  cursor: pointer;
  padding: 0 !important;

  span {
    position: absolute;
    background-color: #fff;
    top: 15px;
    left: 5px;
    width: 40px;
    height: 24px;
    display: flex;

    ::before {
      content: '';
      position: absolute;
      top: 4px;
      width: 40px;
      height: 4px;
      border-top: 6px solid #1e8c14;
      border-bottom: 6px solid #1e8c14;
    }
  }
`;

const MenuBar = styled.div`
  z-index: 100;
  background-color: #1e8c18;
  position: absolute;
  width: 200px;
  height: 100vh;
  top: 0;
  padding-top: 75px;
  right: ${ props => props.open ? "0" : "-100%" };
  display: flex;
  flex-direction: column;
  transition: 300ms right;

  a, p, button {
    width: 100%!important;
    padding: 0.5em 0 !important;
  }
`;

const NavBar = ({ user }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 550px)' })
  console.log(isMobile)

  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    window.open("https://gamesappfullstack.herokuapp.com/api/logout/", "_self")
  }

  if ( isMobile ) {
    return (
      <NavBarContainer>
        <Link to={'/'} id="logo" />
        <Menu onClick={() => setOpen (!open)} ><span /></ Menu>
        <MenuBar open={open}>
          {
          user 
          ? 
            <p>{user.username }</p> 
          : 
            <Link to={'/login'}>
              Iniciar Sesión
            </Link>}
          <Link to={'/games'}>
            Juegos
          </Link>
          <Link to={'/publishers'}>
            Distribuidores
          </Link>
          {
            user ?
              <button id="logout" onClick={handleLogout}>Cerrar Sesión</button>   
            :
            null
          }
        </MenuBar>
      </NavBarContainer>
    )
  }

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
        <div id="userMenu">
          <button onClick={() => setOpen(!open)} >{ user.username }</button>
          <UserMenu open={open} >
            <button id="logout" onClick={handleLogout}>Cerrar Sesión</button>   
          </UserMenu>
        </div>
        :
          <Link to={'/login'}>
            Iniciar Sesión
          </Link>
      }
    </NavBarContainer>
  )
}

export default NavBar