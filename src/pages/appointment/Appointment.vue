<template>
  <div class="time-selector">
    <div class="controls">
      <button @click="prevWeek">Poprzedni tydzień</button>
      <span>{{ currentWeek.start }} - {{ currentWeek.end }}</span>
      <button @click="nextWeek">Następny tydzień</button>
    </div>
    <div v-for="(day, index) in currentWeek.days" :key="index" class="day">
     <div class="container-date">
      <h3>{{ day.date }} </h3> 
      <span>
      {{ day.dayOfWeek }}</span></div>
      <div class="hours-wrapper">
        <div ref="hours" class="hours">
          <button
            v-for="hour in hours"
            :key="hour"
            :class="{'selected': isSelected(day.date, hour)}"
            @click="toggleSelection(day.date, hour)"
          >
            {{ hour }}:00
          </button>
        </div>
      </div>
    </div>
    <div class="selected-hours">
      <h3>Wybrane godziny:</h3>
      <ul>
        <li v-for="(hour, index) in selectedHours" :key="index">
          {{ hour.day }} {{ hour.hour }}:00
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: new Date(2023, 0, 1),
      currentWeek: {},
      hours: Array.from({ length: 24 }, (_, i) => i),
      selectedHours: [],
      daysOfWeek: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
    };
  },
  created() {
    this.updateWeek();
  },
  mounted() {
    this.scrollToHour(8);
  },
  methods: {
    toggleSelection(day, hour) {
      const index = this.selectedHours.findIndex(
        selectedHour => selectedHour.day === day && selectedHour.hour === hour
      );

      if (index === -1) {
        this.selectedHours.push({ day, hour });
      } else {
        this.selectedHours.splice(index, 1);
      }
    },
    isSelected(day, hour) {
      return this.selectedHours.some(
        selectedHour => selectedHour.day === day && selectedHour.hour === hour
      );
    },
    nextWeek() {
      this.startDate.setDate(this.startDate.getDate() + 7);
      this.updateWeek();
    },
    prevWeek() {
      this.startDate.setDate(this.startDate.getDate() - 7);
      this.updateWeek();
    },
    updateWeek() {
      const startOfWeek = new Date(this.startDate);
      while (startOfWeek.getDay() !== 1) {
        startOfWeek.setDate(startOfWeek.getDate() - 1);
      }

      const days = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(date.getDate() + i);
        days.push({
          date: date.toISOString().slice(0, 10),
          dayOfWeek: this.daysOfWeek[date.getDay() - 1] || this.daysOfWeek[6]
        });
      }

      this.currentWeek = {        start: days[0].date,
        end: days[6].date,
        days
      };
    },
    scrollToHour(hour) {
      if (this.$refs.hours) {
        const hourHeight = this.$refs.hours[0].firstChild.clientHeight;
        this.$refs.hours.forEach(hours => {
          hours.scrollTop = hourHeight * hour;
        });
      }
    }
  }
};
</script>

<style scoped>
.time-selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.controls {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.day {
  width: calc(100% / 7 - 2%);
  margin-bottom: 1rem;
}

.hours-wrapper {
  height: 400px;
  overflow-y: hidden;
}

.hours {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: auto;
}

button {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: left;
}

button.selected {
  background-color: #3f51b5;
  color: white;
}

.selected-hours {
  width: 100%;
}

.container-date {
  display: flex;
  flex-direction: column;
}
</style>

