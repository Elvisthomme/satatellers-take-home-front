import { blue, red } from "@ant-design/colors";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Layout,
  Row,
  Select,
  TimePicker,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Content, Header } from "antd/es/layout/layout";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/useTypedSelector";
import {
  updatePatientAppointment,
  createPatientAppointment,
} from "../features/patient-appointment/patientAppointmentSlice";
import { PatientAppointment } from "../model/patientAppointment";

const CDPatientAppointment: FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { patientAppointmentData } = useAppSelector((state) => state);
  const patientAppointment = patientAppointmentData?.data?.find(
    (value) => value.id.toString() === id
  );
  const onFinish = (values: any) => {
    if (patientAppointment) {
      patientAppointment.patientName = values.patientName;
      patientAppointment.patientPhone = values.patientPhone;
      patientAppointment.patientAddress = values.patientAddress;
      patientAppointment.patientCity = values.patientCity;
      patientAppointment.patientEmail = values.patientEmail;
      patientAppointment.patientAge = values.patientAge;
      patientAppointment.patientSex = values.patientSex;
      patientAppointment.isFirstTime = values.isFirstTime;
      patientAppointment.commentBefore = values.commentBefore;
      patientAppointment.commentAfter = values.commentAfter;
      patientAppointment.appointmentStatus = values.appointmentStatus;
      patientAppointment.appointmentDate = values.appointmentDate;
      patientAppointment.appointmentTime = values.appointmentTime;
      patientAppointment.bookingDate = values.bookingDate;
      dispatch(updatePatientAppointment(patientAppointment!));
    } else {
      dispatch(createPatientAppointment(values as PatientAppointment));
    }
    console.log("Received values of form: ", values);
  };
  return (
    <Layout style={{ backgroundColor: "#eeeae7" }}>
      <Header
        style={{
          position: "sticky",
          top: 5,
          left: "5%",
          right: "5%",
          zIndex: 1,
          width: "90%",
          borderBottomLeftRadius: 20,
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
            borderBottomLeftRadius: 20,
            width: "70%",
            height: "100%",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginLeft: "5%",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.5em",
            }}
          >
            DRNG | PATIENT
          </div>
        </div>
      </Header>

      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div className="site-layout-background">
          <Row gutter={[0, 16]} style={{ alignContent: "flex-start" }}>
            <Col span={2} style={{ marginTop: 18 }}>
              <Link
                to={"/"}
                style={{
                  backgroundColor: "#eeeae7",
                  border: "0",
                }}
              >
                <ArrowLeftOutlined
                  style={{ fontSize: "1.5em" }}
                ></ArrowLeftOutlined>
              </Link>
            </Col>
            <Col span={7}>
              <h1>NEW RECORD</h1>
            </Col>
            <Col span={4}>
              <div style={{ width: 50, marginLeft: "10%", marginTop: 32 }}>
                <hr style={{ border: `1px solid ${red[5]}` }}></hr>
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ maxWidth: "80%", marginLeft: "10%" }}>
          <Form
            layout="vertical"
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              ...patientAppointment,
            }}
            scrollToFirstError
          >
            <h4>General Information</h4>
            <Row gutter={[10, 16]}>
              <Col span={3}>
                <Form.Item
                  name="uniqueCode"
                  label="Unique Code"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input disabled={true} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  name="patientName"
                  label="Name"
                  required={false}
                  rules={[
                    {
                      required: true,
                      message: "Please input the patient's name",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="patientSex"
                  label="Sex"
                  required={false}
                  rules={[{ required: true, message: "Please select gender!" }]}
                >
                  <Select placeholder="select patient gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="patientPhone" label="Phone" required={false}>
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="patientEmail"
                  label="Email"
                  required={false}
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid Email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <hr />

            <h4>Appointment Information</h4>
            <Row gutter={[10, 16]}>
              <Col span={4}>
                <Form.Item
                  name="appointmentDate"
                  label="Appointment date"
                  rules={[
                    {
                      required: true,
                      message: "Please input the appointment date",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="isFirstTime"
                  label="First Time"
                  required={false}
                >
                  <Select>
                    <option value="false">No</option>
                    <option value="true">yes</option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  name="bookingDate"
                  label="Request date"
                  required={false}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="appointmentStatus"
                  label="Appointment status"
                  required={false}
                >
                  <Select>
                    <option value="pending">Pending</option>
                    <option value="rescheduled">Rescheduled</option>
                    <option value="passed">Passed</option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="appointmentTime"
                  label="Appointment time"
                  required={false}
                  rules={[
                    {
                      required: true,
                      message: "Please input your appointment time!",
                    },
                  ]}
                >
                  <TimePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <h4>Address Information</h4>
            <Row gutter={[10, 16]}>
              <Col span={5}>
                <Form.Item
                  name="patientAddress"
                  label="Address 1"
                  required={false}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item name="patientCity" label="City" required={false}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <h4>Notes</h4>
            <Row gutter={[10, 16]}>
              <Col span={6}>
                <Form.Item
                  name="commentBefore"
                  label="Before appointment"
                  required={false}
                >
                  <TextArea autoSize={{ minRows: 3, maxRows: 4 }}></TextArea>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="commentAfter"
                  label="After appointment"
                  required={false}
                >
                  <TextArea autoSize={{ minRows: 3, maxRows: 4 }}></TextArea>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                style={{
                  marginLeft: "80%",
                  backgroundColor: red[3],
                  fontWeight: "bold",
                }}
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default CDPatientAppointment;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
