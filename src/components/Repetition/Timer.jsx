import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Icon } from "antd";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
  }

  renderTime = value => {
    const { isPlaying } = this.state;
    return (
      <div onClick={this.handleClick}>
        {isPlaying ? (
          value === 0 ? (
            "Finished!"
          ) : (
            <div className="timer">
              <div className="text">Remaining</div>
              <div className="value">{value}</div>
              <div className="text">seconds</div>
            </div>
          )
        ) : (
          <div className="timer">
            <div className="text">Start</div>
            <div className="value">{value}</div>
            <div className="text">seconds</div>
          </div>
        )}
      </div>
    );
  };

  handleClick = () => {
    const { isPlaying } = this.state;
    this.setState({ isPlaying: !isPlaying });
  };

  render() {
    const { time, onComplete } = this.props;
    const { isPlaying } = this.state;

    return (
      <CountdownCircleTimer
        isPlaying={isPlaying}
        durationSeconds={time}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        renderTime={this.renderTime}
        onComplete={onComplete}
      />
    );
  }
}

export default Timer;
