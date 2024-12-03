<script setup lang="ts">
import { computed } from "vue";
import { useScanQrcodeStore } from "@/store/internalCheck";
import type { IStampStatus, ITagType } from "@/types";
import Tag from "./Tag.vue";
import { useI18n } from 'vue-i18n';
import { convertIsoToDate } from "@/utitls";

const { t } = useI18n();
const store = useScanQrcodeStore();
const stamp_code = computed(() => store.stamp_code);
const { serial, status, order, purchase_order, agency, sale_order } = stamp_code.value;

const renderColorStatus = (status: IStampStatus): ITagType => {
  switch (status) {
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
          <div class="col-span-7 text-right text-[#463E37] font-semibold">{{ serial ? serial : 'N/A' }}</div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Trạng thái tem</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">
            <Tag :tite="status ? t(`stamp_status.${status}`) : 'N/A'" :type="renderColorStatus(status as IStampStatus)" />
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Lô hàng</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">{{ order?.name || 'N/A' }}</div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Kho nhập</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">
            {{ purchase_order?.warehouse?.name || 'N/A' }}
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Ngày nhập kho</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">
            {{ purchase_order?.order_date ? convertIsoToDate(purchase_order?.order_date) : 'N/A' }}
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Đại lý phân phối</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">{{ agency?.name || 'N/A' }}</div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Ngày xuất kho</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">
            {{ sale_order?.order_date ? convertIsoToDate(sale_order?.order_date) : 'N/A' }}
          </div>
        </div>
      </dl>
    </div>
  </el-card>
</template>
