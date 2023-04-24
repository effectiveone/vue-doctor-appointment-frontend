import axios from 'axios';

export default {
  async fetchAllDoctors({ commit }) {
    const response = await axios.get(
      'http://localhost:5002/api/app/get-all-doctors'
    );
    const responseData = response.data;

    // if (!response.success) {
    //   const error = new Error(
    //     responseData.message || 'Failed to fetch all doctors.'
    //   );
    //   throw error;
    // }

    commit('setDoctors', responseData.data);
  },

  async updateAppointment({ commit }, payload) {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(
        `http://localhost:5002/api/app/${payload.id}/appointments`,
        payload.data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = response.data;

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to update appointment.'
        );
        throw error;
      }

      commit('updateAppointment', responseData.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async fetchAppointmentsByDoctorId({ commit }, payload) {
    const response = await axios.get(
      `http://localhost:5002/api/app/${payload.id}/appointments`
    );
    const responseData = response.data;

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch appointments by doctor id.'
      );
      throw error;
    }

    commit('setAppointments', responseData.data);
  },

  async fetchDoctorById({ commit }, payload) {
    console.log('payload', payload);
    const response = await axios.post(
      `http://localhost:5002/api/app/${payload}/profile`
    );
    const responseData = response.data;

    console.log('responseData', responseData);
    // if (!response.ok) {
    //   const error = new Error(
    //     responseData.message || 'Failed to fetch doctor by id.'
    //   );
    //   throw error;
    // }

    commit('setCurrentDoctor', responseData.data);
  },

  async updateDoctorProfile({ commit }, payload) {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      'http://localhost:5002/api/app/profile',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = response.data;

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to update doctor profile.'
      );
      throw error;
    }

    commit('setCurrentDoctor', responseData.data);
  },

  async changeAppointmentStatus(context, payload) {
    const response = await axios.patch(
      `http://localhost:5002/api/app/appointments/${payload.id}`,
      {
        status: payload.status,
      }
    );

    const responseData = response.data;

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to update appointment status.'
      );
      throw error;
    }

    // update the appointments list in the state
    context.dispatch('fetchAppointmentsByDoctorId', {
      id: context.getters.currentDoctor._id,
    });
  },
};
