<template>
  <base-card>
    <h2>Znajdź odpowiedniego lekarza</h2>
    <div class="filter-section">
      <h3>Filtruj po specjalizacji:</h3>
      <div class="filter-option">
        <input type="text" v-model="specialization" placeholder="Wpisz specjalizację" @input="applyFilter()" />
      </div>
    </div>
    <div class="filter-section">
      <h3>Sortuj po stawce:</h3>
      <div class="filter-option">
        <select v-model="sortOrder" @change="applyFilter()">
          <option value="asc">Rosnąco</option>
          <option value="desc">Malejąco</option>
        </select>
      </div>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      specialization: '',
      sortOrder: 'asc',
    };
  },
  methods: {
    applyFilter() {
      const filters = {
        specialization: this.specialization,
        sortOrder: this.sortOrder,
      };
      this.$emit('change-filter', filters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-section {
  margin-bottom: 1rem;
}

.filter-section h3 {
  margin-bottom: 0.5rem;
}

.filter-option {
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
}

.filter-option label,
.filter-option input,
.filter-option select {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}
</style>
