import React from 'react';
import BoardRow from './BoardRow.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.frames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {this.frames.map((frame, index) => {
                return <th key={frame}>R{frame}</th>
              })}
              <th>Total points</th>
            </tr>
          </thead>
          <tbody>
            {this.props.scoreboard.map((player, index) => {
              return <BoardRow key={index} player={index} frames={this.frames} scoreboard={this.props.scoreboard}/>
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Board;