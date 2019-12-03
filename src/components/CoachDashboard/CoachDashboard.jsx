import React from "react";
import * as apiServices from "../../apiServices";
import { ResponsiveStream } from "@nivo/stream";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import {
  Row,
  Col,
  Icon,
  Statistic,
  Card,
  Tabs,
  Table,
  Button,
  Avatar
} from "antd";
import Spinner from "../Global/Spinner";
import "./CoachDashboard.css";
import * as programScripts from "../../utils/programScripts";

const { TabPane } = Tabs;
const columnsNewClients = [
  {
    title: "",
    width: 50,
    dataIndex: "img",
    render: (text, row) => <Avatar src={row.img} size={35} />
  },
  {
    title: "Name",
    dataIndex: "first_name"
  },
  {
    title: "Last Name",
    dataIndex: "last_name"
  },
  {
    title: "Registration",
    dataIndex: "registration_date"
  },
  {
    title: "Fitness Goal",
    dataIndex: ""
  }
];
const columnsLowPerforming = [
  {
    title: "",
    width: 50,
    dataIndex: "img",
    render: (text, row) => <Avatar src={row.img} size={35} />
  },
  {
    title: "Name",
    dataIndex: "first_name"
  },
  {
    title: "Last Name",
    dataIndex: "last_name"
  },
  {
    title: "Registration",
    dataIndex: "registration_date"
  },
  {
    title: "Last Workout",
    dataIndex: "day_count"
  }
];
const data = [
  {
    country: "easy",
    burger: 131,
    burgerColor: "hsl(353, 70%, 50%)"
  },
  {
    country: "normal",
    sandwich: 187,
    sandwichColor: "hsl(75, 70%, 50%)"
  },
  {
    country: "difficult",
    donut: 74,
    donutColor: "hsl(173, 70%, 50%)"
  }
];
class CoachDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customersWithProgramData: null,
      customersWithoutProgramData: null
    };
  }

  componentDidMount = async () => {
    this.getCustomers();
    this.getAllPrograms();
  };

  getCustomers = async () => {
    try {
      const customers = await apiServices.get(
        "customers",
        "populate=current_program.program,current_program.focus_sessions,current_program.focus_sessions.exercises,current_program.focus_sessions.results.exercise.exercise"
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

  barChartData = customers => {
    var hard = 0;
    var easy = 0;
    var normal = 0;
    customers.forEach(cust => {
      cust.current_program.sessions.forEach(session => {
        session.periods.forEach(period => {
          if (period.repetitions != null && period.repetitions.length > 0) {
            period.repetitions.forEach(rep => {
              if (rep.results != null && rep.results.length > 0) {
                if (this.dateIsWithinWeek(0, rep.date)) {
                  rep.results.forEach(res => {
                    if (parseInt(res.performance) == 0) {
                      normal = normal + 1;
                    } else if (parseInt(res.performance) == 1) {
                      hard = hard + 1;
                    } else if (parseInt(res.performance) == -1) {
                      easy = easy + 1;
                    }
                  });
                }
              }
            });
          }
        });
      });
    });
    return [
      {
        difficulty: "easy",
        count: easy,
        burgerColor: "hsl(353, 70%, 50%)"
      },
      {
        difficulty: "normal",
        count: normal,
        sandwichColor: "hsl(75, 70%, 50%)"
      },
      {
        difficulty: "difficult",
        count: hard,
        donutColor: "hsl(173, 70%, 50%)"
      }
    ];
  };

  myResponsiveBar = customers => (
    <div className="graph">
      <ResponsiveBar
        data={this.barChartData(customers)}
        keys={["count"]}
        indexBy="difficulty"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: "fries"
            },
            id: "dots"
          },
          {
            match: {
              id: "sandwich"
            },
            id: "lines"
          }
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );

  renderGraph = customers => {
    if (customers != null && customers.length > 0) {
      return (
        <div className="graph">
          <ResponsiveLine
            data={this.weeklyWorkoutsData(customers)}
            margin={{ top: 15, right: 110, bottom: 20, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              stacked: false,
              min: "auto",
              max: "auto"
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "focus session date",
              legendOffset: 36,
              legendPosition: "middle"
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "count",
              legendOffset: -40,
              legendPosition: "middle"
            }}
            colors={{ scheme: "nivo" }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        </div>
      );
    }
  };

  averageProgress = customers => {
    var AllCustomersProgress = [];
    customers.forEach(cust => {
      if (cust.current_program.focus_sessions != null && cust.current_program.focus_sessions.length > 1) {

        var x = cust.current_program.focus_sessions.length - 1;
        var y = cust.current_program.focus_sessions.length - 2;
        console.log("888888888888888888888", cust)
        if (cust.current_program.focus_sessions[x].results != null && cust.current_program.focus_sessions[x].results.length > 0) {

          for (var i = 0; i < cust.current_program.focus_sessions[x].exercises.length; i++) {
            AllCustomersProgress.push(programScripts.percentageDifference(cust.current_program.focus_sessions[x].results[i], cust.current_program.focus_sessions[y].results[i]))
          }

        }
      }
    });
    console.log(AllCustomersProgress)
    return AllCustomersProgress
  }



  dayCounter = date => {
    const oneDay = 24 * 60 * 60 * 1000;
    var today = new Date();
    const formattedDate = new Date(date);
    const diff = Math.round(Math.abs((today - formattedDate) / oneDay));
    return diff;
  };
  dayCounterBetween2dates = (baseDate, date) => {
    const oneDay = 24 * 60 * 60 * 1000;
    var d1 = new Date(baseDate);
    const formattedDate = new Date(date);
    const diff = Math.round(Math.abs((d1 - formattedDate) / oneDay));
    return diff;
  };

  newCustomers = customers => {
    const tableData = [];
    for (var i = 0; i < customers.length; i++) {
      var cust = customers[i];
      tableData.push({
        img: cust.img,
        first_name: cust.first_name,
        last_name: cust.last_name,
        registration_date: programScripts.formatDate(cust.registration_date),
        day_count: this.dayCounter(cust.registration_date)
      });
    }
    tableData.sort(this.compare);
    return tableData;
  };

  orderData = (tableData, asc) => {
    if (asc) {
      tableData.sort((a, b) =>
        a.last_wo_date_count < b.last_wo_date_count ? 1 : -1
      );
    }
    if (asc == false) {
      tableData.sort((a, b) =>
        a.last_wo_date_count > b.last_wo_date_count ? 1 : -1
      );
    }
    return tableData;
  };

  performance = (customers, asc) => {
    const tableData = [];
    for (var i = 0; i < customers.length; i++) {
      var cust = customers[i];
      if (this.dayCounter(cust.last_login_date) > 3) {
        tableData.push({
          img: cust.img,
          first_name: cust.first_name,
          last_name: cust.last_name,
          registration_date: programScripts.formatDate(
            programScripts.lastWorkout(cust)
          ),
          last_wo_date_count: this.dayCounter(programScripts.lastWorkout(cust)),
          day_count:
            this.dayCounter(programScripts.lastWorkout(cust)) + " days ago"
        });
      }
    }
    this.orderData(tableData, asc);
    return tableData;
  };

  dateIsWithinWeek = (weekNo, date) => {
    var today = new Date();
    if (
      this.dayCounterBetween2dates(
        programScripts.addDaysDate(today, weekNo * 7),
        date
      ) < 8
    ) {
      console.log("true");
      return true;
    } else {
      return false;
    }
  };

  totalWeekWorkouts = (customers, weekNo) => {
    var total = 0;
    if (customers != null && customers.length > 0) {
      customers.forEach(cust => {
        if (cust.current_program != null) {
          cust.current_program.sessions.forEach(session => {
            session.periods.forEach(period => {
              if (period.repetitions != null && period.repetitions.length > 0) {
                period.repetitions.forEach(rep => {
                  if (this.dateIsWithinWeek(weekNo, rep.date)) {
                    total = total + period.repetitions.length;
                  }
                });
              }
            });
          });
        }
      });
    }
    return total;
  };

  weeklyWorkoutsData = customers => {
    var data = [];
    for (var i = 0; i < 6; i++) {
      data.push({
        x: i,
        y: this.totalWeekWorkouts(customers, data.length)
      });
    }
    console.log({ id: "week", color: "hsl(172, 70%, 50%)", data: data });
    return [{ id: "week", color: "hsl(172, 70%, 50%)", data: data }];
  };

  render() {
    const {
      customersWithProgramData,
      customersWithoutProgramData
    } = this.state;

    return (
      <div>
        <Row>
          <Col span={8}>
            <Card className="statCard">
              <div className="grpah">
                {customersWithProgramData ? (
                  this.renderGraph(customersWithProgramData)
                ) : (
                  <Spinner />
                )}
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="statCard">
              {customersWithProgramData ? (
                this.myResponsiveBar(customersWithProgramData)
              ) : (
                <Spinner />
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card className="statCard">
              {customersWithProgramData ? (
                  this.averageProgress(customersWithProgramData)
                ) : (
                <Spinner />
                )}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Card title="Customers Summary" className="clientsStat">
              <Tabs defaultActiveKey="1">
                <TabPane tab="New Clients" key="1">
                  {customersWithoutProgramData ? (
                    <Table
                      columns={columnsNewClients}
                      dataSource={this.newCustomers(
                        customersWithoutProgramData
                      )}
                      size="small"
                    />
                  ) : (
                    <Spinner />
                  )}
                </TabPane>
                <TabPane tab="Low Performing" key="2">
                  {customersWithProgramData ? (
                    <Table
                      columns={columnsLowPerforming}
                      dataSource={this.performance(
                        customersWithProgramData,
                        true
                      )}
                      size="small"
                    />
                  ) : (
                    <Spinner />
                  )}
                </TabPane>
                <TabPane tab="Top Performing" key="3">
                  {customersWithProgramData ? (
                    <Table
                      columns={columnsLowPerforming}
                      dataSource={this.performance(
                        customersWithProgramData,
                        false
                      )}
                      size="small"
                    />
                  ) : (
                    <Spinner />
                  )}
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col className="appointmentsCard" span={10}>
            <Card title="Upcoming Appointments">
              <Row>
                <Col>
                  <Card>
                    <Row>
                      <Col span={8}>John Snow</Col>
                      <Col span={6}>Today</Col>
                      <Col span={6}>12:30pm</Col>
                      <Col span={4}>
                        <Button type="link" shape="circle" icon="more" />
                      </Col>
                    </Row>
                  </Card>
                  <Card>
                    <Row>
                      <Col span={8}>John Snow</Col>
                      <Col span={6}>Today</Col>
                      <Col span={6}>12:30pm</Col>
                      <Col span={4}>
                        <Button type="link" shape="circle" icon="more" />
                      </Col>
                    </Row>
                  </Card>
                  <Card>
                    <Row>
                      <Col span={8}>John Snow</Col>
                      <Col span={6}>Today</Col>
                      <Col span={6}>12:30pm</Col>
                      <Col span={4}>
                        <Button type="link" shape="circle" icon="more" />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </div>
    );
  }
}

export default CoachDashboard;
