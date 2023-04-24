export default {
  setDoctors(state, payload) {
    state.doctors = payload;
  },

  setCurrentDoctor(state, payload) {
    state.currentDoctor = payload;
  },

  setAppointments(state, payload) {
    state.appointments = payload;
  },
};
