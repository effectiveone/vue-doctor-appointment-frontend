<template>
  <div>
    <section>
      <base-card v-if="doctor">
        <h2>{{ fullName }}</h2>
        <span>Specialization: {{ specialization }}</span>
        <h4>Experience: {{ experience }}</h4>
        <p>Fee per consultation: {{ feePerCunsultation }} zł</p>
      </base-card>
    </section>
    <section class="contact-section">
      <base-card v-if="doctor">
      <div class="contact-session">
        <div>     <header>
          <h2>Contact Information</h2>
        </header>
        <p>Phone: {{ phoneNumber }}</p>
        <p>Website: <a :href="website" target="_blank">{{ website }}</a></p>
        <p>Address: {{ address }}</p></div>
        <div class="btn-contact"
        >      <base-button mode="outline" link :to="doctorContactLink">Contact</base-button>
</div>
      </div>

   
      </base-card>
    </section>
  </div>
</template>


<script>
export default {
  computed: {
    doctorContactLink() {
      return '/appointments/' + this.$route.params.id;
    },
    doctor() {
      return this.$store.state.doctors.currentDoctor;
    },
    fullName() {
      if (this.doctor && this.doctor.firstName && this.doctor.lastName) {
        return `${this.doctor.firstName} ${this.doctor.lastName}`;
      } else {
        return '';
      }
    },
    phoneNumber() {
      return this.doctor?.phoneNumber;
    },
    website() {
      return this.doctor?.website;
    },
    address() {
      return this.doctor?.address;
    },
    specialization() {
      return this.doctor?.specialization;
    },
    experience() {
      return this.doctor?.experience;
    },
    feePerCunsultation() {
      return this.doctor?.feePerCunsultation.$numberDecimal;
    },
  },
  created() {
  this.$store.dispatch('doctors/fetchDoctorById', this.$route.params.id)
    .then(() => {
      console.log(this.doctor); // wyświetla obiekt Doctor w konsoli
    });
},

};
</script>

<style>
.contact-section {
  /* display: flex; */
  /* justify-content: center; */
}

.contact-session {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.btn-contact {
  width: 300px;
  display: flex;
  justify-content: center;
align-items: center;
}
</style>