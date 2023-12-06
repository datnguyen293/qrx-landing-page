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
        Thư góp ý
      </div>

      <div class="p-[16px] flex flex-col">
        <input
          type="text"
          class="border-1 rounded-[5px] p-[12px] mb-[12px]"
          placeholder="Họ và tên"
        />
        <input
          type="text"
          class="border-1 rounded-[5px] p-[12px] mb-[12px]"
          placeholder="Số điện thoại"
        />
        <input type="text" class="border-1 rounded-[5px] p-[12px] mb-[12px]" placeholder="Email" />
        <textarea
          placeholder="Nội dung"
          class="h-[150px] border-2 rounded-[5px] p-[12px] mb-[12px]"
        ></textarea>
        <button
          class="w-full text-white text-[18px] qrx-bg--success border-none py-[10px] rounded-[5px] mt-[12px]"
        >
          Gửi phản hồi
        </button>
      </div>
    </el-card>
  </div>
</template>
