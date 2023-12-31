import React, { useState } from "react";
import Layout from "../Layout";

import RecordsReminders from "./RecordsReminders";
import Link from "next/link";
import AllRecords from "./AllRecords";
import Prescriptions from "./Prescriptions";
import { useUser } from "../UserProvider";

import styles from "./Records.module.scss";
import { Reminder } from "../../types/Interfaces";

const Records = () => {
  const { hiv, herpes } = useUser();

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
        <h1>All Records</h1>
        <Link className={styles.addNewBtn} href={`/addnew`}>
          + Add
        </Link>
      </div>
      <RecordsReminders reminders={reminders} />
      {(hiv || herpes) && <Prescriptions />}
      <AllRecords />
    </div>
  );

  return <Layout>{view()}</Layout>;
};

export default Records;
