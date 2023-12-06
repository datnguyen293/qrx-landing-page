<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import CommonSlider from '@/components/common/CommonSlider.vue';

import { useScanQrcodeStore } from '@/store';
import { isEmpty } from '@/utitls';

const { t: $t } = useI18n();
const { query } = useRoute();
const { xid, serial, user_uuid, lat, lon, factory_name, utm, type, preview } = query;
const router = useRouter();

const store = useScanQrcodeStore();
const { company } = store;
const product = computed(() => store.product);
const isSerial = ref(false);

const stampCodeStatus = computed(() => store.stamp_code?.status || '');
</script>

<template>
  <div class="m-auto min-h-screen">
    <el-card class="qrx-card-bank mb-3">
      <div class="qrx-bg--success text-[16px] text-center leading-5 p-4 text-white font-medium">
        Liên hệ
      </div>

      <div class="p-[16px]">
        <a href="tel:0901766604" class="no-underline text-black">
          <div class="flex justify-between p-[12px]">
            <p>Liên hệ hotline 2</p>
            <svg
              fill="green"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xml:space="preserve"
              width="20"
              height="20"
            >
              <g xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
                <path
                  d="M17.4 22A15.42 15.42 0 0 1 2 6.6 4.6 4.6 0 0 1 6.6 2a3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1-.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76A4.6 4.6 0 0 1 17.4 22z"
                  data-name="phone"
                ></path>
              </g>
            </svg>
          </div>
        </a>
        <hr />
        <a href="tel:+84243.3153888" class="no-underline text-black">
          <div class="flex justify-between p-[12px]">
            <p>Liên hệ Tel: (12 lines)</p>
            <svg
              fill="green"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xml:space="preserve"
              width="20"
              height="20"
            >
              <g xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
                <path
                  d="M17.4 22A15.42 15.42 0 0 1 2 6.6 4.6 4.6 0 0 1 6.6 2a3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1-.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76A4.6 4.6 0 0 1 17.4 22z"
                  data-name="phone"
                ></path>
              </g>
            </svg>
          </div>
        </a>
        <hr />
        <a href="tel:0969059786" class="no-underline text-black">
          <div class="flex justify-between p-[12px]">
            <p>Báo lỗi tem chống giả - Liên hệ Mirascan</p>
            <svg
              fill="green"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xml:space="preserve"
              width="20"
              height="20"
            >
              <g xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
                <path
                  d="M17.4 22A15.42 15.42 0 0 1 2 6.6 4.6 4.6 0 0 1 6.6 2a3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1-.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76A4.6 4.6 0 0 1 17.4 22z"
                  data-name="phone"
                ></path>
              </g>
            </svg>
          </div>
        </a>
      </div>
    </el-card>
  </div>
</template>
