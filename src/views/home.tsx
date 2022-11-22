import { Col, Layout, Pagination, Row } from "antd";
import Search from "antd/es/input/Search";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { FC, useEffect } from "react";
import { blue, geekblue, gold, red } from "@ant-design/colors";
import { PlusOutlined } from "@ant-design/icons";
import PatientAppointmentTable from "../components/patient-appointment-table";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { fetchPatientAppointments } from "../features/patient-appointment/patientAppointmentSlice";
import { Link } from "react-router-dom";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPatientAppointments());
  }, [dispatch]);
  const { patientAppointmentData, error, isFetchingAppointment } =
    useAppSelector((state) => state);
  console.log(patientAppointmentData, error, isFetchingAppointment);

  return (
    <Layout style={{ lineHeight: 0, backgroundColor: "#eeeae7" }}>
      <Header
        style={{
          position: "sticky",
          top: 5,
          left: "5%",
          right: "5%",
          zIndex: 1,
          width: "90%",
          height: 50,
          boxShadow: "-2px 2px #888888",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0",
            backgroundColor: blue[7],
            borderBottomRightRadius: 50,
            width: "33%",
            height: "100%",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <div
            className="h1"
            style={{
              marginLeft: "15%",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.5em",
            }}
          >
            DrNG | PATIENT
          </div>
        </div>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          style={{
            maxWidth: "80%",
            position: "relative",
            left: "10%",
          }}
        >
          <Row
            gutter={[200, 16]}
            style={{ justifyContent: "space-evenly", color: red[2] }}
          >
            <Col span={12}>
              <h1>Appointments</h1>
              <div style={{ width: 50, marginLeft: "10%", marginTop: 0 }}>
                <hr style={{ borderTop: `1px solid ${red[2]}` }}></hr>
              </div>
            </Col>
            <Col span={8}>
              <Search></Search>
            </Col>
          </Row>
        </div>
        <div
          className="site-layout-background"
          style={{
            maxWidth: "60%",
            position: "relative",
            left: "20%",
            paddingBottom: 20,
          }}
        >
          <Row gutter={[100, 16]} style={{ justifyContent: "space-between" }}>
            <Col
              style={{
                background: red[1],
                paddingLeft: 5,
                height: 75,
                lineHeight: 0,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}
              span={6}
            >
              <h5>Missed</h5>
              <h4 style={{ color: red[5], fontSize: "2em" }}>
                {patientAppointmentData?.missed ?? 0}
              </h4>
            </Col>
            <Col
              style={{
                background: gold[1],
                paddingLeft: 5,
                height: 75,
                width: 200,
                lineHeight: 0,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}
              span={6}
            >
              <h5>Recheduled</h5>
              <h4 style={{ color: gold[5], fontSize: "2em" }}>
                {patientAppointmentData?.rescheduled ?? 0}
              </h4>
            </Col>
            <Col
              style={{
                background: geekblue[1],
                paddingLeft: 5,
                height: 75,
                width: 200,
                lineHeight: 0,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}
              span={6}
            >
              <h5>Passed</h5>
              <h4 style={{ color: geekblue[5], fontSize: "2em" }}>
                {patientAppointmentData?.passed ?? 0}
              </h4>
            </Col>
          </Row>
        </div>
        <div
          className="site-layout-background"
          style={{
            maxWidth: "80%",
            position: "relative",
            left: "10%",
            paddingBottom: 20,
          }}
        >
          <PatientAppointmentTable />
        </div>
      </Content>
      <Footer>
        <div
          style={{
            maxWidth: "80%",
            position: "relative",
            right: "-35%",
          }}
        >
          <Row
            gutter={[100, 16]}
            style={{
              color: red[2],
            }}
          >
            <Col span={12}>
              <Pagination
                size="small"
                pageSize={10}
                showSizeChanger={false}
                onChange={(page, pageSize) => {}}
                total={patientAppointmentData?.total ?? 0}
              />
            </Col>
            <Col span={6}>
              <Link
                to={"create-appointment"}
                style={{
                  color: "white",
                  backgroundColor: red[2],
                  height: 30,
                  width: 30,
                  padding: 0,
                  boxShadow: "-0.5px 0.5px #888888",
                }}
              >
                <PlusOutlined />
              </Link>
            </Col>
          </Row>
        </div>
      </Footer>
    </Layout>
  );
};

export default Home;
