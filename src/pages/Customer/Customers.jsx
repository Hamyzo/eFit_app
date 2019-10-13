import React from "react";
import { Table, Avatar } from "antd";

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customersData: []
    };
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers() {
    fetch("http://localhost:3017/customers")
      .then(async response => await response.json())
      .then(response => {
        this.setState({ customersData: response });
      })
      .catch(err => console.error(err));
  }

  render() {
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
        <Table columns={columns} dataSource={this.state.customersData}></Table>
      </div>
    );
  }
}

export default Customers;
