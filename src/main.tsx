import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Protect against network fetch failures from third-party scripts (e.g., analytics) that can bubble up
if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
  try {
    const _origFetch = window.fetch.bind(window);
    window.fetch = (...args: Parameters<typeof fetch>) =>
      _origFetch(...args).catch((err: any) => {
        // log but avoid uncaught errors that break dev client
        // return a non-throwing Response so callers can handle based on status
        // eslint-disable-next-line no-console
        console.warn('Network fetch failed (suppressed):', err);
        return Promise.resolve(new Response(null, { status: 502, statusText: 'Network Error' }));
      });
  } catch (e) {
    // ignore
  }
}

createRoot(document.getElementById("root")!).render(<App />);
