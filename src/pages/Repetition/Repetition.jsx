import React from "react";
import { Card, Button, Steps, message } from "antd";
import "./Repetition.css";
const { Meta } = Card;

const { Step } = Steps;

const steps = [
  {
    title: "Exercise 1",
    content: (
      <img
        alt={"Loading"}
        src={
          "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Fbien-etre.2Fsport-fitness.2Finsanity-workout-programme-fitness-41369.2F14622169-1-fre-FR.2Finsanity-workout-le-programme-fitness-extreme-qui-va-nous-faire-fondre.2Ejpg/748x372/quality/90/crop-from/center/insanity-workout-le-programme-fitness-extreme-qui-va-nous-faire-fondre.jpeg"
        }
      />
    )
  },
  {
    title: "Exercise 2",
    content: (
      <img
        alt={"Loading"}
        src={
          "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Fbien-etre.2Fsport-fitness.2Finsanity-workout-programme-fitness-41369.2F14622169-1-fre-FR.2Finsanity-workout-le-programme-fitness-extreme-qui-va-nous-faire-fondre.2Ejpg/748x372/quality/90/crop-from/center/insanity-workout-le-programme-fitness-extreme-qui-va-nous-faire-fondre.jpeg"
        }
      />
    )
  },
  {
    title: "Exercise 3",
    content: (
      <img
        alt={"Loading"}
        src={
          "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Fbien-etre.2Fsport-fitness.2Finsanity-workout-programme-fitness-41369.2F14622169-1-fre-FR.2Finsanity-workout-le-programme-fitness-extreme-qui-va-nous-faire-fondre.2Ejpg/748x372/quality/90/crop-from/center/insanity-workout-le-programme-fitness-extreme-qui-va-nous-faire-fondre.jpeg"
        }
      />
    )
  },
  {
    title: "Exercise 4",
    content: (
      <img
        alt={"Loading"}
        src={
          "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Fbien-etre.2Fsport-fitness.2Finsanity-workout-programme-fitness-41369.2F14622169-1-fre-FR.2Finsanity-workout-le-programme-fitness-extreme-qui-va-nous-faire-fondre.2Ejpg/748x372/quality/90/crop-from/center/insanity-workout-le-programme-fitness-extreme-qui-va-nous-faire-fondre.jpeg"
        }
      />
    )
  },
  {
    title: "Exercise 5",
    content: (
      <img
        alt={"Loading"}
        src={
          "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Fbien-etre.2Fsport-fitness.2Finsanity-workout-programme-fitness-41369.2F14622169-1-fre-FR.2Finsanity-workout-le-programme-fitness-extreme-qui-va-nous-faire-fondre.2Ejpg/748x372/quality/90/crop-from/center/insanity-workout-le-programme-fitness-extreme-qui-va-nous-faire-fondre.jpeg"
        }
      />
    )
  }
];

class Repetition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startCardShow: true,
      currentStep: 0
    };
    //this.startOnClick = this.startOnClick.bind(this);
  }

  startOnClick(event) {
    console.log(this);
    this.setState({ startCardShow: false });
  }

  nextStep() {
    const current = this.state.currentStep + 1;
    this.setState({ currentStep: current });
  }

  prevStep() {
    const current = this.state.currentStep - 1;
    this.setState({ currentStep: current });
  }

  render() {
    const startCard = (
      <Card
        style={{ width: 300 }}
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
      </Card>
    );

    const stepDiv = (
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
            <Button type="primary" onClick={() => this.nextStep()}>
              Done, Next!
            </Button>
          )}
          {this.state.currentStep === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {this.state.currentStep > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prevStep()}>
              Previous
            </Button>
          )}
        </div>
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
