<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { maxLengthRule, phoneNumberRules, requiredRule, emailRules } from '@/utitls';

import { useI18n } from 'vue-i18n';

import { useScanQrcodeStore } from '@/store';

const store = useScanQrcodeStore();
const colorSuccess = computed(() => store.getKeyThemeData('color_success') || '#00994D');
const { t: $t } = useI18n();

const formRef = ref<FormInstance>();
const emit = defineEmits(['formSubmit']);
onMounted(() => {
  formRef.value?.clearValidate();
});

interface RuleForm {
  name: string;
  phone: string;
  email: string;
  content: string;
}

const ruleForm = reactive<RuleForm>({
  name: '',
  phone: '',
  email: '',
  content: '',
});

const ruleValidates: any = {
  verification_code: [requiredRule($t('common.verify_code'))],
};

ruleValidates.name = [requiredRule($t('common.customer_name'))];

ruleValidates.phone = [requiredRule($t('common.phone_number'))];

ruleValidates.email = [requiredRule($t('common.email'))];

ruleValidates.content = [requiredRule($t('common.content'))];

const rules = reactive<FormRules>(ruleValidates);
</script>

<template>
  <div class="m-auto min-h-screen">
    <el-card class="qrx-card-bank mb-3">
      <div class="qrx-bg--success text-[16px] text-center leading-5 p-4 text-white font-medium">
        {{ $t('common.suggestion') }}
      </div>

      <div class="p-[16px] flex flex-col gap-[10px]">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name" :placeholder="$t('placeholders.customer_name')" />
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone" :placeholder="$t('placeholders.phone_number')" />
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" :placeholder="$t('placeholders.email_address')" />
          </el-form-item>
          <el-form-item prop="content">
            <el-input
              v-model="ruleForm.content"
              :placeholder="$t('placeholders.content')"
              show-word-limit
              type="textarea"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="success" class="w-full mt-2 text-white" :color="colorSuccess">
              {{ $t('buttons.send') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
