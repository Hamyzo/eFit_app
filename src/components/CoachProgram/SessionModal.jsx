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

class SessionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSession: {
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

  render() {
    const {
      displaySessionModal,
      form,
      sessions,
      selectedSession,
      index,
      isNewSession
    } = this.props;
    const { exercises } = this.state;
    console.log("modal", selectedSession);
    return (
      <div>
        <Modal
          visible={displaySessionModal}
          onOk={() => this.props.onSubmitSession(selectedSession, index)}
          onCancel={this.props.onCancel}
          title={isNewSession ? "Add a new session" : "Edit session"}
          footer={[
            <Button key="back" onClick={this.props.onCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                this.props.onSubmitSession(selectedSession, index);
                this.props.onCancel();
              }}
            >
              Submit
            </Button>
          ]}
        >
          <Form style={{ padding: "20px" }}>
            <Row type="flex" justify="space-between" align="middle">
              <Col span={11}>
                <Form.Item label="Name">
                  {form.getFieldDecorator("name", {
                    initialValue: selectedSession.name,
                    rules: [
                      {
                        required: false,
                        message: "Please enter the selectedSession name"
                      }
                    ]
                  })(
                    <Input
                      name="name"
                      onChange={e =>
                        this.props.onChangeSession(
                          e.target.name,
                          e.target.value
                        )
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item label="Position">
                  {form.getFieldDecorator("position", {
                    initialValue: index,
                    rules: [
                      {
                        required: true,
                        message:
                          "Please choose a position in which to insert the selectedSession"
                      }
                    ]
                  })(
                    <Select
                      name="position"
                      onChange={value => this.props.onChangeIndex(value)}
                    >
                      {sessions.map((selectedSession, i) => (
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
                    initialValue: selectedSession.description,
                    rules: [
                      {
                        required: false,
                        message: "Please enter the selectedSession description"
                      }
                    ]
                  })(
                    <Input.TextArea
                      name="description"
                      onChange={e =>
                        this.props.onChangeSession(
                          e.target.name,
                          e.target.value
                        )
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Row>
                <h3>Periods</h3>
                <Button icon="plus" onClick={this.props.onAddPeriod}>
                  Add period
                </Button>
              </Row>
              {selectedSession.periods
                ? selectedSession.periods.map((period, i) => (
                    <Row type="flex" justify="space-between" align="middle">
                      <Col span={9}>
                        <Form.Item label="Number of days" key={i}>
                          {form.getFieldDecorator(`nb_days${i}`, {
                            initialValue: period.nb_days,
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
                                this.props.onChangeSessionPeriods(
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
                            initialValue: period.nb_repetitions,
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
                                this.props.onChangeSessionPeriods(
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
                          onClick={() => this.props.onDeletePeriod(i)}
                        />
                      </Col>
                    </Row>
                  ))
                : null}
            </Row>
            <Row>
              <h3>Exercises</h3>
              <Button icon="plus" onClick={this.props.onAddExercise}>
                Add exercise
              </Button>
              {selectedSession.exercises
                ? selectedSession.exercises.map((exercise, i) => (
                    <Row type="flex" justify="space-between" align="middle">
                      <Col span={8}>
                        <Form.Item label="Exercise" key={i}>
                          {form.getFieldDecorator(`exercise${i}`, {
                            initialValue: exercise.exercise
                              ? exercise.exercise._id || exercise.exercise
                              : exercise.exercise,
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
                                this.props.onChangeSessionExercises(
                                  i,
                                  "exercise",
                                  value
                                )
                              }
                            >
                              {exercises.map(exercise => (
                                <Select.Option key={exercise._id}>
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
                            initialValue: exercise.reps,
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
                                this.props.onChangeSessionExercises(
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
                            initialValue: exercise.reps,
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
                                this.props.onChangeSessionExercises(
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
                          onClick={() => this.props.onDeleteExercise(i)}
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

export default Form.create()(SessionModal);
