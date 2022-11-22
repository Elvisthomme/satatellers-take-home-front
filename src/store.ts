import { configureStore } from "@reduxjs/toolkit";

import patientAppointmentSlice from "./features/patient-appointment/patientAppointmentSlice";

const store = configureStore({
  reducer: patientAppointmentSlice,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
