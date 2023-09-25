/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_ENDPOINT: string;
    readonly VITE_BASE_URL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
