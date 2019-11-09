import React from "react";
import {
  Collapse,
  Table,
  Row,
  Col,
  Button,
  Modal,
  Tabs,
  Icon,
  Avatar
} from "antd";
import "./CoachProgram.css";
import Spinner from "../Global/Spinner";

class CustomerProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      displaySessionModal: false,
      selectedSession: {
        periods: [{}],
        exercises: [{}]
      },
      isNewSession: false,
      index: 0,
      originalIndex: 0
    };
  }

  render() {
    const { program, editable, onSubmitSession } = this.props;
    const {
      displaySessionModal,
      selectedSession,
      index,
      isNewSession,
      originalIndex
    } = this.state;

    return (
      <div>
        {program ? (
          <div>
            {this.renderProgram(program)}
            <SessionModal
              displaySessionModal={displaySessionModal}
              onSubmitSession={(session, i) =>
                onSubmitSession(session, i, originalIndex, isNewSession)
              }
              selectedSession={selectedSession}
              sessions={program.sessions || program.program.sessions}
              index={index}
              onCancel={() => this.setState({ displaySessionModal: false })}
              onChangeSession={this.handleChangeSession}
              onChangeSessionPeriods={this.handleChangeSessionPeriods}
              onAddPeriod={this.handleAddPeriod}
              onDeletePeriod={this.handleDeletePeriod}
              onChangeIndex={this.handleChangeIndex}
              onChangeSessionExercises={this.handleChangeSessionExercises}
              onAddExercise={this.handleAddExercise}
              onDeleteExercise={this.handleDeleteExercise}
              isNewSession={isNewSession}
            />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default CustomerProgress;
