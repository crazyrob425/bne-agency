/**
 * Session utilities — stable anonymous session IDs for draft saving.
 */

export function generateSessionId(): string {
  const stored = sessionStorage.getItem("bne_session_id");
  if (stored) return stored;

  const id = `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  sessionStorage.setItem("bne_session_id", id);
  return id;
}
