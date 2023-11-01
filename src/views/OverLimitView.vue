<script setup lang="ts">
import {useI18n} from "vue-i18n";
const {t: $t} = useI18n();
</script>

<template>
  <div>
    <div class="mx-auto py-12 qrx-container">
      <div class="mx-auto max-w-4xl flex justify-center">
        <svg width="337"
             height="339" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M404.509 405.108C486.395 323.221 486.395 190.457 404.509 108.57C322.622 26.6837 189.858 26.6837 107.971 108.57C26.0849 190.457 26.0849 323.221 107.971 405.108C189.858 486.994 322.622 486.994 404.509 405.108Z"
              fill="#F38020"/>
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M256.296 320.114C251.642 320.114 247.66 316.143 246.852 310.682L223.05 150.141C220.058 129.923 233.119 111.388 250.357 111.388H262.224C279.461 111.388 292.523 129.923 289.53 150.141L265.728 310.682C264.932 316.143 260.949 320.114 256.296 320.114Z"
                fill="#E6E9ED"/>
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M278.073 380.507C278.073 368.515 268.288 358.73 256.296 358.73C244.304 358.73 234.519 368.515 234.519 380.507C234.519 392.499 244.304 402.284 256.296 402.284C268.288 402.284 278.073 392.511 278.073 380.507Z"
                fill="#E6E9ED"/>
        </svg>

      </div>

      <div class="m-auto text-center mt-6 px-4">
        <div class="font-bold text-3xl mb-2 qrx-text--warning">{{$t('common.limit_scan')}}</div>
        <div class="text-[16px] text-app qrx-text--warning">{{ $t('common.limit_scan_content') }}</div>
      </div>
    </div>
  </div>
</template>
