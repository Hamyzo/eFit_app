import React from "react";
import { Icon, Col, Row, Avatar } from "antd";
import "./CoachMessaging.css";
import moment from "moment";
import socketIOClient from "socket.io-client";
import * as apiServices from "../../apiServices";
import Spinner from "../Global/Spinner";
import personal from "../../personal";
import * as Scroll from "react-scroll";

class CoachMessaging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      conversation: null,
      activeChat: false,
      chatIndex: null,
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
      let conversations = await apiServices.get(
        "conversations",
        `populate=customer,coach&${
          userType === "Coach" ? "coach" : "customer"
        }=${userId}`
      );

      conversations = conversations.sort((a, b) =>
        moment(a.messages[a.messages.length - 1].creation_date).isAfter(
          b.messages[b.messages.length - 1].creation_date
        )
          ? -1
          : 1
      );

      this.setState({
        conversations
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleChangeMessageInput = message => {
    this.setState({ message });
  };

  showConversationMessage = (conversation, index) => {
    this.setState({ activeChat: true, chatIndex: index, conversation });
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
      sender: "COACH",
      content: message
    };

    conversation.messages.push(newMessage);

    this.socket.emit("chat message", newMessage, conversation.customer._id);

    try {
      await apiServices.patchOne("conversations", _id, rest);
    } catch (e) {
      console.log(e);
    }

    this.handleChangeMessageInput("");
  };

  render() {
    const { conversations, conversation, activeChat, chatIndex } = this.state;
    console.log("conversations", conversations);
    return (
      <div>
        {conversations ? (
          <div className="container">
            <h3 className=" text-center">Messaging</h3>
            <div className="messaging">
              <div className="inbox_msg">
                <div className="inboxPeople">
                  <div className="headingSearch">
                    <div className="recentHeading">
                      <h4>Recent Chats</h4>
                    </div>
                    <div className="searchBar">
                      <div className="stylish-input-group">
                        <input
                          type="text"
                          className="search-bar"
                          placeholder="Search"
                        />
                        <span className="input-group-addon">
                          <button type="button">
                            {" "}
                            <i
                              className="fa fa-search"
                              aria-hidden="true"
                            ></i>{" "}
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="inbox_chat">
                    {conversations.map((conversation, index) => (
                      <Row
                        className={
                          activeChat && chatIndex === index
                            ? "chat_list active_chat "
                            : "chat_list "
                        }
                        onClick={() =>
                          this.showConversationMessage(conversation, index)
                        }
                      >
                        <div className="chat_people">
                          <Col span={3} className="chat_img">
                            <Avatar src={conversation.customer.img} size={55} />
                          </Col>
                          <Col span={21} className="chat_ib">
                            <h5>
                              {conversation.customer.first_name}{" "}
                              {conversation.customer.last_name}
                              <span className="chat_date">
                                {" "}
                                {moment(conversation.creation_date).format(
                                  "MMM DD"
                                )}
                              </span>
                            </h5>
                            <p>
                              {
                                conversation.messages[
                                  conversation.messages.length - 1
                                ].content
                              }
                            </p>
                          </Col>
                        </div>
                      </Row>
                    ))}
                  </div>
                </div>
                {conversation ? (
                  <div
                    className="messages"
                    style={{
                      display: "block"
                    }}
                  >
                    <div className="chatProfile">
                      <Row>
                        <Col span={3} align="left">
                          <img
                            src="https://ptetutorials.com/images/user-profile.png"
                            alt="sunil"
                            width="70"
                            height="70"
                          />
                        </Col>
                        <Col span={21}>
                          <h4 style={{ fontSize: "150%", marginTop: "5%" }}>
                            {" "}
                            {conversation.customer.first_name}{" "}
                            {conversation.customer.last_name}
                          </h4>
                        </Col>
                      </Row>
                    </div>
                    <div className="messageHistory">
                      {conversation.messages.map(message => (
                        <div
                          className={
                            message.sender === "COACH"
                              ? "sentMsg"
                              : "receivedMsg"
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
                    <div className="typeMessage">
                      <input
                        type="text"
                        className="write_msg"
                        placeholder="Type a message"
                        onChange={e =>
                          this.handleChangeMessageInput(e.target.value)
                        }
                        onKeyPress={this.enterPressed}
                        value={this.state.message}
                      />
                      <button
                        className="msg_send_btn"
                        type="button"
                        onClick={this.sendNewMessage}
                      >
                        <i
                          className="fa fa-paper-plane-o"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                ) : null}
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

export default CoachMessaging;
