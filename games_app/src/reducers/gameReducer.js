import gameService from '../services/games'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'TOP_5':
      return action.data
    case 'INIT_GAMES':
      return action.data
    case 'NEW_GAME':
      return  [...state, action.data]
    case 'ADD_REVIEW': {
      return state.map(game => game.id !== action.data.id ? game : {...game, reviews: [ ...game.reviews, action.data.review ]})
    }
    default:
      return state
  }
}

export const top5 = () => {
  return async dispatch => {
    const games = await gameService.getTop()
    dispatch({
      type: "TOP_5",
      data: games
    })
  }
}

export const initializeGames = () => {
  return async dispatch => {
    const games = await gameService.getAll()
    dispatch({
      type: "INIT_GAMES",
      data: games
    })
  }
}


export const createGame = (data) => {
  return async dispatch => {
    const newGame = await gameService.create(data)
    dispatch({
      type: 'NEW_GAME',
      data: newGame
    })
  }
}

export const addReview = (review) => {
  return async dispatch => {
    try {
      const game = await gameService.createReview(review)
      dispatch({
        type: "ADD_REVIEW",
        data: game
      }) 
    } catch (exception) {
      console.log(exception)
    }
  }
}

export default reducer;