// import { combineReducers } from 'redux';
// import sweep from './sweep.js';

import { NEW_GAME } from '../actions/newGame.js';
import { ADD_FLAG } from '../actions/addFlag.js';
import { SWEEP } from '../actions/sweep.js';

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
      // refactor!!!!
      for (var m = 0; m < rows; m++) {
        for (var n = 0; n < cols; n++) {
          var count = 0;
          if (board[m][n].value !== 10) {
            if (m > 0 && n > 0 && board[m - 1][n - 1].value === 10) {
              count++;
            }
            if (m > 0 && board[m - 1][n].value === 10) {
              count++;
            }
            if (m > 0 && n < cols-1 && board[m - 1][n + 1].value === 10) {
              count++;
            }
            if (n > 0 && board[m][n-1].value === 10) {
              count++;
            }
            if (n < cols-1 && board[m][n + 1].value === 10) {
              count++;
            }
            if (m < rows-1 && n > 0 && board[m + 1][n -1].value === 10) {
              count++;
            }
            if (m < rows-1 && board[m+1][n].value === 10) {
              count++;
            }
            if (m < rows-1 && n < cols-1 && board[m + 1][n+1].value === 10) {
              count++;
            }
            board[m][n].value = count;
          }
        }
      }

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
    case SWEEP: {
      const { x, y } = action.payload;
      // replace slice later bcz it mutates object
      const board = state.board.slice();
      board[x][y].explored = true;
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