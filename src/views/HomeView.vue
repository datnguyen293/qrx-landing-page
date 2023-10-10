<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useHead} from "unhead";
import {useI18n} from "vue-i18n";
import {ElLoading} from "element-plus";
import TemplateOne from "@/components/templates/verifies/TemplateOne.vue";
import {apiScanQRCode, apiVerifyStampCode} from "@/api";
import {useScanQrcodeStore} from "@/store";

useHead({
  title: 'Xác thực',
});

const {t: $t} = useI18n();
const {query} = useRoute();
const router = useRouter();
const store = useScanQrcodeStore();
const isLoading = ref(true);

onMounted(async () => {
  const {xid, serial, type, user_uuid, lat, lon, factory_name, utm} = query;
  const browser_id = window.localStorage.getItem('browser_id');
  const scanType = type || 'landing_page';
  if (serial && xid) {
    const bgLoading = ElLoading.service({
      lock: true,
      text: $t('common.loading'),
      background: '#f8f8ff',
    });

    try {
      let response;
      if (scanType === 'zalo_app') {
        response = await apiVerifyStampCode({
          xid,
          serial,
          type: 'zalo_app',
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
      const rsStatus = dataResponse?.stamp_code?.status || '';
      if (rsStatus && rsStatus === "over_limited") {
        await router.push({name: 'over-scan'});
      }
      store.setDataScanQrcode(dataResponse);
    } catch (e) {
      await router.push({name: 'not-found'});
    } finally {
      isLoading.value = false;
      setTimeout(() => {
        bgLoading.close()
      }, 1000);
    }
  }
  isLoading.value = false;
})

</script>

<template>
  <div class="qrx-container m-auto overflow-hidden">
    <el-skeleton v-if="isLoading"/>
    <TemplateOne v-else/>
  </div>
</template>
