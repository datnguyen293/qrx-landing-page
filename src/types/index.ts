export enum VerifyStatus {
    SUCCESS = 'success',
    FAIL = 'fail',
    VERIFIED = 'verified',
    BLANK = 'new',
    OVER_LIMITED = 'over_limited',
}

export type ICustomer = {
    name: string,
    phone: string,
}

export type IStampCode = {
    verification_code: string,
    status?: VerifyStatus,
    serial?: string,
}

export type ICommonField = {
    id?: string,
    name?: string
}

export type IProduct = {
    code?: string;
    price: number;
    slug: string;
    note?: string;
    image: string;
    images?: Array<string>;
    unit?: string;
    category?: string;
    brand: string
} & ICommonField;

export type ICompany =  {
    logo: string
    address: string
    email?: string
    phone?: string
    date_format?: string
    time_format?: string
    timezone?: string
    social_networks?: Array<SocialNetwork>,
    currency?: ICurrency,
}

export type ICurrency = {
    code: string,
    symbol: string,
    name: string,
}

export type SocialNetwork = {
    key: string,
    value: string
}

export type IFormVerify = {
    name: string;
    phone: string;
    verification_code: string;
    serial?: string;
}

export type ITemplate = {
    name: string,
    code:  string,
    data: {
        text_default: string,
        color_warring: string,
        color_success: string,
        color_error: string
    }
}

export type IScanQRCodeData = {
    product: IProduct,
    company: ICompany,
    template: ITemplate,
    customer?: ICustomer,
    stamp_code?: IStampCode,
}

export type APIResponse<T> = {
    data: T,
    message: string,
}
