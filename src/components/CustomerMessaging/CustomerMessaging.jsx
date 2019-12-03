import React from "react";
import { Icon, Col, Row } from "antd";
import "./CustomerMessaging.css";
import moment from "moment";
import socketIOClient from "socket.io-client";
import * as apiServices from "../../apiServices";
import Spinner from "../Global/Spinner";
import personal from "../../personal";

class CustomerMessaging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: null,
      userType: sessionStorage.getItem("userType"),
      userId: sessionStorage.getItem("userId"),
      message: null
    };
  }

  socket = socketIOClient(
    `${personal.api_url}?userId=${sessionStorage.getItem("userId")}`
  );

  componentDidMount = async () => {
    try {
      // eslint-disable-next-line react/destructuring-assignment,no-undef
      this.connect(sessionStorage.getItem("userId"));
      this.getConversations();
    } catch (e) {
      console.log(e);
    }
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  connect = userId => {
    console.log("userId", userId);
    this.socket.on(`chat message`, message => {
      const { conversation } = this.state;
      console.log("message", message);
      conversation.messages.push(message);
      this.setState(conversation);
    });
  };

  getConversations = async () => {
    const { userType, userId } = this.state;
    console.log("userType", userType);
    try {
      const conversations = await apiServices.get(
        "conversations",
        `populate=customer,coach&${
          userType === "Coach" ? "coach" : "customer"
        }=${userId}&sort=-_id`
      );

      this.setState({
        conversation: conversations[0]
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleChangeMessageInput = message => {
    this.setState({ message });
  };

  enterPressed = event => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      this.sendNewMessage();
    }
  };

  sendNewMessage = async () => {
    const { message, conversation } = this.state;

    const { _id, ...rest } = conversation;
    const newMessage = {
      sender: "CUSTOMER",
      content: message
    };

    conversation.messages.push(newMessage);

    this.socket.emit("chat message", newMessage, conversation.coach._id);

    try {
      await apiServices.patchOne("conversations", _id, rest);
    } catch (e) {
      console.log(e);
    }

    this.handleChangeMessageInput("");
  };

  render() {
    const { conversation } = this.state;
    console.log("conversations", conversation);
    return (
      <div>
        {conversation ? (
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
                    <h4 style={{ fontSize: "150%", marginTop: "5%" }}>
                      {conversation.coach.first_name}{" "}
                      {conversation.coach.last_name}
                    </h4>
                  </Col>
                </Row>
              </div>
              <div className="srch_bar">
                <div className="stylish-input-group">
                  {/* <input type="text" className="search-bar" placeholder="Search"  />
              <span className="input-group-addon">
                <button type="button">
                  {" "}
                  <i className="fa fa-search" aria-hidden="true" />{" "}
                </button>
              </span> */}
                </div>
              </div>
            </div>
            <div className="mesgs">
              <div className="msg_history">
                {conversation.messages.map(message => (
                  <div
                    className={
                      message.sender === "CUSTOMER"
                        ? "sent_msg"
                        : "received_msg"
                    }
                  >
                    <p>{message.content}</p>
                    <span className="time_date">
                      {moment(message.creation_date).format("HH:mm A")} |{" "}
                      {moment(message.creation_date).format("MMM DD")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  type="text"
                  className="write_msg"
                  placeholder="Type a message"
                  onChange={e => this.handleChangeMessageInput(e.target.value)}
                  onKeyPress={this.enterPressed}
                  value={this.state.message}
                />
                <button
                  className="msg_send_btn"
                  type="button"
                  onClick={this.sendNewMessage}
                >
                  <i className="fa fa-paper-plane-o" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default CustomerMessaging;
