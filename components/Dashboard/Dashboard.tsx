import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Layout from "../Layout";

import { Appointment } from "../../types/Interfaces";
import AppointmentView from "../Events/EventView";

import styles from "./Dashboard.module.scss";
import QRView from "../QR/QRView";
import { useUser } from "../UserProvider";
import Loader from "../Loader";

interface DashboardProps {
  user: any;
  userId: string | null;
  appointments: Appointment[];
  setAppointments: Dispatch<SetStateAction<Appointment[]>>;
}

const Dashboard = (props: DashboardProps) => {
  const { userProfile, firebaseLoaded } = useUser();
  const { appointments, user, userId, setAppointments } = props;

  const view = () =>
    !firebaseLoaded ? (
      <Loader />
    ) : (
      <div className={styles.dashboard}>
        <div className={styles.greeting}>
          <p>
            Hello, {userProfile?.user_name ? user.displayName : "New User"}!
          </p>
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
