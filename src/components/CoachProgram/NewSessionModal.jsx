import React from "react";
import {
  Collapse,
  Table,
  Row,
  Col,
  Button,
  Icon,
  Popover,
  Spin,
  Modal,
  Input,
  Form,
  Select
} from "antd";
import "./CoachProgram.css";

import * as apiServices from "../../apiServices";

class NewSessionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSession: {
        periods: [{}],
        exercises: [{}]
      },
      exercises: [],
      index: 0
    };
  }

  componentDidMount = async () => {
    try {
      const exercises = await apiServices.get("exercises", "");
      this.setState({ exercises });
    } catch (e) {
      console.log(e);
    }
  };

  handleChangeSession = (name, value) => {
    this.setState({
      newSession: {
        ...this.state.newSession,
        [name]: value
      }
    });
  };

  handleChangeSessionPeriods = (index, name, value) => {
    console.log(index);
    const { periods } = this.state.newSession;
    periods[index] = {
      ...this.state.newSession.periods[index],
      [name]: value
    };
    this.setState({
      newSession: {
        ...this.state.newSession,
        periods
      }
    });
  };

  addPeriod = () => {
    let { periods } = this.state.newSession;
    if (periods) {
      periods.push({});
    } else {
      periods = [{}];
    }
    console.log(periods);
    this.setState({
      newSession: {
        ...this.state.newSession,
        periods
      }
    });
  };

  deletePeriod = i => {
    const { periods } = this.state.newSession;
    periods.splice(i, 1);

    console.log(i, periods);
    this.setState({
      newSession: {
        ...this.state.newSession,
        periods
      }
    });
  };

  handleChangeSessionExercises = (index, name, value) => {
    console.log(index);
    const { exercises } = this.state.newSession;
    exercises[index] = {
      ...this.state.newSession.exercises[index],
      [name]: value
    };
    this.setState({
      newSession: {
        ...this.state.newSession,
        exercises
      }
    });
  };

  addExercise = () => {
    let { exercises } = this.state.newSession;
    if (exercises) {
      exercises.push({});
    } else {
      exercises = [{}];
    }
    console.log(exercises);
    this.setState({
      newSession: {
        ...this.state.newSession,
        exercises
      }
    });
  };

  deleteExercise = i => {
    const { exercises } = this.state.newSession;
    exercises.splice(i, 1);

    console.log(i, exercises);
    this.setState({
      newSession: {
        ...this.state.newSession,
        exercises
      }
    });
  };

  render() {
    const { displayAddSession, form, sessions } = this.props;
    const { newSession, index, exercises } = this.state;
    return (
      <div>
        <Modal
          visible={displayAddSession}
          onOk={() => this.props.onSubmitNewSession(newSession)}
          onCancel={this.props.onCancel}
          title="Add a new session"
          footer={[
            <Button key="back" onClick={this.props.onCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => this.props.onSubmitNewSession(newSession, index)}
            >
              Add session
            </Button>
          ]}
        >
          <Form style={{ padding: "20px" }}>
            <Row type="flex" justify="space-between" align="middle">
              <Col span={11}>
                <Form.Item label="Name">
                  {form.getFieldDecorator("name", {
                    rules: [
                      {
                        required: false,
                        message: "Please enter the session name"
                      }
                    ]
                  })(
                    <Input
                      name="name"
                      onChange={e =>
                        this.handleChangeSession(e.target.name, e.target.value)
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item label="Position">
                  {form.getFieldDecorator("position", {
                    rules: [
                      {
                        required: true,
                        message:
                          "Please choose a position in which to insert the session"
                      }
                    ]
                  })(
                    <Select
                      name="position"
                      onChange={value => this.setState({ index: value })}
                    >
                      {sessions.map((session, i) => (
                        <Select.Option value={i}>{i + 1}</Select.Option>
                      ))}
                      <Select.Option value={sessions.length}>
                        last
                      </Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="space-between" align="middle">
              <Col span={24}>
                <Form.Item label="Description">
                  {form.getFieldDecorator("description", {
                    rules: [
                      {
                        required: false,
                        message: "Please enter the session description"
                      }
                    ]
                  })(
                    <Input.TextArea
                      name="description"
                      onChange={e =>
                        this.handleChangeSession(e.target.name, e.target.value)
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Row>
                <h3>Periods</h3>
                <Button icon="plus" onClick={this.addPeriod}>
                  Add period
                </Button>
              </Row>
              {newSession.periods
                ? newSession.periods.map((period, i) => (
                    <Row type="flex" justify="space-between" align="middle">
                      <Col span={9}>
                        <Form.Item label="Number of days" key={i}>
                          {form.getFieldDecorator(`nb_days${i}`, {
                            rules: [
                              {
                                required: true,
                                message: "This field is required"
                              }
                            ]
                          })(
                            <Input
                              name={`nb_days${i}`}
                              onChange={e =>
                                this.handleChangeSessionPeriods(
                                  i,
                                  "nb_days",
                                  e.target.value
                                )
                              }
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={9}>
                        <Form.Item label="Number of repetitions" key={i}>
                          {form.getFieldDecorator(`nb_repetitions${i}`, {
                            rules: [
                              {
                                required: true,
                                message: "This field is required"
                              }
                            ]
                          })(
                            <Input
                              name={`nb_repetitions${i}`}
                              onChange={e =>
                                this.handleChangeSessionPeriods(
                                  i,
                                  "nb_repetitions",
                                  e.target.value
                                )
                              }
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button
                          shape="circle"
                          icon="delete"
                          type="danger"
                          ghost
                          onClick={() => this.deletePeriod(i)}
                        />
                      </Col>
                    </Row>
                  ))
                : null}
            </Row>
            <Row>
              <h3>Exercises</h3>
              <Button icon="plus" onClick={this.addExercise}>
                Add exercise
              </Button>
              {newSession.exercises
                ? newSession.exercises.map((exercise, i) => (
                    <Row type="flex" justify="space-between" align="middle">
                      <Col span={8}>
                        <Form.Item label="Exercise" key={i}>
                          {form.getFieldDecorator(`exercise${i}`, {
                            rules: [
                              {
                                required: true,
                                message: "This field is required"
                              }
                            ]
                          })(
                            <Select
                              name={`exercise${i}`}
                              onChange={value =>
                                this.handleChangeSessionExercises(
                                  i,
                                  "exercise",
                                  value
                                )
                              }
                            >
                              {exercises.map(exercise => (
                                <Select.Option
                                  value={exercise._id}
                                  key={exercise._id}
                                >
                                  {exercise.name}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item label="Reps" key={i}>
                          {form.getFieldDecorator(`reps${i}`, {
                            rules: [
                              {
                                required: true,
                                message: "This field is required"
                              }
                            ]
                          })(
                            <Input
                              name={`reps${i}`}
                              onChange={e =>
                                this.handleChangeSessionExercises(
                                  i,
                                  "reps",
                                  e.target.value
                                )
                              }
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item label="Sets" key={i}>
                          {form.getFieldDecorator(`sets${i}`, {
                            rules: [
                              {
                                required: true,
                                message: "This field is required"
                              }
                            ]
                          })(
                            <Input
                              name={`sets${i}`}
                              onChange={e =>
                                this.handleChangeSessionExercises(
                                  i,
                                  "sets",
                                  e.target.value
                                )
                              }
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button
                          shape="circle"
                          icon="delete"
                          type="danger"
                          ghost
                          onClick={() => this.deleteExercise(i)}
                        />
                      </Col>
                    </Row>
                  ))
                : null}
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(NewSessionModal);
