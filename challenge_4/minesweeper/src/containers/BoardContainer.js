import { connect } from 'react-redux';
import Board from '../components/Board.js';
import sweep from '../actions/sweep.js';
import addFlag from '../actions/addFlag.js';

const mapStateToProps = (state) => ({ 
  board: state.board,
  gameover: state.gameover
});

const mapDispatchToProps = (dispatch) => ({ 
  handleCellClick: (x,y) => {
    dispatch(sweep(x,y));
  },
  handleRightClick: (x,y) => {
    dispatch(addFlag(x,y));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);