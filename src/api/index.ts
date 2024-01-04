import type { APIResponse, IResStampOld, IScanQRCodeData } from '@/types';
import axiosInstance from "@/utitls/request";
import {trimStringProperties} from "@/utitls";

export const apiInitSetting = () => {
    return axiosInstance.post<any>('/api/v1/verify/init-setting');
}
export const apiScanQRCode = (data: any) => {
    data = trimStringProperties(data);
    return axiosInstance.post<APIResponse<IScanQRCodeData>>('/api/v1/verify/scan-qrcode', data);
}

export const apiVerifyStampCode = (data: any) => {
    data = trimStringProperties(data);
    return axiosInstance.post<APIResponse<IScanQRCodeData>>('/api/v1/verify/verify-code', data);
}

export const apiCheckStampOld = (data: any) => {
    data = trimStringProperties(data);
    return axiosInstance.post<APIResponse<IResStampOld>>('/api/v1/check-stamp-old', data);
}
