export interface PatientAppointment {
  id: number;
  uniqueCode: string;
  patientName: string;
  patientPhone: string | null | undefined;
  patientAddress: string | null | undefined;
  patientCity: string | null | undefined;
  patientEmail: string;
  patientAge: number;
  patientSex: string;
  isFirstTime: boolean;
  commentBefore: string;
  commentAfter: string;
  appointmentStatus: string;
  appointmentDate: Date;
  appointmentTime: Date;
  bookingDate: Date;
}
