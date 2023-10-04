<script setup lang="ts">
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useHead} from "unhead";
import {useI18n} from "vue-i18n";
import {ElLoading} from "element-plus";
import TemplateOne from "@/components/templates/verifies/TemplateOne.vue";
import {scanQrcodeCodeAPI} from "@/api";
import {useScanQrcodeStore} from "@/store";

useHead({
  title: 'Xác thực',
});

const {t: $t} = useI18n();

onMounted(async () => {
  const {query} = useRoute();
  const router = useRouter();

  const store = useScanQrcodeStore();
  const {uuid: serial} = query;
  if (serial) {
    const bgLoading = ElLoading.service({
      lock: true,
      text: $t('common.loading'),
      background: '#f8f8ff',
    })
    try {
      const response = await scanQrcodeCodeAPI({serial});
      const {data: dataResponse} = response.data;
      store.setDataScanQrcode(dataResponse);
    } catch (e) {
      router.push({name: 'not-found'});
    } finally {
      setTimeout(() => {
        bgLoading.close()
      }, 1000);
    }
  }
})

</script>

<template>
  <div class="qrx-container m-auto overflow-hidden">
  <TemplateOne/>
  </div>
</template>
