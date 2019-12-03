import React from "react";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Icon,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
  Tag
} from "antd";
import "./CustomerAppointments.css";
import moment from "moment";

import * as apiServices from "../../apiServices";
import { Icon as FaIcon } from "react-fa";
import * as dateScripts from "../../utils/dateScripts";
import Highlighter from "react-highlight-words";
import { NavLink } from "react-router-dom";
import Spinner from "../Global/Spinner";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { TabPane } = Tabs;

class AppointmentScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: null,
      coachAppointments: null,
      searchText: "",
      pastAppointments: null,
      upcomingAppointments: null,
      selectedDate: moment(),
      selectedTime: null,
      openModal: false,
      coach: null
    };
  }

  handleClick = async time => {
    console.log(time);
    this.setState({ selectedTime: time, openModal: true });
  };

  handleCancel = () => {
    this.setState({ selectedTime: null, openModal: false });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  componentDidMount = async () => {
    this.getAppointments();
  };

  getAppointments = async () => {
    try {
      const customer = await apiServices.getOne(
        "customers",
        sessionStorage.getItem("userId"),
        "populate=current_program.program.coach"
      );
      const appointments = await apiServices.get(
        "appointments",
        `populate=coach,customer&customer=${sessionStorage.getItem("userId")}`
      );
      const coachAppointments = await apiServices.get(
        "appointments",
        `populate=coach,customer&coach=${customer.current_program.program.coach._id}`
      );
      const pastAppointments = appointments
        .filter(appointment =>
          moment(appointment.slot.time_start).isBefore(moment())
        )
        .sort((a, b) =>
          moment(a.slot.time_start).isBefore(moment(b.slot.time_start) ? 1 : -1)
        );
      const upcomingAppointments = appointments
        .filter(appointment =>
          moment(appointment.slot.time_start).isSameOrAfter(moment())
        )
        .sort((a, b) =>
          moment(a.slot.time_start).isAfter(moment(b.slot.time_start)) ? 1 : -1
        );
      console.log(upcomingAppointments, coachAppointments);
      this.setState({
        pastAppointments,
        upcomingAppointments,
        coachAppointments,
        coach: customer.current_program.program.coach._id
      });
    } catch (e) {
      console.log(e);
    }
  };

  getSlots = () => {
    const { selectedDate, coachAppointments } = this.state;
    let time;
    time = moment(`${selectedDate.set({ hour: 8, minute: 0, second: 0 })}`);
    const slotsAM = [];
    const slotsPM = [];
    while (
      time.isBefore(
        moment(selectedDate.set({ hour: 11, minute: 30, second: 0 }))
      )
    ) {
      const currentTime = time.clone();
      slotsAM.push(
        <Button
          onClick={() => this.handleClick(currentTime)}
          disabled={
            coachAppointments.filter(appointment =>
              moment(appointment.slot.time_start).isSame(time)
            ).length > 0
          }
          style={{ marginTop: "10px" }}
        >{`${time.format("HH:mm")} - ${time
          .add(30, "minutes")
          .format("HH:mm")}`}</Button>
      );
    }

    time = moment(`${selectedDate.set({ hour: 14, minute: 0, second: 0 })}`);
    while (
      time.isBefore(
        moment(selectedDate.set({ hour: 17, minute: 30, second: 0 }))
      )
    ) {
      const currentTime = time.clone();
      slotsPM.push(
        <Button
          onClick={() => this.handleClick(currentTime)}
          disabled={
            coachAppointments.filter(appointment =>
              moment(appointment.slot.time_start).isSame(time)
            ).length > 0
          }
          style={{ marginTop: "10px" }}
        >{`${time.format("HH:mm")} - ${time
          .add(30, "minutes")
          .format("HH:mm")}`}</Button>
      );
    }
    return (
      <Row style={{ padding: "20px" }}>
        <Col span={12} align="center">
          {slotsAM}
        </Col>
        <Col span={12} align="center">
          {slotsPM}
        </Col>
      </Row>
    );
  };

  onChange = (date, dateString) => {
    this.setState({ selectedDate: date });
  };

  onChangeAppointment = (name, value) => {
    const { newAppointment } = this.state;
    this.setState({
      newAppointment: {
        ...newAppointment,
        [name]: value
      }
    });
  };

  handleSubmitAppointment = async () => {
    try {
      let { newAppointment, selectedTime, coach } = this.state;
      console.log(selectedTime);
      newAppointment = {
        ...newAppointment,
        coach,
        customer: sessionStorage.getItem("userId"),
        slot: {
          time_start: new Date(selectedTime),
          time_end: new Date(selectedTime.add(30, "minutes"))
        }
      };
      console.log(newAppointment);
      await apiServices.postOne("appointments", newAppointment);
      this.getAppointments();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {
      upcomingAppointments,
      pastAppointments,
      coachAppointments,
      ellipsis,
      selectedDate,
      openModal
    } = this.state;
    const { form } = this.props;
    const pastColumns = [
      {
        title: "Date",
        width: 50,
        dataIndex: "date",
        render: (text, row, index) => (
          <span>{moment(row.slot.time_start).format("MMM Do YYYY")}</span>
        )
      },
      {
        title: "Time",
        width: 100,
        dataIndex: "time",
        render: (text, row, index) => (
          <span>{`${moment(row.slot.time_start).format("HH:mm")} - ${moment(
            row.slot.time_end
          ).format("HH:mm")}`}</span>
        )
      },
      {
        title: "Subject",
        width: 100,
        dataIndex: "subject",
        ...this.getColumnSearchProps("subject"),
        render: (text, row, index) => <span>{row.subject.toUpperCase()}</span>
      }
    ];
    const upcomingColumns = [
      ...pastColumns,
      {
        title: "Actions",
        width: 50,
        render: (text, row, index) => (
          <span>
            <Button type="primary" size="small" style={{ marginLeft: "5px" }}>
              <Icon type="edit" />
            </Button>
            <Button type="primary" size="small" style={{ marginLeft: "5px" }}>
              <Icon type="delete" />
            </Button>
          </span>
        )
      }
    ];
    return !coachAppointments ? (
      <Spinner />
    ) : (
      <div>
        <Row className="date">
          <Col span={24} align="center">
            <h1> Book your next appointment: </h1>
            <DatePicker
              className="datePicker"
              defaultValue={selectedDate}
              onChange={this.onChange}
            />
          </Col>
        </Row>
        <h1 className="timeslots">Available Time Slots:</h1>
        <div className="time">{this.getSlots()}</div>
        <h1 className="timeslots">Booked Appointments:</h1>
        <Row className="time">
          <Tabs defaultActiveKey="2">
            <TabPane tab="PAST" key="1">
              <Row className="container mtRepetition">
                <Table
                  loading={!pastAppointments}
                  columns={pastColumns.map(item => ({
                    ...item,
                    ellipsis
                  }))}
                  dataSource={pastAppointments || null}
                  className="table"
                  size="middle"
                />
              </Row>
            </TabPane>
            <TabPane tab="UPCOMING" key="2">
              <Row className="container">
                <Table
                  loading={!upcomingAppointments}
                  columns={upcomingColumns.map(item => ({
                    ...item,
                    ellipsis
                  }))}
                  dataSource={upcomingAppointments || null}
                  className="table"
                  size="middle"
                />
              </Row>
            </TabPane>
          </Tabs>
        </Row>
        <Modal
          visible={openModal}
          onOk={this.handleSubmitAppointment}
          onCancel={this.handleCancel}
          title="Book appointment"
          width={500}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                this.handleSubmitAppointment();
                this.handleCancel();
              }}
            >
              Submit
            </Button>
          ]}
        >
          <Form style={{ padding: "20px" }}>
            <Row type="flex" justify="space-between" align="middle">
              <Col span={24}>
                <Form.Item label="Subject">
                  {form.getFieldDecorator("subject", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter the appointment's subject"
                      }
                    ]
                  })(
                    <Input
                      name="subject"
                      onChange={e =>
                        this.onChangeAppointment(e.target.name, e.target.value)
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="space-between" align="middle">
              <Col span={24}>
                <Form.Item label="Description">
                  {form.getFieldDecorator("description", {
                    rules: [
                      {
                        required: false,
                        message: "Please enter the selectedSession description"
                      }
                    ]
                  })(
                    <Input.TextArea
                      name="description"
                      onChange={e =>
                        this.onChangeAppointment(e.target.name, e.target.value)
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(AppointmentScheduler);
