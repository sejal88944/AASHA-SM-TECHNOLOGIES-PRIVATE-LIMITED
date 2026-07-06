import { useEffect } from 'react';

/**
 * Page-wide deterrents while a test is in progress: blocks the most common
 * "view/copy source" keyboard shortcuts and shows a warning instead of
 * silently doing nothing. As documented throughout this module, this is a
 * convenience deterrent only — it cannot and does not provide real security,
 * which instead comes from correct answers/grading never reaching the browser.
 */
export default function useCopyProtection(enabled, onBlockedAttempt) {
  useEffect(() => {
    if (!enabled) return undefined;

    const handleKeyDown = (e) => {
      const key = e.key?.toLowerCase();
      const blockedCombo =
        key === 'f12' ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
        (e.metaKey && e.altKey && ['i', 'j', 'c'].includes(key)) ||
        (e.ctrlKey && key === 'u') ||
        (e.ctrlKey && key === 's');

      if (blockedCombo) {
        e.preventDefault();
        onBlockedAttempt?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onBlockedAttempt]);
}
