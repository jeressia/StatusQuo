import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { NewEventProps } from "./NewTestResults";

interface Symptom {
  date_started: Date;
  date_ended: Date;
  photo_upload_url: string;
  type_of_symptom: string;
}

function NewSymptoms(props: NewEventProps) {
  const { onSubmitEvent } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [imgUrl, setImgUrl] = useState("");
  const [symptomType, setSymptomType] = useState("");

  const symptomsToCreate: Symptom = {
    date_started: startDate,
    date_ended: endDate,
    photo_upload_url: imgUrl,
    type_of_symptom: symptomType,
  };

  return (
    <form>
      <div className="form-group row">
        <label htmlFor="StartDate" className="col-sm-3">
          Start of Symptom
        </label>
        <div className="col-sm-9">
          <DatePicker
            id="StartDate"
            showIcon
            isClearable
            showTimeSelect
            selected={startDate}
            timeFormat={"HH:MM:SS"}
            onChange={(date: Date) => setStartDate(date)}
            showFourColumnMonthYearPicker
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="End Date" className="col-sm-3">
          Start of Symptom
        </label>
        <div className="col-sm-9">
          <DatePicker
            id="EndDate"
            showIcon
            isClearable
            showTimeSelect
            selected={endDate}
            timeFormat={"HH:MM:SS"}
            onChange={(date: Date) => setEndDate(date)}
            showFourColumnMonthYearPicker
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="AppointmentTitle" className="col-sm-3">
          Upload Image
        </label>
        <div className="col-sm-9">
          <input
            id="AppointmentTitle"
            type="text"
            className="form-control"
            placeholder="Partner Name"
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="EndDate" className="col-sm-3">
          Symptom Type
        </label>
        <div className="col-sm-9">
          <input
            type="switch"
            id="protected-switch"
            onChange={(e) => setSymptomType(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={(e: any) => {
          onSubmitEvent(e, "symptoms", symptomsToCreate);
        }}
      >
        + Add
      </button>
    </form>
  );
}

export default NewSymptoms;
