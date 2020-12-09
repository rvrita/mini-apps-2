import { createStore } from 'redux';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from '../reducers/main.js';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // applyMiddleware(thunk)
);

export default store;