import React from 'react';
// import './Board.css';

class Board extends React.PureComponent {
  render() {
    const { board, handleCellClick } = this.props;

    return (
      <div className="board">
        <table>
          {board.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((cell, index) => {
                  return (
                    <td key={index} onClick={(e) => handleCellClick(e.target.value)}>{cell.value}</td>
                  )
                })}
              </tr>
            )
          })}
        </table>
      </div>
    );
  }
}

export default Board;
