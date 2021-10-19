import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [err, setErr] = useState("");

  function reset() {
    setName("");
    setErr("");
    setInterviewer(null);
  };

  function cancel() {
    reset();
    onCancel();
  }

  function onChange(event) {
    setName(event.target.value);
  }

  function validate() {
    if (name === "") {
      setErr("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setErr("Please select an interviewer");
      return;
    }
    if (name && interviewer) {
      setErr("");
      onSave(name, interviewer);
      return;
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={onChange}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{err}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button confirm onClick={validate}>Save</Button>
          <Button danger onClick={cancel}>Cancel</Button>
        </section>
      </section>
    </main>
  );
}
