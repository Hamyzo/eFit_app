import React from "react";
import ReadMoreReact from "read-more-react";
import {
  Table,
  Avatar,
  Button,
  Icon,
  Modal,
  Tabs,
  Col,
  Card,
  Row,
  Tag,
  Input,
  Switch,
  Radio,
  Form
} from "antd";
import { Link, NavLink } from "react-router-dom";
import * as apiServices from "../../apiServices";
import Highlighter from "react-highlight-words";
import "./CustomersList.css";

const { Meta } = Card;
const { TabPane } = Tabs;
const showHeader = true;
const scroll = { y: 240 };
const pagination = { position: "bottom" };

class CustomersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customersWithProgramData: null,
      customersWithoutProgramData: null,
      selectedCustomer: null,
      visible: false,
      searchText: "",
      bordered: false,
      pagination,
      size: "default",
      showHeader,
      scroll: undefined,
      hasData: true,
      tableLayout: undefined,
      programs: []
    };
  }

  /** Handle Search Filter **/
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

  /** Modal To Display Program **/
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
        "populate=current_program.program&sort=-registration_date"
      );
      // console.log("CustomersList", customers);
      this.setState({
        customersWithProgramData: customers.filter(
          customer => customer.current_program
        ),
        customersWithoutProgramData: customers.filter(
          nocustomer => !nocustomer.current_program
        )
      });
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
    const {
      customersWithProgramData,
      customersWithoutProgramData,
      programs,
      selectedCustomer,
      visible
    } = this.state;
    const { state } = this;
    const profileSize = 65;
    // const customerProgramUrl = "/CoachProgram?_id=" + row._id;
    const columns = [
      {
        title: "Picture",
        width: 50,
        dataIndex: "img",
        render: (text, row, index) => (
          <Avatar src={row.img} size={profileSize} />
        )
        // fixed: "left"
      },
      {
        title: "First Name",
        width: 100,
        dataIndex: "first_name",
        ...this.getColumnSearchProps("first_name")

        // fixed: "left"
      },
      {
        title: "Last Name",
        width: 100,
        dataIndex: "last_name",
        ...this.getColumnSearchProps("last_name"),
        render: (text, row, index) => <span>{row.last_name.toUpperCase()}</span>
        // fixed: "left"
      },
      {
        title: "Contact",
        width: 100,
        render: (text, row, index) => (
          <span>
            <a>
              <Icon type="mail" /> Send a message
            </a>
          </span>
        )
        // fixed: "left"
      },
      {
        title: "Phone",
        width: 100,
        dataIndex: "phone",
        filterMultiple: false,
        onFilter: (value, record) => record.phone.indexOf(value) === 0,
        sorter: (a, b) => a.phone.length - b.phone.length,
        sortDirections: ["descend", "ascend"],
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
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 150,
        filters: [
          { text: "red", value: "red" },
          { text: "blue", value: "blue" },
          { text: "green", value: "green" }
        ],
        render: tags => (
          <span>
            {/*{" "}
            {tags.map(tag => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}{" "}
            */}
            <Tag color="red" key="red">
              Bad
            </Tag>
            <Tag color="green" key="green">
              Good
            </Tag>
            <Tag color="blue" key="green">
              Nice
            </Tag>
          </span>
        )
      },
      {
        title: "View Program",
        dataIndex: "current_program",

        // fixed: "left",
        width: 150,
        render: (text, row, index) =>
          row.current_program && row.current_program._id ? (
            <NavLink to={`/coachProgram/${row.current_program._id}`}>
              {row.current_program.program.name}
            </NavLink>
          ) : (
            <span>No program assigned</span>
          )
      },
      {
        title: "Action",
        width: 100,
        render: (text, row, index) =>
          row.current_program && row.current_program._id ? (
            <span>
              <Button
                onClick={() => this.showModal(row)}
                type="primary"
                size="small"
                style={{ marginLeft: "5px" }}
              >
                <Icon type="edit" />
              </Button>
              <Button
                onClick={() => this.showModal(row)}
                type="primary"
                size="small"
                style={{ marginLeft: "5px" }}
              >
                <Icon type="delete" />
              </Button>
            </span>
          ) : (
            <span>
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

        // fixed: "left"
      }
    ];
    return (
      <div>
        <Row>
          <Tabs defaultActiveKey="2" size="large">
            <TabPane
              tab={
                <span>
                  <Icon type="smile" />
                  With Program
                </span>
              }
              key="1"
            >
              <Table
                loading={!customersWithProgramData}
                columns={columns.map(item => ({
                  ...item,
                  ellipsis: state.ellipsis
                }))}
                dataSource={state.hasData ? customersWithProgramData : null}
                className="table"
                size="middle"
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
                                <Link
                                  to={`/program/${program._id}`}
                                  target="_blank"
                                >
                                  VIEW
                                </Link>
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
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="frown" />
                  Without Program
                </span>
              }
              key="2"
              className="tab_list_equal"
            >
              <Table
                loading={!customersWithoutProgramData}
                columns={columns}
                dataSource={customersWithoutProgramData}
                className="table"
                size="middle"
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
                                <Link
                                  to={`/program/${program._id}`}
                                  target="_blank"
                                >
                                  VIEW
                                </Link>
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
            </TabPane>
          </Tabs>
        </Row>
      </div>
    );
  }
}

export default CustomersList;
