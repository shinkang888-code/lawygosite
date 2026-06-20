"use client";

import { useEffect } from "react";
import { PwaInstall } from "@/components/pwa/PwaInstall";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
      /* optional — install UI still works via browser menu */
    });
  }, []);

  return <PwaInstall />;
}
