"use client";

import { useEffect } from "react";
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";
import { track } from "@vercel/analytics";

export function WebVitals() {
  useEffect(() => {
    const sendToAnalytics = (metric: Metric) => {
      if (process.env.NODE_ENV === "development") {
        console.log(`[Web Vitals] ${metric.name}:`, {
          value: metric.value,
          rating: metric.rating,
          id: metric.id,
        });
      }
      track(metric.name, {
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        rating: metric.rating,
      });
    };

    onLCP(sendToAnalytics);
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, []);

  return null;
}
