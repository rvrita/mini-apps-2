import { NEW_GAME } from '../actions/newGame.js';
import { ADD_FLAG } from '../actions/addFlag.js';
import { SWEEP } from '../actions/sweep.js';

const rootReducer = (state = { bombsLeft: 0, gameover: false, board: [] }, action) => {
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
        if (board[row][col].value !== 9) {
          board[row][col].value = 9;
          k--;
        }
      }

      // add values (count bombs around)
      // refactor!!!!
      for (var m = 0; m < rows; m++) {
        for (var n = 0; n < cols; n++) {
          var count = 0;
          if (board[m][n].value !== 9) {
            if (m > 0 && n > 0 && board[m - 1][n - 1].value === 9) {
              count++;
            }
            if (m > 0 && board[m - 1][n].value === 9) {
              count++;
            }
            if (m > 0 && n < cols - 1 && board[m - 1][n + 1].value === 9) {
              count++;
            }
            if (n > 0 && board[m][n - 1].value === 9) {
              count++;
            }
            if (n < cols - 1 && board[m][n + 1].value === 9) {
              count++;
            }
            if (m < rows - 1 && n > 0 && board[m + 1][n - 1].value === 9) {
              count++;
            }
            if (m < rows - 1 && board[m + 1][n].value === 9) {
              count++;
            }
            if (m < rows - 1 && n < cols - 1 && board[m + 1][n + 1].value === 9) {
              count++;
            }
            if (count === 0) {
              board[m][n].value = '';
            } else {
              board[m][n].value = count;
            }
          }
        }
      }

      return {
        ...state,
        board,
        gameover: false,
      };
    }
    case ADD_FLAG: {
      if (state.gameover) return state;
      // add counter = bombs
      // if user places flag decrement counter
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
      if (state.gameover) return state;
      const { x, y } = action.payload;
      // replace slice later bcz it mutates object
      const board = state.board.slice();
      board[x][y].flag = false;
      revealMore(board, x, y);
      if (board[x][y].value === 9) {
        state.gameover = true;
      }
      return {
        ...state,
        board,
      };
    }
    default:
      return state;
  }
};

var revealMore = (board, x, y) => {
  if (x >= board.length || x < 0 ||
    y >= board[0].length || y < 0 ||
    board[x][y].explored) {
    return;
  }

  board[x][y].explored = true;

  if (board[x][y].value !== '') {
    return;
  }

  revealMore(board, x - 1, y - 1);
  revealMore(board, x - 1, y);
  revealMore(board, x - 1, y + 1);
  revealMore(board, x, y - 1);
  revealMore(board, x, y + 1);
  revealMore(board, x + 1, y - 1);
  revealMore(board, x + 1, y);
  revealMore(board, x + 1, y + 1);

}

export default rootReducer;