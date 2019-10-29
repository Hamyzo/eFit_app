import React from "react";
import * as apiServices from "../../apiServices";
import DisplayProgram from "./DisplayProgram";

class CustomerProgram extends React.Component {
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

  render() {
    const { program } = this.state;

    return <DisplayProgram program={program} editable={true} />;
  }
}

export default CustomerProgram;
