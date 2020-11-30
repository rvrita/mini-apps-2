import React from 'react';

class Frame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const [shot1, shot2, runningTotal] = this.props.frame;
    return (
      <td>
        <table>
          <tbody>
          <tr>
            <td>{shot1}</td>
            <td>{shot2}</td>
            {this.props.frameNum === 9 && <td></td>}
          </tr>
          <tr>
            <td colSpan={this.props.frameNum === 9 ? 3 : 2}>{runningTotal}</td>
          </tr>
          </tbody>
        </table>
      </td>
    )
  }
}

export default Frame;