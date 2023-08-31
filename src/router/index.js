// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Desktop.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Messages.vue'),
      },
      {
        path: ':id',
        name: 'Messages',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Messages.vue'),
      },
    ],
  },
]

let isFirstVisit = true;

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // Check if it's the first visit
  if (isFirstVisit) {
    // Redirect to a specific route (e.g., '/first-visit')
    // You can change this route to your desired destination
    next('/');

    // Update the flag to false
    isFirstVisit = false;
  } else {
    // Continue with the navigation
    next();
  }
});

export default router
