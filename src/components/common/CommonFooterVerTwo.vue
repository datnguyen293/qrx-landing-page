<script lang="ts" setup>
import {computed} from "vue";
import {useScanQrcodeStore} from "@/store";

const store = useScanQrcodeStore();
const company = computed(() =>store.company);
</script>
<template>
  <el-card class="p-4 bg-white my-[10px]" v-if="company.phone && company.email" >
    <div class="font-medium text-[18px]">Mọi thắc mắc gửi về</div>
    <div class="text-[#14272B]">{{company?.phone || ''}}</div>
    <div class="text-[#14272B]">{{ company?.email || ''}}</div>
  </el-card>
</template>
