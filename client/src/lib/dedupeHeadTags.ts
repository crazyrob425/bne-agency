/**
 * The build-time prerender (scripts/seo/prerender-meta.ts) writes per-route
 * <title>, description, canonical and OG tags marked data-rh="true" so crawlers
 * that don't run JavaScript get the right metadata. Once React mounts, pages
 * render their own head tags (React 19 hoists them without data-rh), which would
 * leave two titles/canonicals in the live DOM. This removes the prerendered copy
 * whenever the app has rendered its own equivalent tag.
 */
function keyOf(el: Element): string | null {
  const tag = el.tagName.toLowerCase();
  if (tag === "title") return "title";
  if (tag === "link" && el.getAttribute("rel") === "canonical") return "canonical";
  if (tag === "meta") {
    const name = el.getAttribute("name");
    if (name) return `meta:name:${name}`;
    const prop = el.getAttribute("property");
    if (prop) return `meta:property:${prop}`;
  }
  return null;
}

function dedupe() {
  const head = document.head;
  const appKeys = new Set<string>();
  head.querySelectorAll("title, link[rel='canonical'], meta[name], meta[property]").forEach(el => {
    if (el.getAttribute("data-rh") === "true") return;
    const k = keyOf(el);
    if (k) appKeys.add(k);
  });
  head.querySelectorAll("[data-rh='true']").forEach(el => {
    const k = keyOf(el);
    if (k && appKeys.has(k)) el.remove();
  });
}

export function installHeadDedupe() {
  if (typeof document === "undefined") return;
  new MutationObserver(dedupe).observe(document.head, { childList: true });
  dedupe();
}
