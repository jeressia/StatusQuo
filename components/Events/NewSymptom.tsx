import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { storage } from "../../utils/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";

import { NewEventProps } from "./NewTestResults";
import { Symptom } from "../../types/Interfaces";
import { useUser } from "../UserProvider";

function NewSymptoms(props: NewEventProps) {
  const { userId } = useUser();
  const { onSubmitEvent } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [symptomType, setSymptomType] = useState("");

  const symptomsToCreate: Symptom = {
    date_started: startDate,
    date_ended: endDate,
    photo_upload_url: imageUrl,
    type_of_symptom: symptomType,
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `images/${userId}/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Uploaded");
    });
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
            type="file"
            className="form-control"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setImageUpload(selectedFile);
              }
            }}
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
          uploadImage();
        }}
      >
        + Add
      </button>
    </form>
  );
}

export default NewSymptoms;
