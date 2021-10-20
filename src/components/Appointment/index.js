import React from "react";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";

const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EMPTY = "EMPTY";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";
const SAVING = "SAVING";
const SHOW = "SHOW";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => transition(CREATE);

  // DELETE AN INTERVIEW
  const onConfirm = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  // CREATE AN INTERVIEW
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
  bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={onConfirm}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
          name={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === ERROR_SAVE && <Error message="Could not save" onClose={back} /> }
      {mode === ERROR_DELETE && <Error message="could not delete appointment" onClose={back} /> }
    </article>
  );
}
