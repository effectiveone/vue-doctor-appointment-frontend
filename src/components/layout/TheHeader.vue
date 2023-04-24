<template>
  <header>
    <nav>
      <h1>
        <router-link to="/allDoctors">Medicine Portal</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/allDoctors">All Doctors</router-link>
        </li>
        <li v-if="isDoctor">
          <router-link to="/profile">My profile</router-link>
        </li>
        <li v-if="!isDoctor">
          <router-link to="/appointments">My appointment</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/auth">Login</router-link>
        </li>
        <li 
        v-else>
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isDoctor() {
      return this.$store.getters.IsDoctor;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/allDoctors');
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>