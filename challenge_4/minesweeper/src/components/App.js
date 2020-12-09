import React from 'react';
import './App.css';
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
    const { onNewGame } = this.props;
    const { boardSize } = this.state;
    return (
      <div className="App">
        <form onSubmit={e => {
          e.preventDefault();
          onNewGame(boardSize);
        }}>
          <label for="boardSize">Choose a board size:</label>
          <select onChange={this.handleChange}
            value={boardSize}
            name="boardSize" 
            id="board-size">
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
          <button type="submit">Start new game</button>
        </form>
        <BoardContainer />
      </div>
    );
  }
}

export default App;
