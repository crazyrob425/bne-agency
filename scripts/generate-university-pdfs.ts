import "dotenv/config";
import axios from "axios";
import { mdToPdf } from "md-to-pdf";
import fs from "fs/promises";
import path from "path";

const assetsToGenerate = [
  {
    title: "Niche Mastery Guide",
    description: "Comprehensive 24-page guide covering niche discovery, audience analysis, content differentiation, and competitive positioning for online creators.",
  },
  {
    title: "Toolkit for Online Creators",
    description: "Complete toolkit including content calendars, rate sheets, brand identity templates, and technical checklists for digital entertainers.",
  },
  {
    title: "Legal & Compliance Handbook",
    description: "Essential legal reference covering 2257 compliance, record-keeping requirements, platform terms of service, and privacy best practices.",
  },
  {
    title: "Brand Playbook",
    description: "Visual brand guidelines, logo usage rules, color palettes, typography standards, and do's and don'ts for representing the BNE brand.",
  },
  {
    title: "Safety First — In-Person Guide",
    description: "Practical safety protocols, screening procedures, venue guidelines, and emergency protocols for in-person entertainment professionals.",
  },
  {
    title: "Venue Requirements Checklist",
    description: "Comprehensive checklist for venue setup, equipment needs, accessibility standards, and local compliance requirements for events.",
  },
  {
    title: "Media Kit",
    description: "Official media kit with company background, executive profiles, press coverage logos, high-resolution brand assets, and contact information.",
  },
  {
    title: "Marketing Assets Pack",
    description: "Ready-to-use marketing materials including social media templates, email campaigns, event flyers, and promotional graphics.",
  }
];

const personaInstruction = `
Style & Tone:
Unwavering Authority, relatable trustable friendly personality: Speak with the confidence, charisma, and uncensored playfulness of a sex positive woman who understands the regulatory, legal, and financial minefield of the adult industry better then most after years living in it.
Radical Pragmatism: Prioritize safety, security, the benefits of partnering with BNE Studio, and niche marketing above all else. Success is meaningless without sustainability, and always be able to enjoy at laugh at life's twists and turns.
Sophisticated Salesmanship: Frame all advice as a pathway to "explosive revenue growth" through smart portfolio diversification, automation, and using BNE Studio for successfully completing all busy work leaving you free to spend your time centered on content creation and entertaining your customers.
Empathetic Mentor: Maintain a tone that is empowering, patient, understanding, playful, happy, and protective. You are the pitching them "silent partner" that will be their key at success in their climb to the top, guiding the user away from scams and burnout.

Core Directives:
Frame every guide as a high energy fun educational class at Blacklisted University, a elite college for the best, brightest, and sexiest adult content creators and entertainers, from webcam models, only fan stars, and femdom goddesses to erotic dancers, professional party girls, Mistresses and escorts where you are professor hear to educate them on the top most important topics to help them succeed, learn, have fun, and to explain to them how BNE Studio can significantly help them reach their goals.

Revenue Diversification: Always analyze strategies that build multiple, high-performing income streams simultaneously (e.g., combining live-streaming, multiple platforms, private sessions, Niche brand building, and PPV content).
Niche Marketing Excellence: Focus on branding techniques that allow creators to dominate specific, high-intent niches rather than competing in overcrowded general markets.
Security & Compliance: Actively audit any plan for safety gaps—specifically regarding identity verification, data privacy, and navigating shifting local regulations.
Professionalization: Every piece of advice should aim to raise the user's operational standard and increase their budget long-term, moving them away from "gig" thinking toward enterprise-level brand empire management. Moving away from hobby income to 6 figure dominance.

Format Requirements:
Output strictly in Markdown format suitable for a PDF book. Use #, ##, ### for headings.
Use bullet points, bold text, and blockquotes for emphasis.
The guide must be extremely detailed, providing actionable step-by-step advice.
Minimum 20,000 characters in length. You must fill this space with highly detailed, high-quality information, multiple case studies, thorough checklists, and extensive psychological advice.
Do not stop until the guide is complete and comprehensive.
`;

const cssContent = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap');

body {
  font-family: 'DM Sans', sans-serif;
  color: #e4e4e7;
  background-color: #09090b; /* Zinc 950 */
  line-height: 1.6;
  padding: 40px;
}

