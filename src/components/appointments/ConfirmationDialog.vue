<template>
    <div class="confirmation-dialog">
      <div class="dialog-content">
        <h3>Potwierdzenie rezerwacji</h3>
        <p>
          Czy na pewno chcesz zarezerwować {{ hour.day }} {{ hour.hour }}:00?
        </p>
        <button @click="$emit('confirm')">Potwierdź</button>
        <button @click="$emit('close')">Anuluj</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      hour: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style>
  .confirmation-dialog {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 40%;
  background-color: antiquewhite;
  }
  
  .dialog-content {
    /* Styl dla treści okna dialogowego */
  }
  </style>
  