import React from "react";
import { Table, Avatar } from "antd";
import * as apiServices from "../../apiServices";

class Customers extends React.Component {
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
      const customers = await apiServices.get("customers", "");
      console.log("Customers", customers);
      this.setState({ customersData: customers });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { customersData } = this.state;
    const profileSize = 65;
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
        render: () => <a>program</a>
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

export default Customers;
