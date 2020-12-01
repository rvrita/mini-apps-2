import React from 'react';
import Board from './Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPin: '',
      numPlayers: 2,
      playerNames: ['Chili', 'Crash'],
      currentFrame: 0,
      currentPlayer: 0,
      invalidPinNum: false,
      currentShot: 0,
      winner: '',
      showGameStart: true,
      gameOver: false,
      scoreboard: [
        // [ shot1, shot2, shot3, runningTotal ]
        [[null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0]],
        [[null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0]],
        [[null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0]],
        [[null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0], [null, null, null, 0]]
      ]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    // this.handleRestart = this.handleRestart.bind(this);
    this.addShot = this.addShot.bind(this);
  }

  newGame() {

    this.setState({
      showGameStart: false
    })
  }

  componentDidMount() {
    // this.newGame();
    setInterval(() => {
      if (this.state.showGameStart === false && this.state.currentFrame < 9)
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

    if (
      (shot === 0 && (0 > currentPin || currentPin > 10)) ||
      (shot === 1 && ((10 - newScoreboard[player][frame][0]) < currentPin) && (frame !== 9)) ||
      (shot === 1 && (newScoreboard[player][frame][0] !== 10) && ((10 - newScoreboard[player][frame][0]) < currentPin) && (frame === 9))
    ) {
      this.setState({
        invalidPinNum: true
      });
    } else {
      this.setState({
        invalidPinNum: false
      });

      // update score
      newScoreboard[player][frame][shot] = currentPin;
      shot++;
      if (
        (frame < 9 && (shot > 1 || currentPin === 10)) ||
        (shot > 2 || (shot > 1 && (newScoreboard[player][frame][0] + newScoreboard[player][frame][1] < 10)))
      ) {
        shot = 0;
        player++;

        if (player >= newScoreboard.length) {
          player = 0;
          // frame++;

          if (frame !== 9) {
            frame++;
          } else {
            let winningPoints = 0;
            let index;
            for (var i = 0; i < newScoreboard.length; i++) {
              if (newScoreboard[i][9][3] > winningPoints) {
                winningPoints = newScoreboard[i][9][3];
                index = i;
              }
            }
            this.setState({
              winner: this.state.playerNames[index],
              gameOver: true
            })
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
            score += board[i][j][1] + board[i][j][2];
          } else if (board[i][j + 1][0] != null) {
            if (board[i][j + 1][0] === 10) {
              score += board[i][j + 1][0] + board[i][j + 2][0];
            } else {
              score += board[i][j + 1][0] + board[i][j + 1][1];
            }
          }
          // spare
        } else if ((board[i][j][0] + board[i][j][1]) === 10) {
          const nextShot = j === 9 ? board[i][j][2] : board[i][j + 1][0];
          score += board[i][j][1] + nextShot;
        } else {
          score += board[i][j][1];
        }

        runningTotal += score;
        board[i][j][3] = runningTotal;
      }
    }
    this.setState({
      scoreboard: board
    });
  }

  handleInputSubmit(e) {
    e.preventDefault();
    this.addShot(this.state.currentPin);
  }

  render() {
    return (
      <div>
        {/* <h1>Bowling Score Board</h1> */}
        <div><img src="Logo.svg" width="300" /></div>
        {this.state.showGameStart &&
          <div>
            <form className="player-input" onSubmit={this.handlePlayerSubmit}>
              <label htmlFor="player-num">
                Number of players:
                {' '}
                <input
                  type="text"
                  id="player-num"
                  name="numPlayers"
                  value={this.state.numPlayers}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
              <input type="submit" value="submit" />
            </form>
          </div>
        }
        {this.state.gameOver === false &&
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
            {this.state.invalidPinNum &&
              <p className="warning">Please type a valid pin number</p>
            }
          </form>}
        <Board playerNames={this.state.playerNames}
          scoreboard={this.state.scoreboard}
          currentShot={this.state.currentShot}
          currentFrame={this.state.currentFrame}
          currentPlayer={this.state.currentPlayer}
          />
        {this.state.gameOver &&
          <div>
            <div className="winner">Winner is: {this.state.winner}</div>
            <button onClick={this.newGame}>Restart</button>
          </div>
        }
      </div>
    )
  }
}

export default App;