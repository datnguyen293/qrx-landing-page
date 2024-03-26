<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {computed} from "vue";
import {useScanQrcodeStore} from "@/store";
import CommonFooter from "@/components/common/CommonFooter.vue";
import { KEY_LOCAL_STORAGE } from '@/constants';
import { isEmpty, parseStorageValue } from '@/utitls';

const {t} = useI18n();
const store = useScanQrcodeStore();
const messageLocalState = parseStorageValue(window.localStorage.getItem(KEY_LOCAL_STORAGE.STAMP_MESSAGE_STATES));

const logoUrl: any = computed(() => {
  const logoState = store?.message?.logo || '';
  if (!isEmpty(messageLocalState?.logo) && isEmpty(logoState)) {
    return messageLocalState.logo;
  }

  if (!isEmpty(logoState)) {
    return logoState;
  }

  return '';
})

const titleError: any = computed(() => {
  const titleState = store?.message?.title || '';
  if (!isEmpty(messageLocalState?.title) && isEmpty(titleState)) {
    return messageLocalState.title;
  }

  if (!isEmpty(titleState)) {
    return titleState;
  }

  return t('common.stamp_new_title');
})

const contentError: any = computed(() => {
  const contentState = store?.message?.content || '';
  if (!isEmpty(messageLocalState?.content) && isEmpty(contentState)) {
    return messageLocalState.content;
  }

  if (!isEmpty(contentState)) {
    return contentState;
  }

  return t('common.stamp_new_content');
})
</script>

<template>
  <div class="qrx-container m-auto overflow-hidden flex flex-col justify-between">
    <div class="pt-12">
    <div class="mx-auto max-w-4xl flex justify-center">
      <img v-if="!isEmpty(logoUrl)" :src="logoUrl" alt="Logo page not found" class="!max-w-[337px] !max-h-[339px]"/>
      <template v-else>
      <svg width="200" height="200" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_179469_3000)">
          <path d="M404.509 405.108C486.395 323.221 486.395 190.457 404.509 108.57C322.622 26.6837 189.858 26.6837 107.971 108.57C26.0849 190.457 26.0849 323.221 107.971 405.108C189.858 486.994 322.622 486.994 404.509 405.108Z" fill="#F38020"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M256.296 320.114C251.642 320.114 247.66 316.143 246.852 310.682L223.05 150.141C220.058 129.923 233.119 111.388 250.357 111.388H262.224C279.461 111.388 292.523 129.923 289.53 150.141L265.728 310.682C264.932 316.143 260.949 320.114 256.296 320.114Z" fill="#E6E9ED"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M278.073 380.507C278.073 368.515 268.288 358.73 256.296 358.73C244.304 358.73 234.519 368.515 234.519 380.507C234.519 392.499 244.304 402.284 256.296 402.284C268.288 402.284 278.073 392.511 278.073 380.507Z" fill="#E6E9ED"/>
        </g>
        <defs>
          <clipPath id="clip0_179469_3000">
            <rect width="512" height="512" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      </template>
    </div>

    <div class="m-auto text-center mt-6 px-4">
      <div class="font-bold text-3xl mb-2 qrx-text--warning">{{ titleError }}</div>
      <div class="text-[16px] qrx-text--warning">{{ contentError }}</div>
    </div>
  </div>

    <div>
      <CommonFooter/>
    </div>
  </div>
</template>
