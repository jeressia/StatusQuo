import { Timestamp } from "firebase/firestore";

export interface Appointment {
  id: string | null;
  appointment_title: string;
  appointment_end_at?: Date | Timestamp;
  appointment_start_at?: Date | Timestamp;
  appointment_purpose: string;
  appointment_doctor: string;
}
