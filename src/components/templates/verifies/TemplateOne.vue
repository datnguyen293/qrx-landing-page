<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";

import FormVerify from "@/components/common/FormVerify.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSlider from "@/components/common/CommonSlider.vue";
import ProductDetail from "@/components/common/ProductDetail.vue";
import CommonStatusVerify from "@/components/common/CommonStatusVerify.vue";
import CommonContact from "@/components/common/CommonContact.vue";
import CommonCustomerProfile from "@/components/common/CommonCustomerProfile.vue";

import {useScanQrcodeStore} from "@/store";
import {apiVerifyStampCode} from "@/api";
import {STAMP_STATUS, STATUS_VERIFY, VERIFICATION_TYPE} from "@/constants";
import {isEmpty} from "@/utitls";

const {t: $t} = useI18n();
const {query} = useRoute();
const {xid, serial, user_uuid, lat, lon, factory_name, utm, type} = query;
const router = useRouter();

const store = useScanQrcodeStore();
const product = computed(() => store.product);
const isSerial = ref(false);


const stampStatus = computed(() => store.stamp_code?.status || '');
const browser_id = window.localStorage.getItem('browser_id');

const refStampStatus = ref<any>(stampStatus);
const customer = computed(() => store.customer);

onMounted(() => {
  isSerial.value = !!(xid || serial);
});

const scanType = type && type === VERIFICATION_TYPE.ZALO_APP ? VERIFICATION_TYPE.ZALO_APP : VERIFICATION_TYPE.LANDING_PAGE;
const handleEventSubmit = async (event: any) => {
  try {
    const data = {
      type: scanType,
      xid,
      serial,
      ...event,
      browser_id,
      is_serial: isSerial.value ? 1 : 0,
      user_uuid,
      lat,
      lon,
      factory_name,
      utm
    };

    const response = await apiVerifyStampCode(data);
    const {data: dataResponse} = response.data;
    store.setDataScanQrcode(dataResponse);
    refStampStatus.value = dataResponse?.stamp_code?.status;
    isSerial.value = true;
    if (scanType == VERIFICATION_TYPE.ZALO_APP && refStampStatus.value === STATUS_VERIFY.CANNOT_ACCESS) {
        await router.push({name: 'no-authorized'})
        return;
    }

  } catch (e) {
    console.log('[QRX] error handle event submit', e);

    if (scanType === VERIFICATION_TYPE.ZALO_APP) {
      await router.push({name: 'error'});
      return;
    }

    refStampStatus.value = 'fail';
  }
}

</script>
<template>
  <div>
    <div class="m-auto min-h-screen">
      <el-card class="qrx-card-bank mb-3" :class="(!isSerial || isEmpty(product)) ? 'mt-10' : ''">
        <template v-if="isSerial || !isEmpty(product)">
          <CommonSlider/>
        </template>

        <div class="qrx-bg--success text-[16px] leading-5 p-4 text-white font-medium"
             v-if="!stampStatus || stampStatus === STAMP_STATUS.SOLD">
          {{ $t('common.verification_product') }}
        </div>

        <CommonStatusVerify :status="refStampStatus"/>
        <div class="p-5" v-if="!stampStatus || stampStatus === STAMP_STATUS.SOLD">
          <h2 class="text-[20px] font-bold leading-6 text-[#233438] mb-[2px]">{{ product?.name || '' }}</h2>
          <div class="text-[10px] mb-3" v-html="$t('common.note_verification')"></div>
          <FormVerify :is_serial="isSerial" @form-submit="handleEventSubmit"/>
        </div>
      </el-card>

      <CommonCustomerProfile class="mb-3" v-if="!isEmpty(customer) || !isEmpty(customer?.phone)"/>

      <template v-if="isSerial">
        <ProductDetail class="mb-3" v-if="!isEmpty(product)"/>
        <CommonContact/>
        <CommonFooter/>
      </template>
    </div>
  </div>
</template>
