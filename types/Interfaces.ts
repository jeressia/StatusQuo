export interface Appointment {
  id: string | null;
  appointment_title: string;
  appointment_end_at: Date;
  appointment_start_at: Date;
  appointment_purpose: string;
  appointment_doctor: string;
}
