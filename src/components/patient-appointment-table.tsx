import { FC, useEffect } from "react";
import { Empty, Space, Spin, Table, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { PatientAppointment } from "../model/patientAppointment";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { fetchPatientAppointments } from "../features/patient-appointment/patientAppointmentSlice";
import { geekblue, gold, red } from "@ant-design/colors";
import { BugOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const columns: ColumnsType<PatientAppointment> = [
  {
    title: "Name",
    dataIndex: "patientName",
    sorter: {
      compare: (a, b) => compareString(a.patientName, b.patientName),
      multiple: 3,
    },
  },
  {
    title: "Code",
    dataIndex: "uniqueCode",
    sorter: {
      compare: (a, b) => compareString(a.uniqueCode, b.uniqueCode),
      multiple: 3,
    },
  },
  {
    title: "Age",
    dataIndex: "patientAge",
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
    sorter: {
      compare: (a, b) =>
        compareString(a.patientAddress ?? "", b.patientAddress ?? ""),
      multiple: 1,
    },
  },
  {
    title: "Phone",
    dataIndex: "patientPhone",
    sorter: {
      compare: (a, b) =>
        compareString(a.patientPhone ?? "", b.patientPhone ?? ""),
      multiple: 2,
    },
  },
  {
    title: "Status",
    dataIndex: "appointmentStatus",
    sorter: {
      compare: (a, b) =>
        compareString(a.appointmentStatus ?? "", b.appointmentStatus ?? ""),
      multiple: 1,
    },
    filters: [
      { text: "rescheduled", value: "rescheduled" },
      { text: "passed", value: "passed" },
      { text: "missed", value: "missed" },
    ],
    onFilter: (value: string | number | boolean, record) => {
      switch (value) {
        case "rescheduled":
          return record.appointmentStatus === "rescheduled";
        case "passed":
          return record.appointmentStatus === "passed";
        case "missed":
          return record.appointmentStatus === "missed";
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
                color={geekblue[2]}
                style={{ color: geekblue[5] }}
                key={appointmentStatus}
              >
                '{appointmentStatus}'
              </Tag>
            </>
          );

        case "missed":
          return (
            <>
              <Tag
                color={red[2]}
                style={{ color: red[5] }}
                key={appointmentStatus}
              >
                '{appointmentStatus}'
              </Tag>
            </>
          );

        default:
          return (
            <>
              <Tag
                color={gold[2]}
                style={{ color: gold[5] }}
                key={appointmentStatus}
              >
                '{appointmentStatus}'
              </Tag>
            </>
          );
      }
    },
  },
  {
    title: "Action",
    fixed: "right",
    width: 100,
    render: (_, appointment) => (
      <Link to={`edit-appointment/${appointment.id}`}>edit</Link>
    ),
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
      pagination={false}
    />
  );
};

export default PatientAppointmentTable;
function compareString(a: string, b: string) {
  return a > b ? -1 : a === b ? 0 : 1;
}
