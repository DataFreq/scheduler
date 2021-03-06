import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(res => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data}))
    });
  }, []);

  const setDay = day => setState({ ...state, day })
  const updateSpots = newApps => {
    return state.days.map(day => {
      let spots = 0;

      for (const app of day.appointments) {
        if (!newApps[app].interview) spots++
      }
      return {...day, spots: spots}
    })
  }

  const bookInterview = (id, interview) => {
    const appointment = {...state.appointments[id], interview: {...interview}};
    const appointments = {...state.appointments, [id]: appointment}
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(setState({...state, appointments, days: updateSpots(appointments)}))
  }

  const cancelInterview = id => {
    const appointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: appointment};
    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then(setState({...state, appointments, days: updateSpots(appointments)}))
  };
  

  return {state, setDay, bookInterview, cancelInterview};
};


