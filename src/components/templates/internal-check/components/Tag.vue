<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { ITagType } from "@/types";

const props = defineProps<{
  tite: string;
  type: ITagType;
}>();

const renderColor = (type: string) => {
  switch (type) {
    case 'processing':
      return {
        color: '#1677ff',
        background: '#e6f4ff',
        borderColor: '#91caff',
      };
    case 'success':
      return {
        color: '#52c41a',
        background: '#f6ffed',
        borderColor: '#b7eb8f',
      };
    case 'error':
      return {
        color: '#ff4d4f',
        background: '#fff2f0',
        borderColor: '#ffccc7',
      };
    case 'warning':
      return {
        color: '#faad14',
        background: '#fffbe6',
        borderColor: '#ffe58f',
      };
    case 'magenta':
      return {
        color: '#c41d7f',
        background: '#fff0f6',
        borderColor: '#ffadd2',
      };
    case 'red':
      return {
        color: '#cf1322',
        background: '#fff2f0',
        borderColor: '#ffa39e',
      };
    case 'volcano':
      return {
        color: '#d4380d',
        background: '#fff2e8',
        borderColor: '#ffbb96',
      };
    case 'orange':
      return {
        color: '#d46b08',
        background: '#fff7e6',
        borderColor: '#ffd591',
      };
    case 'gold':
      return {
        color: '#d48806',
        background: '#fffbe6',
        borderColor: '#ffe58f',
      };
    case 'lime':
      return {
        color: '#7cb305',
        background: '#fcffe6',
        borderColor: '#eaff8f',
      };
    case 'green':
      return {
        color: '#389e0d',
        background: '#f6ffed',
        borderColor: '#b7eb8f',
      };
    case 'cyan':
      return {
        color: '#08979c',
        background: '#e6fffb',
        borderColor: '#87e8de',
      };
    case 'blue':
      return {
        color: '#0958d9',
        background: '#e6f7ff',
        borderColor: '#91d5ff',
      };
    case 'geekblue':
      return {
        color: '#1d39c4',
        background: '#f0f5ff',
        borderColor: '#adc6ff',
      };
    case 'purple':
      return {
        color: '#531dab',
        background: '#f9f0ff',
        borderColor: '#d3adf7',
      };
    default:
      return {
        color: '#595959',
        background: '#f5f5f5',
        borderColor: '#d9d9d9',
      };
  }
};

const colors = computed(() => renderColor(props.type));
</script>
<template>
  <div :style="{ color: colors.color, backgroundColor: colors.background, borderColor: colors.borderColor }"
       class="inline px-2 py-1 border-1 rounded-sm text-sm">
    {{ props.tite }}
  </div>
</template>
