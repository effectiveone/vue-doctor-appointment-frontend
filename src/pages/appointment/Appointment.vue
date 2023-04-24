<template>
  <div class="time-selector">
    <div class="controls">
      <button @click="prevWeek">Poprzedni tydzień</button>
      <span>{{ currentWeek.start }} - {{ currentWeek.end }}</span>
      <button @click="nextWeek">Następny tydzień</button>
    </div>
    <div v-for="(day, index) in currentWeek.days" :key="index" class="day">
      <div class="container-date">
        <h3>{{ day.date }}</h3>
        <span>{{ day.dayOfWeek }}</span>
      </div>
      <div class="hours-wrapper">
        <div ref="hours" class="hours">
          <button
            v-for="hour in day.hours"
            :key="hour.value"
            :class="{ 'selected': isSelected(day.date, hour.value), 'booked': hour.isBooked }"
            @click="openDialog({ day: day.date, hour: hour.value }, hour.isBooked)"
          >
            {{ hour.value }}:00
          </button>
        </div>
      </div>
    </div>
    <confirmation-dialog
      v-if="isDialogVisible"
      :hour="selectedHour"
      :time="selectedHour.hour"
      @close="isDialogVisible = false"
      @confirm="confirmReservation"
    ></confirmation-dialog>
  </div>
</template>
<script>
import ConfirmationDialog from "@/components/appointments/ConfirmationDialog.vue";
import store from "@/store/index.js";

export default {
  components: {
    ConfirmationDialog,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    const today = new Date();
    const currentWeekStartDate = new Date(today);
    currentWeekStartDate.setDate(today.getDate() - today.getDay() + 1);

    return {
      startDate: currentWeekStartDate,
      currentWeek: {},
      hours: Array.from({ length: 24 }, (_, i) => i),
      selectedHours: [],
      daysOfWeek: [
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
        "Niedziela",
      ],
      isDialogVisible: false,
      selectedHour: null,
    };
  },
  created() {
    this.updateWeek();
  },
  mounted() {
    this.scrollToHour(8);
  },
  methods: {
    openDialog(hour, isBooked) {
  if (isBooked) {
    alert("Ta godzina jest już zarezerwowana.");
    return;
  }
  this.selectedHour = hour;
  this.isDialogVisible = true;
},
    async confirmReservation() {
    try {
      const payload = {
        id: this.$route.params.id,
        data: {
            appointmentDate: `${this.selectedHour.day}`,
  appointmentTime: `${this.selectedHour.hour}:00`
        },
      };
      await store.dispatch("doctors/updateAppointment", payload);
      this.isDialogVisible = false;
      // other logic
    } catch (error) {
      console.log(error);
      // handle error
    }
  },
    toggleSelection(day, hour) {
      const index = this.selectedHours.findIndex(
        (selectedHour) =>
          selectedHour.day === day && selectedHour.hour === hour
      );

      if (index === -1) {
        this.selectedHours.push({ day, hour });
      } else {
        this.selectedHours.splice(index, 1);
      }
    },
    isSelected(day, hour) {
      return this.selectedHours.some(
        (selectedHour) =>
          selectedHour.day === day && selectedHour.hour === hour
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
    async updateWeek() {
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
    dayOfWeek: this.daysOfWeek[date.getDay() - 1] || this.daysOfWeek[6],
    appointments: [],
    hours: this.hours.map((hour) => ({ value: hour, isBooked: false })) // Dodaj tę linię
  });
}


  try {
    const response = await store.dispatch('doctors/fetchAppointmentsByDoctorId', { id: this.$route.params.id });
    const appointments = await store.state.doctors.appointments;
    appointments.forEach((appointment) => {
  const date = appointment?.date;
  const time = appointment?.time;
  const day = days?.find((day) => day.date === date);
  if (day) {
    day.appointments.push(time);
    const hour = day.hours?.find((h) => h.value === parseInt(time));
    if (hour) {
      hour.isBooked = true;
    }
  }
});
  } catch (error) {
    console.log(error);
  }

  this.currentWeek = {
    start: days[0].date,
    end: days[6].date,
    days,
  };
},

    scrollToHour(hour) {
      if (this.$refs.hours) {
        const hourHeight = this.$refs.hours[0].firstChild.clientHeight;
        this.$refs.hours.forEach((hours) => {
          hours.scrollTop = hourHeight * hour;
        });
      }
    },
  },
};

</script>

<style scoped>
.time-selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative
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

button.booked {
  background-color: #ff5252;
  color: white;
  cursor: not-allowed;
}
</style>