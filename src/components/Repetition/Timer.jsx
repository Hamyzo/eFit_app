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
    const { time } = this.props;
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;
    const currentTime = `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    return (
      <div onClick={this.handleClick}>
        {isPlaying ? (
          value === 0 ? (
            "Finished!"
          ) : (
            <div className="timer">
              <div className="text">Remaining</div>
              <div className="value">{currentTime}</div>
              <div className="text">minutes</div>
            </div>
          )
        ) : (
          <div className="timer">
            <div className="bigger-text">Click</div>
            <div className="bigger-text">
              To {value === time ? "Start" : "Resume"}
            </div>
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
        colors={[["#43978D", 0.33], ["#F9E07F", 0.33], ["#F9AD6A"]]}
        renderTime={this.renderTime}
        onComplete={onComplete}
      />
    );
  }
}

export default Timer;
