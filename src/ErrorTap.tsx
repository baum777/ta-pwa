import { useEffect, useState } from "react";
export function ErrorTap() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    const h1 = (e: ErrorEvent) => { setMsg(e.error ? String(e.error) : e.message); };
    const h2 = (e: PromiseRejectionEvent) => { setMsg(String(e.reason)); };
    window.addEventListener('error', h1);
    window.addEventListener('unhandledrejection', h2);
    return () => {
      window.removeEventListener('error', h1);
      window.removeEventListener('unhandledrejection', h2);
    };
  }, []);
  if (!msg) return null;
  return (
    <div className="fixed bottom-3 right-3 max-w-md rounded-xl border border-red-400/40 bg-red-500/10 text-red-200 p-3 text-sm">
      <div className="font-semibold mb-1">Runtime Error</div>
      <div className="whitespace-pre-wrap break-words">{msg}</div>
    </div>
  );
}
