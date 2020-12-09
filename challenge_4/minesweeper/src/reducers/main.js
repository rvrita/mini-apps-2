// import { combineReducers } from 'redux';
// import sweep from './sweep.js';

import { NEW_GAME } from '../actions/newGame.js';
import { ADD_FLAG } from '../actions/addFlag.js';

// const rootReducer = combineReducers({
//   addFlag,
//   sweep,
//   startNewGame
// });

const rootReducer = (state = { board: [] }, action) => {
  switch (action.type) {
    case NEW_GAME: {
      const { rows, cols, bombs } = action.payload;
      const board = [];
      for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
          board[i][j] = {
            flag: false,
            explored: false,
            value: 0,
          }
        }
      }
      // add bombs
      var k = bombs;
      while (k > 0) {
        var row = Math.floor(Math.random() * rows);
        var col = Math.floor(Math.random() * cols);
        if (board[row][col].value !== 10) {
          board[row][col].value = 10;
          k--;
        }
      }

      // add values (count bombs around)
      // TODO

      return {
        ...state,
        board,
      };
    }
    case ADD_FLAG: {
      const { x, y } = action.payload;
      // replace slice later bcz it mutates object
      const board = state.board.slice();
      board[x][y].flag = true;
      return {
        ...state,
        board,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;