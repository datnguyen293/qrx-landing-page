<script setup lang="ts">
import {computed} from "vue";
import {useScanQrcodeStore} from "@/store";
import {formatAmountCurrency, isEmpty} from "@/utitls";

const store = useScanQrcodeStore();
const product = computed(() => store.product);
const company = computed(() => store.company);
</script>

<template>
  <el-card>
    <template #header>
      <div class="text-[#F38020] text-[16px] font-bold border-b border-[#D9E6E9]">
        Thông tin sản phẩm
      </div>
    </template>

<!--    <div class="font-bold text-[#14272B]">Thông tin chi tiết</div>-->
    <div class="border-b border-[#D9E6E9] py-3">
      <dl>
        <div class="grid grid-cols-12 gap-4 mb-2">
          <div class="col-span-5">Tên sản phẩm</div>
          <div class="col-span-7 text-right text-[#4B6166] font-semibold">{{product?.name || ''}}</div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-2" v-if="product?.brand">
          <div class="col-span-5">Thương hiệu</div>
          <div class="col-span-7 text-right text-[#4B6166] font-semibold">{{product?.brand || ''}}</div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-2" v-if="product?.is_show_product_price">
          <div class="col-span-5">Giá bán</div>
          <div class="col-span-7 text-right text-[#4B6166] font-semibold">{{formatAmountCurrency(product?.price, company?.currency)}}/ {{product.unit}}</div>
        </div>
      </dl>
    </div>

    <div v-if="!isEmpty(product?.description)">
        <div>Mô tả</div>
        <div class="qrx-line-break" v-html="product?.description"></div>
    </div>
  </el-card>
</template>
