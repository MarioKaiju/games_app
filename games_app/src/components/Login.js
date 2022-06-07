import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import axios from "axios";
const ContenedorLogin = styled.div`
  margin: 0;
  border: none;
  padding: 50px 0;
  width: 400px;
  margin: 100px auto 0;
  background-color: #fff;
  box-shadow: 0px 0px 15px 5px hsl(115deg 75% 20%);
  border-radius: 20px;

  button {
    background-color: #ccc;
    border: none;
    font-size: 18px;
    padding: 0.5em 0;
    border-radius: 1em;

    @media (hover: hover) and (pointer: fine) {
      :hover {
        background-color: #ddd;
        outline: 1px #ccc solid;
        cursor: pointer;
      }
    }
  }

  button #login {
    margin-top: 75px;
  }

  form, form div {
    display: flex;
    flex-direction: column;
  }

  form {
    gap: 30px;
    width: 300px;
    margin: 0 auto;
    text-align: center
  }

  p, input {
    font-size: 18px;
  }

  .no-user-container {
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    gap: 5px;

    p {
      font-size: 12px;
    }

    button {
      background-color: #59e64c;
      @media (hover: hover) and (pointer: fine) {
        :hover {
          background-color: #acf2a6;
          outline: 1px solid #1e8c18;
          cursor: pointer;
        }
      }
    }
  }
`;


const Login  = ({ setUser, setNotification }) => {
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault()
    const username = e.target.user.value
    const password = e.target.password.value
    axios.post('/api/login', { username, password}).then((response) => {
      setUser(response.data);
      setNotification({ message: "Inicio de sesión exitoso, click aquí para ir a la pagina principal", type: "redirect", url: '/' })
    }).catch((error) => {
      if (error.response.status === 401) {
        setNotification({ message: "Contraseña Incorrecta", type: "info", url: '' })
      }
      if (error.response.status === 404) {
        setNotification({ message: "No se encontró el usuario", type: "error", url: '' })
      }
    })
  }

  return (
    <div style={{"backgroundColor": "#1e8c14", "width": "100%", height: "100vh", display: "inline-block"}}>
      <ContenedorLogin>
        <form onSubmit={login}>
          <div>
            <p>Usuario</p>
            <input id="user" placeholder="usuario" />
          </div>
          <div>
            <p>Contraseña</p>
            <input id="password" placeholder="contraseña" type="password" />
          </div>
          <button id="login" type="submit">Iniciar Sesión</ button>
        </form>
        <div className="no-user-container">
          <p>No tienes usuario?</p>
          <button onClick={ () => navigate('/register') }>Regístrate</ button>
        </div>
      </ContenedorLogin>
    </div>
  )
}

export default Login