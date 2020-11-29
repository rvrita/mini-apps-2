import React from 'react';
import Frame from './Frame.jsx';

class BoardRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td className="names">{this.props.playerNames[this.props.player]}</td>
        {this.props.frames.map((frame, index) => {
          return <Frame key={index} player={this.props.player} frameNum={index} frame={frame} />
        })}
        <td className="totals">100</td>
      </tr>
    )
  }
}

export default BoardRow;