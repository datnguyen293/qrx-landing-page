<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {useI18n} from "vue-i18n";
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

import {useScanQrcodeStore} from "@/store";
import {apiVerifyStampCode} from "@/api";
import {STAMP_STATUS, VERIFICATION_TYPE} from "@/constants";
import {isEmpty} from "@/utitls";

import FormVerify from "@/components/elements/FormVerification.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSlider from "@/components/common/CommonSlider.vue";
import ProductDetail from "@/components/common/ProductDetail.vue";
import StampStatusVerification from "@/components/elements/StampStatusVerification.vue";
import CommonContact from "@/components/common/CommonContact.vue";
import CustomerProfile from "@/components/common/CustomerProfile.vue";
import ProductSwiperVue from "@/components/common/ProductSwiper.vue";

const {t: $t} = useI18n();
const {query} = useRoute();
const router = useRouter();
const {xid, serial, ser, user_uuid, lat, lon, utm, type, preview} = query;
const serialx = serial || ser;

const store = useScanQrcodeStore();
const product = computed(() => store.product);
const stampStatus = computed(() => store.stamp_code?.status || '');
const browser_id = window.localStorage.getItem('browser_id');
const isSerial = ref(false);

onMounted(() => {
  isSerial.value = !!serialx;
});

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
      serial: serialx,
      ...event,
      browser_id,
      user_uuid,
      lat,
      lon,
      utm
    };

    const response = await apiVerifyStampCode(data);
    const {data: dataResponse} = response.data;
    isSerial.value = true;
    store.setDataScanQrcode(dataResponse);
  } catch (e) {
    console.log('[QRX] error handle event submit', e);
    if (!serialx) {
      await router.push({name: 'error'});
      return;
    }
    store.setStatusScanStampCode('fail');
  }
}

</script>
<template>
    <div class="m-auto min-h-screen">
      <el-card class="qrx-card-bank mb-3" :class="(!isSerial || isEmpty(product)) ? 'mt-10' : ''">
        <template v-if="isSerial || !isEmpty(product)">
          <CommonSlider/>
        </template>

        <div class="qrx-bg--success text-[16px] leading-5 p-4 text-white font-medium"
             v-if="!stampStatus || stampStatus === STAMP_STATUS.SOLD">
          {{ $t('common.verification_product') }}
        </div>

        <StampStatusVerification/>
        <div class="p-5" v-if="!stampStatus || stampStatus === STAMP_STATUS.SOLD">
          <h2 class="text-[20px] font-bold leading-6 text-[#233438] mb-[2px]">{{ product?.name || '' }}</h2>
          <div class="text-[10px] mb-3" v-html="$t('common.note_verification')"></div>
          <FormVerify @form-submit="handleEventSubmit"/>
        </div>
      </el-card>

      <CustomerProfile class="mb-3"/>

      <template v-if="isSerial">
        <ProductDetail class="mb-3" v-if="!isEmpty(product)"/>
        <ProductSwiperVue class="mb-3" v-if="product.related_products.length"/>
        <CommonContact/>
        <CommonFooter/>
      </template>
    </div>
</template>
