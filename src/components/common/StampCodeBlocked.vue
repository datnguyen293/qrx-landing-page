<script setup lang="ts">
import {isEmpty} from "@/utitls";
import {computed} from "vue";
import {useScanQrcodeStore} from "@/store";
import CommonFooter from "@/components/common/CommonFooter.vue";

const store = useScanQrcodeStore();
const logoUrl = computed(() => store?.message?.logo || '');
const titleError = computed(() => store?.message?.title || '');
const contentError = computed(() => store?.message?.content || '');
</script>

<template>
  <div class="qrx-container m-auto overflow-hidden flex flex-col justify-between">
    <div class="pt-12">
      <div class="mx-auto max-w-4xl flex justify-center">
        <img v-if="!isEmpty(logoUrl)" :src="logoUrl" alt="Logo page not found" class="!max-w-[768px] !max-h-[339px]"/>
        <template v-else>
          <svg width="180" height="180" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_179476_2975)">
              <path d="M256 0C115.3 0 0 115.3 0 256C0 396.7 115.3 512 256 512C396.7 512 512 396.7 512 256C512 115.3 396.7 0 256 0ZM61 256C61 148.599 148.599 61 256 61C296.499 61 335.501 73.599 368.8 97.299L256 210.099L97.301 368.8C73.599 335.499 61 296.499 61 256ZM256 451C215.501 451 176.499 438.399 143.2 414.699L414.7 143.199C438.401 176.499 451 215.499 451 256C451 363.399 363.401 451 256 451Z" fill="#F38020"/>
              <path d="M512 256C512 396.7 396.7 512 256 512V451C363.401 451 451 363.399 451 256C451 215.499 438.401 176.499 414.699 143.2L256 301.899V210.099L368.8 97.299C335.501 73.599 296.499 61 256 61V0C396.7 0 512 115.3 512 256Z" fill="#F38020"/>
            </g>
            <defs>
              <clipPath id="clip0_179476_2975">
                <rect width="512" height="512" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </template>
      </div>

      <div class="m-auto text-center mt-6 px-4">
        <div class="font-bold text-3xl mb-2 qrx-text--warning">{{ !isEmpty(titleError) ? titleError : $t('common.stamp_blocked_title')}}</div>
        <div class="text-[16px] qrx-text--warning">{{ !isEmpty(contentError) ? contentError : $t('common.stamp_blocked_content') }}</div>
      </div>
    </div>
    <div>
      <CommonFooter/>
    </div>
  </div>
</template>
