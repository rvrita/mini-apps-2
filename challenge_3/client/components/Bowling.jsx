import React from 'react';
import Board from './Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPin: '',
      playerNames: ['Riri', 'Mmtg', 'Chili', 'Crash'],
      currentFrame: 0,
      currentPlayer: 0,
      invalidPinNum: false,
      currentShot: 0,
      scoreboard: [
        // [ shot1, shot2, runningTotal ]
        [[null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0]],
        [[null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0]],
        [[null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0]],
        [[null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0]]
      ]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  isValid(value) {
    return 0 <= value && value <= 10;
  }

  updateBoardWithNewScore(scoreboard, value, player, frame, shot) {
    const newScoreboard = scoreboard.slice();
    newScoreboard[player][frame][shot] = value;
    newScoreboard[player][frame][2] += parseInt(value);




    if ((shot === 1) && (frame !== 9)) {
      newScoreboard[player][frame + 1][2] = newScoreboard[player][frame][2];
    }
    this.setState({
      scoreboard: newScoreboard
    });
  }

  // returns true if player is done the frame
  nextShot() {
    if (this.state.currentShot === 0) {
      this.setState({
        currentShot: 1
      });
      return false;
    } else {
      this.setState({
        currentShot: 0
      });
      return true;
    }
  }

  // returns true if all players are done with this frame
  nextPlayer() {
    const currPlayer = this.state.currentPlayer;
    if (currPlayer === this.state.playerNames.length - 1) {
      this.setState({
        currentPlayer: 0
      });
      return true;
    } else {
      this.setState({
        currentPlayer: currPlayer + 1
      });
      return false;
    }
  }

  // advances to next frame
  nextFrame() {
    const currFrame = this.state.currentFrame;
    if (currFrame !== 9) {
      this.setState({
        currentFrame: currFrame + 1
      }, () => console.log(this.state));
    }
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleInputSubmit(e) {
    e.preventDefault();
    // if input between 0 and 10
    if (this.isValid(this.state.currentPin)) {
      this.setState({
        invalidPinNum: false
      });
      // add new score to the board
      this.updateBoardWithNewScore(
        this.state.scoreboard,
        this.state.currentPin,
        this.state.currentPlayer,
        this.state.currentFrame,
        this.state.currentShot
      );
      if (this.nextShot()) {
        if (this.nextPlayer()) {
          this.nextFrame();
        }
      }
    } else {
      this.setState({
        invalidPinNum: true
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Bowling Score Board</h1>
        <form className="score-input" onSubmit={this.handleInputSubmit}>
          <label htmlFor="current-pin">
            Number of pins you hit:
            {' '}
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
          <p className="warning">Please type a valid pin number (between 0 and 10)</p>
        }
        <Board playerNames={this.state.playerNames} scoreboard={this.state.scoreboard} />
      </div>
    )
  }
}

export default App;