/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_PUB_ID?: string;
  readonly VITE_ADSENSE_SLOT_LEADERBOARD?: string;
  readonly VITE_ADSENSE_SLOT_SIDEBAR_MPU?: string;
  readonly VITE_ADSENSE_SLOT_SIDEBAR_TALL?: string;
  readonly VITE_ADSENSE_SLOT_INFEED?: string;
  readonly VITE_ADSENSE_SLOT_INARTICLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
