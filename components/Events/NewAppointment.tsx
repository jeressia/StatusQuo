import React, { useState } from "react";
import DatePicker, { ReactDatePicker } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Appointment } from "../../pages/dashboard";
import { NewEventProps } from "./NewTestResults";

function NewAppointment(props: NewEventProps) {
  const { onSubmitEvent } = props;
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [purpose, setPurpose] = useState("");
  const [doctor, setDoctor] = useState("");

  const appointmentToCreate: Appointment = {
    id: null,
    appointment_title: title,
    appointment_end_at: endDate,
    appointment_start_at: startDate,
    appointment_purpose: purpose,
    appointment_doctor: doctor,
  };

  return (
    <form>
      <div className="form-group row">
        <label htmlFor="AppointmentTitle" className="col-sm-3">
          Appointment Title
        </label>
        <div className="col-sm-9">
          <input
            id="AppointmentTitle"
            type="text"
            className="form-control"
            placeholder="Partner Name"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="StartDate" className="col-sm-3">
          Start Time
        </label>
        <div className="col-sm-9">
          <DatePicker
            id="StartDate"
            showIcon
            isClearable
            showTimeSelect
            selected={startDate}
            timeFormat={"HH"}
            onChange={(date: Date) => setStartDate(date)}
            showFourColumnMonthYearPicker
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="EndDate" className="col-sm-3">
          End Time
        </label>
        <div className="col-sm-9">
          <DatePicker
            id="EndDate"
            showIcon
            isClearable
            showTimeSelect
            selected={endDate}
            timeFormat={"HH"}
            onChange={(date: Date) => setEndDate(date)}
            showFourColumnMonthYearPicker
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Doctor" className="col-sm-3">
          Doctor
        </label>
        <div className="col-sm-9">
          <input
            id="Doctor"
            type="text"
            className="form-control"
            placeholder="Partner Number"
            onChange={(e) => setDoctor(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Purpose" className="col-sm-3">
          Purpose
        </label>
        <div className="col-sm-7">
          <input
            id="Purpose"
            type="text"
            className="form-control"
            placeholder="Partner Number"
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={(e: any) => {
          onSubmitEvent(e, "appointments", appointmentToCreate);
        }}
      >
        + Add
      </button>
    </form>
  );
}

export default NewAppointment;
