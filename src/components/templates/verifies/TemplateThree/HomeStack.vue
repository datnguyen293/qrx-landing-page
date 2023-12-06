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
        Home
      </div>

      <template v-if="isSerial || !isEmpty(product)">
        <CommonSlider />
      </template>

      <div class="p-[16px]">
        <h1 class="text-[24px] text-center">{{ company?.name }}</h1>
        <h2 class="text-center my-[16px]">
          RẤT VUI KHI BẠN ĐÃ QUAN TÂM VÀ SỬ DỤNG DỊCH VỤ CỦA CHÚNG TÔI!
        </h2>
        <p class="text-justify">
          Chúng tôi tạo ra những điều hữu ích nhất giúp bạn có thể kiểm tra sản phẩm mua hàng để đảm
          bảo an toàn nhất. Bạn có thể chọn "Tra xuất thông tin sản phẩm" để tìm hiểu kỹ về thông
          tin sản phẩm hoặc xác thực sản phẩm chính hãng bằng cách chọn "Kiểm tra sản phẩm chính
          hãng" trên tay bạn
        </p>
      </div>
      <div class="p-[16px]">
        <button
          class="w-full text-white text-[18px] qrx-bg--success border-none py-[10px] rounded-[5px] cursor-pointer"
          @click="$emit('update-choose-stack', 'verify')"
        >
          Xác thực ngay
        </button>
      </div>
    </el-card>
  </div>
</template>
