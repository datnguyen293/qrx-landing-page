<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

import FormVerify from '@/components/elements/FormVerification.vue';
import CommonFooter from '@/components/common/CommonFooter.vue';
import CommonSlider from '@/components/common/CommonSlider.vue';
import ProductDetail from '@/components/common/ProductDetail.vue';
import StampStatusVerification from '@/components/elements/StampStatusVerification.vue';
import CommonContact from '@/components/common/CommonContact.vue';
import CustomerProfile from '@/components/common/CustomerProfile.vue';

import { useScanQrcodeStore } from '@/store';
import { apiVerifyStampCode } from '@/api';
import { STAMP_STATUS, STATUS_VERIFY, VERIFICATION_TYPE } from '@/constants';
import { isEmpty } from '@/utitls';

const { t: $t } = useI18n();
const { query } = useRoute();
const { xid, serial, user_uuid, lat, lon, utm, type, preview } = query;
const store = useScanQrcodeStore();
const product = computed(() => store.product);

const { message } = store;

const stampStatus = computed(() => store.stamp_code?.status || '');
const browser_id = window.localStorage.getItem('browser_id');

const scanType =
  type === VERIFICATION_TYPE.ZALO_APP ? VERIFICATION_TYPE.ZALO_APP : VERIFICATION_TYPE.LANDING_PAGE;

const stampCodeStatus = computed(() => store.stamp_code?.status || '');
const handleEventSubmit = async (event: any) => {
  if (preview) {
    ElMessage({
      showClose: true,
      message: 'Cảnh báo. Bạn đang ở chế độ preview, chúng tôi không cho phép xác thực mã.',
      type: 'warning',
    });
    return;
  }

  try {
    const data = {
      type: scanType,
      xid,
      serial,
      ...event,
      browser_id,
      user_uuid,
      lat,
      lon,
      utm,
    };

    const response = await apiVerifyStampCode(data);
    const { data: dataResponse } = response.data;
    store.setDataScanQrcode(dataResponse);
  } catch (e) {
    console.log('[QRX] error handle event submit', e);
    store.setStatusScanStampCode('fail');
  }
};

const resultCommonSliders = [
  STAMP_STATUS.PRODUCT_ASSIGNED,
  STAMP_STATUS.PROCESSING,
  STATUS_VERIFY.OVER_LIMITED,
  STAMP_STATUS.WARRANTY_PROCESSING,
];
const resultStatusVerification = [
  STAMP_STATUS.WARRANTY_REPLACED,
  STAMP_STATUS.ACTIVATED,
  STATUS_VERIFY.SUCCESS,
];
const resultLogo = [
  ...resultCommonSliders,
  STATUS_VERIFY.FAIL,
];
</script>
<template>
  <div class="m-auto min-h-screen">
    <div class="bg-[#353535] text-[16px] text-center leading-5 p-4 text-white font-medium">
      <img src="@/assets/images/logo-pisen.png" alt="Logo pisen" />
    </div>
    <el-card
      class="qrx-card-bank mb-3 text-center"
      :class="!serial || isEmpty(product) ? 'mt-10' : ''"
    >
      <template v-if="!isEmpty(serial) || !isEmpty(product)">
        <CommonSlider v-if="resultCommonSliders.includes(stampCodeStatus)" />
          <img
            v-if="!isEmpty(message.logo) && stampCodeStatus !== STAMP_STATUS.SOLD"
            :src="message.logo"
            alt="Logo stamp success"
            class="!w-[250px]"
            :class="resultLogo.includes(stampCodeStatus) ? 'hidden' : ''"
          />

          <img
            v-else
            src="@/assets/images/icon-hero.png"
            alt="Logo stamp success"
            class="!w-[250px]"
            :class="resultLogo.includes(stampCodeStatus) ? 'hidden' : ''"
          />
      </template>

      <StampStatusVerification
        :class="resultStatusVerification.includes(stampCodeStatus) ? 'hidden' : 'block'"
      />

      <div class="p-5" v-if="!stampStatus || stampStatus === STAMP_STATUS.SOLD">
        <h2 class="text-[28px] font-bold leading-6 text-[#233438] mb-[2px]">
          {{ $t('common.congratulations') }}
        </h2>
        <p class="!leading-6 my-5">
          {{ $t('common.congratulations_content') }}
        </p>
        <FormVerify @form-submit="handleEventSubmit" />
      </div>

      <div class="p-5" v-else-if="!stampStatus || stampStatus === STATUS_VERIFY.SUCCESS">
        <h2 class="text-[28px] font-bold leading-6 text-[#233438] mb-[2px]">
          {{ message.title }}
        </h2>
        <p class="!leading-6 my-5 text-center">
          {{ message.content }}
        </p>
      </div>

      <div
        class="p-5"
        v-else-if="!stampStatus || [STAMP_STATUS.WARRANTY_REPLACED].includes(stampStatus)"
      >
        <h2>
          {{ message.content }}
        </h2>
        <p class="!leading-6 my-5">
          {{ product?.name }}
        </p>
      </div>
      <div
        class="p-5 px-3 py-5 qrx-bg--warning"
        v-else-if="stampCodeStatus === STAMP_STATUS.ACTIVATED"
      >
        <p class="text-center text-white">{{ product?.name }}</p>
        <div class="text-center text-white mt-[16px]" v-html="message.content"></div>
      </div>
    </el-card>

    <CustomerProfile class="mb-3" />

    <template v-if="!isEmpty(serial)">
      <ProductDetail class="mb-3" v-if="!isEmpty(product)" />
      <CommonContact />
      <CommonFooter />
    </template>
  </div>
</template>
