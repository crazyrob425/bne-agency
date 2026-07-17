/**
 * Luxury, high-energy email templates for the Niche Matcher re-engagement flow.
 *
 * Each template renders a full HTML email with:
 *  - a high-end graphic CTA (GOLD gradient button + banner)
 *  - a "teaser" section showing 2 randomized Niche Cards from the real DB
 *  - copy tuned per cadence stage (initial / cadence / weekly)
 *
 * All templates are self-contained inline-CSS HTML so they render in every client.
 */

export interface NicheCard {
  keyword: string;
  category: string;
  earningPotential: string;
}

export interface TemplateVars {
  name: string;
  email: string;
  resumeUrl: string;
  teaserNiches: NicheCard[];
  progressPercent: number;
  unsubscribeUrl: string;
  siteUrl: string;
  sequenceIndex: number;
  window: "d24h" | "w1-2" | "w3-6";
}

const GOLD = "#D4AF37";
const INK = "#0B0B0D";
const PAPER = "#F4F4EE";
const MUTED = "#9FA6B2";

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function nicheCardHtml(n: NicheCard): string {
  const ep = n.earningPotential.toUpperCase();
  return `
    <td style="width:50%;padding:8px;vertical-align:top;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#15151A;border:1px solid #2A2A30;border-radius:14px;overflow:hidden;">
        <tr>
          <td style="padding:18px 18px 6px;font-family:${FONT};font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:${GOLD};">${escapeHtml(n.category)}</td>
        </tr>
        <tr>
          <td style="padding:0 18px 12px;font-family:${FONT};font-size:20px;font-weight:800;color:${PAPER};line-height:1.25;">${escapeHtml(n.keyword)}</td>
        </tr>
        <tr>
          <td style="padding:0 18px 18px;font-family:${FONT};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${MUTED};">${ep} EARNING POTENTIAL</td>
        </tr>
      </table>
    </td>`;
}

function teaserSectionHtml(vars: TemplateVars): string {
  const cards = vars.teaserNiches.map(nicheCardHtml).join("");
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
      <tr>
        <td style="font-family:${FONT};font-size:11px;letter-spacing:0.34em;text-transform:uppercase;color:${GOLD};text-align:center;padding-bottom:14px;">
          Two niches we think you'd dominate
        </td>
      </tr>
      <tr>${cards}</tr>
    </table>`;
}

function ctaHtml(vars: TemplateVars, label: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:26px 0;">
      <tr>
        <td align="center">
          <a href="${vars.resumeUrl}" target="_blank"
             style="display:inline-block;background:linear-gradient(135deg,#F4E3A1 0%,${GOLD} 45%,#B8902A 100%);color:${INK};font-family:${FONT};font-size:16px;font-weight:800;letter-spacing:0.04em;text-decoration:none;padding:16px 38px;border-radius:999px;box-shadow:0 10px 30px rgba(212,175,55,0.35);">
            ${escapeHtml(label)} &rarr;
          </a>
        </td>
      </tr>
    </table>`;
}

