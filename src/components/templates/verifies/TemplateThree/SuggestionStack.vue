<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import type { IsContactFrom, IsContactRulers } from '@/types';
import { useScanQrcodeStore } from '@/store';
import { requiredRule } from '@/utitls';
import { useI18n } from 'vue-i18n';


const { t: $t } = useI18n();

const store = useScanQrcodeStore();
const colorSuccess = computed(() => store.getKeyThemeData('color_success') || '#00994D');

const ruleForm = reactive<IsContactFrom>({
  name: '',
  phone: '',
  email: '',
  content: '',
});

const rules = ref<IsContactRulers>({
  name: [requiredRule($t('placeholders.customer_name'))],
  phone: [requiredRule($t('placeholders.phone_number'))],
  email: [requiredRule($t('placeholders.email_address'))],
  content: [requiredRule($t('placeholders.content'))],
});

const isDisable = ref(true);
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
            <el-tooltip
              class="box-item"
              effect="dark"
              :disabled="!isDisable"
              content="Chức năng đang trong giai đoạn phát triển"
              placement="top"
            >
              <el-button
                type="success"
                class="w-full mt-2 text-white hover:text-white"
                :color="colorSuccess"
                :disabled="isDisable"
              >
                {{ $t('buttons.send') }}
              </el-button>
            </el-tooltip>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
