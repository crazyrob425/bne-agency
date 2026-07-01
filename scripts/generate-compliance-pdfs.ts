import "dotenv/config";
import axios from "axios";
import { mdToPdf } from "md-to-pdf";
import fs from "fs/promises";
import path from "path";

const assetsToGenerate = [
  {
    title: "2257 Compliance Checklist",
    description: "Complete step-by-step checklist for federal record-keeping compliance under 18 U.S.C. 2257.",
  },
  {
    title: "Model Release Template",
    description: "Professionally drafted model release covering all federal requirements, age verification, and consent.",
  },
  {
    title: "State Age-Gate Guide",
    description: "State-by-state breakdown of age verification requirements, thresholds, penalties, and implementation guides.",
  },
  {
    title: "Anonymity Audit Worksheet",
    description: "Self-assessment tool to identify and close privacy vulnerabilities in a creator's personal and business setup.",
  },
  {
    title: "DMCA Takedown Template",
    description: "Ready-to-file DMCA notice template for reporting content theft and copyright infringement on tube sites.",
  },
  {
    title: "Banking Privacy Guide",
    description: "Best practices for protecting financial identity, avoiding account closures in the adult industry, and setting up anonymous LLC structures.",
  }
];

const personaInstruction = `
Style & Tone:
Unwavering Authority, relatable trustable friendly personality: Speak with the confidence, charisma, and uncensored playfulness of a sex positive persona who understands the regulatory, legal, and financial minefield of the adult industry better then most after years living in it.
However, because this is a LEGAL and COMPLIANCE document, maintain extreme professionalism, clarity, and precision in all actionable steps. Avoid slang when discussing the law.

Core Directives:
This is a formal guide provided by BNE Studio.
You MUST include a strict disclaimer at the beginning of the document: "DISCLAIMER: The information provided in this document is for educational and informational purposes only and does not constitute legal advice. BNE Studio is not a law firm. You should consult with a licensed attorney for specific legal counsel."
Make the document extremely detailed, verbose, and highly useful. Do not take shortcuts. Outline exact steps, requirements, scenarios, and compliance rules.

Format Requirements:
Output strictly in Markdown format.
Use #, ##, ### for headings.
Use bullet points, bold text, and blockquotes for emphasis.
Minimum 20,000 characters in total length across chapters.
Do not stop until the chapter is complete.
`;

const cssContent = `
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Inter:wght@400;600;700&display=swap');

body {
  font-family: 'Merriweather', serif;
  color: #000000;
  background-color: #FFFFFF;
  line-height: 1.8;
  padding: 40px;
  font-size: 11pt;
}

h1, h2, h3, h4 {
  font-family: 'Inter', sans-serif;
  color: #000000;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 700;
}

h1 {
  font-size: 24pt;
  text-align: center;
  border-bottom: 2px solid #000000;
  padding-bottom: 10px;
  text-transform: uppercase;
}

h2 {
  font-size: 16pt;
  border-bottom: 1px solid #CCCCCC;
  padding-bottom: 5px;
}

h3 {
  font-size: 14pt;
}

a {
  color: #0000EE;
  text-decoration: underline;
}

blockquote {
  border-left: 4px solid #000000;
  margin: 1.5em 0;
  padding: 0.5em 1em;
  background: #F9F9F9;
  font-style: italic;
  font-family: 'Inter', sans-serif;
  font-size: 10pt;
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
}

th, td {
  border: 1px solid #000000;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #EEEEEE;
  font-family: 'Inter', sans-serif;
}

code {
  font-family: monospace;
  background-color: #F0F0F0;
  padding: 2px 4px;
}
`;

const footerHtml = `
<style>
  .footer {
    width: 100%;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 9pt;
    color: #666666;
    padding: 10px 0;
    border-top: 1px solid #CCCCCC;
    margin: 0 40px;
  }
</style>
<div class="footer">
  Confidential & Proprietary - Provided by <strong>BNE Studio</strong> | Not Legal Advice
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
    "Introduction, Disclaimers, and Foundational Context",
    "Detailed Legal/Procedural Requirements",
    "Step-by-Step Execution Plan & Best Practices",
    "Real-World Scenarios and Risk Mitigation",
    "The Full Template / Checklist"
  ];

  try {
    for (const [index, chapter] of chapters.entries()) {
      const prompt = `Write Chapter ${index + 1}: "${chapter}" of the document titled "${asset.title}". \n\nDocument Description: ${asset.description}\n\nWrite a detailed, informative chapter (aim for around 1,500 characters). Follow the persona rules completely. Do NOT write the other chapters, ONLY this one chapter. Provide extensive actionable advice and clear definitions. For Chapter 5, provide the actual raw template/checklist ready to use.`;
      
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
            seed: 100 + index
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
