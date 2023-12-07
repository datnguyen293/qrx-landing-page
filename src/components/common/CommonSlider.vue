<script setup lang="ts">
import {computed} from "vue";
import {useScanQrcodeStore} from "@/store";
import type {ITemplate} from "@/types";
import {isEmpty} from "@/utitls";
const store = useScanQrcodeStore();
const product = computed<any>(() => store.product);
const colorSuccess = computed(() => {
  const templateData: ITemplate = store.template;
  if (templateData.data?.color_success) {
    return templateData.data?.color_success || '#00994D';
  }

  return '#00994D';
});
</script>

<template>
  <div class="bg-white relative z-1000">
    <template v-if="!isEmpty(product.images) && product.images.length > 1">
      <el-carousel height="240px" :autoplay="false" trigger="click" class="product-item-slide z-[1] w-full m-auto">
        <template v-if="!isEmpty(product.images)">
          <el-carousel-item v-for="(item, index) in product.images" :key="index">
            <img :src="item" :alt="product.name" class="!w-full !h-full object-contain"/>
          </el-carousel-item>
        </template>
      </el-carousel>
    </template>

    <template v-else>
        <div class="h-[240px] flex justify-center items-center">
          <template v-if="!isEmpty(product.images)">
            <img :src="product.images[0]" :alt="product?.name || ''" class="!w-full !h-full object-contain"/>
          </template>
          <template v-else>
            <img src="@/assets/images/no-image.png" :alt="product?.name || ''" class="!w-full !h-full object-contain"/>
          </template>
        </div>
    </template>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-carousel__item) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-carousel__button) {
  background-color: v-bind(colorSuccess) !important;
  width: 8px !important;
  height: 8px !important;
  border-radius: 100px !important;
}
</style>
