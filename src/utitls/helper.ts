export const formatCurrency = (number: number, locale = 'vi-VN', options?: object) => {
    return number ? number.toLocaleString(locale, options) : '0';
};

export const formatAmountCurrency = (amount: any, currency: any) => {
    if (isEmpty(currency)) {
        return formatCurrency(amount);
    }

    return `${formatCurrency(amount)}${currency?.symbol ?? 'VNĐ'}`;
}

export const cloneDeep = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(cloneDeep);
    } else if (obj && typeof obj === 'object') {
        const cloned: any = {};
        const keys = Object.keys(obj);
        for (let i = 0, l = keys.length; i < l; i++) {
            const key = keys[i];
            cloned[key] = cloneDeep(obj[key]);
        }
        return cloned;
    } else {
        return obj;
    }
};

/**
 * Check is empty value
 *
 * @param {*} value
 * @returns
 */
export function isEmpty(value: any) {
    return (
        value === null || // check for null
        value === undefined || // check for undefined
        value === '' || // check for empty string
        (Array.isArray(value) && value.length === 0) || // check for empty array
        (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
    );
}

/**
 * Parse to json
 * @param value
 * @param defaultValue
 * @return {{}}
 */
export const parseToJson = (value: string, defaultValue = {}) => {
    try {
        return JSON.parse(value);
    } catch (e) {
        return defaultValue;
    }
};

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const lightenColor = (color: string, amount: any) => {
    // Kiểm tra định dạng màu và loại bỏ ký tự '#' (nếu có)
    color = color.replace('#', '');

    // Chuyển đổi mã màu hexadecimals thành giá trị RGB
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // Áp dụng giản mã màu
    const lightenR = Math.round(r + (255 - r) * amount);
    const lightenG = Math.round(g + (255 - g) * amount);
    const lightenB = Math.round(b + (255 - b) * amount);

    // Chuyển đổi giá trị RGB thành mã màu hexadecimals
    return `#${(1 << 24 | lightenR << 16 | lightenG << 8 | lightenB).toString(16).slice(1)}`;
}

export const generateUUID = () => {
    let d = new Date().getTime();//Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }

        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export const trimStringProperties = (obj: any): any => {
    if (typeof obj === 'string') {
        return obj.trim();
    }

    if (typeof obj === 'object') {
        const trimmedObj: any = {};

        for (const key in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            trimmedObj[key] = trimStringProperties(obj[key]);
        }

        return trimmedObj;
    }

    return obj;
}
