import React, { useState } from "react";
import Layout from "../../layout/Layout";

import styles from "./Records.module.scss";
import RecordsReminders from "./RecordsReminders";

export interface Reminder {
  reminder_type: string; //Rx Refill Soon, Rx Last Refill, Appt need to be scheduled
  doctor_name: string;
  important_date: string;
  service?: string;
  medication?: string;
}
const Records = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      reminder_type: "appointment",
      doctor_name: "Doctor Joe",
      important_date: "12/12/2012",
      service: "STD Testing",
    },
    {
      reminder_type: "prescription",
      important_date: "1/16/2019",
      doctor_name: "Doctor Joe",
      medication: "Ozempic",
    },
  ]);
  const view = () => (
    <div className={styles.Records}>
      <div className={styles.recordsHeader}>
        <h1>Records</h1>
        <button className={styles.addBtn}>+ ADD</button>
      </div>
      <RecordsReminders reminders={reminders} />
    </div>
  );

  return <Layout>{view()}</Layout>;
};

export default Records;