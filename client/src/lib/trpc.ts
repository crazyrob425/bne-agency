import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/routers";

// Get API URL from environment or default to /api/trpc (same origin)
const API_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== "undefined" ? window.location.origin + "/api/trpc" : "/api/trpc");

export const trpc = createTRPCReact<AppRouter>();

// Re-export API_URL for use in other modules
export { API_URL };
