import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
  },

  {
    path: '/test',
    name: 'test',
    component: () => import('../views/parblic.vue'),
  },

  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/admin/',
    redirect: '/admin/links',
    name: 'admin',
    component: () => import(/* webpackChunkName: "adminView" */ '../views/adminView.vue'),
    children: [
      {
        path: 'links',
        name: 'adminLinks',
        component: () => import(/* webpackChunkName: "admin" */ '../views/admin.vue'),
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('../views/account.vue'),
      },
    ],
  },
  {
    path: '/Welcome',
    name: 'Welcome',
    component: () => import(/* webpackChunkName: "Welcome" */ '../views/Welcome.vue'),
  },
  {
    path: '/:userName',
    name: 'parblic',
    props: true,
    component: () => import(/* webpackChunkName: "Home" */ '../views/parblic.vue'),
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
