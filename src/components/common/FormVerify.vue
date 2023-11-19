<script setup lang="ts">
import {computed, onMounted, reactive, ref } from "vue";
import {useI18n} from "vue-i18n";
import type {FormInstance, FormRules} from "element-plus";
import type {IFormVerify} from "@/types";
import {useScanQrcodeStore} from "@/store";
import { maxLengthRule, phoneNumberRules, requiredRule} from "@/utitls";
import {useRoute} from "vue-router";

const {t: $t} = useI18n();
const props = defineProps({
  is_serial: {type: Boolean, required: true, default: true}
})

const formRef = ref<FormInstance>()
const emit = defineEmits(["formSubmit"]);

const store = useScanQrcodeStore();
onMounted(() => {
  formRef.value?.clearValidate();
})

const isDisableVerifyCode = ref(false);
const isProcessing = ref<boolean>(false);
const {query} = useRoute();
const {serial, xid, type, preview} = query;

const ruleForm = reactive<any>({
  verification_code: '',
});


const isScanZaloApp = computed(() => type && type === 'zalo_app');
const colorSuccess = computed(() => store.getKeyThemeData('color_success') || '#00994D');
const verificationCode = computed(() => store?.stamp_code?.verification_code || '');
if (xid && verificationCode.value) {
  ruleForm.verification_code = verificationCode.value;
  isDisableVerifyCode.value = true;
}

const ruleValidates: any = {
  verification_code: [requiredRule($t('common.verify_code')), maxLengthRule($t('common.verify_code'), 20)],
};

if (!props.is_serial) {
  ruleForm.serial = serial || '';
  ruleValidates.serial = [requiredRule($t('common.serial')), maxLengthRule($t('common.verify_code'), 20)];
} else {
  delete ruleValidates.serial;
  delete ruleForm.serial;
}

if (!isScanZaloApp.value) {
  ruleForm.name = '';
  ruleForm.phone = '';
  ruleValidates.name = [requiredRule($t('common.customer_name')), maxLengthRule($t('common.verify_code'), 100)];
  ruleValidates.phone = [...phoneNumberRules()];
} else {
  delete ruleForm.name;
  delete ruleValidates.name;
  delete ruleForm.phone;
  delete ruleValidates.phone;
}

const rules = reactive<FormRules<IFormVerify>>(ruleValidates);
const submitForm = async (formEl: any) => {
  isProcessing.value = true;
  await formEl.validate((valid: any) => {
    if (!valid) {
      isProcessing.value = false;
      return;
    }

    emit("formSubmit", ruleForm);
  })
}
</script>

<template>
  <el-form
      ref="formRef"
      label-position="top"
      :model="ruleForm"
      :rules="rules"
  >
    <el-form-item prop="serial" v-if="!is_serial">
      <el-input v-model="ruleForm.serial" :placeholder="$t('placeholders.serial')"/>
    </el-form-item>
    <el-form-item prop="verification_code">
      <el-input v-model="ruleForm.verification_code" :placeholder="$t('placeholders.verify_code')"
                :disabled="isDisableVerifyCode"/>
    </el-form-item>
    <el-form-item prop="name" v-if="!isScanZaloApp">
      <el-input v-model="ruleForm.name" :placeholder="$t('placeholders.customer_name')"/>
    </el-form-item>
    <el-form-item prop="phone" v-if="!isScanZaloApp">
      <el-input v-model="ruleForm.phone" :placeholder="$t('placeholders.phone_number')"/>
    </el-form-item>

    <el-tooltip
        class="box-item"
        effect="dark"
        :disabled="!preview"
        content="Cảnh báo. Bạn đang ở chế độ preview, chúng tôi không cho phép xác thực mã."
        placement="top"
    >

      <el-button type="success" class="w-full mt-2" :color="colorSuccess"
                 @click="submitForm(formRef)"
                 :disabled="isProcessing || preview">
        {{ $t('buttons.verification') }}
      </el-button>
    </el-tooltip>
  </el-form>
</template>
