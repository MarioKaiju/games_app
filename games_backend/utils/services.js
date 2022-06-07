const logger = require('./logger')

const validate = (body, response) => {
  const { email, username, password, firstName, lastName } = body

  if (!password) {
    logger.error('error: Falta la contraseña')
    response.status(400).json({ error: 'Falta el campo contraseña' })
  }

  if (password.length < 8) {
    logger.error('error: La contraseña debe tener una longitud minima de 8')
    return response.status(400).json({ error: 'La longitud de la contraseña debe ser mayor a 7 caractéres' })
  }

  if (!email) {
    logger.error('error: Falta el email')
    return response.status(400).json({ error: 'Falta el campo email' })
  }

  if (!username) {
    logger.error('error: Falta el usuario')
    return response.status(400).json({ error: 'Falta el campo usuario' })
  }

  if (!firstName) {
    logger.error('error: Falta el nombre')
    return response.status(400).json({ error: 'Falta el campo nombre' })
  }

  if (!lastName) {
    logger.error('error: Falta el apellido')
    return response.status(400).json({ error: 'Falta el campo apellido' })
  }
}

module.exports = validate