import { defineStore } from 'pinia';
import type {IScanQRCodeData} from "@/types";
import {DEFAULT_TEMPLATE_ONE, KEY_LOCAL_STORAGE, TEMPLATE_TYPES} from "@/constants";
// Define a store
const defaultTemplate = {
    name: TEMPLATE_TYPES.TEMPLATE_ONE,
    code: TEMPLATE_TYPES.TEMPLATE_ONE,
    data: {...DEFAULT_TEMPLATE_ONE}
}

const defaultCustomer = {
    name: '',
    phone_number: '',
}

const defaultStampCode = {
    verification_code: '',
    status: '',
    first_verification_at: '',
    message: ''
}

const defaultProduct = {
    code: '',
    price: 0,
    slug: '',
    note: '',
    image: '',
    images: [],
    unit:  '',
    category: '',
    brand:  '',
    id: '',
    name: ''
}

const defaultCompany = {
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    social_networks: [],
}
export const useScanQrcodeStore = defineStore('useScanQrcodeStore', {
    state: () => ({
        product: {...defaultProduct},
        company: {...defaultCompany},
        template: {...defaultTemplate},
        customer: {...defaultCustomer},
        stamp_code: {...defaultStampCode},
    }),

    getters: {
        getTemplateCode(state) {
            return state.template.code || TEMPLATE_TYPES.TEMPLATE_ONE;
        },

        getStampCodeVerify(state) {
            return state.stamp_code.verification_code || '';
        },

        getStampCodeStatusVerify(state) {
            return state.stamp_code.status || '';
        },

        getCustomer(state) {
            return state.customer;
        },

        getStampCode(state) {
            return state.stamp_code;
        }
    },

    actions: {
        setDataScanQrcode(data: IScanQRCodeData) {
            this.product = data?.product || {...defaultProduct};
            this.company = data?.company || {...defaultCompany};
            this.template = data?.template;
            this.customer = data?.customer || {...defaultCustomer};
            this.stamp_code = data?.stamp_code || {...defaultStampCode};

            window.localStorage.setItem(KEY_LOCAL_STORAGE.THEME_SETTING, JSON.stringify(data?.template?.data));
        },

        getKeyThemeData(key: any) {
            let themeSetting: any;
            let themeSettingData = window.localStorage.getItem(KEY_LOCAL_STORAGE.THEME_SETTING);
            if(themeSettingData == 'undefined' || themeSettingData == 'null' || !themeSettingData) {
                themeSettingData = '{}';
            }
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
