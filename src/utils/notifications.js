const notificationIconAndName = type => {
  if (type === "FOCUS_SESSION") {
    return {
      iconType: "heart",
      name: "Focus Session",
      color: "#1890ff"
    };
  }
  if (type === "REMINDER") {
    return {
      iconType: "bulb",
      name: "Reminder",
      color: "#52c41a"
    };
  }
  if (type === "ALERT") {
    return {
      iconType: "alert",
      name: "Alert",
      color: "#f5222d"
    };
  }
};

export default notificationIconAndName;
