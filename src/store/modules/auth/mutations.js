export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.type = payload.type;
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
  setIsDoctor(state) {
    state.IsDoctor = true;
  },
};
