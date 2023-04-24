<template>
  <li>
    <h3>{{ firstName }} {{ lastName }}</h3>
    <span>Experience: {{experience}}</span>
    <span>{{feePerCunsultation.$numberDecimal}} / per visit</span>
    <div v-if="specialization">
  <base-badge type="primary" :title="specialization"></base-badge>
</div>

    <div class="actions">
      <base-button mode="outline" link :to="doctorContactLink">Contact</base-button>
      <base-button link :to="doctorDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['firstName', 'feePerCunsultation', 'lastName', 'experience', 'specialization', '_id'],
  computed: {
    doctorContactLink() {
      return '/appointments/' + this._id;
    },
    doctorDetailsLink() {
      return '/details/' + this._id;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.primary {
  background-color: #3d008d;
  color: white;
}
</style>
