import React from "react";
import { Row, Col, Button, Modal, Input, Form, Select } from "antd";
import "./CoachProgram.css";

import * as apiServices from "../../apiServices";

class SessionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
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
      isNewSession,
      onSubmitSession,
      onCancel,
      onChangeSession,
      onChangeIndex,
      onAddPeriod,
      onChangeSessionPeriods,
      onDeletePeriod,
      onAddExercise,
      onChangeSessionExercises,
      onDeleteExercise
    } = this.props;
    const { exercises } = this.state;
    console.log("modal", selectedSession);
    return (
      <div>
        <Modal
          visible={displaySessionModal}
          onOk={() => onSubmitSession(selectedSession, index)}
          onCancel={onCancel}
          title={isNewSession ? "Add a new session" : "Edit session"}
          width={700}
          footer={[
            <Button key="back" onClick={onCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                onSubmitSession(selectedSession, index);
                onCancel();
              }}
            >
              Submit
            </Button>
          ]}
        >
          <Form style={{ padding: "20px" }}>
            <Row type="flex" justify="space-between" align="middle">
              <Col span={15}>
                <Form.Item label="Name">
                  {form.getFieldDecorator("name", {
                    initialValue: selectedSession.name,
                    rules: [
                      {
                        required: true,
                        message: "Please enter the selectedSession name"
                      }
                    ]
                  })(
                    <Input
                      name="name"
                      onChange={e =>
                        onChangeSession(e.target.name, e.target.value)
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
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
                      onChange={value => onChangeIndex(value)}
                    >
                      {sessions.map((session, i) => (
                        <Select.Option value={i} key={i}>
                          {i + 1}
                        </Select.Option>
                      ))}
                      {isNewSession ? (
                        <Select.Option value={sessions.length}>
                          last
                        </Select.Option>
                      ) : null}
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
                        onChangeSession(e.target.name, e.target.value)
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Row>
                <h3>Periods</h3>
                <Button icon="plus" onClick={onAddPeriod}>
                  Add period
                </Button>
              </Row>
              {selectedSession.periods ? (
                <Row>
                  {selectedSession.periods.map((period, i) => (
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
                                onChangeSessionPeriods(
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
                                onChangeSessionPeriods(
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
                          onClick={() => onDeletePeriod(i)}
                        />
                      </Col>
                    </Row>
                  ))}
                </Row>
              ) : null}
            </Row>
            <Row>
              <h3>Exercises</h3>
              <Button icon="plus" onClick={onAddExercise}>
                Add exercise
              </Button>
              {selectedSession.exercises
                ? selectedSession.exercises.map((exercise, i) => (
                    <Row
                      key={exercise._id}
                      type="flex"
                      justify="space-between"
                      align="middle"
                    >
                      <Col span={8}>
                        <Form.Item label="Exercise" key={`exercise${i}`}>
                          {form.getFieldDecorator(`exercise${i}`, {
                            initialValue: exercise.exercise
                              ? exercise.exercise.name || exercise.exercise
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
                                onChangeSessionExercises(
                                  i,
                                  "exercise",
                                  exercises.find(
                                    exerciseFind => exerciseFind._id === value
                                  )
                                )
                              }
                            >
                              {exercises.map(exerciseSelect => (
                                <Select.Option
                                  key={exerciseSelect._id}
                                  value={exerciseSelect._id}
                                >
                                  {exerciseSelect.name}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                      {exercise.exercise && exercise.exercise.timed ? (
                        <Col span={5}>
                          <Form.Item label="Time (secs)" key={exercise._id}>
                            {form.getFieldDecorator(`time${i}`, {
                              initialValue: exercise.time,
                              rules: [
                                {
                                  required: true,
                                  message: "This field is required"
                                }
                              ]
                            })(
                              <Input
                                name={`time${i}`}
                                onChange={e =>
                                  onChangeSessionExercises(
                                    i,
                                    "time",
                                    e.target.value
                                  )
                                }
                              />
                            )}
                          </Form.Item>
                        </Col>
                      ) : (
                        <Col span={10}>
                          <Col span={11}>
                            <Form.Item label="Reps" key={exercise._id}>
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
                                    onChangeSessionExercises(
                                      i,
                                      "reps",
                                      e.target.value
                                    )
                                  }
                                />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={11} offset={2}>
                            <Form.Item label="Sets" key={exercise._id}>
                              {form.getFieldDecorator(`sets${i}`, {
                                initialValue: exercise.sets,
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
                                    onChangeSessionExercises(
                                      i,
                                      "sets",
                                      e.target.value
                                    )
                                  }
                                />
                              )}
                            </Form.Item>
                          </Col>
                        </Col>
                      )}
                      <Col span={2}>
                        <Button
                          shape="circle"
                          icon="delete"
                          type="danger"
                          ghost
                          onClick={() => onDeleteExercise(i)}
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
