import React from 'react';

class Frame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const score1 = this.props.scoreboard[this.props.player][this.props.frameNum][0];
    const score2 = this.props.scoreboard[this.props.player][this.props.frameNum][1];
    const score3 = this.props.scoreboard[this.props.player][this.props.frameNum][2];
    return (
      <td>
        <table>
          <tbody>
          <tr>
            <td>{score1}</td>
            <td>{score2}</td>
          </tr>
          <tr>
            <td>{' '}</td>
            <td>{score3}</td>
          </tr>
          </tbody>
        </table>
      </td>
    )
  }
}

export default Frame;