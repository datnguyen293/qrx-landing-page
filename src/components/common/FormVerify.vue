<script setup lang="ts">
import type {IFormVerify} from "@/types";
import type {FormInstance, FormRules} from "element-plus";
import {useI18n} from "vue-i18n";
import {computed, reactive, ref} from "vue";
import type { ITemplate } from "@/types";
import {useScanQrcodeStore} from "@/store";
const {t: $t} = useI18n();
const props = defineProps({
  is_serial: { type: Boolean, required: true, default: true }
})

const ruleFormRef = ref<FormInstance>()
const emit = defineEmits(["formSubmit"]);

const dataForm: IFormVerify = {
  name: '',
  phone: '',
  stamp_verify: '',
};

if (!props.is_serial) {
  dataForm.serial = '';
} else {
  delete dataForm.serial;
}

const ruleValidates: any = {
  name: [
    { required: true, message: $t('validate.require', {name: $t('common.customer_name')}), trigger: 'blur' },
  ],
  phone: [
    { required: true, message: $t('validate.require', {name: $t('common.phone_number')}), trigger: 'blur' },
  ],
  stamp_verify: [
    { required: true, message: $t('validate.require', {name: $t('common.verify_code')}), trigger: 'blur' },
  ],
};

if (!props.is_serial) {
  ruleValidates.serial = [
    { required: true, message: $t('validate.require', {name: $t('common.serial')}), trigger: 'blur' },
  ];
} else {
  delete ruleValidates.serial;
}

const ruleForm = reactive<IFormVerify>(dataForm);
const rules = reactive<FormRules<IFormVerify>>(ruleValidates);
const isProcessing = ref<boolean>(false);
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

const store = useScanQrcodeStore();

const colorSuccess = computed(() => {
  const templateData: ITemplate = store.template;
  if (templateData.data?.color_success) {
    return templateData.data?.color_success || '#00994D';
  }

  return '#00994D';
});
</script>

<template>
  <el-form
      ref="ruleFormRef"
      label-position="top"
      :model="ruleForm"
      :rules="rules"
  >
    <el-form-item prop="serial" v-if="!is_serial">
      <el-input v-model="ruleForm.serial" :placeholder="$t('placeholders.serial')"/>
    </el-form-item>
    <el-form-item prop="stamp_verify">
      <el-input v-model="ruleForm.stamp_verify" :placeholder="$t('placeholders.verify_code')"/>
    </el-form-item>
    <el-form-item prop="name">
      <el-input v-model="ruleForm.name" :placeholder="$t('placeholders.customer_name')"/>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input v-model="ruleForm.phone" :placeholder="$t('placeholders.phone_number')"/>
    </el-form-item>
    <el-button type="success" class="w-full mt-2" :color="colorSuccess"
               @click="submitForm(ruleFormRef)"
               :disabled="isProcessing">
      Xác thực
    </el-button>
  </el-form>
</template>
