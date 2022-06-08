import loginService from '../services/login'
import { setNotification } from './notificationReducer';

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data;
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      dispatch ({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
      dispatch(setNotification({ message:'Contraseña o usuario incorrecto', type: "info", url: null }))
    }
  }
}

export const loged = (user) => {
  return async dispatch => {
    try {
      const user = await loginService.loged()
      dispatch({
        type: "LOGIN",
        data: user
      })
    } catch (exception) {

    }
  }
}

export const logout = () => {
  return async dispatch => {
    await loginService.logout
    dispatch({ type: "LOGOUT" })
  }
}
 
export default reducer
