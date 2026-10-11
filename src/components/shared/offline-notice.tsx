"use client";

import { useSyncExternalStore } from "react";
import { WifiOff } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

/** Shown only while the browser reports it's offline. */
export function OfflineNotice() {
  const online = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true, // Server render: assume online.
  );
  if (online) return null;
  return (
    <p
      role="status"
      className="mb-4 flex items-center gap-2 rounded-xl bg-notice px-3.5 py-3 text-sm text-notice-foreground"
    >
      <WifiOff className="size-4 shrink-0" aria-hidden="true" /> You appear to be offline. This
      prototype does not save results for offline use.
    </p>
  );
}
