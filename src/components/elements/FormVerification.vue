<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { FormInstance } from 'element-plus';
import { useScanQrcodeStore } from '@/store';
import { isEmpty, maxLengthRule, phoneNumberRules, requiredRule } from '@/utitls';
import { useRoute } from 'vue-router';

const { t: $t } = useI18n();
const formRef = ref<FormInstance>();
const emit = defineEmits(['formSubmit']);

const store = useScanQrcodeStore();
onMounted(() => {
  formRef.value?.clearValidate();
});

const isDisableVerifyCode = ref(false);
const isProcessing = ref<boolean>(false);
const { query } = useRoute();
const { preview, serial, ser } = query;
const serialx = serial || ser;

const ruleForm = reactive<any>({
  verification_code: '',
  name: '',
  phone: '',
});

const colorSuccess = computed(() => store.getKeyThemeData('color_success') || '#00994D');
const verificationCode = computed(() => store?.stamp_code?.verification_code || '');
const hasWarranty = computed(() => store?.stamp_code?.has_warranty || false);
const showCustomerStampAntiCounterfeit = computed(() => store?.stamp_code?.is_show_customer_stamp_anti_counterfeit || false);
const customerData: any = computed(() => store?.customer);
if (verificationCode.value) {
  ruleForm.verification_code = verificationCode.value;
  isDisableVerifyCode.value = true;
}

if (!isEmpty(customerData)) {
  ruleForm.name = customerData.value?.name || '';
  ruleForm.phone = customerData.value?.phone || '';
}

const stampHasWarranty = hasWarranty.value || !serialx;

const ruleValidates: any = {
  verification_code: [
    requiredRule($t('common.verify_code')),
  ],

  phone: [...phoneNumberRules('blur', stampHasWarranty)]
};


if (stampHasWarranty) {
  ruleValidates.name = [
    requiredRule($t('common.customer_name')),
    maxLengthRule($t('common.verify_code'), 100),
  ];
}


console.log('ruleValidates', ruleValidates)

const rules = ref(ruleValidates)

const submitForm = async (formEl: any) => {
  isProcessing.value = true;
  await formEl.validate((valid: any) => {
    if (!valid) {
      isProcessing.value = false;
      return;
    }

    emit('formSubmit', ruleForm);
  });
};
</script>

<template>
  <el-form ref="formRef" label-position="top" :model="ruleForm" :rules="rules">
    <el-form-item prop="verification_code" :label="$t('common.verify_code')">
      <el-input
        v-model="ruleForm.verification_code"
        :placeholder="$t('placeholders.verify_code')"
        :disabled="isDisableVerifyCode"
      />
    </el-form-item>
    <el-form-item v-if="showCustomerStampAntiCounterfeit || stampHasWarranty" prop="name" :label="$t('common.customer_name')">
      <el-input v-model="ruleForm.name" :placeholder="$t('placeholders.customer_name')" />
    </el-form-item>
    <el-form-item v-if="showCustomerStampAntiCounterfeit || stampHasWarranty" prop="phone" :label="$t('common.phone_number')">
      <el-input v-model="ruleForm.phone" :placeholder="$t('placeholders.phone_number')" />
    </el-form-item>

    <el-tooltip
      class="box-item"
      effect="dark"
      :disabled="!preview"
      content="Cảnh báo. Bạn đang ở chế độ preview, chúng tôi không cho phép xác thực mã."
      placement="top"
    >
      <el-button
        type="success"
        class="w-full mt-2 text-white hover:text-white"
        :color="colorSuccess"
        @click="submitForm(formRef)"
        :disabled="isProcessing || preview"
      >
        {{ $t('buttons.verification') }}
      </el-button>
    </el-tooltip>
  </el-form>
</template>
