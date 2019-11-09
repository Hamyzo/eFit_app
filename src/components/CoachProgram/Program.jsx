import React from "react";
import * as apiServices from "../../apiServices";
import DisplayProgram from "./DisplayProgram";

class Program extends React.Component {
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
    const { match } = this.props;
    try {
      const program = await apiServices.getOne(
        "programs",
        match ? match.params.programId : "5da1f67ccf53670572677651",
        "populate=program"
      );
      console.log("Program", program);
      this.setState({ program });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { program } = this.state;

    return <DisplayProgram program={program} editable />;
  }
}

export default Program;
