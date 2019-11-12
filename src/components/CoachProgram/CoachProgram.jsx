import React from "react";
import * as apiServices from "../../apiServices";
import DisplayProgram from "./DisplayProgram";
import CustomerProgress from "./CustomerProgress";
import { Row, Col, Avatar } from "antd";
import Spinner from "../Global/Spinner";
class CoachProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null
    };
  }

  componentDidMount = async () => {
    this.getProgram();
  };

  getProgram = async () => {
    try {
      const { match } = this.props;
      const program = await apiServices.getOne(
        "customerPrograms",
        match ? match.params.customerProgramId : "5da1f67ccf53670572677651",
        "populate=program,customer,focus_sessions,exercises.exercise,focus_sessions.exercises"
      );
      console.log("Program:", program);
      this.setState({ program });
    } catch (e) {}
  };

  handleSubmitSession = async (session, index, originalIndex, isNewSession) => {
    try {
      const { program } = this.state;
      if (!isNewSession) {
        program.sessions.splice(originalIndex, 1);
      }
      program.sessions.splice(index, 0, session);

      await apiServices.patchOne("customerPrograms", program._id, {
        sessions: program.sessions
      });
      this.getProgram();
    } catch (e) {
      console.log(e);
    }
  };

  renderBanner = customer => (
    <div className="customer_banner">
      <Row>
        <Col span={2}>
          <Avatar className="profilePic" src={customer.img} size={108} />
        </Col>
        <Col span={4}>
          <h1 className="customerName">
            {customer.first_name} {customer.last_name}
          </h1>
        </Col>
        <Col className="lastWorkoutCol" span={4}>
          <div className="lastWorkoutDiv">
            <img
            alt=""
            className="lastWorkout"
            src="/assets/images/calendarcolor.svg"/>
            <p className="lastWorkoutp">Last workout: 12/11</p>
            <p className="lastWorkoutDivp">(2 days ago)</p>
          </div>
        </Col>
      </Row>
    </div>
  );

  renderCustomerProgress = program => {
    if(program.focus_sessions == null || program.focus_sessions.length == 0){
     return ("");
    }

      else {
      return(<CustomerProgress
          program={program}
          editable
          isCustomerProgram
        />);
    }

  }


  render() {
    const { program } = this.state;

    return (
      <div>
        {program ? (
          <div>
            {this.renderBanner(program.customer)}
            <Row>
              <Col span={15}>
                <DisplayProgram
                  program={program}
                  editable
                  isCustomerProgram
                  onSubmitSession={this.handleSubmitSession}
                />
              </Col>
              <Col span={8}>
                {this.renderCustomerProgress(program)}
              </Col>
            </Row>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default CoachProgram;
