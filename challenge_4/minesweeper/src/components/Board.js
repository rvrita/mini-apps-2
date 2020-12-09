import React from 'react';
// import './Board.css';

class Board extends React.PureComponent {
  render() {
    const { board, handleCellClick } = this.props;

    return (
      <div className="board">
        <table>
          <tbody>
          {board.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => {
                  return (
                    <td key={colIndex}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCellClick(rowIndex,colIndex);
                    }}>{cell.explored ? cell.value : null}</td>
                  // }}>{cell.value}</td>
                  )
                })}
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
