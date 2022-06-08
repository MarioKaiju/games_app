import { createStore, combineReducers, applyMiddleware } from'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import loginReducer from './loginReducer';
import gameReducer from './gameReducer';

const reducer = combineReducers({
  login: loginReducer,
  games: gameReducer
})

const store = createStore(reducer,
  composeWithDevTools(applyMiddleware(thunk)))

export default store;