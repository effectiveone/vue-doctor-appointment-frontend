import { createStore } from 'vuex';
import doctorsModule from './modules/doctors/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    doctors: doctorsModule,
    auth: authModule,
  },
});

export default store;
