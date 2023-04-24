<template>
  <div>
    <DoctorFilter @change-filter="setFilters" />
    <div >
      <ul >
        <template v-if="!isLoading">
          <template v-if="hasDoctors">
            <base-card>
            <DoctorItem v-for="filteredDoctor in filteredDoctors" :key="filteredDoctor._id" :feePerCunsultation="filteredDoctor.feePerCunsultation" :firstName="filteredDoctor.firstName" :lastName="filteredDoctor.lastName" :experience="filteredDoctor.experience" :specialization="filteredDoctor.specialization"
            :_id="filteredDoctor._id"
            ></DoctorItem>
          </base-card>
          </template>
          <template v-else>
            <p>No doctors available.</p>
          </template>
        </template>
        <template v-else>
          <p>Loading...</p>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import DoctorItem from '@/components/doctors/DoctorItem';
import DoctorFilter from '@/components/doctors/DoctorFilter';

export default {
  components: {
    DoctorItem,
    DoctorFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        specialization: '',
        sortOrder: 'asc',
      },
    };
  },
  computed: {
    filteredDoctors() {
      let doctors = this.$store.state.doctors.doctors;
      console.log("doctors", doctors)
      const { specialization, sortOrder } = this.activeFilters;
      if (specialization) {
        doctors = doctors.filter((doctor) => doctor.specialization.toLowerCase().includes(specialization.toLowerCase()));
      }
      if (sortOrder === 'asc') {
        doctors = doctors.sort((a, b) => a.rate - b.rate);
      } else if (sortOrder === 'desc') {
        doctors = doctors.sort((a, b) => b.rate - a.rate);
      }
      return doctors;
    },
    hasDoctors() {
      return !this.isLoading && this.$store.state.doctors.doctors.length > 0;
    },
  },
  created() {
    this.fetchDoctors();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters.specialization = updatedFilters.specialization;
      this.activeFilters.sortOrder = updatedFilters.sortOrder;
    },
    async fetchDoctors() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('fetchAllDoctors');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}


</style>
