<template>
  <div class="container">
    <h1>Doctor Form</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <h2>{{ doctor.firstName }} {{ doctor.lastName }}</h2>
      <form @submit.prevent="save">
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" :value="doctor?.firstName" @input="(event) => doctor.firstName = event.target.value" required>
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" :value="doctor?.lastName" @input="(event) => doctor.lastName = event.target.value" required>
        </div>
        <div>
          <label for="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" :value="doctor?.phoneNumber" @input="(event) => doctor.phoneNumber = event.target.value" required>
        </div>
        <div>
          <label for="website">Website:</label>
          <input type="text" id="website" :value="doctor?.website" @input="(event) => doctor.website = event.target.value" required>
        </div>
        <div>
          <label for="address">Address:</label>
          <input type="text" id="address" :value="doctor?.address" @input="(event) => doctor.address = event.target.value" required>
        </div>
        <div>
          <label for="specialization">Specialization:</label>
          <input type="text" id="specialization" :value="doctor?.specialization" @input="(event) => doctor.specialization = event.target.value" required>
        </div>
        <div>
          <label for="experience">Experience:</label>
          <input type="text" id="experience" :value="doctor?.experience" @input="(event) => doctor.experience = event.target.value" required>
        </div>
        <div>
          <label for="feePerConsultation">Fee per consultation:</label>
          <input type="number" id="feePerConsultation" :value="doctor?.feePerConsultation" @input="(event) => doctor.feePerConsultation = event.target.value" required>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
    };
  },

  created() {
    this.fetchDoctor();
  },

  methods: {
    async fetchDoctor() {
      try {
        await this.$store.dispatch('fetchDoctorById',  this.$store.getters.userId
        )
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async save() {
      try {
        await this.$store.dispatch('updateDoctorProfile', this.doctor);
      } catch (error) {
        console.log(error);
      }
    },
  },
  
  computed: {
    doctor() {
      return this.$store.getters.currentDoctor || {};
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>