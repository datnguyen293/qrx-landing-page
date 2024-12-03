import { defineStore } from 'pinia';
import type { IQrCheckInternal } from '@/types';
import { KEY_LOCAL_STORAGE } from "@/constants";

const defaultStampCode: IQrCheckInternal = {
  agency: {},
  company: {},
  created_at: '',
  internal_serial: '',
  order: {},
  product: {},
  purchase_order: {},
  sale_order: {},
  sales_date: '',
  sales_invoice_no: '',
  serial: '',
  service: [],
  status: '',
  updated_at: '',
  verification_code: '',
  warranty: [],
};

export const useScanQrcodeStore = defineStore('userQrCheckInternal', {
  state: () => ({
    stamp_code: { ...defaultStampCode },
    message: '',
  }),

  getters: {},

  actions: {
    setDataScanQrcode(data: IQrCheckInternal) {
      this.stamp_code = data || { ...defaultStampCode };
      
      window.localStorage.setItem(KEY_LOCAL_STORAGE.THEME_SETTING, JSON.stringify(data?.product?.template?.data));
      window.localStorage.setItem(KEY_LOCAL_STORAGE.COMPANY_SCAN, JSON.stringify(data?.company));
    },
  },
});
