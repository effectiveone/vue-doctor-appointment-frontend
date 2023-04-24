<template>
  <div>
    <h1>Doctor Appointments</h1>
    <!-- <div v-if="loading">Loading...</div> -->
    <div >
      <ul>
        <li v-for="appointment in appointments" :key="appointment._id">
          <router-link :to="{ name: 'Appointment', params: { id: appointment._id } }">
            {{ appointment.date }} - {{ appointment.userInfo.firstName }} {{ appointment.userInfo.lastName }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorAppointments',
  computed: {
    appointments() {
      return this.$store.getters.appointments;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  mounted() {
    this.$store.dispatch('fetchAppointmentsByDoctorId', {
      id: this.$store.getters.currentDoctor._id,
    });
  },
};
</script>
