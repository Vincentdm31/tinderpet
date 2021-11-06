import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Pets from '../views/Pets.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pets/insert',
    name: 'insert',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "insert" */ '../views/Insert.vue'),
  },

  {
    path: '/pets',
    name: 'pets',
    component: Pets,
  },
  {
    path: '/pets/edit/:id',
    name: 'Edit',
    component: () => import('../views/Edit.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
