// import Redux from 'redux';
// import { NEW_GAME } from '../actions/newGame.js';

// var startNewGame = (state = [], action) => {

//   switch (action.type) {
//     case NEW_GAME:
//       const { rows, cols, bombs } = action.payload;
//       const board = [];
//       for (let i = 0; i < rows; i++) {
//         board[i] = [];
//         for (let j = 0; j < cols; j++) {
//           board[i][j] = {
//             flag: false,
//             explored: false,
//             value: 0,
//           }
//         }
//       }
//       return {
//         ...state,
//         board,
//       };
//     default:
//       return state;
//   }

// };

// export default startNewGame;