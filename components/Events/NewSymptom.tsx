import React, { useEffect, useState } from "react";
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
  const [symptomType, setSymptomType] = useState<string[]>([]);

  const addSymptomType = (symptom: string, checked: boolean) => {
    if (checked) {
      setSymptomType([...symptomType, symptom]);
    } else {
      setSymptomType(symptomType.filter((item) => item !== symptom));
    }
  };

  useEffect(() => {
    if (imageUpload) {
      uploadImage();
    }
  }, [imageUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("added image");
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageUpload(selectedFile);
      uploadImage();
    }
  };

  const uploadImage = async () => {
    console.log("uploadingImage");
    if (imageUpload === null) return;
    const imageRef = ref(
      storage,
      `images/${userId}/${imageUpload.name + v4()}`
    );
    await uploadBytes(imageRef, imageUpload)
      .then(() => {
        return getDownloadURL(imageRef); // Wait for the image URL
      })
      .then((url) => {
        alert("Image Uploaded");
        setImageUrl(url); // Set the URL after the image is fully uploaded
      })
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (imageUrl) {
      const symptomsToCreate: Symptom = {
        date_started: startDate,
        date_ended: endDate,
        photo_upload_url: imageUrl,
        type_of_symptom: symptomType,
      };
      onSubmitEvent(e, "symptoms", symptomsToCreate);
    } else {
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
            onChange={(e) => handleFileChange(e)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="EndDate" className="col-sm-3">
          Symptom Type
        </label>
        <div className="col-sm-9">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="inlineRadioOptions"
              id="itching"
              value="option1"
              checked={symptomType.includes("itching")}
              onChange={(e) => addSymptomType(e.target.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor="itching">
              Itching
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="inlineRadioOptions"
              id="burning"
              value="option2"
              checked={symptomType.includes("burning")}
              onChange={(e) => addSymptomType(e.target.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor="burning">
              Burning
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="inlineRadioOptions"
              id="rash"
              value="option3"
              checked={symptomType.includes("rash")}
              onChange={(e) => addSymptomType(e.target.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rash">
              Rash
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="inlineRadioOptions"
              id="odor"
              value="option1"
              checked={symptomType.includes("odor")}
              onChange={(e) => addSymptomType(e.target.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor="odor">
              Odor
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="inlineRadioOptions"
              id="discharge"
              value="option2"
              checked={symptomType.includes("discharge")}
              onChange={(e) => addSymptomType(e.target.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor="discharge">
              Discharge
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="inlineRadioOptions"
              id="abdominalpain"
              value="option3"
              checked={symptomType.includes("abdominalpain")}
              onChange={(e) => addSymptomType(e.target.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor="abdominalpain">
              Abdominal Pain
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="inlineRadioOptions"
              id="fatigue"
              value="option1"
              checked={symptomType.includes("fatigue")}
              onChange={(e) => addSymptomType(e.target.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor="fatigue">
              Fatigue
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="inlineRadioOptions"
              id="fever"
              value="option2"
              checked={symptomType.includes("fever")}
              onChange={(e) => addSymptomType(e.target.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor="fever">
              Fever
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="inlineRadioOptions"
              id="sorethroat"
              value="option3"
              checked={symptomType.includes("sorethroat")}
              onChange={(e) => addSymptomType(e.target.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor="sorethroat">
              Sore Throat
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="inlineRadioOptions"
              id="nightsweats"
              value="option3"
              checked={symptomType.includes("nightsweats")}
              onChange={(e) => addSymptomType(e.target.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor="nightsweats">
              Night Sweats
            </label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="inlineRadioOptions"
                id="lymph"
                value="option3"
                checked={symptomType.includes("lymph")}
                onChange={(e) => addSymptomType(e.target.id, e.target.checked)}
              />
              <label className="form-check-label" htmlFor="lymph">
                Swollen Lymph Nodes
              </label>
            </div>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="inlineRadioOptions"
              id="diarrhea"
              value="option3"
              checked={symptomType.includes("diarrhea")}
              onChange={(e) => addSymptomType(e.target.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor="diarrhea">
              Diarrhea
            </label>
          </div>
        </div>
      </div>
      <button
        className="btn btn-danger blue-btn"
        onClick={(e: any) => {
          handleSubmit(e);
        }}
      >
        Add New Appointment
      </button>
    </form>
  );
}

export default NewSymptoms;
