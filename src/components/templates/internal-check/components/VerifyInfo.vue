<script setup lang="ts">
import { computed } from "vue";
import { useScanQrcodeStore } from "@/store/internalCheck";
import { STAMP_STATUS } from "@/constants";
import { convertIsoToDate } from "@/utitls";

const store = useScanQrcodeStore();
const stampCode = computed(() => store.stamp_code);
const { customer, serial, first_verification_at } = stampCode.value;
</script>

<template>
  <el-card>
    <template #header>
      <div class="text-[#F38020] text-[16px] font-bold border-b border-[#D9E6E9]">
        Thông tin xác thực
      </div>
    </template>

    <div class="border-b border-[#D9E6E9] py-3">
      <dl>
        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Họ tên</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">{{ customer?.name || 'N/A' }}</div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Số điện thoại</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">{{ customer?.phone || 'N/A' }}</div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Xác thực ngày</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">
            {{ first_verification_at ? convertIsoToDate(first_verification_at) : 'N/A' }}
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3" v-if="stampCode?.status === STAMP_STATUS.WARRANTY_REPLACED">
          <div class="col-span-5">Serial thay bảo hành</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">
            {{ serial ? serial : 'N/A' }}
          </div>
        </div>
      </dl>
    </div>
  </el-card>
</template>
