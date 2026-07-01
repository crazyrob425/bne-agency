import { mdToPdf } from 'md-to-pdf';
import fs from 'fs';
import path from 'path';

async function generatePDFs() {
  const files = [
    '2257_Compliance_Checklist',
    'Model_Release_Template',
    'State_Age-Gate_Guide',
    'Anonymity_Audit_Worksheet',
    'DMCA_Takedown_Template',
    'Banking_Privacy_Guide'
  ];

  const cssPath = path.resolve('media/legal/legal.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  for (const file of files) {
    const mdPath = path.resolve(`media/legal/${file}.md`);
    const pdfPath = path.resolve(`client/public/media-files/${file}.pdf`);
    
    console.log(`Converting ${file}.md to PDF...`);
    await mdToPdf(
      { path: mdPath },
      { dest: pdfPath, css, pdf_options: { format: 'A4', margin: { top: '1in', bottom: '1in', left: '1in', right: '1in' } } }
    ).catch(console.error);
    console.log(`Done: ${pdfPath}`);
  }
}

generatePDFs().catch(console.error);
