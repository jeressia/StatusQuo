import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { NewEventProps } from "./NewTestResults";

interface Medication {
  date_prescribed: Date;
  date_filled: Date;
  prescribing_doctor: string;
  medication_name: string;
  medication_dosage: string;
  medication_frequency: string;
  medication_method: string;
  day_supply: string;
}

function NewMedication(props: NewEventProps) {
  const { onSubmitEvent } = props;
  const [medicationName, setMedicationName] = useState("");
  const [datePrescribed, setDatePrescribed] = useState(new Date());
  const [dateFilled, setDateFilled] = useState(new Date());
  const [doctor, setDoctor] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [method, setMethod] = useState("");
  const [daySupply, setDaySupply] = useState("");

  const medicationToCreate: Medication = {
    date_prescribed: datePrescribed,
    date_filled: dateFilled,
    prescribing_doctor: doctor,
    medication_name: medicationName,
    medication_dosage: dosage,
    medication_frequency: frequency,
    medication_method: method,
    day_supply: daySupply,
  };

  return (
    <form>
      <div className="form-group row">
        <label htmlFor="AppointmentTitle" className="col-sm-3">
          Medication Name
        </label>
        <div className="col-sm-9">
          <input
            id="AppointmentTitle"
            type="text"
            className="form-control"
            placeholder="Partner Name"
            onChange={(e) => setMedicationName(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Purpose" className="col-sm-3">
          Medication Dosage
        </label>
        <div className="col-sm-7">
          <input
            id="Purpose"
            type="text"
            className="form-control"
            placeholder="Partner Number"
            onChange={(e) => setDosage(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Purpose" className="col-sm-3">
          Medication Frequency
        </label>
        <div className="col-sm-7">
          <input
            id="Purpose"
            type="text"
            className="form-control"
            placeholder="Partner Number"
            onChange={(e) => setFrequency(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Purpose" className="col-sm-3">
          Day Supply
        </label>
        <div className="col-sm-7">
          <input
            id="Purpose"
            type="text"
            className="form-control"
            placeholder="Partner Number"
            onChange={(e) => setDaySupply(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="StartDate" className="col-sm-3">
          Date Prescribed{" "}
        </label>
        <div className="col-sm-9">
          <DatePicker
            id="StartDate"
            showIcon
            isClearable
            showTimeSelect
            selected={datePrescribed}
            timeFormat={"HH"}
            onChange={(date: Date) => setDatePrescribed(date)}
            showFourColumnMonthYearPicker
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="EndDate" className="col-sm-3">
          Date Filled
        </label>
        <div className="col-sm-9">
          <DatePicker
            id="EndDate"
            showIcon
            isClearable
            showTimeSelect
            selected={dateFilled}
            timeFormat={"HH"}
            onChange={(date: Date) => setDateFilled(date)}
            showFourColumnMonthYearPicker
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Doctor" className="col-sm-3">
          Prescribing Doctor
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
      <button
        onClick={(e: any) => {
          console.log("button pressed");
          onSubmitEvent(e, "medications", medicationToCreate);
        }}
      >
        + Add
      </button>
    </form>
  );
}

export default NewMedication;
