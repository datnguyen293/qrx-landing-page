<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useScanQrcodeStore } from '@/store';

const store = useScanQrcodeStore();
const colorSuccess = computed(() => store.getKeyThemeData('color_success') || '#00994D');
const { t: $t } = useI18n();
const name = ref('');
const phone = ref('');
const email = ref('');
const content = ref('');
</script>

<template>
  <div class="m-auto min-h-screen">
    <el-card class="qrx-card-bank mb-3">
      <div class="qrx-bg--success text-[16px] text-center leading-5 p-4 text-white font-medium">
        {{ $t('common.suggestion') }}
      </div>

      <div class="p-[16px] flex flex-col gap-[10px]">
        <el-input v-model="name" :placeholder="$t('placeholders.customer_name')" type="text" />
        <el-input v-model="phone" :placeholder="$t('placeholders.phone_number')" type="tel" />
        <el-input v-model="email" :placeholder="$t('placeholders.email_address')" type="email" />
        <el-input
          v-model="content"
          :placeholder="$t('placeholders.content')"
          show-word-limit
          type="textarea"
        />
        <el-button type="success" class="w-full mt-2 text-white" :color="colorSuccess">
          {{ $t('buttons.send') }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>
