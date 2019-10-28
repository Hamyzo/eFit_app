import React from "react";
import { notification, Icon } from "antd";
import "./Customer.css";

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          message: "Reminder",
          description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
          type: "bulb",
          color: "#52c41a"
        },
        {
          message: "Focus Session",
          description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
          type: "heart",
          color: "#1890ff"
        },
        {
          message: "Reminder",
          description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
          type: "bulb",
          color: "#1890ff"
        },
        {
          message: "Reminder",
          description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
          type: "bulb",
          color: "#faad14"
        },
        {
          message: "Notification 4",
          description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
          type: "bulb",
          color: "#1890ff"
        },
        {
          message: "Focus Session",
          description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
          type: "heart",
          color: "#f5222d"
        },
        {
          message: "Notification 5",
          description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
          type: "heart",
          color: "#1890ff"
        }
      ]
    };
  }

  componentDidMount = () => {
    const { notifications } = this.state;
    notifications.forEach((notif, i) => {
      setTimeout(() => {
        notification.open({
          message: notif.message,
          description: notif.description,
          style: {
            width: "100%",
            marginLeft: "8px"
          },
          key: `${i}`,
          top: 80,
          duration: 0,
          icon: <Icon type={notif.type} style={{ color: notif.color }} />
        });
      }, i * 100);
    });
  };

  render() {
    return <div>{null}</div>;
  }
}

export default Notification;
