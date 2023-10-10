<script setup lang="ts">
import vi from 'element-plus/dist/locale/vi.mjs';
import { ElConfigProvider } from 'element-plus';
import {computed, ref} from "vue";
import { useScanQrcodeStore } from './store';
import {generateUUID} from "@/utitls";

const locale = ref(vi);
const store = useScanQrcodeStore();

const textDefault = computed(() => store.getKeyThemeData('color_default') || '#4B6166');
const bgWarning = computed(() => store.getKeyThemeData('color_warring') || '#F38020');
const colorError = computed(() => store.getKeyThemeData('color_error') || '#B61212');
const colorSuccess = computed(() => store.getKeyThemeData('color_success') || '#00994D');

// generate browser id
const browserId = window.localStorage.getItem('browser_id');
if (!browserId) {
  window.localStorage.setItem('browser_id', generateUUID() as string);
}
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
