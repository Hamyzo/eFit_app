import React from "react";
import { Table, Avatar } from "antd";

class Customers extends React.Component {
  state = {
    columns: [
      {
        title: "Profile",
        width: 100,
        dataIndex: "img_url",
        render: (text, row, index) => {
          return <Avatar src={row.img_url} size={65} />;
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
    ],
    customersData: [
      {
        first_name: "Kikou",
        last_name: "Légende",
        password: 1234,
        email: "kikou@gmail.com",
        phone: "+33 6 12 34 56 78",
        title: "None",
        registration_date: "2017-07-21T17:32:28.000Z",
        last_login_date: "2017-07-21T17:32:28.000Z",
        img_url: "localhost/users_img/154sd121ds575sd7.jpg",
        status: "PENDING",
        address: {
          number: 123,
          street: "Chemin de Ribaute",
          additional: "2ème étage",
          postcode: 31500,
          city: "Toulouse",
          state: "Occitanie",
          country: "France"
        }
      }
    ],
    listTitle: "Customer List",
    profileSize: 65
  };
  render() {
    //return <SimpleList data={this.state.customersData}></SimpleList>;

    return (
      <div>
        <Table
          columns={this.state.columns}
          dataSource={this.state.customersData}
        ></Table>
      </div>
    );
  }
}

export default Customers;
