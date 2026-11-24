import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type {
  AdAnalyticsState,
  AdMonetizationConfig,
  AdPlacement,
  DirectSponsorCampaign,
} from '../types/news';
import { DEFAULT_AD_CONFIG, INITIAL_AD_ANALYTICS } from '../data/adDefaults';

const CONFIG_STORAGE_KEY = 'meridian_ad_config_v1';
const ANALYTICS_STORAGE_KEY = 'meridian_ad_analytics_v1';

interface AdContextValue {
  config: AdMonetizationConfig;
  analytics: AdAnalyticsState;
  isLiveAdSenseConfigured: boolean;
  updateConfig: (patch: Partial<AdMonetizationConfig>) => void;
  updateSlot: (slotId: AdPlacement, patch: Partial<AdMonetizationConfig['slots'][AdPlacement]>) => void;
  setConsent: (status: AdMonetizationConfig['consentStatus']) => void;
  addCampaign: (campaign: Omit<DirectSponsorCampaign, 'id'>) => void;
  toggleCampaign: (id: string) => void;
  deleteCampaign: (id: string) => void;
  recordImpression: (slotId: AdPlacement, cpm: number) => void;
  recordViewableImpression: (slotId: AdPlacement) => void;
  recordClick: (slotId: AdPlacement, cpc: number) => void;
  resetAnalytics: () => void;
  getCampaignForPlacement: (placement: AdPlacement, seed?: number) => DirectSponsorCampaign | null;
  generateAdsTxt: () => string;
}

const AdMonetizationContext = createContext<AdContextValue | null>(null);

function loadStoredConfig(): AdMonetizationConfig {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return DEFAULT_AD_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_AD_CONFIG,
      ...parsed,
      slots: { ...DEFAULT_AD_CONFIG.slots, ...(parsed.slots || {}) },
      campaigns:
        Array.isArray(parsed.campaigns) && parsed.campaigns.length > 0
          ? parsed.campaigns
          : DEFAULT_AD_CONFIG.campaigns,
    };
  } catch {
    return DEFAULT_AD_CONFIG;
  }
}

function loadStoredAnalytics(): AdAnalyticsState {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!raw) return INITIAL_AD_ANALYTICS;
    return { ...INITIAL_AD_ANALYTICS, ...JSON.parse(raw) };
  } catch {
    return INITIAL_AD_ANALYTICS;
  }
}

