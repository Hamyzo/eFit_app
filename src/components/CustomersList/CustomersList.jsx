import React from "react";
import { Table, Avatar } from "antd";
import * as apiServices from "../../apiServices";
import { NavLink } from "react-router-dom";

class CustomersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customersData: null
    };
  }

  componentDidMount = async () => {
    this.getCustomers();
  };

  getCustomers = async () => {
    try {
      const customers = await apiServices.get(
        "customers",
        "populate=current_program.program"
      );
      //console.log("CustomersList", customers);
      this.setState({ customersData: customers });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { customersData } = this.state;
    const profileSize = 65;
    //const customerProgramUrl = "/CoachProgram?_id=" + row._id;
    const columns = [
      {
        title: "Profile",
        width: 100,
        dataIndex: "img",
        render: (text, row, index) => {
          return <Avatar src={row.img} size={profileSize} />;
        }
        //fixed: "left"
      },
      {
        title: "First Name",
        width: 100,
        dataIndex: "first_name"
        //fixed: "left"
      },
      {
        title: "Last Name",
        width: 100,
        dataIndex: "last_name"
        //fixed: "left"
      },
      {
        title: "Email",
        width: 100,
        dataIndex: "email"
        //fixed: "left"
      },
      {
        title: "Status",
        width: 100,
        dataIndex: "status"
        //fixed: "center"
      },
      {
        title: "View Program",
        //fixed: "left",
        width: 100,
        render: (text, row, index) =>
          row.current_program && row.current_program._id ? (
            <NavLink to={`/coachProgram/${row.current_program._id}`}>
              {row.current_program.program.name}
            </NavLink>
          ) : (
            <span>No program assigned</span>
          )
      }
    ];
    return (
      <div>
        <Table
          loading={!customersData}
          columns={columns}
          dataSource={customersData}
        />
      </div>
    );
  }
}

export default CustomersList;
