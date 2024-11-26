<script setup lang="ts">
import { computed } from "vue";
import { useScanQrcodeStore } from "@/store";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useScanQrcodeStore();
const company = computed(() => store.company);
const product = computed(() => store.product);
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
          <div class="col-span-7 text-right qrx-text--default font-semibold">{{ product?.name || 'N/A' }}</div>
        </div>
        
        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Thương hiệu</div>
          <div class="col-span-7 text-right qrx-text--default font-semibold">{{ company?.name || 'N/A' }}</div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-5">Giá bán</div>
          <div class="col-span-7 text-right qrx-text--default font-semibold">
            {{ `${product?.price || 0} VNĐ / ${product?.unit || 'chiếc'}` }}
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-3">
          <div class="col-span-12">Mô tả</div>
          <div class="col-span-12 qrx-text--default" v-html="product?.description"></div>
        </div>
      </dl>
    </div>
  </el-card>
</template>
