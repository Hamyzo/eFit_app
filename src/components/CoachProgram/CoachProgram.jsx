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
      program: null,
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
        "populate=program,customer,focus_sessions"
      );
      console.log("Program", program);
      this.setState({ program });
    } catch (e) {
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

  renderBanner = customer => (
    <div className="customer_banner">
      <Row>
        <Col span={2}>
          <Avatar src={customer.img} size={64} />
        </Col>
        <Col span={4}>
          <h1>
            {customer.first_name} {customer.last_name}
          </h1>
          <p>Last workout: dd/mm</p>
        </Col>
        <Col offset={4} span={4}>
          <p> Currently on: Session 2, Period 1</p>
        </Col>
      </Row>
    </div>
  );

  render() {
    const { program } = this.state;

    return (
      <div>
        {program ? (
          <div>{this.renderBanner(program.customer)}</div>
        ) : (
          <Spinner />
        )}

        <Row>
          <Col span={15}>
            <DisplayProgram
              program={program}
              editable
              isCustomerProgram
              onSubmitSession={this.handleSubmitSession}
            />
          </Col>
          <Col>
            <CustomerProgress />
          </Col>
        </Row>
      </div>
    );
  }
}

export default CoachProgram;
