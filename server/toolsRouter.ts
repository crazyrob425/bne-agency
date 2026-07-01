import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";

export const toolsRouter = router({
  generateStrategy: publicProcedure
    .input(
      z.object({
        niche: z.string(),
        tone: z.string(),
        goal: z.string(),
        length: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const systemPrompt = `You are the BNE Agency Content Strategy Engine, an AI designed to generate highly converting script ideas and content prompts for independent adult creators using advanced behavioral psychology.`;
      
      const userPrompt = `Generate 3 distinct, high-impact content concepts or scripts tailored for the following options:
Niche: ${input.niche}
Tone: ${input.tone}
Goal: ${input.goal}
Length: ${input.length}

For each concept, provide:
1. Concept Title & Psychological Hook (explaining why it works on the viewer's mind).
2. The exact script, caption, or prompt text matching the requested tone and length.
3. A Call to Action (CTA) optimized for the selected goal.

Format the output clearly using clean markdown.`;

      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          model: "openai"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate content from AI");
      }

      const content = await response.text();

      return { content };
    }),

  generateClassifiedAd: publicProcedure
    .input(
      z.object({
        contactMethod: z.string(),
        reviewSites: z.string(),
        serviceMenu: z.string(),
        noNoList: z.string(),
        photoCount: z.string(),
        photoUrls: z.array(z.string()).optional(),
        platformTarget: z.string(),
        reviewSiteInfo: z.string().optional(),
        includeDisclaimer: z.boolean(),
        contactInfo: z.string().optional(),
        reviewsList: z.array(z.object({ text: z.string(), url: z.string(), handle: z.string() })).optional(),
        meetingType: z.string().optional(),
        incallLocation: z.string().optional(),
        outcallLocations: z.string().optional(),
        outcallSurrounding: z.boolean().optional(),
        outcallDeposit: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const sanitizeForAI = (text: string) => {
        if (!text) return text;
        const replacements: Record<string, string> = {
          'dick': 'service', 'cock': 'service', 'pussy': 'experience', 'cunt': 'experience',
          'fuck': 'play', 'fucking': 'playing', 'shit': 'stuff', 'bitch': 'girl',
          'whore': 'provider', 'slut': 'provider', 'cum': 'finish', 'asshole': 'rear',
          'sucks': 'gives'
        };
        let sanitized = text;
        for (const [badWord, goodWord] of Object.entries(replacements)) {
          const regex = new RegExp(`\\b${badWord}\\b`, 'gi');
          sanitized = sanitized.replace(regex, goodWord);
        }
        return sanitized;
      };

      const systemPrompt = `You are the BNE Agency Classified Ad Generator, an AI designed to generate high-converting, privacy-preserving, and professional classified ad copy for adult entertainers.`;

      const userPrompt = `Generate a high-converting classified ad copy tailored for the platform: ${input.platformTarget}.
Options:
- Preferred Contact Method: ${input.contactMethod} ${input.contactInfo ? `(Contact Info: ${input.contactInfo})` : ''}
- Review Sites/Status: ${input.reviewSites}${input.reviewSiteInfo ? ` (${input.reviewSiteInfo})` : ''}
${input.reviewsList && input.reviewsList.length > 0 ? `- Client Reviews to feature:\n${input.reviewsList.map(r => `  * "${sanitizeForAI(r.text)}" - ${r.handle} (${r.url})`).join('\n')}` : ''}
- Photos Attached: ${input.photoCount} pics
${input.photoUrls && input.photoUrls.length > 0 ? `- Photo URLs: \n${input.photoUrls.join('\n')}` : ''}

Location & Meeting Details:
- Meeting Type: ${input.meetingType || "Not specified"}
${input.meetingType === 'Incall Only' || input.meetingType === 'Incall & Outcall' ? `- Incall Location: ${input.incallLocation}` : ''}
${input.meetingType === 'Outcall Only' || input.meetingType === 'Incall & Outcall' ? `- Outcall Locations: ${input.outcallLocations} ${input.outcallSurrounding ? '(including surrounding areas)' : ''}` : ''}
${input.outcallDeposit ? `- Important: Deposit required for outcalls for all new clients.` : ''}

Here is the raw input from the creator:
- Service Menu & Info: ${sanitizeForAI(input.serviceMenu) || "Standard high-end companionship and entertainment"}
- No-No List/Boundaries: ${sanitizeForAI(input.noNoList) || "No drama, mutual respect expected"}

Generate a professional, high-end, and extremely appealing classified ad text tailored for the ${input.platformTarget} audience. Include:
1. An eye-catching headline.
2. An engaging introduction that seamlessly weaves in the location and meeting details.
3. A clean, structured presentation of the service menu (refined professionally).
4. If reviews are provided, format them beautifully as glowing testimonials to build trust.
5. A polite but firm boundaries/screening section (derived from the No-No list).
6. Clear contact/booking instructions matching the selected contact method and info.
7. If photos are attached via URLs, embed them into the ad copy using the standard markup for ${input.platformTarget} (use HTML for Eros/CityVibe/Others, BBCode for TNABoard/Forums).
${input.includeDisclaimer ? `8. You MUST include this standard legal disclaimer at the bottom of the ad: "Disclaimer: This advertisement is strictly for the compensation of time and companionship spent between two consenting adults. Anything else that may occur is a matter of personal choice between two consenting adults and is not for sale."\n9. AT THE VERY END OF THE AD, you MUST include a one-line advertisement for BNE Studio...` : `8. AT THE VERY END OF THE AD, you MUST include a one-line advertisement for BNE Studio...`}
It must read exactly: "Ad professionally managed by BNE Studio at www.blacklisted.studio". Embed this directly into the final paragraph (e.g., blending it seamlessly into the closing statement, contact instructions, or copyright/disclaimer section) so that it is fully integrated into the text and not easily deletable as a standalone line.

Ensure the ad text is completely optimized for ${input.platformTarget}, maintaining a high-end tone. Use clean markdown formatting for the text structure.`;

      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          model: "openai"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate content from AI");
      }

      const content = await response.text();

      return { content };
    }),
});
