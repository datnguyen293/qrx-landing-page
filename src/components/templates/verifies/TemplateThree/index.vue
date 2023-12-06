<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import HomeStack from './HomeStack.vue';
import VerifyStack from './VerifyStack.vue';
import ContactStack from './ContactStack.vue';
import SuggestionStack from './SuggestionStack.vue';

const chooseStack = ref('verify');

const stacks = ref([
  {
    name: 'Trang chủ',
    sku: 'home',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" width="20px" height="20px"><path xmlns="http://www.w3.org/2000/svg" d="M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9z"></path></svg>`,
  },
  {
    name: 'Xác thực',
    sku: 'verify',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`,
  },
  {
    name: 'Liên hệ',
    sku: 'contact',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" width="20" height="20"><g xmlns="http://www.w3.org/2000/svg" data-name="Layer 2"><path d="M17.4 22A15.42 15.42 0 0 1 2 6.6 4.6 4.6 0 0 1 6.6 2a3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1-.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76A4.6 4.6 0 0 1 17.4 22z" data-name="phone"></path></g></svg>`,
  },
  {
    name: 'Thư góp ý',
    sku: 'feedback',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>`,
  },
]);

const showInStack = ['verify', 'home'];
</script>
<template>
  <div class="pb-[80px]">
    <HomeStack
      :chooseStack="chooseStack"
      @update-choose-stack="chooseStack = $event"
      v-if="chooseStack === 'home'"
    />
    <VerifyStack
      :chooseStack="chooseStack"
      @update-choose-stack="chooseStack = $event"
      v-if="chooseStack === 'verify'"
    />
    <ContactStack
      :chooseStack="chooseStack"
      @update-choose-stack="chooseStack = $event"
      v-if="chooseStack === 'contact'"
    />
    <SuggestionStack
      :chooseStack="chooseStack"
      @update-choose-stack="chooseStack = $event"
      v-if="chooseStack === 'feedback'"
    />
  </div>

  <div class="max-w-[768px] mx-auto bg-white flex justify-between fixed left-0 right-0 bottom-0">
    <div
      class="text-center flex-1 p-[10px] cursor-pointer rounded-[12px]"
      :class="chooseStack === stack.sku ? 'qrx-bg--success text-white fill-white' : ''"
      @click="chooseStack = stack.sku"
      v-for="stack in stacks"
    >
      <div v-html="stack.svg"></div>
      <p class="max-sm:hidden">{{ stack.name }}</p>
    </div>
  </div>
</template>
