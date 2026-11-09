import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/routers";

// Get API URL from environment or default to /api/trpc (same origin)
// The original same-origin default pointed at the Render backend, which
// has been suspended since 2026-09-30. The API now runs on the
// api.blacklisted.studio Worker (tools + drafts + intake).
const API_URL = import.meta.env.VITE_API_URL || "https://api.blacklisted.studio/api/trpc";

export const trpc = createTRPCReact<AppRouter>();

// Re-export API_URL for use in other modules
export { API_URL };
