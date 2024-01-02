// router.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import LogInView from '@/views/LogInView.vue';
import RecentClaimsView from '@/views/RecentClaimsView.vue';
import Claim from '@/views/Claim.vue';
import { authMiddleware } from '@/services/middlewares';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LogInView
  },
  {
    path: '/recentClaims',
    name: 'recentClaims',
    component: RecentClaimsView,
    beforeEnter: authMiddleware,
  },
  {
    path: '/claim',
    name: 'claim',
    component: Claim,
    beforeEnter: authMiddleware,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
