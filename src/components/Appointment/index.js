import React from "react";
import "./styles.scss"
import Confirm from "./Confirm"
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const CONFIRM = 'CONFIRM'
  const EMPTY = 'EMPTY';
  const ERROR = 'ERROR';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const EDIT = 'EDIT';
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const onAdd = () => transition(CREATE);
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    
    props.bookInterview(props.id, interview)
      .then(transition(SHOW))
  };
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd = {onAdd} />}
      {mode === SHOW && (
        <Show
          student = {props.interview.student}
          interviewer = {props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers = {props.interviewers}
          onCancel = {back}
          onSave = {save}
        />
      )}
      {mode === SAVING && <Status message="Saving"/>}
    </article>
  );
};