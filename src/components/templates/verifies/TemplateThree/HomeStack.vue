<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import CommonSlider from '@/components/common/CommonSlider.vue';

import { useScanQrcodeStore } from '@/store';
import { isEmpty } from '@/utitls';

const { t: $t } = useI18n();

const store = useScanQrcodeStore();
const { company } = store;
const product = computed(() => store.product);
const isSerial = ref(false);
const colorSuccess = computed(() => store.getKeyThemeData('color_success') || '#00994D');
</script>

<template>
  <div class="m-auto min-h-screen">
    <el-card class="qrx-card-bank mb-3">
      <div class="qrx-bg--success text-[16px] text-center leading-5 p-4 text-white font-medium">
        {{ $t('common.home') }}
      </div>

      <template v-if="isSerial || !isEmpty(product)">
        <CommonSlider />
      </template>

      <div class="p-[16px] bg-[#eaeaea]">
        <h1 class="text-[24px] text-center">{{ company?.name }}</h1>
        <h2 class="text-center my-[16px]">
          {{ $t('common.wellcome_title') }}
        </h2>
        <p class="text-justify my-[16px]">
          {{ $t('common.wellcome') }}
        </p>
        <el-button
          type="success"
          class="w-full mt-2 text-white hover:text-white"
          :color="colorSuccess"
          @click="$emit('update-choose-stack', 'verify')"
        >
          {{ $t('buttons.verification_now') }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>
