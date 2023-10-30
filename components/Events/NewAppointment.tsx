import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Appointment } from "../../types/Interfaces";
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
        <label htmlFor="Purpose" className="col-sm-12">
          Appointment Purpose
        </label>
        <div className="col-sm-12">
          <input
            id="Purpose"
            type="text"
            className="form-control"
            placeholder="eg. Checkup"
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="StartDate" className="col-sm-12">
          Start Time
        </label>
        <div className="col-sm-12">
          <DatePicker
            id="StartDate"
            showIcon
            isClearable
            showTimeSelect
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            showFourColumnMonthYearPicker
            className="form-control"
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="EndDate" className="col-sm-12">
          End Time
        </label>
        <div className="col-sm-12">
          <DatePicker
            id="EndDate"
            showIcon
            isClearable
            showTimeSelect
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            showFourColumnMonthYearPicker
            className="form-control"
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Doctor" className="col-sm-12">
          Doctor
        </label>
        <div className="col-sm-12">
          <input
            id="Doctor"
            type="text"
            className="form-control"
            placeholder="eg. Doctor Moore"
            onChange={(e) => setDoctor(e.target.value)}
            required
          />
        </div>
      </div>
      <button
        className="btn btn-danger blue-btn"
        onClick={(e: any) => {
          onSubmitEvent(e, "appointments", appointmentToCreate);
        }}
      >
        Add New Appointment
      </button>
    </form>
  );
}

export default NewAppointment;
