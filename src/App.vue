<script setup lang="ts">
import vi from 'element-plus/dist/locale/vi.mjs';
import { ElConfigProvider, ElLoading } from 'element-plus';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useScanQrcodeStore } from './store';
import { generateUUID, isEmpty } from '@/utitls';
import { apiInitSetting } from '@/api';
import { useSetting } from '@/store/setting';
import { useFavicon, useTitle } from '@vueuse/core';

const locale = ref(vi);
const store = useScanQrcodeStore();
const storeSetting = useSetting();
const { t: $t } = useI18n();
const isLoading = ref(true);

const companyName = computed(() => store?.company?.name || '');
const companyUrl = computed(() => store?.company?.small_light_url || '');
useTitle(
  companyName.value
    ? `Xác thực và Bảo hành online - ${companyName.value}`
    : 'Xác thực và Bảo hành online',
);

useFavicon(!isEmpty(companyUrl) ? companyUrl : './favicon.ico');
onMounted(() => initData());

const textDefault = computed(() => store.getKeyThemeData('text_default') || '#4B6166');
const bgWarning = computed(() => store.getKeyThemeData('color_warring') || '#F38020');
const colorError = computed(() => store.getKeyThemeData('color_error') || '#B61212');
const colorSuccess = computed(() => store.getKeyThemeData('color_success') || '#00994D');

// generate browser id
const browserId = window.localStorage.getItem('browser_id');
if (!browserId) {
  window.localStorage.setItem('browser_id', generateUUID() as string);
}

// Init load service setting
const initData = async () => {
  if (storeSetting.isFetchInit) {
    return;
  }

  const bgLoading = ElLoading.service({
    lock: true,
    text: $t('common.loading'),
    background: '#f8f8ff',
  });
  try {
    const response = await apiInitSetting();
    const { data: dataResponse } = response.data;
    storeSetting.setSettingData(dataResponse?.credentials || {});
    storeSetting.actionIsFetched();
  } finally {
    setTimeout(() => {
      bgLoading.close();
    }, 1000);
    isLoading.value = false;
  }
};
</script>

<template>
  <el-config-provider :locale="locale">
    <el-skeleton v-if="isLoading" />
    <template v-else>
      <RouterView />
    </template>
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
  &-fill {
    fill: v-bind(textDefault);
  }
}

#app {
  .el-input {
    --el-input-focus-border: v-bind(colorSuccess) !important;
    --el-input-focus-border-color: v-bind(colorSuccess) !important;
  }
}
</style>
