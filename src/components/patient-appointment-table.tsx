import { FC, useEffect } from "react";
import { Empty, Space, Spin, Table, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { PatientAppointment } from "../model/patientAppointment";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { fetchPatientAppointments } from "../features/patient-appointment/patientAppointmentSlice";
import { green, red } from "@ant-design/colors";
import { BugOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const columns: ColumnsType<PatientAppointment> = [
  {
    title: "Name",
    dataIndex: "patientName",
    width: "25%",
    sorter: {
      compare: (a, b) => compareString(a.patientName, b.patientName),
      multiple: 3,
    },
    render: (_, appointment) => (
      <Link
        style={{ color: "unset", fontSize: "12px" }}
        to={`edit-appointment/${appointment.id}`}
      >
        {appointment.patientName}
      </Link>
    ),
  },
  {
    title: "Code",
    dataIndex: "uniqueCode",
    width: "15%",
    sorter: {
      compare: (a, b) => compareString(a.uniqueCode, b.uniqueCode),
      multiple: 3,
    },
    render: (_, appointment) => (
      <Link
        style={{ color: "unset", fontSize: "12px" }}
        to={`edit-appointment/${appointment.id}`}
      >
        {appointment.uniqueCode}
      </Link>
    ),
  },
  {
    title: "Age",
    dataIndex: "patientAge",
    width: "20%",
    sorter: {
      compare: (a, b) => a.patientAge - b.patientAge,
      multiple: 2,
    },
    filters: [
      { text: "0 - 5", value: 5 },
      { text: "6 - 12", value: 12 },
      { text: "13 - 21", value: 21 },
      { text: "22 - 35", value: 35 },
      { text: "36 - 55", value: 55 },
      { text: "56 - 79", value: 79 },
      { text: "79 and more", value: 80 },
    ],
    onFilter: (value: string | number | boolean, record) => {
      switch (value) {
        case 5:
          return (
            record.patientAge !== undefined &&
            record.patientAge !== null &&
            record.patientAge <= 5 &&
            record.patientAge >= 0
          );
        case 12:
          return record.patientAge <= 12 && (record.patientAge ?? 0) > 5;
        case 21:
          return record.patientAge <= 21 && (record.patientAge ?? 0) > 12;
        case 35:
          return record.patientAge <= 35 && (record.patientAge ?? 0) > 21;
        case 55:
          return record.patientAge <= 55 && (record.patientAge ?? 0) > 36;
        case 79:
          return record.patientAge <= 79 && (record.patientAge ?? 0) > 55;
        case 80:
          return (record.patientAge ?? 0) >= 80;
        default:
          return false;
      }
    },
    ellipsis: true,
  },
  {
    title: "Address",
    dataIndex: "patientAddress",
    width: "25%",
    sorter: {
      compare: (a, b) =>
        compareString(a.patientAddress ?? "", b.patientAddress ?? ""),
      multiple: 1,
    },
  },
  {
    title: "Phone",
    dataIndex: "patientPhone",
    width: "20%",
    sorter: {
      compare: (a, b) =>
        compareString(a.patientPhone ?? "", b.patientPhone ?? ""),
      multiple: 2,
    },
  },
  {
    title: "Status",
    dataIndex: "appointmentStatus",
    width: "15%",
    sorter: {
      compare: (a, b) =>
        compareString(a.appointmentStatus ?? "", b.appointmentStatus ?? ""),
      multiple: 1,
    },
    filters: [
      { text: "rescheduled", value: "rescheduled" },
      { text: "passed", value: "passed" },
      { text: "missed", value: "missed" },
      { text: "pending", value: "pending" },
    ],
    onFilter: (value: string | number | boolean, record) => {
      switch (value) {
        case "rescheduled":
          return record.appointmentStatus === "rescheduled";
        case "passed":
          return record.appointmentStatus === "passed";
        case "missed":
          return record.appointmentStatus === "missed";
        case "pending":
          return record.appointmentStatus === "i";
        default:
          return false;
      }
    },
    ellipsis: true,
    render: (_, { appointmentStatus }) => {
      switch (appointmentStatus) {
        case "passed":
          return (
            <>
              <Tag
                style={{
                  fontWeight: "bold",
                  border: "none",
                  color: "#6a8272",
                  backgroundColor: "#edefee",
                }}
                key={appointmentStatus}
              >
                {appointmentStatus}
              </Tag>
            </>
          );

        case "missed":
          return (
            <>
              <Tag
                style={{
                  fontWeight: "bold",
                  border: "none",
                  color: "#db3748",
                  backgroundColor: "#fdefef",
                }}
                key={appointmentStatus}
              >
                {appointmentStatus}
              </Tag>
            </>
          );
        case "pending":
          return (
            <>
              <Tag
                style={{
                  color: green[5],
                  backgroundColor: "#edefee",
                  border: "none",
                }}
                key={appointmentStatus}
              >
                {appointmentStatus}
              </Tag>
            </>
          );

        default:
          return (
            <>
              <Tag
                style={{
                  fontWeight: "bold",
                  border: "none",
                  color: "#dca04f",
                  backgroundColor: "#fff4e9",
                }}
                key={appointmentStatus}
              >
                {appointmentStatus}
              </Tag>
            </>
          );
      }
    },
  },
];

const onChange: TableProps<PatientAppointment>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const PatientAppointmentTable: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPatientAppointments());
  }, [dispatch]);
  const { patientAppointmentData, error, isFetchingAppointment } =
    useAppSelector((state) => state);
  console.log(patientAppointmentData, error, isFetchingAppointment);

  if (isFetchingAppointment) {
    return (
      <div style={{ textAlign: "center" }}>
        <Space size="middle">
          <Spin />
        </Space>
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ textAlign: "center", color: red[2] }}>
        <BugOutlined style={{ fontSize: "5em" }} />
        <h1>error</h1>
        <h6>{error}</h6>
      </div>
    );
  }
  if ((patientAppointmentData?.data?.length ?? 0) === 0) {
    return (
      <div>
        <Empty />;
      </div>
    );
  }
  return (
    <Table
      columns={columns}
      dataSource={patientAppointmentData!.data!}
      onChange={onChange}
      pagination={{
        pageSize: 10,

        nextIcon: (
          <Link to={"create-appointment"}>
            {" "}
            <PlusOutlined
              style={{
                fontSize: "2.5em",
                boxShadow: "-0.5px 0.5px #888888",
                color: "white",
                backgroundColor: "#bc6370",
                borderRadius: "5px",
              }}
            />
          </Link>
        ),
      }}
    />
  );
};

export default PatientAppointmentTable;
function compareString(a: string, b: string) {
  return a > b ? -1 : a === b ? 0 : 1;
}
