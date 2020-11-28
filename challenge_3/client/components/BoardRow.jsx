import React from 'react';
import Frame from './Frame.jsx';

class BoardRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td className="names">Namez</td>
        {this.props.frames.map((shot, index) => {
          return <Frame key={index} player={this.props.player} frameNum={index} scoreboard={this.props.scoreboard} />
        })}
        <td className="totals">100</td>
      </tr>
    )
  }
}

export default BoardRow;