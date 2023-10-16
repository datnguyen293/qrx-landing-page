<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useHead} from "unhead";
import {useI18n} from "vue-i18n";
import {ElLoading} from "element-plus";
import {apiScanQRCode} from "@/api";
import {useScanQrcodeStore} from "@/store";
import OldQrcodeTemplate from "@/components/templates/verifies/OldQrcodeTemplate.vue";

useHead({
  title: 'Xác thực',
});

const {t: $t} = useI18n();
const {query} = useRoute();
const router = useRouter();
const store = useScanQrcodeStore();
const isLoading = ref(true);

onMounted(async () => {
  const {id} = query;
  const browser_id = window.localStorage.getItem('browser_id');
  const scanType = 'landing_page';
  if (!id) {
    isLoading.value = false;
    await router.push({name: 'error'});
    return;
  }

  const bgLoading = ElLoading.service({
    lock: true,
    text: $t('common.loading'),
    background: '#f8f8ff',
  });

  try {
    const response = await apiScanQRCode({xid: id, serial: id, type: scanType, browser_id, old_type: 'mirascan'});

    const {data: dataResponse} = response.data;
    const rsStatus = dataResponse?.stamp_code?.status || '';
    if (rsStatus && rsStatus === "over_limited") {
      await router.push({name: 'over-scan'});
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
})

</script>

<template>
  <div class="qrx-container m-auto overflow-hidden">
    <el-skeleton v-if="isLoading"/>
    <OldQrcodeTemplate old_type="pisen" v-else/>
  </div>
</template>
