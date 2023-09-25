<script setup lang="ts">
const slideStr = (str: string) => {
  if (!str) {
    return '';
  }

  return str.slice(0, 38) + '...';
}
</script>

<template>
  <div class="bg-white rounded-2xl relative h-[189px] w-[140px] min-w-[140px] border flex flex-col-reverse justify-between">
    <div class="absolute w-[88px] h-[88px] bg-cover bg-no-repeat bg-center" :style="{
                left: 'calc(50% - 88px/2)',
                top: '24px',
              }">
      <img src="@/assets/images/logo.png" alt="logo" />
    </div>
    <div class="text-right px-1 mb-2">
      <div class="mt-3 text-[12px]">{{ slideStr('Onepharm Liver Maxs') }}</div>
      <div class="mt-2 font-medium text-[14px]">160.000đ/hộp</div>
    </div>
  </div>
</template>
