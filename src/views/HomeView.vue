<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {ElLoading} from "element-plus";
import {apiScanQRCode, apiVerifyStampCode} from "@/api";
import {useScanQrcodeStore} from "@/store";
import {STAMP_STATUS, STATUS_VERIFY, VERIFICATION_TYPE} from "@/constants";

import TemplateOne from "@/components/templates/verifies/TemplateOne.vue";
import NewStampCode from "@/components/common/NewStampCode.vue";
import StampCodeBlocked from "@/components/common/StampCodeBlocked.vue";
import CannotAccessVerifyStamp from "@/components/common/CannotAccessVerifyStamp.vue";
import {isEmpty} from "@/utitls";

const {t: $t} = useI18n();
const {query} = useRoute();
const router = useRouter();
const store = useScanQrcodeStore();
const isLoading = ref(true);
const stampCodeStatus = ref('');
const isProduct = ref(false);

onMounted(async () => {
  const {xid, serial, type, user_uuid, lat, lon, factory_name, utm} = query;
  const browser_id = window.localStorage.getItem('browser_id');
  const scanType = type || VERIFICATION_TYPE.LANDING_PAGE;

  if (serial && xid || serial) {
    const bgLoading = ElLoading.service({
      lock: true,
      text: $t('common.loading'),
      background: '#f8f8ff',
    });

    try {
      let response;
      if (scanType === VERIFICATION_TYPE.ZALO_APP && serial) {
        response = await apiVerifyStampCode({
          xid,
          serial,
          type: VERIFICATION_TYPE.ZALO_APP,
          browser_id,
          user_uuid,
          lat,
          lon,
          factory_name,
          utm
        });
      } else {
        response = await apiScanQRCode({xid, serial, type: scanType, browser_id});
      }

      const {data: dataResponse} = response.data;
      if (!isEmpty(dataResponse?.product)) {
        isProduct.value = true;
      }
      // status
      stampCodeStatus.value = dataResponse?.stamp_code?.status || '';
      if (stampCodeStatus.value === 'not_found') {
        router.push({name: 'not-found'});
        return;
      }

      store.setDataScanQrcode(dataResponse);
    } catch (e) {
      await router.push({name: 'error'});
    } finally {
      isLoading.value = false;
      setTimeout(() => {
        bgLoading.close()
      }, 1000);
    }
  }
  isLoading.value = false;
});

</script>

<template>
  <div class="qrx-container m-auto overflow-hidden">
    <el-skeleton v-if="isLoading"/>
    <template v-else>
      <!-- Handle switch nhiều template-->
      <TemplateOne/>
    </template>
  </div>
</template>
