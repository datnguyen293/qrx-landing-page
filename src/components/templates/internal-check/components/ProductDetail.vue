<script setup lang="ts">
import { computed } from 'vue';
import { formatAmountCurrency } from '@/utitls';
import { useScanQrcodeStore } from '@/store/internalCheck';

const store = useScanQrcodeStore();
const stamp_code = computed(() => store.stamp_code);
const { product, company } = stamp_code.value;
</script>

<template>
  <el-card>
    <template #header>
      <div class="text-[#F38020] text-[16px] font-bold border-b border-[#D9E6E9]">
        Thông tin sản phẩm
      </div>
    </template>

    <div class="border-b border-[#D9E6E9] py-3">
      <dl>
        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Tên sản phẩm</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">
            {{ product?.name || '' }}
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Thương hiệu</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">
            {{ product?.brand?.name || '' }}
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Giá bán</div>
          <div class="col-span-7 text-right text-[#463E37] font-semibold">
            {{
              product?.sales_price
                ? `${formatAmountCurrency(product?.sales_price || '', 'VND')} /
                  ${product?.unit?.name || 'chiếc'}`
                : ''
            }}
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-12">Mô tả</div>
          <div class="col-span-12" v-html="product?.description || '<span>N/A</span>'"></div>
        </div>
      </dl>
    </div>
  </el-card>
</template>