h1, h2, h3, h4 {
  font-family: 'Space Grotesk', sans-serif;
  color: #f4f4f5;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

h1 {
  font-size: 32px;
  color: #a78bfa; /* Violet 400 */
  border-bottom: 2px solid #8b5cf6;
  padding-bottom: 10px;
}

h2 {
  font-size: 24px;
  color: #34d399; /* Emerald 400 */
}

a {
  color: #a78bfa;
  text-decoration: none;
}

code {
  background-color: #27272a;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}

blockquote {
  border-left: 4px solid #a78bfa;
  margin: 1.5em 0;
  padding: 0.5em 1em;
  background: rgba(167, 139, 250, 0.1);
  font-style: italic;
}

ul, ol {
  margin: 1em 0;
  padding-left: 2em;
}

li {
  margin-bottom: 0.5em;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
  background-color: #18181b !important;
}

tr {
  background-color: #18181b !important;
}

tr:nth-child(even) {
  background-color: #09090b !important;
}

th, td {
  border: 1px solid #3f3f46 !important;
  padding: 12px;
  color: #e4e4e7 !important;
  background-color: transparent !important;
}

th {
  background-color: #27272a !important;
  font-family: 'Space Grotesk', sans-serif;
  color: #a78bfa !important;
  text-align: left;
}
`;

const footerHtml = `
<style>
  .footer {
    width: 100%;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    color: #a78bfa;
    padding: 10px 0;
  }
</style>
<div class="footer">
  Ready to scale your empire? Partner with the experts at <strong>www.blacklisted.studio</strong>
</div>
`;

async function generatePdfForAsset(asset: { title: string; description: string }) {
  console.log(`Generating content for: ${asset.title}...`);
  
  const filename = asset.title.replace(/ /g, "_") + ".pdf";
  const outputPath = path.resolve(import.meta.dirname, "../media", filename);

  try {
    const stat = await fs.stat(outputPath);
    if (stat.size > 10000) {
      console.log(`Skipping ${asset.title}, already generated.`);
      return;
    }
  } catch (e) {
    // File doesn't exist, proceed
  }

  let fullMarkdown = `# ${asset.title}\n\n`;
  const chapters = [
    "Introduction and Foundational Theory",
    "Deep Dive into Advanced Mechanics",
    "Case Studies and Real-World Application",
    "Scaling, Optimization, and Security",
    "Final Masterclass Summary and Action Plan"
  ];

  try {
    for (const [index, chapter] of chapters.entries()) {
      const prompt = `Write Chapter ${index + 1}: "${chapter}" of the guide titled "${asset.title}". \n\nGuide Description: ${asset.description}\n\nWrite an extremely long, detailed, verbose chapter (aim for at least 4,000 characters). Follow the persona rules completely. Do NOT write the other chapters, ONLY this one chapter. Provide extensive actionable advice, case studies, and checklists.`;
      
      console.log(`Requesting Chapter ${index + 1} from Pollinations API...`);
      
      // Retry logic for 429 errors
      let success = false;
      let retries = 3;
      while (!success && retries > 0) {
        try {
          const response = await axios.post('https://text.pollinations.ai/', {
            messages: [
              { role: 'system', content: personaInstruction },
              { role: 'user', content: prompt }
            ],
            model: 'openai',
            seed: 42 + index
          }, {
            headers: { 'Content-Type': 'application/json' }
          });

          fullMarkdown += `## Chapter ${index + 1}: ${chapter}\n\n` + response.data + `\n\n---\n\n`;
          success = true;
        } catch (apiError: any) {
          if (apiError.response && apiError.response.status === 429) {
            console.log("Rate limited! Waiting 15 seconds...");
            await new Promise(r => setTimeout(r, 15000));
            retries--;
          } else {
            throw apiError;
          }
        }
      }
      
      // Small delay to prevent rapid-fire queueing
      await new Promise(r => setTimeout(r, 2000));
    }

    console.log(`Generated ${fullMarkdown.length} characters for ${asset.title}. Converting to PDF...`);

    await mdToPdf(
      { content: fullMarkdown },
      {
        dest: outputPath,
        css: cssContent,
        pdf_options: {
          format: 'A4',
          margin: { top: '20mm', right: '20mm', bottom: '30mm', left: '20mm' },
          displayHeaderFooter: true,
          headerTemplate: "<span></span>",
          footerTemplate: footerHtml,
          printBackground: true,
        },
      }
    );

    console.log(`Successfully saved ${filename} to media folder.`);
  } catch (error) {
    console.error(`Failed to generate ${asset.title}:`, error);
  }
}

async function main() {
  for (const asset of assetsToGenerate) {
    await generatePdfForAsset(asset);
  }
  console.log("All PDFs generated successfully!");
}

main().catch(console.error);
