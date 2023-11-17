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
import StampCodeBlocked from "@/components/common/StampCodeBlocked.vue";
import CannotAccessVerifyStamp from "@/components/common/CannotAccessVerifyStamp.vue";
import NewStampCode from "@/components/common/NewStampCode.vue";

const {t: $t} = useI18n();
const {query} = useRoute();
const {xid, serial, user_uuid, lat, lon, factory_name, utm, type} = query;
const router = useRouter();

const store = useScanQrcodeStore();
const product = computed(() => store.product);
const isSerial = ref(false);


const stampStatus = computed(() => store.stamp_code?.status || '');
const browser_id = window.localStorage.getItem('browser_id');

const customer = computed(() => store.customer);

onMounted(() => {
  // isSerial.value = !!(xid || serial);
  isSerial.value = !!(serial);
});

const scanType = type && type === VERIFICATION_TYPE.ZALO_APP ? VERIFICATION_TYPE.ZALO_APP : VERIFICATION_TYPE.LANDING_PAGE;

const stampCodeStatus = computed(() => store.stamp_code?.status || '');
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
    isSerial.value = true;
  } catch (e) {
    console.log('[QRX] error handle event submit', e);
    store.setStatusScanStampCode('fail');

    if (scanType === VERIFICATION_TYPE.ZALO_APP || (!xid && !serial)) {
      await router.push({name: 'error'});
      return;
    }
  }
}

</script>
<template>
  <div>
    <template v-if="[STAMP_STATUS.NEW, STAMP_STATUS.BLOCKED, STATUS_VERIFY.CANNOT_ACCESS].includes(stampCodeStatus)">
      <NewStampCode v-if="stampCodeStatus === STAMP_STATUS.NEW"/>
      <StampCodeBlocked v-else-if="stampCodeStatus === STAMP_STATUS.BLOCKED"/>
      <CannotAccessVerifyStamp v-else-if="stampCodeStatus === STATUS_VERIFY.CANNOT_ACCESS"/>
    </template>

    <div class="m-auto min-h-screen" v-else>
      <el-card class="qrx-card-bank mb-3" :class="(!isSerial || isEmpty(product)) ? 'mt-10' : ''">
        <template v-if="isSerial || !isEmpty(product)">
          <CommonSlider/>
        </template>

        <div class="qrx-bg--success text-[16px] leading-5 p-4 text-white font-medium"
             v-if="!stampStatus || stampStatus === STAMP_STATUS.SOLD">
          {{ $t('common.verification_product') }}
        </div>

        <CommonStatusVerify/>
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
