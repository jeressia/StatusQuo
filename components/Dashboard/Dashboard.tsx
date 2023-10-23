import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "firebase/auth";
import Layout from "../../layout/Layout";

import { Appointment } from "../../pages/dashboard";
import AppointmentView from "../Appointments/AppointmentView";

import styles from "./Dashboard.module.scss";
import QRView from "../QR/QRView";

interface DashboardProps {
  user: string | null;
  userId: string | null;
  appointments: Appointment[];
  setAppointments: Dispatch<SetStateAction<Appointment[]>>;
}

const Dashboard = (props: DashboardProps) => {
  const { user, appointments, userId, setAppointments } = props;
  const [loading, setLoading] = useState(false);

  const view = () =>
    loading ? (
      <div>Loading...</div>
    ) : (
      <div className={styles.dashboard}>
        <div className={styles.greeting}>
          <p>Hello, {user}! </p>
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
