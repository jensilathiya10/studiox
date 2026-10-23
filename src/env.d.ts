/// <reference types="vite/client" />

declare const __SITE_URL__: string;

interface ImportMetaEnv {
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_PHONE?: string;
}
