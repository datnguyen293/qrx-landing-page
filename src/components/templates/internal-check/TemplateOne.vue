<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useScanQrcodeStore } from "@/store";
import { VERIFICATION_TYPE, STAMP_CODE_VERIFIED, STATUS_VERIFY, STAMP_STATUS } from "@/constants";
import { isEmpty } from "@/utitls";

import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSlider from "@/components/common/CommonSlider.vue";
import DistributionInfo from "./components/DistributionInfo.vue";
import VerifyInfo from "./components/VerifyInfo.vue";
import ProductDetail from "./components/ProductDetail.vue";
import CommonContact from "@/components/common/CommonContact.vue";

const { t: $t } = useI18n();
const { query } = useRoute();
const router = useRouter();
const { xid, serial, ser, user_uuid, lat, lon, utm, type, preview } = query;
const serialx = serial || ser;

const store = useScanQrcodeStore();
const product = computed(() => store.product);
const stampCode = computed(() => store.stamp_code);
const customer = computed(() => store.customer);
const browser_id = window.localStorage.getItem('browser_id');
const isSerial = ref(false);

onMounted(() => {
  isSerial.value = !!serialx;
});

const scanType = type === VERIFICATION_TYPE.ZALO_APP ? VERIFICATION_TYPE.ZALO_APP : VERIFICATION_TYPE.LANDING_PAGE;

const _STAMP_CODE_VERIFIED = [...STAMP_CODE_VERIFIED, STATUS_VERIFY.OVER_LIMITED, STAMP_STATUS.WARRANTY_REPLACED];

</script>
<template>
  <div class="m-auto min-h-screen">
    <el-card class="qrx-card-bank mb-3" :class="(!isSerial || isEmpty(product)) ? 'mt-10' : ''">
      <template v-if="isSerial || !isEmpty(product)">
        <CommonSlider />
      </template>

      <div class="qrx-bg--success text-[16px] leading-5 p-4 text-white font-medium">
        {{ $t('common.check_product_info') }}
      </div>
    </el-card>

    <DistributionInfo class="mb-3" v-if="!isEmpty(stampCode)" />
    <VerifyInfo class="mb-3" v-if="!isEmpty(customer) && _STAMP_CODE_VERIFIED.includes(stampCode.status)" />
    <ProductDetail class="mb-3" v-if="!isEmpty(product)" />
    <CommonContact />
    <CommonFooter />
  </div>
</template>
