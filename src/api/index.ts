import type {APIResponse, IScanQRCodeData} from "@/types";
import axiosInstance from "@/utitls/request";

export const scanQrcodeCodeAPI = (data: any) => {
    return axiosInstance.get<APIResponse<IScanQRCodeData>>('/api/v1/verify/stamp-code', {params: data});
}
