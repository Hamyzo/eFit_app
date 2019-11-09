import React from "react";
import * as apiServices from "../../apiServices";
import DisplayProgram from "./DisplayProgram";

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
        "populate=program"
      );
      console.log("Program", program);
      this.setState({ program });
    } catch (e) {
      console.log(e);
    }
  };

  handleSubmitSession = async (session, index, originalIndex, isNewSession) => {
    console.log(`session ${index}`, session);
    try {
      const { program } = this.state;
      if (!isNewSession) {
        program.sessions.splice(originalIndex, 1);
      }
      program.sessions.splice(index, 0, session);
      console.log(program.sessions);
      await apiServices.patchOne("customerPrograms", program._id, {
        sessions: program.sessions
      });
      this.getProgram();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { program } = this.state;

    return (
      <DisplayProgram
        program={program}
        editable
        isCustomerProgram
        onSubmitSession={this.handleSubmitSession}
      />
    );
  }
}

export default CoachProgram;
