<script setup lang="ts">
import {useScanQrcodeStore} from "@/store";
import {computed} from "vue";
import { isEmpty } from '@/utitls';

const store = useScanQrcodeStore();
const verifyStatus = computed(() => store.stamp_code?.status || '');
const customer = computed(() => store.customer);
const stampCode = computed(() => store.stamp_code);

const stampHasWarranty = computed(() => !isEmpty(stampCode.value?.stamp_has_warranty) && !isEmpty(stampCode.value?.warranty_starts_at) && !isEmpty(stampCode.value?.warranty_ends_at))
</script>

<template>
  <el-card v-if="!isEmpty(stampCode?.first_verification_at) && !isEmpty(customer)">
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

<!--        <div class="grid grid-cols-12 gap-4 mb-2" v-if="stampCode?.verification_code">-->
<!--          <div class="col-span-5">Mã xác thực</div>-->
<!--          <div class="col-span-7 text-right text-[#4B6166] font-semibold">{{ stampCode?.verification_code || '' }}-->
<!--          </div>-->
<!--        </div>-->

        <div class="grid grid-cols-12 gap-4 mb-2" v-if="stampCode?.first_verification_at">
          <div class="col-span-5">Xác thực ngày</div>
          <div class="col-span-7 text-right text-[#4B6166] font-semibold">{{ stampCode?.first_verification_at || '' }}</div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-2" v-if="stampHasWarranty">
          <div class="col-span-5">Thời gian bảo hành</div>
          <div class="col-span-7 text-right text-[#4B6166] font-semibold">{{ stampCode?.warranty_starts_at }} - {{ stampCode?.warranty_ends_at}}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>
