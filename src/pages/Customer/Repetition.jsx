import React from "react";
import { Card, Button, Steps, Modal, Icon, Result, Col, Row } from "antd";
import "./Repetition.css";

const { Meta } = Card;

const { Step } = Steps;

const steps = [
  {
    title: "Exercise 1",
    content: (
      <img
        className={"step-img"}
        alt={"Loading"}
        src={
"https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F71b65044-ce1d-11e7-b1ec-8503a5941b97.jpg?crop=4476%2C2518%2C248%2C647&resize=685"        }
      />
    )
  },
  {
    title: "Exercise 2",
    content: (
      <img
        className={"step-img"}
        alt={"Loading"}
        src={
"http://www.mariadicroce.com/wp-content/uploads/2015/02/workout-at-home.jpg"        }
      />
    )
  },
  {
    title: "Exercise 3",
    content: (
      <img
        className={"step-img"}
        alt={"Loading"}
        src={
"https://d50b62f6164e0c4a0279-11570554cb5edae3285603e6ab25c978.ssl.cf5.rackcdn.com/html_body_blocks/images/000/005/515/original/working_out_at_home_1024x1024_enf0625e2c742e37a36e857417ca769d0f.jpg?1508904721"        }
      />
    )
  },
  {
    title: "Exercise 4",
    content: (
      <img
        className={"step-img"}
        alt={"Loading"}
        src={
"http://www.yaduki.com/ss/wp-content/uploads/2018/01/Yoga-Indoors-Downward-Facing-Dog-Pose-532343318_1258x838.jpeg"        }
      />
    )
  },
  {
    title: "Exercise 5",
    content: (
      <img
        className={"step-img"}
        alt={"Loading"}
        src={
"https://s3-ap-northeast-1.amazonaws.com/bhive-jp/media/yogaroom/article/4821/shutterstock_713195971.jpg"        }
      />
    )
  }
];

class Repetition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startCardShow: true,
      currentStep: 0,

      modalVisible: false,
      btnEasyLoading: false,
      btnProperLoading: false,
      btnDiffiLoading: false,
    };
    //this.startOnClick = this.startOnClick.bind(this);
  }

  startOnClick(event) {
    console.log(this);
    this.setState({ startCardShow: false });
  }

  nextStep() {
    const current = this.state.currentStep + 1;
    this.setState({ currentStep: current, btnEasyLoading: false, btnProperLoading: false, btnDiffiLoading: false });
    this.setState({btnEasyLoading: false});
  }

  showResultModal() {
    this.setState({modalVisible: true});
  }

  handleBtn () {
    setTimeout(()=>{
      this.setState({modalVisible: false});
      Modal.destroyAll();
      this.nextStep();
    }, 500);
  }
  handleEasyBtn () {
    this.setState({btnEasyLoading: true});
    this.handleBtn();
  }
  handleProperBtn(){
    this.setState({btnProperLoading: true});
    this.handleBtn();
  }
  handleDiffiBtn(){
    this.setState({btnDiffiLoading: true});
    this.handleBtn();
  }

  prevStep() {
    const current = this.state.currentStep - 1;
    this.setState({ currentStep: current });
  }

  handleDoneBtn(){
    this.props.history.push('/repetitionDone');
  }

  render() {

    const startCard = (
      <Row>
      <Col span={24}>
      <Card
        style={{  }}
        cover={
          <img
            src={
              "https://contents.mediadecathlon.com/p1357221/640x0/1000pt1000/2000xcr1500/domyos-cardio-femme.jpg?k=965dd8b4c1b0d95d474cf5b57d1e7663"
            }
          />
        }
      >
        <Meta title="Program 01" description="This is the description" />
        <Button block className="btn-start" onClick={() => this.startOnClick()}>
          START
        </Button>
      </Card></Col></Row>
    );

    const modalVisible = this.state.modalVisible;
    //const modalWidth = "300px";
    const modalTitle = "How was this exercise?";

    const stepDiv = (
      <div>

        <Modal title={modalTitle}  visible={modalVisible} closable={false} maskClosable={false} footer={null} >
          <p className={"modal-content"}>
            <Button onClick={()=> this.handleEasyBtn()} className={"feedbackBtn"} loading={this.state.btnEasyLoading}>
              <Icon type="check-circle" theme="twoTone" twoToneColor="#81E5D9" />
              Easy
            </Button>
            <Button onClick={()=> this.handleProperBtn()} className={"feedbackBtn"} loading={this.state.btnProperLoading}>
              <Icon type="heart" theme="twoTone" twoToneColor="#F199CB" /> Proper
            </Button>
            <Button onClick={()=> this.handleDiffiBtn()} className={"feedbackBtn"} loading={this.state.btnDiffiLoading}>
              <Icon type="rocket" theme="twoTone" twoToneColor="#8E2E37"/>Hard
            </Button>
          </p>
        </Modal>

        <Row>
          <Col span={24}>
        <div>
        <Steps current={this.state.currentStep}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          {steps[this.state.currentStep].content}
          -------- Exercise Description --------
        </div>
        <div className="steps-action">
          {this.state.currentStep < steps.length - 1 && (
            <Button type="primary" onClick={() => this.showResultModal()}>
              Done, Next!
            </Button>
          )}
          {this.state.currentStep === steps.length - 1 && (
            <Button
              type="primary"
              //onClick={() => message.success("Processing complete!")}
              onClick={() => this.handleDoneBtn()}
            >
              Done
            </Button>
          )}
          {this.state.currentStep > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prevStep()}>
              Previous
            </Button>
          )} </div>
        </div></Col></Row>
      </div>
    );

    if (this.state.startCardShow) {
      return startCard;
    } else {
      // else ： hide startCard
      return stepDiv;
    }
  }
}

export default Repetition;
