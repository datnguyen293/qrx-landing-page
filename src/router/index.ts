import { createRouter, createWebHistory } from 'vue-router';

import NotFoundView from '../views/NotFoundView.vue';
import ErrorView from '../views/ErrorView.vue';
import HomeView from '../views/HomeView.vue';
import OldPisenView from '../views/OldPisenView.vue';
import OldMirascanView from '../views/OldMirascanView.vue';
import OverLimitScanView from '../views/OverLimitView.vue';
import NotAuthorizedView from '../views/NotAuthorizedView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/xac-thuc',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/series/qrcode',
      name: 'scan-qrcode-pisen',
      component: OldPisenView,
    },
    {
      path: '/v/s',
      name: 'mirascan',
      component: OldMirascanView,
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView,
    },
    {
      path: '/over-scan',
      name: 'over-scan',
      component: OverLimitScanView,
    },
    {
      path: '/no-authorized',
      name: 'no-authorized',
      component: NotAuthorizedView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-match',
      component: NotFoundView,
    },
  ],
});
export default router;
