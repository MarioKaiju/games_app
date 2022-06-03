import styled from "styled-components"

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

  label, input {
    font-size: 18px;
  }

  input {
    background-color: #f3f3f3;
    border: none;
    outline: none;
    padding: .5em .75em;
    border-radius: 1em;
    margin-top: 5px;

    :focus {
      background-color: #ccc;
    }
  }
`;


const Login  = () => {
  const login = (e) => {
    e.preventDefault()
    const username = e.target.user.value
    const password = e.target.password.value
    console.log("username", username, "password", password)
  }

  return (
    <div style={{"backgroundColor": "#1e8c14", "width": "100%", height: "100vh", display: "inline-block"}}>
      <ContenedorLogin>
        <form onSubmit={login}>
          <div>
            <label htmlFor="user">Usuario</label>
            <input id="user" placeholder="usuario" />
          </div>
          <div>
            <label htmlFor="password" >Contraseña</label>
            <input id="password" placeholder="contraseña" type="password" />
          </div>
          <button type="submit">Iniciar Sesión</ button>
        </form>
      </ContenedorLogin>
    </div>
    
  )
}

export default Login