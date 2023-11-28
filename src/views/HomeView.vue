<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ElLoading } from 'element-plus';
import { apiScanQRCode, apiVerifyStampCode } from '@/api';
import { useScanQrcodeStore } from '@/store';
import { VERIFICATION_TYPE } from '@/constants';

import TemplateOne from '@/components/templates/verifies/TemplateOne.vue';
import TemplateTwo from '@/components/templates/verifies/TemplateTwo.vue';
import { isEmpty, isValidUrl } from '@/utitls';

const { t: $t } = useI18n();
const { query } = useRoute();
const router = useRouter();
const store = useScanQrcodeStore();
const isLoading = ref(true);
const stampCodeStatus = ref('');
const isProduct = ref(false);

const { template } = store;

onMounted(async () => {
  const { xid, serial, type, user_uuid, lat, lon, factory_name, utm, preview } = query;

  const browser_id = window.localStorage.getItem('browser_id');
  const scanType = type || VERIFICATION_TYPE.LANDING_PAGE;

  if ((serial && xid) || serial) {
    const bgLoading = ElLoading.service({
      lock: true,
      text: $t('common.loading'),
      background: '#f8f8ff',
    });

    try {
      let response;
      if (scanType === VERIFICATION_TYPE.ZALO_APP && serial && !preview) {
        response = await apiVerifyStampCode({
          xid,
          serial,
          type: VERIFICATION_TYPE.ZALO_APP,
          browser_id,
          user_uuid,
          lat,
          lon,
          factory_name,
          utm,
        });
      } else {
        response = await apiScanQRCode({ xid, serial, type: scanType, browser_id, preview });
      }

      const { data: dataResponse } = response.data;
      if (!isEmpty(dataResponse?.product)) {
        isProduct.value = true;
      }
      // status
      stampCodeStatus.value = dataResponse?.stamp_code?.status || '';
      if (stampCodeStatus.value === 'not_found') {
        if (!isEmpty(dataResponse?.redirect_url) && isValidUrl(dataResponse?.redirect_url)) {
          window.location.href = dataResponse?.redirect_url;
          return;
        }

        await router.push({ name: 'not-found' });
        isLoading.value = false;
        setTimeout(() => {
          bgLoading.close();
        }, 1000);
        return;
      }

      store.setDataScanQrcode(dataResponse);
      isLoading.value = false;
      setTimeout(() => {
        bgLoading.close();
      }, 1000);
    } catch (e) {
      await router.push({ name: 'error' });
      isLoading.value = false;
      setTimeout(() => {
        bgLoading.close();
      }, 1000);
    }
  }
});
</script>

<template>
  <div class="qrx-container m-auto overflow-hidden">
    <el-skeleton v-if="isLoading" />
    <template v-else>
      <!-- Handle switch nhiều template-->
      <template v-if="template.code !== 'TEMPLATE_ONE'">
        <TemplateOne />
      </template>
      <template v-else>
        <TemplateTwo />
      </template>
    </template>
  </div>
</template>
