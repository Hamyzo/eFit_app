import React from "react";
import { Layout, Icon, Col, Row } from "antd";
import "./Messaging.css";

const { Header } = Layout;

class Messaging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          content: "Hello Coach",
          type: "sent"
        },
        {
          content: "Hi, how are you?",
          type: "received"
        },
        {
          content: "I'm doing very well!",
          type: "sent"
        }
      ]
    };
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="wrapperMessaging">
        <div className="headind_srch">
          <div className="recent_heading">
            <Row>
              <Col span={6} align="left">
                <img
                  src="https://ptetutorials.com/images/user-profile.png"
                  alt="sunil"
                />
              </Col>
              <Col span={16} offset={2}>
                <h4>Jean-David</h4>
              </Col>
            </Row>
          </div>
          <div className="srch_bar">
            <div className="stylish-input-group">
              <input type="text" className="search-bar" placeholder="Search" />
              <span className="input-group-addon">
                <button type="button">
                  {" "}
                  <i className="fa fa-search" aria-hidden="true" />{" "}
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="mesgs">
          <div className="msg_history">
            {messages.map(message => (
              <div className={`${message.type}_msg`}>
                <p>{message.content}</p>
                <span className="time_date"> 11:01 AM | June 9</span>
              </div>
            ))}
          </div>
          <div className="type_msg">
            <div className="input_msg_write">
              <input
                type="text"
                className="write_msg"
                placeholder="Type a message"
              />
              <button className="msg_send_btn" type="button">
                <i className="fa fa-paper-plane-o" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Messaging;
