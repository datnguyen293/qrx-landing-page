<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { isEmpty } from "@/utitls";
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useScanQrcodeStore } from "@/store/internalCheck";
import { STAMP_CODE_VERIFIED, STATUS_VERIFY, STAMP_STATUS } from "@/constants";

import CommonSlider from "./components/CommonSlider.vue";
import DistributionInfo from "./components/DistributionInfo.vue";
import VerifyInfo from "./components/VerifyInfo.vue";
import ProductDetail from "./components/ProductDetail.vue";
import CommonContact from "./components/CommonContact.vue";
import CommonFooter from "./components/CommonFooter.vue";

const { t: $t } = useI18n();
const store = useScanQrcodeStore();
const stamp_code = computed(() => store.stamp_code);
const { status, customer } = stamp_code.value;

const _STAMP_CODE_VERIFIED = [...STAMP_CODE_VERIFIED, STATUS_VERIFY.OVER_LIMITED, STAMP_STATUS.WARRANTY_REPLACED];

</script>
<template>
  <div class="m-auto min-h-screen">
    <el-card class="qrx-card-bank mb-3">
      <CommonSlider />

      <div class="bg-[#4CB050] text-[16px] leading-5 p-4 text-white font-medium">
        {{ $t('common.check_product_info') }}
      </div>
    </el-card>

    <DistributionInfo class="mb-3"/>
    <VerifyInfo class="mb-3" v-if="!isEmpty(customer) && _STAMP_CODE_VERIFIED.includes(status as string)" />
    <ProductDetail class="mb-3" />
    <CommonContact />
    <CommonFooter />
  </div>
</template>
