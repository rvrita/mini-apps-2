// import Redux from 'redux';
// import { ADD_FLAG } from '../actions/addFlag.js';

// var addFlagReducer = (state = null, action) => {

//   switch (action.type) {
//     case ADD_FLAG:
//       const { x, y } = action.payload;
//       // replace slice later
//       const board = state.board.slice();
//       // bad: mutates object
//       board[x][y].flag = true;
//       return {
//         ...state,
//         board,
//       };
//     default:
//       return state;
//   }

// };

// export default addFlagReducer;
