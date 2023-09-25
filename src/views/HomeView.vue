<script setup lang="ts">
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ElLoading} from "element-plus";
import TemplateOne from "@/components/templates/verifies/TemplateOne.vue";
import {scanQrcodeCodeAPI} from "@/api";
import {useScanQrcodeStore} from "@/store";
import {useHead} from "unhead";

useHead({
  title: 'Xác thực',
});

onMounted(async () => {
  const {query} = useRoute();
  const router = useRouter();

  const store = useScanQrcodeStore();
  const {serial, verify_code} = query;
  if (serial) {
    const bgLoading = ElLoading.service({
      lock: true,
      text: 'Đang tải..',
      background: '#f8f8ff',
    })
    try {
      const response = await scanQrcodeCodeAPI({serial, verify_code});
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
