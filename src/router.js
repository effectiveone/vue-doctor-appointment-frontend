import { createRouter, createWebHistory } from 'vue-router';

import DoctorAppointments from './pages/appointment/DoctorAppointment.vue';
import Appointment from './pages/appointment/Appointment.vue';
import DoctorsForm from './pages/doctors/DoctorForm.vue';
import AllDoctors from './pages/doctors/AllDoctors.vue';
import DoctorDetails from './pages/doctors/DoctorDetails.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/appointments' },
    {
      path: '/appointments',
      component: DoctorAppointments,
      meta: { requiresAuth: true },
    },
    {
      path: '/appointments/:id',
      component: Appointment,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/details/:id',
      component: DoctorDetails,
      props: true,
    },
    {
      path: '/profile',
      component: DoctorsForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/allDoctors',
      component: AllDoctors,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/appointments');
  } else {
    next();
  }
});

export default router;
