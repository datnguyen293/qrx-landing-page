<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

import FormVerify from '@/components/common/FormVerify.vue';
import CommonFooter from '@/components/common/CommonFooter.vue';
import CommonSlider from '@/components/common/CommonSlider.vue';
import ProductDetail from '@/components/common/ProductDetail.vue';
import CommonStatusVerify from '@/components/common/CommonStatusVerify.vue';
import CommonContact from '@/components/common/CommonContact.vue';
import CommonCustomerProfile from '@/components/common/CommonCustomerProfile.vue';

import { useScanQrcodeStore } from '@/store';
import { apiVerifyStampCode } from '@/api';
import { STAMP_CODE_VERIFIED, STAMP_STATUS, STATUS_VERIFY, VERIFICATION_TYPE } from '@/constants';
import { isEmpty } from '@/utitls';
import StampCodeBlocked from '@/components/common/StampCodeBlocked.vue';
import CannotAccessVerifyStamp from '@/components/common/CannotAccessVerifyStamp.vue';
import NewStampCode from '@/components/common/NewStampCode.vue';

const { t: $t } = useI18n();
const { query } = useRoute();
const { xid, serial, user_uuid, lat, lon, factory_name, utm, type, preview } = query;
const router = useRouter();

const store = useScanQrcodeStore();
const product = computed(() => store.product);
const isSerial = ref(false);

const { message } = store;

const stampStatus = computed(() => store.stamp_code?.status || '');
const browser_id = window.localStorage.getItem('browser_id');

const customer = computed(() => store.customer);

onMounted(() => {
  // isSerial.value = !!(xid || serial);
  isSerial.value = !!serial;
});

const scanType =
  type && type === VERIFICATION_TYPE.ZALO_APP
    ? VERIFICATION_TYPE.ZALO_APP
    : VERIFICATION_TYPE.LANDING_PAGE;

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
      is_serial: isSerial.value ? 1 : 0,
      user_uuid,
      lat,
      lon,
      factory_name,
      utm,
    };

    const response = await apiVerifyStampCode(data);
    const { data: dataResponse } = response.data;
    store.setDataScanQrcode(dataResponse);
    isSerial.value = true;
  } catch (e) {
    console.log('[QRX] error handle event submit', e);
    store.setStatusScanStampCode('fail');

    if (scanType === VERIFICATION_TYPE.ZALO_APP || (!xid && !serial)) {
      await router.push({ name: 'error' });
      return;
    }
  }
};

const isHiddenLogo = computed(() =>
  store.stamp_code?.status === STATUS_VERIFY.SUCCESS ||
  store.stamp_code?.status === STATUS_VERIFY.FAIL
    ? 'hidden'
    : '',
);

const resultCommonSliders = [
  STAMP_STATUS.PRODUCT_ASSIGNED,
  STAMP_STATUS.PROCESSING,
  STATUS_VERIFY.OVER_LIMITED,
  STAMP_STATUS.WARRANTY_PROCESSING,
];
const reultStatusVerify = [
  STAMP_STATUS.WARRANTY_REPLACED,
  STAMP_STATUS.ACTIVATED,
  STATUS_VERIFY.SUCCESS,
];
</script>
<template>
  <div>
    <template
      v-if="
        [STAMP_STATUS.NEW, STAMP_STATUS.BLOCKED, STATUS_VERIFY.CANNOT_ACCESS].includes(
          stampCodeStatus,
        )
      "
    >
      <NewStampCode v-if="stampCodeStatus === STAMP_STATUS.NEW" />
      <StampCodeBlocked v-else-if="stampCodeStatus === STAMP_STATUS.BLOCKED" />
      <CannotAccessVerifyStamp v-else-if="stampCodeStatus === STATUS_VERIFY.CANNOT_ACCESS" />
    </template>

    <div class="m-auto min-h-screen" v-else>
      <div class="bg-[#353535] text-[16px] text-center leading-5 p-4 text-white font-medium">
        <img src="@/assets/images/logo-pisen.png" alt="Logo pisen" />
      </div>
      <el-card
        class="qrx-card-bank mb-3 text-center"
        :class="!isSerial || isEmpty(product) ? 'mt-10' : ''"
      >
        <template v-if="isSerial || !isEmpty(product)">
          <CommonSlider v-if="resultCommonSliders.includes(stampCodeStatus)" />
          <template v-if="message.logo !== ''">
            <img
              :src="message.logo"
              alt="Logo stamp success"
              class="!w-[250px]"
              :class="isHiddenLogo"
            />
          </template>
          <template v-else>
            <img
              src="@/assets/images/icon-hero.png"
              alt="Logo stamp success"
              class="!w-[250px]"
              :class="isHiddenLogo"
            />
          </template>
          <template v-if="stampCodeStatus === STATUS_VERIFY.SUCCESS">
            <img
              :src="message.logo"
              alt="Logo stamp success"
              class="!w-[250px]"
              :class="stampStatus === STATUS_VERIFY.FAIL ? 'hidden' : ''"
            />
          </template>
        </template>

        <CommonStatusVerify
          :class="reultStatusVerify.includes(stampCodeStatus) ? 'hidden' : 'block'"
        />

        <div class="p-5" v-if="!stampStatus || stampStatus === STAMP_STATUS.SOLD">
          <h2 class="text-[28px] font-bold leading-6 text-[#233438] mb-[2px]">
            {{ $t('common.congratulations') }}
          </h2>
          <p class="!leading-6 my-5">
            {{ $t('common.congratulations_content') }}
          </p>
          <FormVerify :is_serial="isSerial" @form-submit="handleEventSubmit" />
        </div>

        <div class="p-5" v-else-if="!stampStatus || stampStatus === STATUS_VERIFY.SUCCESS">
          <h2 class="text-[28px] font-bold leading-6 text-[#233438] mb-[2px]">
            {{ message.title }}
          </h2>
          <p class="!leading-6 my-5 text-justify">
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
          <p class="text-justify text-white">{{ product?.name }}</p>
          <div class="text-justify text-white mt-[16px]" v-html="message.content"></div>
        </div>
      </el-card>

      <CommonCustomerProfile class="mb-3" v-if="!isEmpty(customer) || !isEmpty(customer?.phone)" />

      <template v-if="isSerial">
        <ProductDetail class="mb-3" v-if="!isEmpty(product)" />
        <CommonContact />
        <CommonFooter />
      </template>
    </div>
  </div>
</template>
