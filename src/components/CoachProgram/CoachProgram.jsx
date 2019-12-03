import React from "react";
import * as apiServices from "../../apiServices";
import DisplayProgram from "./DisplayProgram";
import CustomerProgress from "./CustomerProgress";
import { Row, Col, Avatar, Icon, Statistic, Button } from "antd";
import Spinner from "../Global/Spinner";
import * as programScripts from "../../utils/programScripts";

class CoachProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null
    };
  }

  componentDidMount = async () => {
    this.getCustomer();
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

  getCustomer = async () => {
    try {
      const { match } = this.props;
      const customer = await apiServices.getOne(
        "customers",
        match ? match.params.customerId : "5da078748a19ac1eab85fe14",
        "populate=current_program.program,current_program.focus_sessions,current_program.focus_sessions.exercises"
      );
      // console.log("CustomersList", customers);
      this.setState({ customer });
      console.log("CUSTOMER: ", customer);
    } catch (e) {
      console.log(e);
    }
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

  nextFocusSession = focusSessions => {
    var i = focusSessions.length - 1;
    if (
      focusSessions[i].results != null ||
      focusSessions[i].results.length == 0
    ) {
      return "N/A";
    } else {
      return programScripts.formatDate(focusSessions[i].due_date);
    }
  };

  renderBanner = customer => (
    <div className="customer_banner">
      <Row>
        <Col span={2}>
          <Avatar className="profilePic" src={customer.img} size={108} />
        </Col>
        <Col span={4} offset={1}>
          <h1 className="customerName">
            {customer.first_name} {customer.last_name}
          </h1>
        </Col>
        <Col className="lastWorkoutCol" span={3}>
          <div className="lastWorkoutDiv">
            <Statistic
              title="Last Workout"
              value={programScripts.formatDate(
                programScripts.lastWorkout(customer)
              )}
              prefix={<Icon type="clock-circle" />}
            />
          </div>
        </Col>
        <Col className="lastWorkoutCol" span={3}>
          <div className="lastWorkoutDiv">
            <Statistic
              title="Next Appointment"
              value={"13 Nov"}
              prefix={<Icon type="calendar" />}
            />
          </div>
        </Col>
        <Col className="lastWorkoutCol" span={3}>
          <div className="lastWorkoutDiv">
            <Statistic
              title="Next Focus Session"
              value={this.nextFocusSession(
                customer.current_program.focus_sessions
              )}
              prefix={<Icon type="calendar" />}
            />
          </div>
        </Col>
        <Col span={3}>
          <div className="bannerButtons">
            <Button className="bannerButton" shape="circle" icon="message" />
            <Button className="bannerButton" shape="circle" icon="setting" />
          </div>
        </Col>
      </Row>
    </div>
  );

  renderCustomerProgress = program => {
    if (
      program.focus_sessions == null ||
      program.focus_sessions.length === 0 ||
      program.focus_sessions[0].results == null ||
      program.focus_sessions[0].results.length === 0
    ) {
      return "";
    } else {
      return <CustomerProgress program={program} editable isCustomerProgram />;
    }
  };

  render() {
    const { customer } = this.state;
    console.log(customer);

    /* const showProgress = program
      ? !(
          program.focus_sessions == null ||
          program.focus_sessions.length === 0 ||
          program.focus_sessions[0].results == null ||
          program.focus_sessions[0].results.length === 0
        )
      : null;*/
    return (
      <div>
        {customer ? (
          <div>
            {this.renderBanner(customer)}
            <Row>
              <Col span={13}>
                {customer.current_program ? (
                  <div>
                    <DisplayProgram
                      program={customer.current_program}
                      editable
                      isCustomerProgram
                      onSubmitSession={this.handleSubmitSession}
                    />
                  </div>
                ) : (
                  <Spinner />
                )}
              </Col>
              {customer.current_program ? (
                <Col span={11}>
                  {console.log("JJJJJJ,", customer.current_program)}
                  {this.renderCustomerProgress(customer.current_program)}
                </Col>
              ) : null}
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