function bannerHtml(headline: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:radial-gradient(120% 120% at 50% 0%,#1C1C22 0%,${INK} 70%);border-bottom:2px solid ${GOLD};">
      <tr>
        <td align="center" style="padding:34px 20px 26px;">
          <div style="font-family:${FONT};font-size:11px;letter-spacing:0.5em;text-transform:uppercase;color:${GOLD};">Blacklisted Studio &middot; Niche Matcher</div>
          <div style="font-family:${FONT};font-size:30px;font-weight:900;color:${PAPER};margin-top:14px;line-height:1.1;">${escapeHtml(headline)}</div>
        </td>
      </tr>
    </table>`;
}

function progressBarHtml(percent: number): string {
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0 4px;">
      <tr>
        <td style="font-family:${FONT};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${MUTED};padding-bottom:8px;">You were ${p}% there</td>
      </tr>
      <tr>
        <td style="background:#1F1F25;border-radius:999px;height:10px;width:100%;">
          <div style="width:${p}%;height:10px;border-radius:999px;background:linear-gradient(90deg,${GOLD},#F4E3A1);"></div>
        </td>
      </tr>
    </table>`;
}

function shellHtml(vars: TemplateVars, inner: string, preheader: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Finish your Niche Match</title>
</head>
<body style="margin:0;padding:0;background:#070708;font-family:${FONT};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#070708;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${INK};border:1px solid #1E1E24;border-radius:18px;overflow:hidden;">
        ${inner}
        <tr>
          <td style="padding:18px 28px 30px;font-family:${FONT};font-size:11px;color:${MUTED};text-align:center;line-height:1.6;">
            You received this because you started the Blacklisted Studio Niche Matcher.<br/>
            <a href="${vars.unsubscribeUrl}" style="color:${MUTED};text-decoration:underline;">Unsubscribe</a> &middot;
            <a href="${vars.siteUrl}" style="color:${MUTED};text-decoration:underline;">Visit site</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Initial — 24h after abandonment. Highest energy, urgency + luxury. */
export function initialTemplate(vars: TemplateVars): { subject: string; html: string } {
  const inner = `
    ${bannerHtml("Your match is waiting")}
    <tr><td style="padding:30px 28px 6px;font-family:${FONT};font-size:18px;color:${PAPER};">
      ${escapeHtml(vars.name ? `${vars.name}, ` : "")}we pulled your subconscious profile the moment you left — and two niches lit up like a private jet's runway lights.
    </td></tr>
    <tr><td style="padding:6px 28px 0;">${progressBarHtml(vars.progressPercent)}</td></tr>
    <tr><td style="padding:14px 28px 0;">${ctaHtml(vars, "Reveal My Niches")}</td></tr>
    <tr><td style="padding:8px 28px 18px;">${teaserSectionHtml(vars)}</td></tr>`;
  return {
    subject: `${GOLD} Your elite niches are locked in — finish in 60 seconds`,
    html: shellHtml(vars, inner, "Two high-earning niches are waiting for you. Finish your match now."),
  };
}

/** Cadence (every 3 days, weeks 1-2) — high-conversion CTA, fresh teasers. */
export function cadenceTemplate(vars: TemplateVars): { subject: string; html: string } {
  const inner = `
    ${bannerHtml("The clock is ticking on your edge")}
    <tr><td style="padding:30px 28px 6px;font-family:${FONT};font-size:18px;color:${PAPER};">
      ${escapeHtml(vars.name ? `${vars.name}, ` : "")}top creators claimed their lane in the first week. Yours is still reserved — for now.
    </td></tr>
    <tr><td style="padding:6px 28px 0;">${progressBarHtml(vars.progressPercent)}</td></tr>
    <tr><td style="padding:14px 28px 0;">${ctaHtml(vars, "Claim My Niche")}</td></tr>
    <tr><td style="padding:8px 28px 18px;">${teaserSectionHtml(vars)}</td></tr>`;
  return {
    subject: `Your competitors already know their niche. Do you?`,
    html: shellHtml(vars, inner, "Two profitable niches are teed up for you. Lock in your match today."),
  };
}

/** Weekly (weeks 3-6) — softer, brand-led, still luxury. */
export function weeklyTemplate(vars: TemplateVars): { subject: string; html: string } {
  const inner = `
    ${bannerHtml("Still curious? We saved your spot")}
    <tr><td style="padding:30px 28px 6px;font-family:${FONT};font-size:18px;color:${PAPER};">
      ${escapeHtml(vars.name ? `${vars.name}, ` : "")}no pressure — just a reminder that your personalized niche map is one click away.
    </td></tr>
    <tr><td style="padding:6px 28px 0;">${progressBarHtml(vars.progressPercent)}</td></tr>
    <tr><td style="padding:14px 28px 0;">${ctaHtml(vars, "See My Match")}</td></tr>
    <tr><td style="padding:8px 28px 18px;">${teaserSectionHtml(vars)}</td></tr>`;
  return {
    subject: `Your niche match is still waiting whenever you are`,
    html: shellHtml(vars, inner, "Your niche match is ready when you are. Two strong options inside."),
  };
}

export function renderByKind(
  kind: "initial" | "cadence" | "weekly",
  vars: TemplateVars
): { subject: string; html: string } {
  if (kind === "initial") return initialTemplate(vars);
  if (kind === "cadence") return cadenceTemplate(vars);
  return weeklyTemplate(vars);
}
