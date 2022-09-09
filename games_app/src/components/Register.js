import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components'

const ContenedorRegister = styled.div`
  margin: 0;
  border: none;
  padding: 50px 50px;
  width: min(600px, 70%);
  margin: 100px auto 0;
  background-color: #fff;
  box-shadow: 0px 0px 15px 5px hsl(115deg 75% 20%);
  border-radius: 20px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    padding: 5%;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }

  button {
    background-color: #1e8c18;
    border: none;
    font-size: 16px;
    padding: 0.5em 0;
    border-radius: 1em;
    margin-top: 35px;
    width: 120px;
    align-self: flex-end;

    :disabled {
      background-color: #ccc;
    }

    @media (hover: hover) and (pointer: fine) {
      :hover:not([disabled]) {
        background-color: #acf2a6;
        outline: 1px solid #1e8c18;
        cursor: pointer;
      }
    }

    @media (max-width: 768px) {
      margin-top: 10px;
      font-size: 12px;
      width: 100px;
    }
  }

  #input-container div {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  #input-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 35px 25px;
    width: 100%;
    margin: 0 auto;
    text-align: left;

    @media (max-width: 768px) {
      gap: 20px;
    }

    @media (max-width: 550px) {
      grid-template-columns: 1fr;
    }

    p {
      margin-left: 0.5em;
    }

    .error-message {
      color: #ff0000;
      font-size: 14px;
      position: absolute;
      top: calc(100% + 5px);
      @media (max-width: 768px) {
        font-size: 10px;
        top: calc(100% + 2px);
      }
    }
  }
`;

const Register = ({ setNotification }) => {
  const initialValues = { firstName: '', lastName: '', email: '', username: '', password: '', confirmPassword: '' }
  const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    if ( Object.keys(errors).length === 6 &&
      !errors.firstName && !errors.lastName && !errors.email && !errors.username && !errors.password && !errors.confirmPassword ) {
        return false
      }
    return true
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormValues({...formValues, [id]: value})
    validate({...formValues, [id]: value}, id)
  }

  const validate = (values, field) => {
    switch (field) {
      case "firstName":
        if (values.firstName.length > 0) {
          setErrors({...errors, firstName: null})
        }

        if (!values.firstName) {
          setErrors({...errors, firstName: "Falta el campo nombre" })
        }
    
        if ( values.firstName.length > 0 && values.firstName.replace(/\s+/g, '').length === 0 ) {
          setErrors({...errors, firstName: "Nombre no válido"})
        }
      break;
      case "lastName":
        if (values.lastName.length > 0) {
          setErrors({...errors, lastName: null})
        }

        if (!values.lastName) {
          setErrors({...errors, lastName: "Falta el campo apellido" })
        }
    
        if ( values.lastName.length > 0 && values.lastName.replace(/\s+/g, '').length === 0 ) {
          setErrors({...errors, lastName: "Apellido no válido"})
        }
      break;
      case "email":
        if(EMAIL_REGEX.test(values.email)) {
          setErrors({...errors, email: null})
        }
        else {
          setErrors({...errors, email: "Correo no válido"})
        }
        if (!values.email) {
          setErrors({...errors, email: "Falta el campo email"})
        }
      break;
      case "username":
        if (values.username.length > 0) {
          setErrors({...errors, username: null})
        }

        if (values.username.trim().length > 12) {
          setErrors({...errors, username: "Longitud máxima de 12"})
        }

        if (!values.username) {
          setErrors({...errors, username: "Falta el campo usuario" })
        }
    
        if ( values.username.length > 0 && values.username.replace(/\s+/g, '').length === 0 ) {
          setErrors({...errors, username: "Nombre de usuario inválido"})
        }
      break;
      case "password":
        if (PASSWORD_REGEX.test(values.password)) {
          setErrors({...errors, password: null})
        }
        else if (values.password.length < 8) {
          setErrors({...errors, password: "Longitud mínima de 8 caractéres"})
        }
        else {
          setErrors({...errors, password: "Debe contener 1 mayúscula, 1 minúscula y 1 número"})
        }
      break;
      case "confirmPassword":
        if ( values.confirmPassword === values.password) {
          setErrors({...errors, confirmPassword: null})
        }
        else {
          setErrors({...errors, confirmPassword: "No corresponde con la contraseña"})
        }
      break;
      default:
      break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = {
      email: formValues.email,
      username: formValues.username.trim(),
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      password: formValues.password
    }
    axios.post('/api/users', user).then((response) => {
      setNotification({ message: "Usuario registrado con éxito, click ir a inicio de sesión" , type: "redirect", url: '/login' })
    }).catch((exception) => {
      if ( exception.response.data.name === 'ValidationError' ) {
        setNotification({ message: "Ya se ha usado el usuario o email" , type: "error", url: '' })
      }
    })
  }

  return (
    <div style={{"backgroundColor": "#1e8c14", "width": "100%", height: "100vh", display: "inline-block"}}>
      <ContenedorRegister>
        <form onSubmit={handleSubmit} >
          <div id='input-container'>
            <div>
              <p>Nombre</p>
              <input
                type="text"
                value={formValues.firstName}
                onChange={handleChange}
                id="firstName"
                placeholder="Nombre"
              />
              <p className='error-message'>{ errors.firstName } </p>
            </div>
            <div>
              <p>Apellido</p>
              <input
                type="text"
                value={formValues.lastName}
                onChange={handleChange}
                id="lastName"
                placeholder="Apellido" 
              />
              <p className='error-message'>{ errors.lastName } </p>
            </div>
            <div>
              <p>Correo electrónico</p>
              <input
                value={formValues.email}
                onChange={handleChange}
                id="email" type='email'
                placeholder="example@mail.com"
              />
              <p className='error-message'>{ errors.email } </p>
            </div>
            <div>
              <p>Nombre de usuario</p>
              <input
                value={formValues.username}
                onChange={handleChange}
                id="username"
                placeholder="Usuario"
              />
              <p className='error-message'>{ errors.username } </p>
            </div>
            <div>
              <p>Contraseña</p>
              <input
                value={formValues.password}
                onChange={handleChange}
                id="password"
                placeholder="Contraseña"
                type="password"
              />
              <p className='error-message'>{ errors.password } </p>
            </div>
            <div>
              <p>Confirmar contraseña</p>
              <input
                value={formValues.confirmPassword}
                onChange={handleChange}
                id="confirmPassword"
                placeholder="Confirmar contraseña"
                type="password"
              />
              <p className='error-message'>{ errors.confirmPassword } </p>
            </div>
          </div>
          <button id="register" disabled={validateForm()} type="submit">Registrarse</ button>
        </form>
      </ContenedorRegister>
    </div>
  )
}

export default Register;