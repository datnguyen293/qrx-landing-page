<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ElLoading } from 'element-plus';
import { apiCheckInternalQrcode } from '@/api';
import { useScanQrcodeStore } from '@/store/internalCheck';

import TemplateOne from '@/components/templates/internal-check/TemplateOne.vue';

const { t: $t } = useI18n();
const { query } = useRoute();
const router = useRouter();
const store = useScanQrcodeStore();
const stampCodeStatus = ref('');
const isLoading = ref(true);

onMounted(async () => {
  const { serial, ser } = query;
  const serialx = serial || ser;

  const bgLoading = ElLoading.service({
    lock: true,
    text: $t('common.loading'),
    background: '#f8f8ff',
  });
  try {
    const response = await apiCheckInternalQrcode(serialx);
    const { data: dataResponse } = response.data;
    
    // status
    stampCodeStatus.value = dataResponse?.stamp_code?.status || '';
    if (stampCodeStatus.value === 'not_found') {
      await router.push({ name: 'not-found' });
      setTimeout(() => {
        bgLoading.close();
      }, 1000);
      return;
    }

    store.setDataScanQrcode(dataResponse.stamp_code);

    setTimeout(() => {
      bgLoading.close();
    }, 1000);
  } catch (e) {
    console.log(e);
    await router.push({ name: 'error' });
    setTimeout(() => {
      bgLoading.close();
    }, 1000);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="qrx-container m-auto overflow-hidden">
    <el-skeleton v-if="isLoading" />
    <template v-else>
      <TemplateOne />
    </template>
  </div>
</template>
