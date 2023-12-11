import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import LogInView from '@/views/LogInView.vue';
import RecentClaimsView from '@/views/RecentClaimsView.vue';

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
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
