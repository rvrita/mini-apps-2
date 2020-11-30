import { ENGINE_METHOD_ALL } from 'constants';
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
        [[null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0, null]],
        [[null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0, null]],
        [[null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0, null]],
        [[null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0], [null, null, 0, null]]
      ]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.addShot = this.addShot.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.currentFrame < 9)
        this.addShot(Math.random() * 11 | 0);
    }, 100);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = parseInt(e.target.value);
    this.setState({
      [name]: value
    });
  }

  isValid(value) {
    return 0 <= value && value <= 10;
  }

  addShot(currentPin) {
    let newScoreboard = this.state.scoreboard.slice();
    let player = this.state.currentPlayer;
    let frame = this.state.currentFrame;
    let shot = this.state.currentShot;

    // Limit to 10 pins per frame
    if (shot > 0) {
      const firstShot = newScoreboard[player][frame][shot-1];
      if (currentPin + firstShot > 10) currentPin = 10 - firstShot;
    }
    
    // update score
    newScoreboard[player][frame][shot] = currentPin;
    // advance to next shot
    // if (frame === 9 && currentPin === 10) {

    // // } else {
    //   if (currentPin === 10 || shot === 1) {
    //     shot = 0;
    //     if (player === this.state.playerNames.length - 1) {
    //       player = 0;
    //       frame += 1;
    //     } else {
    //       player += 1;
    //     }
    //   } else {
    //     shot = 1;
    //   }
    // // }

    shot++;
    if (
      (frame < 9 && (shot > 1 || currentPin === 10)) ||
      (shot > 2 || (shot > 1 && frame[0] + frame[1] < 10))
    ) {
      shot = 0;
      player++;

      if (player >= newScoreboard.length) {
        player = 0;
        frame++;

        if (frame > 9) {
          // game over
          frame = 0;
          // clear board?
        }
      }
    }

    // update state
    this.setState({
      scoreboard: newScoreboard,
      currentPlayer: player,
      currentFrame: frame,
      currentShot: shot
    });
    this.countTotals();
  }

  countTotals() {
    const board = this.state.scoreboard.slice();
    for (var i = 0; i < board.length; i++) { // players
      let runningTotal = 0;
      for (var j = 0; j < board[i].length; j++) { // frames
        if (board[i][j][0] == null) break;
        let score = board[i][j][0];
        // strike
        if (board[i][j][0] === 10) {
          if (j === 8) {
            // SECOND to last frame
            score += board[i][j + 1][0] + board[i][j + 1][1];
          } else if (j === 9) {
            // last frame
            score += board[i][j][1] + board[i][j][3];
          } else if (board[i][j + 1][0] != null) {
            if (board[i][j + 1][0] === 10) {
              score += board[i][j + 1][0] + board[i][j + 2][0];
            } else {
              score += board[i][j + 1][0] + board[i][j + 1][1];
            }
          }
        // spare
        } else if ((board[i][j][0] + board[i][j][1]) === 10) {
          const nextShot = j === 9 ? board[i][j][3] : board[i][j + 1][0];
          if (nextShot != null) {
            score += nextShot;
          }
        } else {
          score += board[i][j][1];
        }

        runningTotal += score;
        board[i][j][2] = runningTotal;
      }
    }
    this.setState({
      scoreboard: board
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
      this.addShot(this.state.currentPin);
    } else {
      this.setState({
        invalidPinNum: true
      });
    }
  }

  render() {
    return (
      <div>
        {/* <h1>Bowling Score Board</h1> */}
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