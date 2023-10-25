import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface PartnerStatus {
  id: number;
  statusName: string;
}

function NewSex() {
  const [startDate, setStartDate] = useState(new Date());
  const [partnerName, setPartnerName] = useState("");
  const [partnerNumber, setPartnerNumber] = useState("");
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>();
  const [protectedSex, setProtectedSex] = useState(false);
  return (
    <div className="add-data input-group input-group-sm mb-3">
      <div className="field-row">
        Date
        <DatePicker
          showIcon
          isClearable
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          showFourColumnMonthYearPicker
        />
      </div>
      <div className="field-row">
        <input
          type="text"
          placeholder="Partner"
          onChange={(e) => setPartnerName(e.target.value)}
        />
      </div>
      <div className="field-row">
        <input
          type="text"
          placeholder="Partner"
          onChange={(e) => setPartnerNumber(e.target.value)}
        />
      </div>
      <div className="field-row">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Partner Status
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">
              Action
            </a>
            <a className="dropdown-item" href="#">
              Another action
            </a>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </div>{" "}
      </div>
      <div className="field-row">
        <input type="text" placeholder="Protected?" />
      </div>
    </div>
  );
}

export default NewSex;
