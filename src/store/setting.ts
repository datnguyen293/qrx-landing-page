import {defineStore} from "pinia";

const defaultSetting: any = {
    icon_stamp_not_found_url: undefined,
    title_stamp_not_found: '',
    message_stamp_not_found: '',

    icon_stamp_error_url: undefined,
    title_stamp_error: '',
    message_stamp_error: '',
}
export const useSetting = defineStore('useSetting', {
    state: () => ({
        isFetchInit: false,
        setting: {...defaultSetting}
    }),

    actions: {
        setSettingData(setting: any) {
            Object.keys(defaultSetting).forEach(key => {
                this.setting[key] = setting[key] ?? undefined;
            });
        },

        actionIsFetched() {
            this.isFetchInit = true;
        }
    }
});
