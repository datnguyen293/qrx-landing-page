declare module 'vue-i18n';
// shims-vue.d.ts
declare module '*.vue' {
    import { Component } from 'vue';
    const component: Component;
    export default component;
}
declare module 'element-plus/dist/locale/vi.mjs';
