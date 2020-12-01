import React from 'react';
import Frame from './Frame.jsx';

class BoardRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentFrame, currentShot, isCurrentPlayer, frames, playerNames, player} = this.props;
    return (
      <tr className={isCurrentPlayer && 'current-player'}>
        <td className="names">{playerNames[player]}</td>
        {frames.map((frame, index) => {
          return <Frame 
          isCurrentFrame={isCurrentPlayer && currentFrame == index}
          currentShot={currentShot}
          key={index} player={player} frameNum={index} frame={frame} />
        })}
        <td className="totals">{frames[9][3]}</td>
      </tr>
    )
  }
}

export default BoardRow;