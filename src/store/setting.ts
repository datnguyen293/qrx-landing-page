import {defineStore} from "pinia";

const defaultSetting: any = {
    message_error_title: '',
    message_error_content: '',
    message_not_found_title: '',
    message_not_found_content: '',
    image_error_url: undefined,
    image_not_found_url: undefined,
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
