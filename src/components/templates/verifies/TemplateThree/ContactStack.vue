<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useScanQrcodeStore } from '@/store';

import SocialChannel from '@/components/elements/SocialChannel.vue';
import { isEmpty } from '@/utitls';

const { t: $t } = useI18n();

const store = useScanQrcodeStore();
const { company } = store;
</script>

<template>
  <div class="m-auto min-h-screen">
    <el-card class="qrx-card-bank mb-3">
      <div class="qrx-bg--success text-[16px] text-center leading-5 p-4 text-white font-medium">
        {{ $t('common.contact') }}
      </div>
      <div class="p-4">
        <h1 class="text-[18px]">{{ $t('common.introduce') }}</h1>
        <div class="w-[50px] h-[2px] qrx-bg--success"/>
        <div class="mt-4 rounded-[8px] shadow-xl p-3 flex flex-col gap-2">
          <h1 class="text-[18px]">{{ company?.name }}</h1>
          <p>{{ $t('common.address') + ': ' + company?.address }}</p>
          <p>{{ $t('common.email')  + ': ' + company?.email }}</p>
          <a :href="'tel:' + company?.phone" class="no-underline text-black">
            <p>{{ $t('common.hotline', { phone: company?.phone }) }}</p>
          </a>
        </div>
        
        <h1 class="text-[18px] mt-[40px]">{{ $t('common.contact') }}</h1>
        <div class="w-[50px] h-[2px] qrx-bg--success"/>
        <div class="mt-4 rounded-[8px] shadow-xl p-3 flex flex-col gap-2">
          <p>{{ $t('common.address') + ' : ' + company?.address }}</p>
          <p>{{ $t('common.email')  + ' : ' + company?.email }}</p>
          <a :href="'tel:' + company?.phone" class="no-underline text-black">
            <p>{{ $t('common.hotline', { phone: company?.phone }) }}</p>
          </a>
        </div>

        <div v-if="!isEmpty(company?.social_networks)">
          <div class="flex justify-center items-center gap-[5px] my-6">
            <div class="flex-1 h-[2px] qrx-bg--success rounded-[30px]" />
            <p class="qrx-text--default">{{ $t('common.or') }}</p>
            <div class="flex-1 h-[2px] qrx-bg--success rounded-[30px]" />
          </div>
          <SocialChannel />
        </div>
      </div>
    </el-card>
  </div>
</template>
