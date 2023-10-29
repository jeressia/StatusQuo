import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { storage } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageUpload(selectedFile);
      uploadImage(); // Initiate the upload when a file is selected
    }
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `images/${userId}/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          alert("Image Uploaded");
          setImageUrl(url);
        })
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent the form from submitting by default

    // Check if the image has been uploaded and its URL is available
    if (imageUrl) {
      const symptomsToCreate: Symptom = {
        date_started: startDate,
        date_ended: endDate,
        photo_upload_url: imageUrl,
        type_of_symptom: symptomType,
      };
      onSubmitEvent(e, "symptoms", symptomsToCreate);
    } else {
      // Handle the case where the image hasn't been uploaded yet
      alert("Please wait for the image to finish uploading.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
        <label htmlFor="StartDate" className="col-sm-3">
          Symptom Onset
        </label>
        <div className="col-sm-9">
          <DatePicker
            id="StartDate"
            showIcon
            isClearable
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            showFourColumnMonthYearPicker
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="End Date" className="col-sm-3">
          Symptom End
        </label>
        <div className="col-sm-9">
          <DatePicker
            id="EndDate"
            showIcon
            isClearable
            selected={endDate}
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
            onChange={handleFileChange}
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
      <button type="submit">+ Add</button>
    </form>
  );
}

export default NewSymptoms;

// Itching, Burning, Odor, Rash, Discharge, Abdominal Pain, Fatigue, Fever, Sore Throat, Night Sweats, Diarrhea, Swollen Lymph Nodes,
