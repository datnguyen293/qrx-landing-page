<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

import FormVerification from '@/components/elements/FormVerification.vue';
import CommonFooter from '@/components/common/CommonFooter.vue';
import CommonSlider from '@/components/common/CommonSlider.vue';
import ProductDetail from '@/components/common/ProductDetail.vue';
import CommonStatusVerify from '@/components/elements/StampStatusVerification.vue';
import CommonContact from '@/components/common/CommonContact.vue';
import CustomerProfile from '@/components/common/CustomerProfile.vue';

import { useScanQrcodeStore } from '@/store';
import { apiVerifyStampCode } from '@/api';
import { STAMP_STATUS, VERIFICATION_TYPE } from '@/constants';
import { isEmpty } from '@/utitls';

const { t: $t } = useI18n();
const { query } = useRoute();
const { xid, serial, user_uuid, lat, lon, utm, type, preview } = query;

const store = useScanQrcodeStore();
const { company } = store;
const product = computed(() => store.product);
const stampStatus = computed(() => store.stamp_code?.status || '');
const browser_id = window.localStorage.getItem('browser_id');

const customer = computed(() => store.customer);

const scanType = type === VERIFICATION_TYPE.ZALO_APP ? VERIFICATION_TYPE.ZALO_APP : VERIFICATION_TYPE.LANDING_PAGE;

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
      utm
    };

    const response = await apiVerifyStampCode(data);
    const { data: dataResponse } = response.data;
    store.setDataScanQrcode(dataResponse);
  } catch (e) {
    console.log('[QRX] error handle event submit', e);
    store.setStatusScanStampCode('fail');
    // await router.push({ name: 'error' });
  }
};
</script>
<template>
  <div class="m-auto min-h-screen">
    <el-card class="qrx-card-bank mb-3" :class="!serial || isEmpty(product) ? 'mt-10' : ''">
      <div
        class="qrx-bg--success text-[16px] text-center leading-5 p-4 text-white font-medium"
        v-if="stampStatus || stampStatus === STAMP_STATUS.SOLD"
      >
        {{ $t('common.verification_product') }}
      </div>
      <template v-if="!isEmpty(serial) || !isEmpty(product)">
        <CommonSlider />
      </template>

      <CommonStatusVerify />

      <div class="p-5" v-if="!stampStatus || stampStatus === STAMP_STATUS.SOLD">
        <div class="bg-[#eaeaea] p-[16px] -mx-5 -mt-5 mb-5">
          <h1 class="text-[24px] text-center">{{ company.name }}</h1>
          <p class="text-center mt-[12px]">
            {{ $t('common.vetify_message') }}
          </p>
        </div>
        <h2 class="text-[20px] font-bold leading-6 text-[#233438] mb-[2px]">
          {{ product?.name || '' }}
        </h2>
        <div class="text-[10px] mb-3" v-html="$t('common.note_verification')"></div>
        <FormVerification @form-submit="handleEventSubmit" />
      </div>
    </el-card>

    <CustomerProfile class="mb-3" v-if="!isEmpty(customer) || !isEmpty(customer?.phone)" />

    <template v-if="!isEmpty(serial)">
      <ProductDetail class="mb-3" v-if="!isEmpty(product)" />
      <CommonContact />
    </template>
  </div>
</template>
