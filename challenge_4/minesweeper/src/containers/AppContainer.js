import { connect } from 'react-redux';
import App from '../components/App.js';
import newGame from '../actions/newGame.js';

const mapStateToProps = (state) => ({
  board: state.board,
  gameover: state.gameover,
  counter: state.counter,
  win: state.win,
  startTime: state.startTime
});

const mapDispatchToProps = (dispatch) => ({
  onNewGame: (size) => {
    switch (size) {
      case 'small':
        dispatch(newGame({
          rows: 8,
          cols: 8,
          bombs: 10,
        }));
        break;
      case 'medium':
        dispatch(newGame({
          rows: 16,
          cols: 16,
          bombs: 40,
        }));
        break;
      case 'large':
        dispatch(newGame({
          rows: 16,
          cols: 30,
          bombs: 99,
        }));
        break;
      default:
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);