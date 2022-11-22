import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PatientAppointment } from "../../model/patientAppointment";

const baseUrl = "http://localhost:8000/api/patient-appointment";

interface PatientAppointmentState {
  isFetchingAppointment: boolean;
  error: string | null;
  isCreatingAppointment: boolean;
  isUpdatingAppointment: boolean;
  patientAppointmentData: PatientAppointmentData | null;
}

interface PatientAppointmentData {
  data: PatientAppointment[] | null;
  total: number;
  missed: number;
  passed: number;
  rescheduled: number;
}
const initialState = {
  isFetchingAppointment: false,
  isCreatingAppointment: false,
  isUpdatingAppointment: false,
  error: null,
  patientAppointmentData: null,
} as PatientAppointmentState;

export const fetchPatientAppointments = createAsyncThunk(
  "get/patientAppointment",
  async (data, thunkApi) => {
    try {
      const response = await axios.get<PatientAppointmentData>(baseUrl);
      return response.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
export const createPatientAppointment = createAsyncThunk(
  "create/patientAppointment",
  async (data: PatientAppointment, thunkApi) => {
    try {
      const response = await axios.post<PatientAppointment>(baseUrl, data);
      return response.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
export const updatePatientAppointment = createAsyncThunk(
  "update/patientAppointment",
  async (data: PatientAppointment, thunkApi) => {
    try {
      const response = await axios.put<PatientAppointment>(baseUrl, data);
      return response.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
//Slice
const patientAppointmentsSlice = createSlice({
  name: "patientAppointment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPatientAppointments.pending, (state, action) => {
        state.isFetchingAppointment = true;
      })
      .addCase(
        fetchPatientAppointments.fulfilled,
        (state, action: PayloadAction<PatientAppointmentData>) => {
          state.isFetchingAppointment = false;
          state.patientAppointmentData = action.payload;
        }
      )
      .addCase(
        fetchPatientAppointments.rejected,
        (state, action: PayloadAction<any>) => {
          state.isFetchingAppointment = false;
          state.error = action.payload;
        }
      )

      .addCase(createPatientAppointment.pending, (state, action) => {
        state.isCreatingAppointment = true;
      })
      .addCase(
        createPatientAppointment.fulfilled,
        (state, action: PayloadAction<PatientAppointment>) => {
          state.isCreatingAppointment = false;
          if ((state.patientAppointmentData?.data?.length ?? 0) >= 0) {
            state.patientAppointmentData!.data!.push(action.payload);
          } else {
            state.patientAppointmentData!.data = [action.payload];
            state.patientAppointmentData!.total = 1;
            state.patientAppointmentData!.rescheduled = 1;
          }
        }
      )
      .addCase(
        createPatientAppointment.rejected,
        (state, action: PayloadAction<any>) => {
          state.isCreatingAppointment = false;
          state.error = action.payload;
        }
      )

      .addCase(updatePatientAppointment.pending, (state, action) => {
        state.isFetchingAppointment = true;
      })
      .addCase(
        updatePatientAppointment.fulfilled,
        (state, action: PayloadAction<PatientAppointment>) => {
          state.isFetchingAppointment = false;
          let patientAppointment = state.patientAppointmentData?.data?.find(
            (value) => value.id === action.payload.id
          );
          if (patientAppointment) {
            patientAppointment = action.payload;
          }
        }
      )
      .addCase(
        updatePatientAppointment.rejected,
        (state, action: PayloadAction<any>) => {
          state.isFetchingAppointment = false;
          state.error = action.payload;
        }
      );
  },
});

export default patientAppointmentsSlice.reducer;
