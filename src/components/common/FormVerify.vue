<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import type {FormInstance, FormRules} from "element-plus";
import type {IFormVerify} from "@/types";
import {useScanQrcodeStore} from "@/store";
import {maxLengthRule, phoneNumberRules, requiredRule} from "@/utitls";

const {t: $t} = useI18n();
const props = defineProps({
  is_serial: { type: Boolean, required: true, default: true }
})

const formRef = ref<FormInstance>()
const emit = defineEmits(["formSubmit"]);

const store = useScanQrcodeStore();
onMounted(() => {
  formRef.value?.clearValidate();
})

const isDisableVerifyCode = ref(false);
const isProcessing = ref<boolean>(false);

const ruleForm = reactive<IFormVerify>({
  name: '',
  phone: '',
  verification_code: '',
});

const colorSuccess = computed(() => store.getKeyThemeData('color_success') || '#00994D');
watch(() => store?.stamp_code?.verification_code, (newValue, oldValue) => {
  ruleForm.verification_code = newValue;
  if (newValue) {
    isDisableVerifyCode.value = true;
  }
});

const ruleValidates: any = {
  name: [requiredRule($t('common.customer_name')), maxLengthRule($t('common.verify_code'), 100)],
  phone: [ ...phoneNumberRules()],
  verification_code: [requiredRule($t('common.verify_code')), maxLengthRule($t('common.verify_code'), 20)],
};

if (!props.is_serial) {
  ruleForm.serial = '';
  ruleValidates.serial = [requiredRule($t('common.serial')), maxLengthRule($t('common.verify_code'), 20)];
} else {
  delete ruleValidates.serial;
  delete ruleForm.serial;
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
      <el-input v-model="ruleForm.verification_code" :placeholder="$t('placeholders.verify_code')" :disabled="isDisableVerifyCode"/>
    </el-form-item>
    <el-form-item prop="name">
      <el-input v-model="ruleForm.name" :placeholder="$t('placeholders.customer_name')"/>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input v-model="ruleForm.phone" :placeholder="$t('placeholders.phone_number')"/>
    </el-form-item>
    <el-button type="success" class="w-full mt-2" :color="colorSuccess"
               @click="submitForm(formRef)"
               :disabled="isProcessing">
      {{ $t('buttons.verification') }}
    </el-button>
  </el-form>
</template>
