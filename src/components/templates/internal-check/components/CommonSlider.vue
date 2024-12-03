<script setup lang="ts">
import { computed } from "vue";
import { useScanQrcodeStore } from "@/store/internalCheck";
import { isEmpty } from "@/utitls";

const store = useScanQrcodeStore();
const stamp_code = computed<any>(() => store.stamp_code);
const { product } = stamp_code.value;
</script>

<template>
  <div class="bg-white relative z-1000">
    <div class="min-h-[240px] max-h-[1000px] flex justify-center items-center">
      <template v-if="!isEmpty(product?.image_url)">
        <img :src="product.image_url" :alt="product?.name || ''" class="!w-full !h-full max-h-[1000px] object-contain" />
      </template>
      <template v-else>
        <img src="@/assets/images/no-image.png" alt="no-image" class="!w-full !h-full max-h-[1000px] object-contain" />
      </template>
    </div>
  </div>
</template>
