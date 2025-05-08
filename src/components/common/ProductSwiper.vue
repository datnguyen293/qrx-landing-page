<script setup lang="ts">
import { computed, ref } from "vue";
import { useScanQrcodeStore } from "@/store";
import type { ITemplate } from "@/types";

const store = useScanQrcodeStore();
const products = computed<any>(() => store.product.related_products);

// Group products into chunks of 3 for carousel
const groupedProducts = computed(() => {
  const items = products.value || [];
  const result = [];

  for (let i = 0; i < items.length; i += 3) {
    result.push(items.slice(i, i + 3));
  }

  return result;
});

const colorSuccess = computed(() => {
  const templateData: ITemplate = store.template;
  if (templateData.data?.color_success) {
    return templateData.data?.color_success || '#00994D';
  }

  return '#00994D';
});

// Handle click on product card to navigate to product URL
const navigateToProduct = (url: string) => {
  if (url) {
    window.open(url, '_blank');
  }
};
</script>

<template>
  <el-card>
    <template #header>
      <div class="text-[#F38020] text-[16px] font-bold border-b border-[#D9E6E9]">
        Sản phẩm liên quan
      </div>
    </template>

    <div>
      <el-carousel :autoplay="false" trigger="click" class="product-item-slide z-[1] w-full m-auto">
        <el-carousel-item v-for="(group, groupIndex) in groupedProducts" :key="groupIndex">
          <div class="flex items-center w-full">
            <div v-for="(item, itemIndex) in group" :key="itemIndex" class="w-1/3 px-2 flex justify-center">
              <el-card 
                style="max-width: 480px;" 
                class="product-card" 
                @click="navigateToProduct(item.url || '#')" 
                :class="{'cursor-pointer': item.url}"
              >
                <div class="image-container">
                  <el-image :src="item.image" fit="fill" class="product-image" />
                </div>
                <template #footer>
                  <div class="product-footer">
                    <h4 class="product-title">{{ item.name || 'Product Title' }}</h4>
                    <p class="product-price">{{ item.price || '$0.00' }}</p>
                  </div>
                </template>
              </el-card>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
:deep(.el-carousel__item) {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #E4E7EC;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &.cursor-pointer:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

:deep(.product-card .el-card__body) {
  padding: 4px;
}

:deep(.product-card .el-card__footer) {
  padding: 4px;
}

.image-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
}

.product-footer {
  padding: 8px 0;
  text-align: center;
}

.product-title {
  font-weight: 500;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price {
  color: v-bind(colorSuccess);
  font-weight: 600;
}
</style>
