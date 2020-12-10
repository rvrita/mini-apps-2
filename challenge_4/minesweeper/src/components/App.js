import React from 'react';
import BoardContainer from '../containers/BoardContainer.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSize: 'medium',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { onNewGame, gameover } = this.props;
    const { boardSize } = this.state;
    return (
      <div className="App">
        <form onSubmit={e => {
          e.preventDefault();
          onNewGame(boardSize);
        }}>
          {/* <label htmlFor="boardSize">Choose a board size:<br/></label> */}
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
        <BoardContainer />
      </div>
    );
  }
}

export default App;
