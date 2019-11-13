import React from "react";
import {
  Card,
  Button,
  Steps,
  Modal,
  Result,
  Col,
  Row,
  Avatar,
  Tabs,
  Icon,
  Timeline,
  Collapse
} from "antd";
import { Icon as FaIcon } from "react-fa";
import "./Repetition.css";

import RepetitionDone from "./RepetitionDone";
import * as apiServices from "../../apiServices";
import * as programScripts from "../../utils/programScripts";
import Spinner from "../Global/Spinner";

const { Meta } = Card;
const { TabPane } = Tabs;
const { Step } = Steps;

class Repetition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null,
      startCardShow: 1,
      currentStep: 0,
      currentSession: null,
      sessionIndex: null,
      currentPeriod: null,
      currentRepetition: null,
      currentPeriodInfo: null,
      modalVisible: false,
      btnEasyLoading: false,
      btnProperLoading: false,
      btnDiffiLoading: false,
      results: [],
      exercises: []
    };
    // this.startOnClick = this.startOnClick.bind(this);
  }

  render() {
    const {
      modalVisible,
      btnEasyLoading,
      btnProperLoading,
      btnDiffiLoading
    } = this.props;
    return (
      <Modal
        className="feedback-modal"
        title={"How was this exercise?"}
        visible={modalVisible}
        closable={false}
        maskClosable={false}
        footer={null}
      >
        <Row className="modal-content">
          <Col span={8} align="center">
            <Button
              onClick={() => this.handleResultsBtn("btnEasyLoading", 1)}
              className="feedbackBtn"
              loading={btnEasyLoading}
            >
              <Icon
                type="check-circle"
                theme="twoTone"
                twoToneColor="#81E5D9"
              />
              Easy
            </Button>
          </Col>
          <Col span={8} align="center">
            <Button
              onClick={() => this.handleResultsBtn("btnProperLoading", 0)}
              className="feedbackBtn"
              loading={btnProperLoading}
            >
              <Icon type="heart" theme="twoTone" twoToneColor="#F199CB" />{" "}
              Proper
            </Button>
          </Col>
          <Col span={8} align="center">
            <Button
              onClick={() => this.handleResultsBtn("btnDiffiLoading", -1)}
              className="feedbackBtn"
              loading={btnDiffiLoading}
            >
              <Icon type="rocket" theme="twoTone" twoToneColor="#8E2E37" />
              Hard
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default Repetition;
