import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";

import "react-datepicker/dist/react-datepicker.css";
import { Appointment } from "../../types/Interfaces";
import { Timestamp } from "firebase/firestore/lite";
import { NewEventProps } from "./NewTestResults";

interface PartnerStatus {
  id: number;
  statusName: string;
}

function NewSex(props: NewEventProps) {
  const { onSubmitEvent } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [partnerName, setPartnerName] = useState("");
  const [partnerNumber, setPartnerNumber] = useState("");
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>();
  const [protectedSex, setProtectedSex] = useState(false);

  const sexualRelationsToCreate = {
    date_of_relations: startDate,
    isProtected: protectedSex,
    partner_name: partnerName,
    partner_number: partnerNumber,
    partner_status: partnerStatus,
  };

  const handleToggle: React.ChangeEventHandler<HTMLInputElement> = () => {
    setProtectedSex((prevState) => !prevState);
  };

  return (
    <form>
      <div className="form-group row">
        <label htmlFor="Date" className="col-sm-3">
          Date
        </label>
        <div className="col-sm-12">
          <DatePicker
            id="Date"
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
        <label htmlFor="PartnerName" className="col-sm-3">
          Partner Name
        </label>
        <div className="col-sm-12">
          <input
            id="PartnerName"
            type="text"
            className="form-control"
            placeholder="Partner Name"
            onChange={(e) => setPartnerName(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="PartnerNumber" className="col-sm-3">
          Partner Number
        </label>
        <div className="col-sm-12">
          <input
            id="PartnerNumber"
            type="text"
            className="form-control"
            placeholder="Partner Number"
            onChange={(e) => setPartnerNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="PartnerStatus" className="col-sm-3">
          Partner Status
        </label>
        <div className="col-sm-12">
          <select
            className="form-control"
            id="PartnerStatus"
            onChange={(e) => {
              const selectedStatusId = parseInt(e.target.value);
              const selectedStatusName =
                e.target.options[e.target.selectedIndex].text;

              setPartnerStatus({
                id: selectedStatusId,
                statusName: selectedStatusName,
              });
            }}
          >
            <option value={1}>Unknown</option>
            <option value={2}>Clear</option>
            <option value={3} disabled>
              Clear Verified
            </option>
            <option value={4}>Herpes+</option>
            <option value={5}>HIV+</option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="protected-switch" className="col-sm-3">
          Protected?
        </label>
        <div className="col-sm-7">
          <Form.Check
            type="switch"
            id="protected-switch"
            onChange={handleToggle}
          />
        </div>
      </div>
      <button
        className="btn btn-danger blue-btn"
        onClick={(e: any) =>
          onSubmitEvent(e, "sexual_relations", sexualRelationsToCreate)
        }
      >
        Add New Sexual Activity
      </button>
    </form>
  );
}

export default NewSex;
