<script setup lang="ts">
import { computed } from "vue";
import { useScanQrcodeStore } from "@/store";
import type { IStampStatus, ITagType } from "@/types";
import Tag from "./Tag.vue";
import { useI18n } from 'vue-i18n';

const {t} = useI18n();
const store = useScanQrcodeStore();
const stammCode = computed(() => store.stamp_code);

const renderColorStatus = (status: IStampStatus): ITagType => {
  switch(status){
    case 'new':
      return 'cyan';
    case 'product_assigned':
      return 'blue';
    case 'sold':
      return 'gold';
    case 'activated':
      return 'success';
    case 'warranty_processing':
      return 'green';
    case 'warranty_replaced':
      return 'purple';
    case 'blocked':
      return 'red';
    case 'processing':
      return 'orange';
    default:
      return 'geekblue';
  }
};
</script>

<template>
  <el-card>
    <template #header>
      <div class="text-[#F38020] text-[16px] font-bold border-b border-[#D9E6E9]">
        Thông tin phân phối
      </div>
    </template>

    <div class="border-b border-[#D9E6E9] py-3">
      <dl>
        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Serial</div>
          <div class="col-span-7 text-right qrx-text--default font-semibold">{{ stammCode?.serial || 'N/A' }}</div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Trạng thái tem</div>
          <div class="col-span-7 text-right qrx-text--default font-semibold">
            <Tag :tite="stammCode?.status ? t(`stamp_status.${stammCode?.status}`) : 'N/A'" :type="renderColorStatus(stammCode?.status)"/>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Lô hàng</div>
          <div class="col-span-7 text-right qrx-text--default font-semibold">{{ stammCode?.shipment || 'N/A' }}</div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Kho nhập</div>
          <div class="col-span-7 text-right qrx-text--default font-semibold">{{ stammCode?.stock_in_warehouse || 'N/A' }}</div>
        </div>
        
        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Ngày nhập kho</div>
          <div class="col-span-7 text-right qrx-text--default font-semibold">{{ stammCode?.stock_in_time || 'N/A' }}</div>
        </div>
        
        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Đại lý phân phối</div>
          <div class="col-span-7 text-right qrx-text--default font-semibold">{{ stammCode?.agency || 'N/A' }}</div>
        </div>
                
        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Ngày xuất kho</div>
          <div class="col-span-7 text-right qrx-text--default font-semibold">{{ stammCode?.stock_out_time || 'N/A' }}</div>
        </div>
      </dl>
    </div>
  </el-card>
</template>
