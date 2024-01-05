<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {ElLoading} from "element-plus";
import { apiCheckStampOld } from '@/api';

const {t: $t} = useI18n();
const {query} = useRoute();
const router = useRouter();
const isLoading = ref(true);

onMounted(async () => {
  const {id, type, user_uuid} = query;
  if (!id) {
    isLoading.value = false;
    await router.push({name: 'not-found'});
    return;
  }

  const bgLoading = ElLoading.service({
    lock: true,
    text: $t('common.loading'),
    background: '#f8f8ff',
  });

  try {
    const response = await apiCheckStampOld({xid: id, type: 'pisen'});
    const serialData = response.data.data.serial;
    if (!serialData) {
      await router.push({name: 'not-found'});
      return;
    }

    await router.push({name: 'home', query: {serial: serialData, type, user_uuid}});
  } catch (e) {
    await router.push({name: 'not-found'});
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
    <el-skeleton/>
  </div>
</template>
