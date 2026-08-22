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

/** Full Deep-Dive Quiz Results & Strategic Niche Report Email */
export function buildQuizResultsReportEmailHtml(vars: {
  name?: string;
  email: string;
  headline: string;
  quadrant: string;
  userVector: Record<string, number>;
  topMatches: Array<{
    rank: number;
    score: number;
    keyword: string;
    category: string;
    earningPotential: string;
    competitionLevel: string;
    searchVolume: string;
    reason: string;
    description?: string;
  }>;
  siteUrl: string;
}): string {
  const nameDisplay = vars.name ? escapeHtml(vars.name) : "Creator";
  const siteUrl = vars.siteUrl || "https://blacklisted.studio";
  const onboardUrl = `${siteUrl}/onboarding`;

  const matchBlocks = vars.topMatches.map((m) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;background:#121217;border:1px solid #D4AF37;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:16px 20px;background:linear-gradient(90deg, #D4AF37 0%, #FFD700 100%);color:#000;font-family:${FONT};font-size:12px;font-weight:900;letter-spacing:0.25em;text-transform:uppercase;">
          #${m.rank} MATCH &middot; ${m.score}% FIT &middot; ${escapeHtml(m.keyword)}
        </td>
      </tr>
      <tr>
        <td style="padding:18px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
            <tr>
              <td style="font-family:${FONT};font-size:11px;color:${GOLD};letter-spacing:0.2em;text-transform:uppercase;font-weight:700;">
                Category: ${escapeHtml(m.category)} &middot; ${escapeHtml(m.earningPotential.toUpperCase())} EARNING
              </td>
            </tr>
          </table>
          <div style="font-family:${FONT};font-size:14px;color:${PAPER};line-height:1.6;margin-bottom:14px;background:#0A0A0E;padding:14px;border-radius:10px;border-left:3px solid ${GOLD};">
            <strong style="color:${GOLD};display:block;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:4px;">Mindset & Lifestyle Compatibility</strong>
            ${escapeHtml(m.reason)}
          </div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#08080A;border-radius:8px;padding:10px;">
            <tr>
              <td style="font-family:${FONT};font-size:11px;color:${MUTED};padding:4px 8px;">Competition: <strong style="color:${PAPER};">${escapeHtml(m.competitionLevel.toUpperCase())}</strong></td>
              <td style="font-family:${FONT};font-size:11px;color:${MUTED};padding:4px 8px;">Search Volume: <strong style="color:${PAPER};">${escapeHtml(m.searchVolume.toUpperCase())}</strong></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `).join("");

  const dimensionRows = Object.entries(vars.userVector).slice(0, 10).map(([dim, val]) => {
    const score = Math.round(val);
    return `
      <tr>
        <td style="padding:6px 0;font-family:${FONT};font-size:11px;color:${PAPER};text-transform:capitalize;width:35%;">${escapeHtml(dim)}</td>
        <td style="padding:6px 0;width:65%;">
          <div style="background:#1F1F26;height:8px;border-radius:999px;width:100%;overflow:hidden;">
            <div style="background:linear-gradient(90deg, ${GOLD}, #FFD700);height:8px;width:${score}%;"></div>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Your Executive Niche & Psych Blueprint | Blacklisted Studio</title>
</head>
<body style="margin:0;padding:0;background:#070708;font-family:${FONT};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#070708;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;background:${INK};border:1px solid #2A2A35;border-radius:20px;overflow:hidden;">
        
        <!-- Header Banner -->
        <tr>
          <td align="center" style="background:radial-gradient(120% 120% at 50% 0%,#1C1C24 0%,${INK} 70%);border-bottom:2px solid ${GOLD};padding:36px 24px 28px;">
            <div style="font-family:${FONT};font-size:11px;letter-spacing:0.5em;text-transform:uppercase;color:${GOLD};font-weight:900;">B.N.E. STUDIO &middot; EXECUTIVE REPORT</div>
            <div style="font-family:${FONT};font-size:28px;font-weight:900;color:${PAPER};margin-top:12px;line-height:1.15;">Strategic Niche &amp;<br/>Psychometric Blueprint</div>
            <div style="font-family:${FONT};font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${MUTED};margin-top:10px;">Prepared Exclusively for ${nameDisplay}</div>
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td style="padding:28px 28px 12px;font-family:${FONT};font-size:14px;color:${PAPER};line-height:1.65;">
            We analyzed your 48 psychometric and lifestyle signals across your relationship patterns, boundary preferences, career drives, and erotic reflexes.
            Here is your full subconscious profile and the **Top 3 Fetish Niches** where your mindset gives you an unfair market advantage.
          </td>
        </tr>

        <!-- Psych Summary Card -->
        <tr>
          <td style="padding:12px 28px 20px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111116;border:1px solid #22222D;border-radius:14px;padding:20px;">
              <tr>
                <td style="font-family:${FONT};font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${GOLD};font-weight:800;padding-bottom:6px;">Subconscious Archetype</td>
              </tr>
              <tr>
                <td style="font-family:${FONT};font-size:22px;font-weight:900;color:${PAPER};padding-bottom:14px;">${escapeHtml(vars.headline)}</td>
              </tr>
              <tr>
                <td style="font-family:${FONT};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${MUTED};padding-bottom:12px;">Attachment Quadrant: <strong style="color:${GOLD};">${escapeHtml(vars.quadrant.replace(/-/g, " ").toUpperCase())}</strong></td>
              </tr>
              <tr>
                <td>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    ${dimensionRows}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Top 3 Fetish Matches Header -->
        <tr>
          <td style="padding:16px 28px 12px;font-family:${FONT};font-size:12px;letter-spacing:0.35em;text-transform:uppercase;color:${GOLD};font-weight:900;">
            Your Top 3 Fetish Niche Matches
          </td>
        </tr>

        <!-- Top 3 Match Cards -->
        <tr>
          <td style="padding:0 28px 20px;">
            ${matchBlocks}
          </td>
        </tr>

        <!-- B.N.E. Partnership Pitch & Psychological Conversion -->
        <tr>
          <td style="padding:20px 28px 28px;background:#0A0A0E;border-top:1px solid #1E1E26;">
            <div style="font-family:${FONT};font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:${GOLD};font-weight:900;margin-bottom:10px;">
              B.N.E. Studio &middot; Silent Partner Infrastructure
            </div>
            <div style="font-family:${FONT};font-size:20px;font-weight:900;color:${PAPER};line-height:1.25;margin-bottom:14px;">
              You Create the Content. We Handle the Entire Empire Behind the Scenes.
            </div>
            <div style="font-family:${FONT};font-size:13px;color:#C4C4CD;line-height:1.65;margin-bottom:18px;">
              Building a high-yield adult content brand shouldn't mean drowning in legal compliance, 24/7 DM sales, tax shielding, or tech headaches. As your **silent backend partner**, B.N.E. Studio provides:
            </div>
            <ul style="padding-left:18px;margin:0 0 22px;font-family:${FONT};font-size:13px;color:${PAPER};line-height:1.7;">
              <li><strong>25% Management Commission:</strong> You keep 75% of all revenue while B.N.E. handles 100% of your backend, marketing, and legal compliance.</li>
              <li><strong>18 U.S.C. § 2257 Custodian of Records:</strong> Your real name and identity are 100% shielded from public records.</li>
              <li><strong>Anonymous Holding LLC Shielding:</strong> Clean corporate structure and bank setup for privacy.</li>
              <li><strong>24/7 DM Monetization & Funnels:</strong> Turn casual viewers into high-paying recurring subscribers automatically.</li>
            </ul>
            
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
              <tr>
                <td align="center">
                  <a href="${onboardUrl}" target="_blank"
                     style="display:inline-block;background:linear-gradient(135deg,#F4E3A1 0%,${GOLD} 45%,#B8902A 100%);color:#000;font-family:${FONT};font-size:15px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;padding:16px 36px;border-radius:999px;box-shadow:0 10px 30px rgba(212,175,55,0.4);">
                    Book Private Onboarding &amp; Claim Your Niches &rarr;
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 28px;font-family:${FONT};font-size:11px;color:${MUTED};text-align:center;line-height:1.6;border-top:1px solid #18181E;">
            Blacklisted Studio &middot; Professional Talent Management &amp; Monetization Infrastructure<br/>
            <a href="${siteUrl}" style="color:${GOLD};text-decoration:none;">www.blacklisted.studio</a>
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
