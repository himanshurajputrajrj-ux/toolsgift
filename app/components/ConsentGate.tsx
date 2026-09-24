"use client";
import { useEffect, useState } from "react";
import {
  hasAdvertisingConsent,
  hasAnalyticsConsent,
} from "@/app/lib/cookieConsent";
type ConsentType = "analytics" | "advertising";
type ConsentGateProps = {
  type: ConsentType;
  children: React.ReactNode;
};
export default function ConsentGate({
  type,
  children,
}: ConsentGateProps) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const checkConsent = () => {
      setAllowed(
        type === "analytics"
          ? hasAnalyticsConsent()
          : hasAdvertisingConsent()
      );
    };
    checkConsent();
    window.addEventListener("toolsgift-consent-change", checkConsent);
    return () => {
      window.removeEventListener(
        "toolsgift-consent-change",
        checkConsent
      );
    };
  }, [type]);
  if (!allowed) {
    return null;
  }
  return <>{children}</>;
}
