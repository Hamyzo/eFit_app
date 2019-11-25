import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { Layout, Icon, Col, Badge, Drawer, Card, Row } from "antd";
import * as apiServices from "../../apiServices";
import notificationIconAndName from "../../utils/notifications";
import windowSize from "react-window-size";

const { Header } = Layout;
const { Meta } = Card;
class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      notifications: [],
      userType: sessionStorage.getItem("userType"),
      userId: sessionStorage.getItem("userId")
    };
  }

  componentDidMount() {
    this.getNotifications();
  }

  showDrawer = notifications => {
    const data = {
      seen: true
    };

    try {
      notifications.forEach(
        async notification =>
          await apiServices.patchOne("notifications", notification._id, data)
      );
    } catch (e) {
      console.log(e);
    }
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  deleteNotification = async notification => {
    const { _id } = notification;

    try {
      await apiServices.deleteOne("notifications", _id);
    } catch (e) {
      console.log(e);
    }

    this.getNotifications();
  };

  getNotifications = async () => {
    const { userType, userId } = this.state;
    console.log("userType", userType);
    try {
      const notifications = await apiServices.get(
        "notifications",
        `populate=${
          userType === "Coach" ? "coach" : "customer"
        }=${userId}&sender=${userType === "Coach" ? "CUSTOMER" : "COACH"}`
      );

      this.setState({
        notifications
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { notifications } = this.state;
    const { windowWidth } = this.props;
    console.log("notifications", notifications);
    return (
      <Header className="header">
        <Col span={3} align="left" offset={1}>
          <Badge
            count={notifications.filter(seen => false).length}
            overflowCount={9}
            style={{ backgroundColor: "#D46C4E" }}
            onClick={() => this.showDrawer(notifications)}
          >
            <Icon style={{ fontSize: "24px", color: "#43978d" }} type="bell" />
          </Badge>
        </Col>

        <Col span={16} align="center">
          <span>
            <img
              src="/assets/images/96960342-6d75-4269-a814-a7425e62c057.jpg"
              height={"60px"}
            />
          </span>
        </Col>
        <Col span={3} align="right">
          <Icon style={{ fontSize: "24px" }} type="setting" />
        </Col>

        <div>
          <Drawer
            title="Notifications"
            placement="left"
            width={windowWidth < 576 ? 256 : 500}
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            {notifications.map(notification => (
              <Card style={{ width: "100%" }} bordered={false}>
                <Meta
                  avatar={
                    <Icon
                      type={notificationIconAndName(notification.type).iconType}
                      style={{
                        color: notificationIconAndName(notification.type).color,
                        fontSize: "18px"
                      }}
                    />
                  }
                  size="large"
                  title={
                    <Row>
                      <Col span={18}>
                        {notificationIconAndName(notification.type).name}
                      </Col>
                      <Col span={6} align="right">
                        <Icon
                          type="close"
                          style={{
                            fontSize: "14px",
                            cursor: "pointer",
                            color: "rgba(0, 0, 0, 0.65)"
                          }}
                          onClick={() => this.deleteNotification(notification)}
                        />
                      </Col>
                    </Row>
                  }
                  description={notification.content}
                />
              </Card>
            ))}
          </Drawer>
        </div>
      </Header>
    );
  }
}

export default windowSize(HeaderComponent);
