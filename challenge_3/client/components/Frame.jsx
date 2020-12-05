import React from 'react';

class Frame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const [shot1, shot2, shot3, runningTotal] = this.props.frame;
    const { currentShot, isCurrentFrame, frameNum } = this.props;
    return (
      <td>
        <table>
          <tbody>
            <tr>
              <td className={isCurrentFrame && currentShot == 0 ? 'current-shot' : ''}>{shot1 === 10 ? 'X' : shot1}</td>
              {frameNum !== 9 &&
                <td className={isCurrentFrame && currentShot == 1 ? 'current-shot' : ''}>{shot1 !== 10 && shot2 + shot1 === 10 ? '/' : shot2}</td>
              }
              {frameNum === 9 && shot2 !== 10 &&
                <td className={isCurrentFrame && currentShot == 1 ? 'current-shot' : ''}>{shot1 !== 10 && shot2 + shot1 === 10 ? '/' : shot2}</td>
              }
              {frameNum === 9 && shot2 === 10 &&
                <td className={isCurrentFrame && currentShot == 1 ? 'current-shot' : ''}>{'X'}</td>
              }
              {frameNum === 9 &&
                <td className={isCurrentFrame && currentShot == 2 ? 'current-shot' : ''}>{shot3 === 10 ? 'X' : shot3}</td>
              }
            </tr>
            <tr>
              <td className={isCurrentFrame ? 'current-frame' : ''} colSpan={frameNum === 9 ? 3 : 2}>{runningTotal}</td>
            </tr>
          </tbody>
        </table>
      </td>
    )
  }
}

export default Frame;