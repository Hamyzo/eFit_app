import React from "react";
import ReadMoreReact from "read-more-react";
import { Table, Avatar, Button, Icon, Modal, Tabs, Col, Card, Row } from "antd";
import { NavLink } from "react-router-dom";
import * as apiServices from "../../apiServices";
import "./CustomersList.css";

const { Meta } = Card;

class CustomersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customersData: null,
      selectedCustomer: null,
      visible: false,
      programs: []
    };
  }

  showModal = selectedCustomer => {
    console.log("customer", selectedCustomer);
    this.setState({
      visible: true,
      selectedCustomer
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  componentDidMount = async () => {
    this.getCustomers();
    this.getAllPrograms();
  };

  getCustomers = async () => {
    try {
      const customers = await apiServices.get(
        "customers",
        "populate=current_program.program"
      );
      // console.log("CustomersList", customers);
      this.setState({ customersData: customers });
    } catch (e) {
      console.log(e);
    }
  };

  getAllPrograms = async _ => {
    try {
      const programs = await apiServices.get("programs", "");
      // console.log("Program", programs);
      this.setState({ programs });
    } catch (e) {
      console.log(e);
    }
  };

  handleAssign = async program => {
    try {
      const { selectedCustomer } = this.state;
      const newCustomerProgram = {
        customer: selectedCustomer._id,
        program: program._id,
        sessions: program.sessions
      };
      await apiServices.postOne("customerPrograms", newCustomerProgram);

      // try to understand the two following lines, you'll need them a lot later
      this.setState({ visible: false });
      this.getCustomers();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { customersData, programs, selectedCustomer, visible } = this.state;
    const profileSize = 65;
    // const customerProgramUrl = "/CoachProgram?_id=" + row._id;
    const columns = [
      {
        title: "Profile",
        width: 70,
        dataIndex: "img",
        render: (text, row, index) => (
          <Avatar src={row.img} size={profileSize} />
        )
        // fixed: "left"
      },
      {
        title: "First Name",
        width: 100,
        dataIndex: "first_name"
        // fixed: "left"
      },
      {
        title: "Last Name",
        width: 100,
        render: (text, row, index) => <span>{row.last_name.toUpperCase()}</span>
        // fixed: "left"
      },
      {
        title: "Email",
        width: 100,
        render: (text, row, index) => (
          <span>
            <a href="mailto: {row.email}">
              <Icon type="mail" /> {row.email}
            </a>
          </span>
        )
        // fixed: "left"
      },
      {
        title: "Phone",
        width: 100,
        render: (text, row, index) => (
          <span>
            <a href="tel: {row.phone}">
              <Icon type="phone" /> {row.phone}
            </a>
          </span>
        )
        // fixed: "center"
      },
      {
        title: "View Program",
        // fixed: "left",
        width: 130,
        render: (text, row, index) =>
          row.current_program && row.current_program._id ? (
            <NavLink to={`/coachProgram/${row.current_program._id}`}>
              {row.current_program.program.name}
            </NavLink>
          ) : (
            <span>
              No program assigned
              <Button
                onClick={() => this.showModal(row)}
                type="primary"
                size="small"
                style={{ marginLeft: "5px" }}
              >
                <Icon type="plus" />
              </Button>
            </span>
          )
      }
    ];
    return (
      <div>
        <Table
          loading={!customersData}
          columns={columns}
          dataSource={customersData}
          className="table"
        />
        {visible ? (
          <Modal
            title={`Assign a program to ${
              selectedCustomer.first_name
            }  ${selectedCustomer.last_name.toUpperCase()}`}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={720}
          >
            <Row>
              <div>
                {programs.map((program, index) => (
                  <Col span={8}>
                    <Card
                      className="wrapper"
                      id="card"
                      cover={
                        <img
                          alt="run"
                          style={{ height: "120px" }}
                          src="/assets/images/run.jpg"
                        />
                      }
                    >
                      <Meta
                        title={program.name}
                        /*  description=<ReadMoreReact
                        text={program.program.description}
                        min={10}
                        ideal={20}
                        max={30}
                        readMoreText=<a>View More</a>
                       /> */
                      />
                      <div>
                        <Button className="btn-start" type="default">
                          <NavLink to={`/program/${program._id}`}>VIEW</NavLink>
                        </Button>
                        <Button
                          className="btn-start"
                          onClick={() => this.handleAssign(program)}
                          type="primary"
                          style={{ marginLeft: "2px" }}
                        >
                          ASSIGN
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </div>
            </Row>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default CustomersList;
