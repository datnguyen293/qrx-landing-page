<script lang="ts" setup>
import {computed} from "vue";
import {useScanQrcodeStore} from "@/store";
import { isEmpty, parseStorageValue } from '@/utitls';
import { KEY_LOCAL_STORAGE } from '@/constants';

const store = useScanQrcodeStore();
const companyLocalState = parseStorageValue(window.localStorage.getItem(KEY_LOCAL_STORAGE.COMPANY_SCAN));

const company = computed(() => {
  if (isEmpty(store.company) || !isEmpty(companyLocalState)) {
    return companyLocalState;
  }

  return store.company;
});
</script>
<template>
  <div class="p-4" v-if="company.phone && company.email && company.is_show_contact">
    <div class="font-medium">Mọi thắc mắc gửi về</div>
    <div class="text-[#14272B]">{{company?.phone || ''}}</div>
    <div class="text-[#14272B]">{{ company?.email || ''}}</div>
  </div>
</template>
