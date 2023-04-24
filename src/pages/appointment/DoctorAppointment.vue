<template>
  <div class="container">
    <h1>My Appointments</h1>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Doctor Name</th>
          <th>Address</th>
          <th>Fee</th>
          <th>Specialization</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appointment in appointments" :key="appointment.id">
          <td>{{ appointment.date }}</td>
          <td>{{ appointment.doctorInfo.firstName }} {{ appointment.doctorInfo.lastName }}</td>
          <td>{{ appointment.doctorInfo.address }}</td>
          <td>{{ appointment.doctorInfo.feePerCunsultation }}</td>
          <td>{{ appointment.doctorInfo.specialization }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  name: 'DoctorAppointments',
  computed: {
    appointments() {
      return this.$store.state.doctors.appointments;
    },
   
  },
  mounted() {
    this.$store.dispatch('doctors/fetchAppointmentsByUserId');
  },
};
</script>

<style>
.container {
  display: grid;
  place-items: center;
  gap: 20px;
}
table {
  border-collapse: separate;
  border-spacing: 20px;
}

</style>