import Vue from 'vue';
import VueRouter from 'vue-router';
import db from '@/plugins/leancloud';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
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
    path: '/admin',
    meta: {
      requiresAuth: true,
    },
    name: 'admin',
    component: () => import(/* webpackChunkName: "adminView" */ '../views/adminView.vue'),
    children: [
      {
        path: 'links',
        name: 'adminLinks',
        component: () => import(/* webpackChunkName: "admin" */ '../views/links.vue'),
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('../views/account.vue'),
      },
    ],
  },
  {
    path: '/resetpassword',
    component: () => import('../views/resetPassword.vue'),
  },
  {
    path: '/privacy',
    component: () => import('../views/privacy.vue'),
  },
  {
    path: '/faq',
    component: () => import('../views/faq.vue'),
  },
  {
    path: '/agreement',
    component: () => import('../views/agreement.vue'),
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
    path: '/404',
    name: '404',
    component: () => import('../views/NotFound.vue'),
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

// Route guard checks to see if you are logged in, if not reroutes to login
// to is where you are going, matched.some is to find which routes have requiresAuth
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (db.User.current() !== null) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
