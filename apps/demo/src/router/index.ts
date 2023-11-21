import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ShipmentOptionsView.vue'),
    },
    {
      path: '/shipment-options',
      name: 'shipment-options',
      component: () => import('../views/ShipmentOptionsView.vue'),
    },
    {
      path: '/addresses/new',
      name: 'addresses-new',
      component: () => import('../views/EditAddressView.vue'),
    },
    {
      path: '/forms/no-prop',
      name: 'forms-no-prop',
      component: () => import('../views/NoPropView.vue'),
    },
    {
      path: '/forms/new-form',
      name: 'forms-new-form',
      component: () => import('../views/NewFormView.vue'),
    },
  ],
});

export default router;
