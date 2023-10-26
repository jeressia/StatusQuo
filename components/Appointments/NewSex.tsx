import React, { useState } from "react";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import Form from "react-bootstrap/Form";

import "react-datepicker/dist/react-datepicker.css";
import { Appointment } from "../../pages/dashboard";
import { Timestamp } from "firebase/firestore/lite";

interface PartnerStatus {
  id: number;
  statusName: string;
}

interface SexualRelations {
  date_of_relations: Timestamp;
  isProtected: boolean;
  partner_name: string;
  partner_number: string;
  partner_status: string;
}

interface NewEventProps {
  onSubmitEvent: (
    e: React.FormEvent<HTMLFormElement>,
    collectionType: string,
    data: any
  ) => void;
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
        <div className="col-sm-9">
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
        <div className="col-sm-9">
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
        <div className="col-sm-9">
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
        <div className="col-sm-9">
          <select
            className="form-control"
            id="PartnerStatus"
            onChange={(e) => {
              const selectedStatusId = parseInt(e.target.value); // Parse the value to an integer
              const selectedStatusName =
                e.target.options[e.target.selectedIndex].text; // Get the selected option's text

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
        onClick={(e: any) =>
          onSubmitEvent(e, "sexual_relations", sexualRelationsToCreate)
        }
      >
        + Add
      </button>
    </form>
  );
}

export default NewSex;
