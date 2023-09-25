import { defineStore } from 'pinia';
import type {IScanQRCodeData} from "@/types";
import {TEMPLATE_TYPES} from "@/constants";
// Define a store
export const useScanQrcodeStore = defineStore('useScanQrcodeStore', {
    state: () => ({
        product: {},
        company: {},
        template: {
            name: TEMPLATE_TYPES.TEMPLATE_ONE,
            code: TEMPLATE_TYPES.TEMPLATE_ONE,
        },
        customer: {},
        stamp_verify: {},

        isLoadingGlobal: false,
    }),

    getters: {},
    actions: {
        setDataScanQrcode(data: IScanQRCodeData) {
            this.product = data?.product;
            this.company = data?.company;
            this.template = data?.template;
            this.customer = data?.customer || {}
            this.stamp_verify = data?.stamp_verify || {};
        },
    },
});
