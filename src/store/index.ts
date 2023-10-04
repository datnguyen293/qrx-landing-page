import { defineStore } from 'pinia';
import type {IScanQRCodeData} from "@/types";
import {DEFAULT_TEMPLATE_ONE, KEY_LOCAL_STORAGE, TEMPLATE_TYPES} from "@/constants";
// Define a store
export const useScanQrcodeStore = defineStore('useScanQrcodeStore', {
    state: () => ({
        product: {},
        company: {},
        template: {
            name: TEMPLATE_TYPES.TEMPLATE_ONE,
            code: TEMPLATE_TYPES.TEMPLATE_ONE,
            data: {...DEFAULT_TEMPLATE_ONE}
        },
        customer: {},
        stamp_code: {
            verification_code: '',
        },

        isLoadingGlobal: false,
    }),

    getters: {
        getTemplateCode(state) {
            return state.template.code || TEMPLATE_TYPES.TEMPLATE_ONE;
        },

        getStampCodeVerify(state) {
            return state.stamp_code.verification_code || '';
        }
    },

    actions: {
        setDataScanQrcode(data: IScanQRCodeData) {
            console.log('data', data)
            this.product = data?.product;
            this.company = data?.company;
            this.template = data?.template;
            this.customer = data?.customer || {};
            this.stamp_code = data?.stamp_code || {verification_code: ''};

            window.localStorage.setItem(KEY_LOCAL_STORAGE.THEME_SETTING, JSON.stringify(data?.template?.data));
        },

        getKeyThemeData(key: any) {
            let themeSetting: any;
            const themeSettingData = window.localStorage.getItem(KEY_LOCAL_STORAGE.THEME_SETTING);
            try {
                themeSetting = JSON.parse(themeSettingData || '{}');
            } catch (e) {
                console.log('error parse theme setting data', e);
            }

            const templateSettingStore: any = this.template.data;
            const templateDefault: any = DEFAULT_TEMPLATE_ONE;

            return themeSetting[key] ?? templateSettingStore[key] ?? templateDefault[key] ?? '';
        }
    },
});
