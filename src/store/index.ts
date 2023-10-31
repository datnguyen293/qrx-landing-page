import { defineStore } from 'pinia';
import type {IScanQRCodeData} from "@/types";
import {DEFAULT_TEMPLATE_ONE, KEY_LOCAL_STORAGE, TEMPLATE_TYPES} from "@/constants";
// Define a store
const defaultTemplate = {
    name: TEMPLATE_TYPES.TEMPLATE_ONE,
    code: TEMPLATE_TYPES.TEMPLATE_ONE,
    data: {...DEFAULT_TEMPLATE_ONE}
}

const defaultCustomer: any = {
    name: '',
    phone_number: '',
}

const defaultStampCode: any = {
    verification_code: '',
    status: '',
    first_verification_at: '',
    message: ''
}

const defaultProduct: any = {
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

const defaultCompany: any = {
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    small_light_url: '',
    social_networks: [],
}

const defaultMessage: any = {
    logo: '',
    title: '',
    content: ''
}

export const useScanQrcodeStore = defineStore('useScanQrcodeStore', {
    state: () => ({
        product: {...defaultProduct},
        company: {...defaultCompany},
        template: {...defaultTemplate},
        customer: {...defaultCustomer},
        stamp_code: {...defaultStampCode},
        message: {...defaultMessage},
    }),

    getters: {
        getTemplateCode(state) {
            return state.template.code || TEMPLATE_TYPES.TEMPLATE_ONE;
        },

        getStampCodeStatusVerify(state) {
            return state.stamp_code.status || '';
        }
    },

    actions: {
        setDataScanQrcode(data: IScanQRCodeData) {
            this.product = data?.product || {...defaultProduct};
            this.company = data?.company || {...defaultCompany};
            this.template = data?.template;
            this.customer = data?.customer || {...defaultCustomer};
            this.stamp_code = data?.stamp_code || {...defaultStampCode};
            this.message = data?.message || [];

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
