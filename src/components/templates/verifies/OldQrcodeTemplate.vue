<script setup lang="ts">
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";

import FormVerify from "@/components/elements/FormVerification.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSlider from "@/components/common/CommonSlider.vue";
import ProductDetail from "@/components/common/ProductDetail.vue";
import StampStatusVerification from "@/components/elements/StampStatusVerification.vue";
import CommonContact from "@/components/common/CommonContact.vue";
import CustomerProfile from "@/components/common/CustomerProfile.vue";

import {useScanQrcodeStore} from "@/store";
import {apiVerifyStampCode} from "@/api";
import {VerifyStatus} from "@/types";

const {t: $t} = useI18n();
const {query} = useRoute();
const router = useRouter();

const props = defineProps({
  old_qrcode: { type: String, required: true, default: 'mirascan' }
})

const {id, series} = query;

const store = useScanQrcodeStore();
const product = computed(() => store.product);
let hasStampVerified = true;

const stampVerified = computed(() => store.stamp_code?.status || '');
const browser_id = window.localStorage.getItem('browser_id');

const handleEventSubmit = async (event: any) => {
  try {
    const data = {
      type: 'landing_page',
      id ,
      serial: props.old_qrcode === 'mirascan' ? id : series,
      ...event,
      browser_id,
      old_qrcode: props.old_qrcode,
      type_submit: 'submit'
    }
    const response = await apiVerifyStampCode(data);
    const {data: dataResponse} = response.data;
    const rsStatus = dataResponse?.stamp_code?.status || '';
    if (rsStatus && rsStatus === "over_limited") {
      await router.push({name: 'over-scan'});
    }

    store.setDataScanQrcode(dataResponse);
    hasStampVerified = true;
  } catch (e) {
    console.log('[QRX] error handle event submit', e);
    await router.push({name: 'error'});
  }
}

</script>
<template>
  <div>
    <div class="m-auto min-h-screen">
      <el-card class="qrx-card-bank mb-3" :class="!hasStampVerified ? 'mt-10' : ''">
        <template v-if="hasStampVerified">
          <CommonSlider/>
        </template>
        <div class="qrx-bg--success text-[16px] leading-5 p-4 text-white font-medium" v-if="!stampVerified || stampVerified === VerifyStatus.BLANK">
          {{ $t('common.verification_product') }}
        </div>

        <StampStatusVerification :status="stampVerified"/>
        <div class="p-5" v-if="!stampVerified || stampVerified === VerifyStatus.BLANK">
          <h2 class="text-[20px] font-bold leading-6 text-[#233438] mb-[2px]">{{product?.name || ''}}</h2>
          <div class="text-[10px] mb-3" v-html="$t('common.note_verification')"></div>
          <FormVerify :is_serial="hasStampVerified" @form-submit="handleEventSubmit"/>
        </div>
      </el-card>

      <CustomerProfile v-if="hasStampVerified && (stampVerified && stampVerified !== VerifyStatus.BLANK)" class="mb-3"/>

      <template v-if="hasStampVerified">
        <ProductDetail class="mb-3"/>
        <CommonContact/>
        <CommonFooter/>
      </template>
    </div>
  </div>
</template>
