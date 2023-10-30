<script lang="ts" setup>
import {computed} from "vue";
import {useScanQrcodeStore} from "@/store";

const store = useScanQrcodeStore();
const company = computed(() =>store.company);
</script>
<template>
  <div class="p-4" v-if="company.phone && company.email">
    <div class="font-medium">Mọi thắc mắc gửi về</div>
    <div class="text-[#14272B]">{{company?.phone || ''}}</div>
    <div class="text-[#14272B]">{{ company?.email || ''}}</div>
  </div>
</template>
