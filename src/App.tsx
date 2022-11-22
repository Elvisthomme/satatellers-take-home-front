import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/useTypedSelector";
import { fetchPatientAppointments } from "./features/patient-appointment/patientAppointmentSlice";
import Home from "./views/home";

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPatientAppointments());
  }, [dispatch]);
  const {
    patientAppointmentData: data,
    error,
    isFetchingAppointment,
  } = useAppSelector((state) => state);
  console.log(data, error, isFetchingAppointment);
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
};

export default App;
