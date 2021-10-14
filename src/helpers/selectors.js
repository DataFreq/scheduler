const getInterview = (state, interview) => {
  return interview ? { ...interview, interviewer: state.interviewers[interview.interviewer] } : null;
}

const getAppointmentsForDay = (state, day) => {
  const arr = [];
  const filteredDay = state.days.filter(ele => ele.name === day);
  const filteredApps = filteredDay[0] ? filteredDay[0].appointments : arr;
  for (const app of filteredApps) {
    arr.push(state.appointments[app])
  }
  return arr;
};

const getInterviewersForDay = (state, day) => {
  const arr = [];
  const filteredDay = state.days.filter(ele => ele.name === day);
  const filteredInterviewers = filteredDay[0] ? filteredDay[0].interviewers : arr;
  for (const interview of filteredInterviewers) {
    arr.push(state.interviewers[interview])
  }
  return arr;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };