import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/FormView.vue'),
    },
    {
      path: '/forms/no-prop',
      name: 'forms-no-prop',
      component: () => import('../views/NoPropView.vue'),
    },
  ],
});

export default router;
