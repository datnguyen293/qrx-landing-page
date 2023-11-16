export const STATUS_VERIFY = {
    VERIFIED: 'verified',
    FAIL: 'fail',
    SUCCESS: 'success',
    OVER_LIMITED: 'over_limited',
    UNSOLD: 'unsold',
    BLOCKED: 'blocked',
    CANNOT_ACCESS: 'cannot_access',
}

export enum STAMP_STATUS {
    NEW= 'new',
    BLANK= 'new',
    PRODUCT_ASSIGNED = 'product_assigned',
    PROCESSING = 'processing',
    SOLD= 'sold',
    WARRANTY_PROCESSING= 'warranty_processing',
    WARRANTY_REPLACED='warranty_replaced',
    ACTIVATED='activated',
    BLOCKED='blocked'
}

export const STAMP_CODE_UNSOLD: Array<string> = [STAMP_STATUS.PRODUCT_ASSIGNED]
// export const STAMP_CODE_VERIFIED: Array<string> = [STAMP_STATUS.WARRANTY_PROCESSING, STAMP_STATUS.WARRANTY_REPLACED, STAMP_STATUS.ACTIVATED]
export const STAMP_CODE_VERIFIED: Array<string> = [STAMP_STATUS.WARRANTY_REPLACED, STAMP_STATUS.ACTIVATED]

export const TEMPLATE_TYPES = {
    TEMPLATE_ONE: 'TEMPLATE_ONE',
};

export const TEMPLATE_LIST = Object.values(TEMPLATE_TYPES);


export const DEFAULT_TEMPLATE_ONE = {
    text_default: '#fff',
    color_warring: '#F38020',
    color_success: '#00994D',
    color_error: '#B61212',
}

export const SOCIAL_NETWORK_LIST = {
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    YOUTUBE: 'youtube',
    TWITTER: 'twitter',
    TIKTOK: 'tiktok',
    ZALO: 'zalo',
    WEBSITE: 'website',
    PHONE: 'phone',
    EMAIL: 'email',
    MESSAGE: 'message',
    LINKEDIN: 'linkedin',
    TIKI: 'tiki',
    LAZADA: 'lazada',
    SHOPEE: 'shopee',
    SHOPIFY: 'shopify',
}

export const KEY_LOCAL_STORAGE = {
    THEME_SETTING: 'THEME_SETTING',
}

export enum VERIFICATION_TYPE {
    ZALO_APP = 'zalo_app',
    LANDING_PAGE = 'landing_page'
}
