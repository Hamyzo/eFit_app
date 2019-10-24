import React from "react";
import { Col, DatePicker, Row, Table } from "antd";
import "./Appointment.css";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
function onChange(date, dateString) {
  console.log(date, dateString);
}
const columns = [
  {
    title: "Time",
    dataIndex: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "",
    dataIndex: "address"
  }
];
const data = [
  {
    key: "1",
    name: "9:30 - 10:45",
    age: 32,
    address: "Book Now"
  },
  {
    key: "2",
    name: "10:45 - 11:15",
    age: 42,
    address: "Book Now"
  },
  {
    key: "3",
    name: "2:00 - 2:45",
    age: 32,
    address: "Book Now"
  },
  {
    key: "4",
    name: "3:00 - 3:45",
    age: 99,
    address: "Book Now"
  }
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: record => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name
  })
};

class AppointmentScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Row className="date">
          <Col span={24} align="center">
            <h1> Book your next appointment: </h1>
            <DatePicker className="datePicker" onChange={onChange} />
          </Col>
        </Row>
        <h1 className="timeslots">Available Time Slots:</h1>
        <div className="time">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    );
  }
}

export default AppointmentScheduler;
