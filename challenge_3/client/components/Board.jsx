import React from 'react';
import BoardRow from './BoardRow.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((frame) => {
                return <th key={frame}>Fr {frame}</th>
              })}
              <th>Total points</th>
            </tr>
          </thead>
          <tbody>
            {this.props.scoreboard.map((row, index) => {
              return <BoardRow playerNames={this.props.playerNames} key={index} player={index} frames={row}/>
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Board;