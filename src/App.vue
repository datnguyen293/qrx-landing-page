<script setup lang="ts">
import vi from 'element-plus/dist/locale/vi.mjs';
import { ElConfigProvider } from 'element-plus';
import {computed, ref} from "vue";
import type {ITemplate} from "./types";
import { useScanQrcodeStore } from './store';

const locale = ref(vi);
const store = useScanQrcodeStore();
const textDefault = computed(() => {
  const templateData: ITemplate = store.template;
  if (templateData.data?.text_default) {
    return templateData.data?.text_default || '#4B6166';
  }

  return '#4B6166';
});

const bgWarning = computed(() => {
  const templateData: ITemplate = store.template;
  if (templateData.data?.color_warring) {
    return templateData.data?.color_warring || '#F38020';
  }

  return '#F38020';
});

const colorError = computed(() => {
  const templateData: ITemplate = store.template;
  if (templateData.data?.color_error) {
    return templateData.data?.color_error || '#B61212';
  }

  return '#B61212';
});

const colorSuccess = computed(() => {
  const templateData: ITemplate = store.template;
  if (templateData.data?.color_success) {
    return templateData.data?.color_success || '#00994D';
  }

  return '#00994D';
});
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style lang="scss">
.qrx {
  &-bg {
    &--success {
      background: v-bind(colorSuccess);
    }
    &--warning {
      background: v-bind(bgWarning);
    }
    &--error {
      background: v-bind(colorError);
    }
  }

  &-text {
    &--default {
      color: v-bind(textDefault);
    }
    &--success {
      color: v-bind(colorSuccess);
    }
    &--warning {
      color: v-bind(bgWarning);
    }
    &--error {
      color: v-bind(colorError);
    }
  }
}
#app {
  .el-input {
    --el-input-focus-border: v-bind(colorSuccess) !important;
    --el-input-focus-border-color: v-bind(colorSuccess) !important;
  }
}
</style>
