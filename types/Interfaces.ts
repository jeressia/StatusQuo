import { Timestamp } from "firebase/firestore";

export interface Appointment {
  id: string | null;
  appointment_title: string;
  appointment_end_at?: Date | Timestamp;
  appointment_start_at?: Date | Timestamp;
  appointment_purpose: string;
  appointment_doctor: string;
}

export interface SexualRelations {
  date_of_relations: Timestamp;
  isProtected: boolean;
  partner_name: string;
  partner_number: string;
  partner_status: string;
}

export interface TestResult {
  date_of_test: Date;
  test_type: string;
  chlamydia: boolean;
  gonorrhea: boolean;
  hep_c: boolean;
  herpes: boolean;
  hiv: boolean;
  syphillis: boolean;
  trich: boolean;
  hpv: boolean;
}

export interface Symptom {
  date_started: Date;
  date_ended: Date;
  photo_upload_url: string;
  type_of_symptom: string;
}
