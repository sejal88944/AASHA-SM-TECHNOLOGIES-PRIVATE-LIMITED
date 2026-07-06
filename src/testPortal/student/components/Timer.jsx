import React, { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";

/**
 * Purely a countdown display — the server remains the source of truth.
 * The parent is expected to render this with `key={syncToken}` so that
 * every server resync remounts a fresh Timer seeded with the latest
 * `remainingSeconds`, instead of this component trying to detect prop
 * changes internally (which would require touching refs/state during
 * render — not allowed under React's purity rules for compiled components).
 */
const Timer = ({ remainingSeconds, onExpire }) => {
  const [secondsLeft, setSecondsLeft] = useState(remainingSeconds);
  const expiredRef = useRef(remainingSeconds <= 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = Math.max(0, prev - 1);
        if (next <= 0 && !expiredRef.current) {
          expiredRef.current = true;
          onExpire?.();
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onExpire]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const urgent = secondsLeft <= 60;

  return (
    <div
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-sm sm:text-lg font-bold ${
        urgent
          ? "animate-pulse bg-red-100 text-red-700"
          : "bg-slate-100 text-slate-800"
      }`}
    >
      <Clock size={16} />
      {mm}:{ss}
    </div>
  );
};

export default Timer;
