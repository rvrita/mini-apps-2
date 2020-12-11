import React from 'react';
import BoardContainer from '../containers/BoardContainer.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSize: 'medium',
      currentTime: Date.now(),
    };
  }

  componentDidMount() {
    setInterval(() => {
      const { gameover, win } = this.props;
      if (gameover === false && win === false) {
        this.setState({
          currentTime: Date.now(),
        });
      }
    }, 1000);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { onNewGame, gameover, counter, win, startTime } = this.props;
    const { boardSize, currentTime } = this.state;
    return (
      <div className="App">
        <form onSubmit={(e) => {
          e.preventDefault();
          onNewGame(boardSize);
        }}>
          <select onChange={this.handleChange}
            value={boardSize}
            name="boardSize"
            id="board-size">
            <option value="small">Beginner</option>
            <option value="medium">Intermediate</option>
            <option value="large">Expert</option>
          </select>
          <button type="submit">New game</button>
        </form>
        {gameover &&
          <div className="game-over">Game over!</div>
        }
        {win &&
          <div className="win">Congrats, you won!</div>
        }
        {counter > -1 &&
          <div>
            <div className="game-header">
              <div>{counter}</div>
              <div>{Math.floor((currentTime - startTime) / 1000) > 0 ? Math.floor((currentTime - startTime) / 1000) : 0}</div>
            </div>
            <BoardContainer />
          </div>
        }
      </div>
    );
  }
}

export default App;
