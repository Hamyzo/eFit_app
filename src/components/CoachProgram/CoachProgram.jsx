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

  getProgram = async _ => {
    try {
      const program = await apiServices.getOne(
        "customerPrograms",
        this.props.match
          ? this.props.match.params.customerProgramId
          : "5da1f67ccf53670572677651",
        "populate=program"
      );
      console.log("Program", program);
      this.setState({ program });
    } catch (e) {
      console.log(e);
    }
  };

  handleSubmitNewSession = async (session, index) => {
    console.log(`session ${index}`, session);
    try {
      const { program } = this.state;
      program.sessions.splice(index, 0, session);
      console.log(program.sessions);
      await apiServices.patchOne("customerPrograms", program._id, {
        sessions: program.sessions
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { program } = this.state;

    return (
      <DisplayProgram
        program={program}
        editable={true}
        onSubmitNewSession={this.handleSubmitNewSession}
      />
    );
  }
}

export default CoachProgram;
