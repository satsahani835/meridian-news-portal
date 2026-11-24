/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_PUB_ID?: string;
  readonly VITE_ADSENSE_SLOT_LEADERBOARD?: string;
  readonly VITE_ADSENSE_SLOT_SIDEBAR_MPU?: string;
  readonly VITE_ADSENSE_SLOT_SIDEBAR_TALL?: string;
  readonly VITE_ADSENSE_SLOT_INFEED?: string;
  readonly VITE_ADSENSE_SLOT_INARTICLE?: string;
  // Desk-Matched Affiliate Referral URLs (set in Vercel Environment Variables)
  readonly VITE_AFF_VPN_URL?: string;
  readonly VITE_AFF_REMIT_URL?: string;
  readonly VITE_AFF_FINANCE_URL?: string;
  readonly VITE_AFF_GOLD_URL?: string;
  readonly VITE_AFF_TRAVEL_URL?: string;
  readonly VITE_AFF_TECH_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
