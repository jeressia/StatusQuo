import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";

import "react-datepicker/dist/react-datepicker.css";
import { TestResult } from "../../types/Interfaces";
import { useUser } from "../UserProvider";

export interface NewEventProps {
  onSubmitEvent: (
    e: React.FormEvent<HTMLFormElement>,
    collectionType: string,
    data: any
  ) => void;
}

function NewTestResults(props: NewEventProps) {
  const { onSubmitEvent } = props;
  const { hiv, herpes, setHIV, setHerpes } = useUser();
  const [testDate, setTestDate] = useState(new Date());
  const [chlamydia, setChlamydia] = useState(false);
  const [gonorrhea, setGonorrhea] = useState(false);
  const [hepC, setHepC] = useState(false);
  const [syphillis, setSyphillis] = useState(false);
  const [trich, setTrich] = useState(false);
  const [hpv, setHPV] = useState(false);

  const resultsToCreate: TestResult = {
    date_of_test: testDate,
    chlamydia: chlamydia,
    gonorrhea: gonorrhea,
    hep_c: hepC,
    herpes: herpes,
    hiv: hiv,
    syphillis: syphillis,
    trich: trich,
    hpv: hpv,
  };

  const stateSetterFunctions: Record<
    string,
    React.Dispatch<React.SetStateAction<any>>
  > = {
    chlamydia: setChlamydia,
    gonorrhea: setGonorrhea,
    hepC: setHepC,
    herpes: setHerpes,
    hiv: setHIV,
    syphillis: setSyphillis,
    trich: setTrich,
    hpv: setHPV,
  };

  const handleToggle = (stateVariableName: string) => {
    const setState: any = stateSetterFunctions[stateVariableName];

    if (setState) {
      setState((prevState: any) => !prevState);
    } else {
      console.error(`State variable ${stateVariableName} not found`);
    }
  };

  const handleWarning = (e: any) => {
    if (
      confirm(
        "Warning! Many states have laws against knowingly exposing another to HIV and or an STIs. Punishments ranges from fines to prison time. Only add these results if they are correct."
      )
    ) {
      onSubmitEvent(e, "test_results", resultsToCreate);
    } else e.preventDefault();
  };

  return (
    <form>
      <div className="form-group row">
        <label htmlFor="TestDate" className="col-sm-12">
          Date of Test
        </label>
        <div className="col-sm-12">
          <DatePicker
            id="StartDate"
            showIcon
            isClearable
            showTimeSelect
            selected={testDate}
            timeFormat={"HH:MM:SS"}
            onChange={(date: Date) => setTestDate(date)}
            showFourColumnMonthYearPicker
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="EndDate" className="col-sm-3">
          Chlamydia
        </label>
        <div className="col-sm-9">
          <Form.Check
            type="switch"
            id="protected-switch"
            onChange={() => handleToggle("chlamydia")}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Doctor" className="col-sm-3">
          Gonorrhea
        </label>
        <div className="col-sm-9">
          <Form.Check
            type="switch"
            id="protected-switch"
            onChange={() => handleToggle("gonorrhea")}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Purpose" className="col-sm-3">
          Hep C
        </label>
        <div className="col-sm-7">
          <Form.Check
            type="switch"
            id="protected-switch"
            onChange={() => handleToggle("hepC")}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Purpose" className="col-sm-3">
          Herpes
        </label>
        <div className="col-sm-7">
          <Form.Check
            type="switch"
            id="protected-switch"
            onChange={() => handleToggle("herpes")}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Purpose" className="col-sm-3">
          HIV
        </label>
        <div className="col-sm-7">
          <Form.Check
            type="switch"
            id="protected-switch"
            onChange={() => handleToggle("hiv")}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Purpose" className="col-sm-3">
          Syphillis
        </label>
        <div className="col-sm-7">
          <Form.Check
            type="switch"
            id="protected-switch"
            onChange={() => handleToggle("syphillis")}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="Purpose" className="col-sm-3">
          Trichomoniasis
        </label>
        <div className="col-sm-7">
          <Form.Check
            type="switch"
            id="protected-switch"
            onChange={() => handleToggle("trich")}
          />
        </div>
      </div>
      <button
        className="btn btn-danger blue-btn"
        onClick={(e: any) => {
          handleWarning(e);
        }}
      >
        Add New Sexual Activity
      </button>
    </form>
  );
}

export default NewTestResults;
