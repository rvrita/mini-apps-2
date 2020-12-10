import React from 'react';

class Board extends React.PureComponent {
  render() {
    const { board, handleCellClick, handleRightClick } = this.props;

    return (
      <div className="board">
        <table>
          <tbody>
            {board.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => {
                    const tdClassNames = [];
                    if (cell.value === 9 && cell.explored) tdClassNames.push('bomb');
                    if (cell.value === 1) tdClassNames.push('one');
                    if (cell.value === 2) tdClassNames.push('two');
                    if (cell.value === 3) tdClassNames.push('three');
                    if (cell.value === 4) tdClassNames.push('four');
                    return (
                      <td key={colIndex} className={tdClassNames.join(' ')}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          handleRightClick(rowIndex, colIndex);
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCellClick(rowIndex, colIndex);
                        }}>
                        {
                          cell.explored ?
                            (cell.value === 9 ?
                              <img alt="bomb" src="bomb.svg" height="15" />
                              :
                              cell.value)
                            :
                            <button>{cell.flag && <img alt="flag" src="flag.svg" width="16" />}</button>
                        }
                      </td>
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
