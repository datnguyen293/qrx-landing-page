<script setup lang="ts">
import {useScanQrcodeStore} from "@/store";
import {computed} from "vue";

const store = useScanQrcodeStore();
const verifyStatus = computed(() => store.getStampCodeStatusVerify);
const customer = computed(() => store.getCustomer);
const stampCode = computed(() => store.getStampCode);
</script>

<template>
  <el-card>
    <template #header>
      <div class="text-[#F38020] text-[16px] font-bold border-b border-[#D9E6E9]">
        Thông tin xác thực
      </div>
    </template>

    <div class="customer-profile">
      <div class="py-3">
        <div class="grid grid-cols-12 gap-4 mb-2" v-if="verifyStatus !== 'warning'">
          <div class="col-span-5">Họ và tên</div>
          <div class="col-span-7 text-right text-[#4B6166] font-semibold">{{ customer?.name || '' }}
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-2" v-if="verifyStatus !== 'warning'">
          <div class="col-span-5">SĐT</div>
          <div class="col-span-7 text-right text-[#4B6166] font-semibold">{{ customer?.phone || '' }}</div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-2" v-if="stampCode?.verification_code">
          <div class="col-span-5">Mã xác thực</div>
          <div class="col-span-7 text-right text-[#4B6166] font-semibold">{{ stampCode?.verification_code || '' }}
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-2" v-if="stampCode?.first_verification_at">
          <div class="col-span-5">Xác thực ngày</div>
          <div class="col-span-7 text-right text-[#4B6166] font-semibold">{{ stampCode?.first_verification_at || '' }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">

</style>
