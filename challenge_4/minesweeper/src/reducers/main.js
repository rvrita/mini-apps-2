import { NEW_GAME } from '../actions/newGame.js';
import { ADD_FLAG } from '../actions/addFlag.js';
import { SWEEP } from '../actions/sweep.js';

const rootReducer = (state = { win: false, gameover: false, board: [] }, action) => {
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
      var startTime = Date.now();

      return {
        ...state,
        board,
        win: false,
        gameover: false,
        counter: bombs,
        startTime
      };
    }
    case ADD_FLAG: {
      // to disable clicks on board after end of game
      if (state.gameover) return state;
      if (state.win) return state;

      const { x, y } = action.payload;
      // replace slice later bcz it mutates object
      const board = state.board.slice();
      let counter = state.counter;
      if (board[x][y].flag) {
        board[x][y].flag = false;
        counter++;
      } else {
        board[x][y].flag = true;
        counter--;
      }

      return {
        ...state,
        board,
        counter
      };
    }
    case SWEEP: {
      // to disable clicks on board after end of game
      if (state.gameover) return state;
      if (state.win) return state;

      const { x, y } = action.payload;
      // replace slice later bcz it mutates object
      const board = state.board.slice();
      board[x][y].flag = false;
      revealMore(board, x, y);

      // check if end of game
      if (board[x][y].value === 9) {
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].value === 9) {
              board[i][j].explored = true;
            }
          }
        }
        state.gameover = true;
      } else {
        // check if it's a win
        var isWin = true;
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].explored === false && board[i][j].value !== 9) {
              isWin = false;
              break;
            }
          }
        }
        state.win = isWin;
      }
      
      return {
        ...state,
        board
      };
    }
    default:
      return state;
  }
};

var revealMore = (board, x, y) => {
  // check if it's valid cell
  if (x >= board.length || x < 0 ||
    y >= board[0].length || y < 0 ||
    board[x][y].explored) {
    return;
  }
  // reveal
  board[x][y].explored = true;
  // if it was not empty do not reveal more
  if (board[x][y].value !== '') {
    return;
  }
  // check all 8 sides
  revealMore(board, x - 1, y - 1);
  revealMore(board, x - 1, y);
  revealMore(board, x - 1, y + 1);
  revealMore(board, x, y - 1);
  revealMore(board, x, y + 1);
  revealMore(board, x + 1, y - 1);
  revealMore(board, x + 1, y);
  revealMore(board, x + 1, y + 1);
  // leetcode - number of islands logic
}

export default rootReducer;