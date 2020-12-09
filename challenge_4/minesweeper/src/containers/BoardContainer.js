import { connect } from 'react-redux';
import Board from '../components/Board.js';
import sweep from '../actions/sweep.js';


const mapStateToProps = (state) => ({ 
  board: state.board,
});

const mapDispatchToProps = (dispatch) => ({ 
  handleCellClick: (x,y) => {
    dispatch(sweep(x,y));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);