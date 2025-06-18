<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ElLoading } from 'element-plus';
import { apiGetCustomerInfo, apiScanQRCode } from '@/api';
import { useScanQrcodeStore } from '@/store';
import { STAMP_STATUS, STATUS_VERIFY, TEMPLATE_TYPES, VERIFICATION_TYPE } from '@/constants';

import TemplateOne from '@/components/templates/verifies/TemplateOne.vue';
import TemplateTwo from '@/components/templates/verifies/TemplateTwo.vue';
import TemplateThree from '@/components/templates/verifies/TemplateThree.vue';
import { isEmpty } from '@/utitls';

const { t: $t } = useI18n();
const { query } = useRoute();
const router = useRouter();
const store = useScanQrcodeStore();
const stampCodeStatus = ref('');
const isProduct = ref(false);
const isLoading = ref(true);

onMounted(async () => {
  const { xid, serial, ser, type, user_uuid, preview, utm } = query;
  const serialx = serial || ser;
  const browser_id = window.localStorage.getItem('browser_id');
  const scanType = type || VERIFICATION_TYPE.LANDING_PAGE;
  if (!serialx) {
    if (!user_uuid || scanType != 'zalo_app') {
      isLoading.value = false;
      return;
    }

    const bgLoading = ElLoading.service({
      lock: true,
      text: $t('common.loading'),
      background: '#f8f8ff',
    });

   try {
     const resCustomer = await apiGetCustomerInfo({uuid: user_uuid, type: scanType});
     const { data: dataResCustomer } = resCustomer.data;
     if (dataResCustomer) {
       store.setCustomerInfo(dataResCustomer)
     }
   } catch (error) {
     console.log('[ERROR] get profile customer', error);
   } finally {
     setTimeout(() => {
       isLoading.value = false;
       bgLoading.close();
     }, 1000);
   }
   return;
  }

  const bgLoading = ElLoading.service({
    lock: true,
    text: $t('common.loading'),
    background: '#f8f8ff',
  });
  try {
    const response = await apiScanQRCode({ xid, serial: serialx, type: scanType, browser_id, preview, user_uuid, utm });
    const { data: dataResponse } = response.data;
    if (!isEmpty(dataResponse?.product)) {
      isProduct.value = true;
    }
    // status
    stampCodeStatus.value = dataResponse?.stamp_code?.status || '';
    if (stampCodeStatus.value === 'not_found') {
      await router.push({ name: 'not-found' });
      setTimeout(() => {
        bgLoading.close();
      }, 1000);
      return;
    }

    store.setDataScanQrcode(dataResponse);
    const hasStampError = [STAMP_STATUS.NEW, STAMP_STATUS.LOCKED,STAMP_STATUS.BLOCKED, STATUS_VERIFY.CANNOT_ACCESS].includes(stampCodeStatus.value);
    if (hasStampError) {
      setTimeout(() => {
        bgLoading.close();
      }, 1000);
      await router.push({ name: 'stamp-error' });
      isLoading.value = false;
      return;
    }

    setTimeout(() => {
      bgLoading.close();
    }, 1000);
  } catch (e) {
    await router.push({ name: 'error' });
    setTimeout(() => {
      bgLoading.close();
    }, 1000);
  } finally {
    isLoading.value = false;
  }
});

const templateCode = computed(() => store?.template?.code || 'mrw_template_1');
</script>

<template>
  <div class="qrx-container m-auto overflow-hidden">
    <el-skeleton v-if="isLoading"/>
    <template v-else>
      <template v-if="templateCode === TEMPLATE_TYPES.TEMPLATE_3">
        <TemplateThree />
      </template>
      <template v-else-if="templateCode === TEMPLATE_TYPES.TEMPLATE_2">
        <TemplateTwo />
      </template>
      <template v-else>
        <TemplateOne />
      </template>
    </template>
  </div>
</template>
