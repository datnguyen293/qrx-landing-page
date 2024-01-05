<script setup lang="ts">
import { computed } from 'vue';

import StampCodeBlocked from "@/components/common/StampCodeBlocked.vue";
import StampUnauthorized from "@/components/elements/StampUnauthorized.vue";
import NewStampCode from "@/components/common/NewStampCode.vue";

import { STAMP_STATUS } from '@/constants';
import { useScanQrcodeStore } from '@/store';

const store = useScanQrcodeStore();

const stampCodeStatus = computed(() => store.stamp_code?.status || '');
</script>

<template>
  <NewStampCode v-if="stampCodeStatus === STAMP_STATUS.NEW" />
  <StampCodeBlocked v-else-if="stampCodeStatus === STAMP_STATUS.BLOCKED" />
  <StampUnauthorized v-else />
</template>