export function AdMonetizationProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AdMonetizationConfig>(loadStoredConfig);
  const [analytics, setAnalytics] = useState<AdAnalyticsState>(loadStoredAnalytics);

  const isLiveAdSenseConfigured =
    config.mode !== 'demo-direct' &&
    /^ca-pub-\d{10,20}$/.test(config.adsensePublisherId.trim()) &&
    config.adsensePublisherId.trim() !== 'ca-pub-0000000000000000';

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage quota errors
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(analytics));
    } catch {
      // Ignore storage quota errors
    }
  }, [analytics]);

  // Inject real Google AdSense script when a valid publisher ID is configured and consent is resolved
  useEffect(() => {
    if (!isLiveAdSenseConfigured || config.consentStatus === 'pending') return;

    const existing = document.querySelector<HTMLScriptElement>('script[data-meridian-adsense="true"]');
    const win = window as unknown as { adsbygoogle?: Array<unknown> & { requestNonPersonalizedAds?: number } };
    win.adsbygoogle = win.adsbygoogle || [];
    win.adsbygoogle.requestNonPersonalizedAds = config.consentStatus === 'essential-only' ? 1 : 0;

    if (!existing) {
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.dataset.meridianAdsense = 'true';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
        config.adsensePublisherId.trim()
      )}`;
      document.head.appendChild(script);
    }
  }, [isLiveAdSenseConfigured, config.adsensePublisherId, config.consentStatus]);

  const updateConfig = useCallback((patch: Partial<AdMonetizationConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateSlot = useCallback(
    (slotId: AdPlacement, patch: Partial<AdMonetizationConfig['slots'][AdPlacement]>) => {
      setConfig((prev) => ({
        ...prev,
        slots: {
          ...prev.slots,
          [slotId]: { ...prev.slots[slotId], ...patch },
        },
      }));
    },
    []
  );

  const setConsent = useCallback((consentStatus: AdMonetizationConfig['consentStatus']) => {
    setConfig((prev) => ({ ...prev, consentStatus }));
  }, []);

  const addCampaign = useCallback((campaign: Omit<DirectSponsorCampaign, 'id'>) => {
    const id = `camp-${Date.now()}`;
    setConfig((prev) => ({
      ...prev,
      campaigns: [{ ...campaign, id }, ...prev.campaigns],
    }));
  }, []);

  const toggleCampaign = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      campaigns: prev.campaigns.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
    }));
  }, []);

  const deleteCampaign = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      campaigns: prev.campaigns.filter((c) => c.id !== id),
    }));
  }, []);

  const recordImpression = useCallback((slotId: AdPlacement, cpm: number) => {
    const earned = cpm / 1000;
    const nowLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setAnalytics((prev) => {
      const slot = prev.bySlot[slotId] || { impressions: 0, viewableImpressions: 0, clicks: 0, revenue: 0 };
      const nextRev = prev.totalRevenue + earned;
      const nextImp = prev.totalImpressions + 1;
      return {
        ...prev,
        totalImpressions: nextImp,
        totalRevenue: nextRev,
        bySlot: {
          ...prev.bySlot,
          [slotId]: {
            ...slot,
            impressions: slot.impressions + 1,
            revenue: slot.revenue + earned,
          },
        },
        history: [
          ...prev.history.slice(-23),
          { time: nowLabel, revenue: Number(nextRev.toFixed(4)), impressions: nextImp, clicks: prev.totalClicks },
        ],
      };
    });

    fetch('/api/ads/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'impression', slotId, cpm }),
    }).catch(() => {});
  }, []);

  const recordViewableImpression = useCallback((slotId: AdPlacement) => {
    setAnalytics((prev) => {
      const slot = prev.bySlot[slotId] || { impressions: 0, viewableImpressions: 0, clicks: 0, revenue: 0 };
      return {
        ...prev,
        totalViewableImpressions: prev.totalViewableImpressions + 1,
        bySlot: {
          ...prev.bySlot,
          [slotId]: {
            ...slot,
            viewableImpressions: slot.viewableImpressions + 1,
          },
        },
      };
    });
  }, []);

  const recordClick = useCallback((slotId: AdPlacement, cpc: number) => {
    const nowLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setAnalytics((prev) => {
      const slot = prev.bySlot[slotId] || { impressions: 0, viewableImpressions: 0, clicks: 0, revenue: 0 };
      const nextRev = prev.totalRevenue + cpc;
      const nextClicks = prev.totalClicks + 1;
      return {
        ...prev,
        totalClicks: nextClicks,
        totalRevenue: nextRev,
        bySlot: {
          ...prev.bySlot,
          [slotId]: {
            ...slot,
            clicks: slot.clicks + 1,
            revenue: slot.revenue + cpc,
          },
        },
        history: [
          ...prev.history.slice(-23),
          {
            time: nowLabel,
            revenue: Number(nextRev.toFixed(4)),
            impressions: prev.totalImpressions,
            clicks: nextClicks,
          },
        ],
      };
    });

    fetch('/api/ads/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'click', slotId, cpc }),
    }).catch(() => {});
  }, []);

  const resetAnalytics = useCallback(() => {
    setAnalytics(INITIAL_AD_ANALYTICS);
  }, []);

  const getCampaignForPlacement = useCallback(
    (placement: AdPlacement, seed = 0): DirectSponsorCampaign | null => {
      const matching = config.campaigns.filter((c) => c.active && c.placements.includes(placement));
      if (matching.length === 0) {
        const anyActive = config.campaigns.filter((c) => c.active);
        if (anyActive.length === 0) return null;
        return anyActive[seed % anyActive.length];
      }
      return matching[seed % matching.length];
    },
    [config.campaigns]
  );

  const generateAdsTxt = useCallback(() => {
    const rawPub = config.adsensePublisherId.trim() || 'ca-pub-0000000000000000';
    const stripped = rawPub.startsWith('ca-') ? rawPub.slice(3) : rawPub;
    return [
      '# THE MERIDIAN — Authorized Digital Sellers (ads.txt)',
      '# Upload this file to the root of your domain (https://yourdomain.com/ads.txt)',
      `google.com, ${stripped}, DIRECT, f08c47fec0942fa0`,
    ].join('\n');
  }, [config.adsensePublisherId]);

  return (
    <AdMonetizationContext.Provider
      value={{
        config,
        analytics,
        isLiveAdSenseConfigured,
        updateConfig,
        updateSlot,
        setConsent,
        addCampaign,
        toggleCampaign,
        deleteCampaign,
        recordImpression,
        recordViewableImpression,
        recordClick,
        resetAnalytics,
        getCampaignForPlacement,
        generateAdsTxt,
      }}
    >
      {children}
    </AdMonetizationContext.Provider>
  );
}

export function useAdMonetization() {
  const ctx = useContext(AdMonetizationContext);
  if (!ctx) throw new Error('useAdMonetization must be used within AdMonetizationProvider');
  return ctx;
}
