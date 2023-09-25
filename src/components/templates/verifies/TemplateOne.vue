<script setup lang="ts">
import FormVerify from "@/components/common/FormVerify.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import {useRoute, useRouter} from "vue-router";
import CommonSlider from "@/components/common/CommonSlider.vue";
import ProductDetail from "@/components/common/ProductDetail.vue";
import CommonStatusVerify from "@/components/common/CommonStatusVerify.vue";
import {useScanQrcodeStore} from "@/store";
import {computed} from "vue";
import CommonContact from "@/components/common/CommonContact.vue";

const {query} = useRoute();
const router = useRouter();

const serial = query?.serial || '';
const verifyCode = query?.verify_code || '';

const store = useScanQrcodeStore();
const handleEventSubmit = async (event: any) => {
  console.log('event', event);
}

const product = computed(() => store.product);
const isSerialVerify = !!(serial && verifyCode);
</script>
<template>
  <div>
    <div class="m-auto min-h-screen">
      <el-card class="qrx-card-bank mb-3" :class="!isSerialVerify ? 'mt-10' : ''">
        <template v-if="isSerialVerify">
          <CommonSlider/>
        </template>
        <div class="qrx-bg--success text-[16px] leading-5 p-4 text-white font-medium">
          Xác thực sản phẩm
        </div>

<!--        <CommonStatusVerify status="success"/>-->
        <div class="p-5">
          <h2 class="text-[20px] font-bold leading-6 text-[#233438] mb-[2px]">{{product?.name}}</h2>
          <div class="text-[10px] mb-3"><span class="text-[#B61212]">Lưu ý:</span> Nhập chính xác thông tin họ tên, SĐT để đảm bảo các quyền lợi về tích điểm, đổi quà và các vấn đề xác thực, khiếu nại liên quan.
          </div>
          <FormVerify :is_serial="isSerialVerify" @form-submit="handleEventSubmit"/>
        </div>
      </el-card>

      <template v-if="isSerialVerify">
        <ProductDetail class="mb-3"/>
        <CommonContact/>
        <CommonFooter/>
      </template>
    </div>
  </div>
</template>
