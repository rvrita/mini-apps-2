import React from 'react';
import Board from './Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPin: '',
      numOfPlayers: 3,
      currentFrame: 0,
      currentPlayer: 0,
      invalidPinNum: false,
      currentShot: 0,
      scoreboard: [
        [[null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0]],
        [[null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0]],
        [[null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0]]
      ]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  setBoard() {
    const newScoreboard = this.state.scoreboard.slice();
    const value = this.state.currentPin;
    newScoreboard[this.state.currentPlayer][this.state.currentFrame][this.state.currentShot] = value;
    newScoreboard[this.state.currentPlayer][this.state.currentFrame][2] += parseInt(value);
    if ((this.state.currentShot === 1) && (this.state.currentFrame !== 9)) {
      newScoreboard[this.state.currentPlayer][this.state.currentFrame + 1][2] = newScoreboard[this.state.currentPlayer][this.state.currentFrame][2];
    }
    this.setState({
      scoreboard: newScoreboard
    }, () => console.log(this.state));
  }

  setNextPlayer() {
    const currPlayer = this.state.currentPlayer;
    if (currPlayer === this.state.numOfPlayers - 1) {
      this.setState({
        currentPlayer: 0
      });
      this.setNextFrame();
    } else {
      this.setState({
        currentPlayer: currPlayer + 1
      });
    }
  }

  setNextFrame() {
    const currFrame = this.state.currentFrame;
    if (currFrame !== 9) {
      this.setState({
        currentFrame: currFrame + 1
      });
    }
  }

  setNextShot() {
    if (this.state.currentShot === 0) {
      this.setState({
        currentShot: 1
      });
    } else {
      this.setState({
        currentShot: 0
      });
      this.setNextPlayer();
    }
  }

  isValid() {
    const value = this.state.currentPin;
    if (0 <= value && value <= 10) {
      this.setState({
        invalidPinNum: false
      });
      this.setBoard();
      this.setNextShot();
    } else {
      this.setState({
        invalidPinNum: true
      });
    }
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    }, () => console.log(this.state));
  }

  handleInputSubmit(e) {
    e.preventDefault();
    console.log('set');
    this.isValid();
  }

  render() {
    return (
      <div>
        <h1>Bowling Score Board</h1>
        <form onSubmit={this.handleInputSubmit}>
          <label htmlFor="current-pin">
            Number of pins you hit:
            <input
              type="text"
              id="current-pin"
              name="currentPin"
              value={this.state.currentPin}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <input type="submit" value="submit" />
        </form>
        {this.state.invalidPinNum &&
          <p>Please type a valid pin number (between 0 and 10)</p>
        }
        <Board scoreboard={this.state.scoreboard} />
      </div>
    )
  }
}

export default App;