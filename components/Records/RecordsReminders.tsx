import React from "react";
import { Reminder } from "../../types/Interfaces";

import styles from "./Records.module.scss";

interface RecordsRemindersProps {
  reminders: Reminder[];
}

function RecordsReminders(props: RecordsRemindersProps) {
  const { reminders } = props;
  return (
    <div>
      <div className={styles.reminderCard}>
        <p className={styles.reminderCardTitle}>Reminder</p>
        <p className={styles.reminderCardSubtitle}>
          Don't forget to schedule upcoming appointments.
        </p>
        {reminders.length > 0 &&
          reminders.some(
            (reminder: Reminder) => reminder.reminder_type === "appointment"
          ) && (
            <div className={styles.reminderDoctorCard}>
              <img className={styles.doctorIcon} src="/doctor.svg" alt="" />
              <div className={styles.doctorCardText}>
                <p>Doctor Name: Doctor Name</p>
                <p>Service: Service Name</p>
                <p>Last Visit: Last Visit Date</p>
              </div>
            </div>
          )}
        {reminders.length > 0 &&
          reminders.some(
            (reminder: Reminder) => reminder.reminder_type === "prescription"
          ) && (
            <div className={styles.reminderPrescriptionCard}>
              <img className={styles.RxIcon} src="/prescription.svg" alt="" />
              <div className={styles.prescriptionCardText}>
                <p>Medication: Medication</p>
                <p>Prescribed by: Doctor Name</p>
                <p>Refill Date: Refill Date</p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default RecordsReminders;
