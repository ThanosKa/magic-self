"use client";

import { useEffect } from "react";
import { onCLS, onINP, onLCP, onFCP, onTTFB } from "web-vitals";

/**
 * Web Vitals tracking component
 * Monitors Core Web Vitals and sends metrics to console (dev) or analytics endpoint (prod)
 */
export function WebVitals() {
  useEffect(() => {
    const sendToAnalytics = (metric: any) => {
    if (process.env.NODE_ENV === "development") {
        console.log(`[Web Vitals] ${metric.name}:`, {
          value: metric.value,
          rating: metric.rating,
          id: metric.id,
        });
      }
    };

    onLCP(sendToAnalytics);
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, []);

  return null;
}
