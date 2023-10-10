import type {APIResponse, IScanQRCodeData} from "@/types";
import axiosInstance from "@/utitls/request";

export const apiScanQRCode = (data: any) => {
    return axiosInstance.post<APIResponse<IScanQRCodeData>>('/api/v1/verify/scan-qrcode', data);
}

export const apiVerifyStampCode = (data: any) => {
    return axiosInstance.post<APIResponse<IScanQRCodeData>>('/api/v1/verify/verify-code', data);
}
