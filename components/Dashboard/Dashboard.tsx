import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Layout from "../../layout/Layout";

import { Appointment } from "../../types/Interfaces";
import AppointmentView from "../Events/EventView";

import styles from "./Dashboard.module.scss";
import QRView from "../QR/QRView";

interface DashboardProps {
  user: any;
  userId: string | null;
  appointments: Appointment[];
  setAppointments: Dispatch<SetStateAction<Appointment[]>>;
}

const Dashboard = (props: DashboardProps) => {
  const { appointments, user, userId, setAppointments } = props;
  const [loading, setLoading] = useState(false);
  console.log(userId);
  const view = () =>
    loading ? (
      <div>Loading...</div>
    ) : (
      <div className={styles.dashboard}>
        <div className={styles.greeting}>
          <p>Hello, {user.name ? user.name : "New User"}! </p>
        </div>
        <AppointmentView
          appointments={appointments}
          userId={userId}
          setAppointments={setAppointments}
        />
        <QRView />
      </div>
    );

  return <Layout>{view()}</Layout>;
};

export default Dashboard;
