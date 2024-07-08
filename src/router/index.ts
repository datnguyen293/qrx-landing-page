import { createRouter, createWebHistory } from 'vue-router';

import NotFoundView from '@/views/NotFoundView.vue';
import ErrorView from '@/views/ErrorView.vue';
import HomeView from '@/views/HomeView.vue';
import OldPisenView from '@/views/OldPisenView.vue';
import OldMirascanView from '@/views/OldMirascanView.vue';
import IframeView from '@/views/IframeView.vue';
import StampScanErrorView from '@/views/StampScanErrorView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/xac-thuc',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      name: 'verify',
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
      path: '/p/#/v/p',
      name: 'mirascan-v2',
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
      path: '/stamp-error',
      name: 'stamp-error',
      component: StampScanErrorView,
    },
    {
      path: '/iframe',
      name: 'iframe',
      component: IframeView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-match',
      component: NotFoundView,
    },
  ],
});
export default router;
