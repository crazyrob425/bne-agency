/**
 * BNE Agency - Non-Disclosure Agreement (NDA)
 *
 * This document outlines the confidentiality agreement between BNE Agency and
 * prospective or current clients (Creators).
 *
 * Developed by Blacklisted Binary Labs
 * Chief Dev & Executive Architect: Rob Branting
 */

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

export default function NdaPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="container max-w-4xl py-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3">
            <Shield className="h-6 w-6 text-violet-400" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-100">Non-Disclosure Agreement</h1>
            <p className="text-slate-400">Your information is protected. Period.</p>
          </div>
        </div>

        <div className="prose prose-invert prose-slate max-w-none prose-h2:font-display prose-h2:text-emerald-400 prose-a:text-violet-400 hover:prose-a:text-violet-300 prose-strong:text-slate-200">
          <p className="text-sm text-slate-500">Last Updated: June 13, 2024</p>

          <p>
            This Non-Disclosure Agreement ("Agreement") is entered into by and between Blacklisted Niche Entertainment ("BNE", "the Agency", "we", "us") and you, the individual submitting an application or engaging in services ("Creator", "you"). This Agreement is effective upon your submission of information to the Agency.
          </p>

          <h2>1. Purpose</h2>
          <p>
            The purpose of this Agreement is to protect the confidentiality of the Creator's sensitive information shared with the Agency during the application process and any subsequent business relationship. We understand the critical importance of privacy in the adult entertainment industry and are committed to upholding the strictest standards of confidentiality.
          </p>

          <h2>2. Definition of Confidential Information</h2>
          <p>
            "Confidential Information" shall include, but is not limited to:
          </p>
          <ul>
            <li>Your legal name, government-issued identification, address, phone number, personal email, and any other personally identifiable information (PII).</li>
            <li>Your creator alias(es), brand identity, business plans, content strategies, and marketing plans.</li>
            <li>Financial information, including revenue, earnings, payment methods, and bank account details.</li>
            <li>Unpublished content, creative concepts, and intellectual property.</li>
            <li>Any and all communications between you and the Agency.</li>
          </ul>

          <h2>3. Obligation of Confidentiality</h2>
          <p>
            BNE agrees to hold all Confidential Information in the strictest confidence. We shall not disclose, publish, or disseminate Confidential Information to any third party without your express written consent. We will use the same degree of care to protect your information as we use to protect our own most sensitive data, which is a very high standard.
          </p>

          <h2>4. Permitted Use</h2>
          <p>
            The Agency will use the Confidential Information solely for the purpose of:
          </p>
          <ul>
            <li>Evaluating your application for partnership or services.</li>
            <li>Providing strategic advisory, management, and marketing services as agreed upon.</li>
            <li>Fulfilling our legal and compliance obligations.</li>
          </ul>

          <h2>5. Exclusions</h2>
          <p>
            The obligation of confidentiality does not extend to information that:
          </p>
          <ul>
            <li>Is or becomes publicly known through no fault of the Agency.</li>
            <li>Is lawfully required to be disclosed by any judicial or governmental authority. In such cases, we will provide you with prompt notice to allow you to seek a protective order, where feasible.</li>
          </ul>

          <h2>6. Term and Termination</h2>
          <p>
            This Agreement is effective from the moment you submit your information and shall remain in effect indefinitely, surviving the termination of any business relationship between you and the Agency. Your privacy is not temporary; our commitment to protecting it is permanent.
          </p>

          <h2>7. No License</h2>
          <p>
            This Agreement does not grant the Agency any license or rights to your intellectual property or content, other than for the explicit purpose of providing agreed-upon services.
          </p>

          <p>
            By submitting your application to Blacklisted Niche Entertainment, you acknowledge that you have read, understood, and agree to be bound by the terms of this Non-Disclosure Agreement.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}