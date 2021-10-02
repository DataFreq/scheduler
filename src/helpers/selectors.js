const getAppointmentsForDay = (state, day) => {
  const dayArr = [];
  const appArr = [];
  for (const dayState of state.days) {
    if (dayState.appointments.length === 0) {
      return dayArr;
    }
    if (dayState.name === day) {
      dayArr.push(...dayState.appointments);
    }
  }

  for (const appointment in state.appointments) {
    for (const day of dayArr) {
      if (day === parseInt(appointment)) {
        appArr.push(state.appointments[appointment]);
      }
    }
  }
  return appArr;
};

const getInterview = (state, interview) => {
  const obj = {};
  if (interview) {
    for (const i in state.interviewers) {
      if (state.interviewers[i].id === parseInt(interview.interviewer)) {
        obj.student = interview.student;
        obj.interviewer = state.interviewers[i];
      }
    }
  } else {
    return null;
  }
}

const getInterviewersForDay = (state, day) => {
  const dayArr = [];
  const interviewerArr = [];
  for (const dayState of state.days) {
    if (dayState.interviewers.length === 0) {
      return dayArr;
    }
    if (dayState.name === day) {
      dayArr.push(...dayState.interviewers);
    }
  }

  for (const interviewer in state.interviewers) {
    for (const day of dayArr) {
      if (day === parseInt(interviewer)) {
        interviewerArr.push(state.interviewers[interviewer]);
      }
    }
  }
  return interviewerArr;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };