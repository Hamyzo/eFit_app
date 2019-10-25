import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Radio,
  AutoComplete,
  DatePicker
} from "antd";
import InfoStepper from "../../pages/Customer/InfoStepper";

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log("Received values of form: ", fieldsValue);
      }

      const values = {
        ...fieldsValue,
        "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD")
      };
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "33"
    })(
      <Select style={{ width: 70 }}>
        <Option value="33">+33</Option>
      </Select>
    );

    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };
    return (
      <div className="container">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div id="personalInfo ">
            <h3>Personal Information:</h3>
            <div className="clearfix"></div>
            <Row>
              <Form.Item>
                <Col xs={24} md={6}>
                  {getFieldDecorator("radio-group")(
                    <Radio.Group options={["M.", "Ms."]} />
                  )}
                </Col>
              </Form.Item>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={<span> First Name </span>}>
                  {getFieldDecorator("first name", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your first name!",
                        whitespace: true
                      }
                    ]
                  })(
                    <Input
                      suffix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label={<span> Last Name </span>}>
                  {getFieldDecorator("first name", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your first name!",
                        whitespace: true
                      }
                    ]
                  })(
                    <Input
                      suffix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                          placeholder="first name"
                        />
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item label="Phone Number">
                  {getFieldDecorator("phone", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your phone number!"
                      }
                    ]
                  })(
                    <Input
                      addonBefore={prefixSelector}
                      style={{ width: "100%" }}
                      suffix={
                        <Icon
                          type="phone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Birth Date">
                  {getFieldDecorator("date-picker", config)(
                    <DatePicker style={{ width: "100%" }} />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div id="address ">
            <h3>Address:</h3>
            <div className="clearfix"></div>
            <Row>
              <Col span={12}>
                <Form.Item label={<span> Address </span>}>
                  {getFieldDecorator("Address", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your Address!",
                        whitespace: true
                      }
                    ]
                  })(
                    <Input
                      suffix={
                        <Icon
                          type="environment"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Col span={12}>
                  <Form.Item label={<span> Zipcode </span>}>
                    {getFieldDecorator("Zipcode", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter your post code!",
                          whitespace: true
                        }
                      ]
                    })(
                      <Input
                        suffix={
                          <Icon
                            type="environment"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={<span> City </span>}>
                    {getFieldDecorator("City", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter your City!",
                          whitespace: true
                        }
                      ]
                    })(
                      <Input
                        suffix={
                          <Icon
                            type="environment"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
              </Col>
            </Row>
          </div>

          <div id="bodyMeasures">
            <h3>Body Measures:</h3>
            <div className="clearfix"></div>
            <Row>
              <Col span={12}>
                <Form.Item label={<span> Height </span>}>
                  {getFieldDecorator("Height", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your Height!",
                        whitespace: true
                      }
                    ]
                  })(
                    <Input
                      suffix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span> Weight </span>}>
                  {getFieldDecorator("Weight", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your weight!",
                        whitespace: true
                      }
                    ]
                  })(
                    <Input
                      suffix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: "personalInfo" })(PersonalInfo);
