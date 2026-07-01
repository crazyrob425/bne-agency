/**
 * BNE Agency - Terms of Service
 *
 * This document outlines the terms and conditions for using BNE Agency's
 * website and services.
 *
 * Developed by Blacklisted Binary Labs
 * Chief Dev & Executive Architect: Rob Branting
 */

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="container max-w-4xl py-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3">
            <FileText className="h-6 w-6 text-violet-400" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-100">Terms of Service</h1>
            <p className="text-slate-400">The rules of engagement.</p>
          </div>
        </div>

        <div className="prose prose-invert prose-slate max-w-none prose-h2:font-display prose-h2:text-emerald-400 prose-a:text-violet-400 hover:prose-a:text-violet-300 prose-strong:text-slate-200">
          <p className="text-sm text-slate-500">Last Updated: June 13, 2024</p>

          <p>
            Welcome to Blacklisted Niche Entertainment ("BNE", "the Agency", "we", "us"). These Terms of Service ("Terms") govern your access to and use of our website (bne.agency) and the services we provide. By accessing our website or submitting an application, you agree to be bound by these Terms.
          </p>

          <h2>1. Eligibility</h2>
          <p>
            You must be at least eighteen (18) years of age to use our services. By applying, you represent and warrant that you are of legal age to form a binding contract and that all information you provide is accurate and truthful. You further warrant that all performers in any content you create or provide are also at least 18 years of age and that you maintain all necessary records in compliance with 18 U.S.C. § 2257.
          </p>

          <h2>2. Our Services</h2>
          <p>
            BNE provides digital marketing, brand architecture, strategic advisory, and compliance education services for independent adult content creators. We do not produce content, facilitate illegal activities, or engage in any form of human trafficking or exploitation. Our role is strictly that of a strategic partner and business management consultant.
          </p>

          <h2>3. Creator Responsibilities</h2>
          <p>
            As a creator working with BNE, you agree to:
          </p>
          <ul>
            <li>Conduct your business in a lawful and professional manner.</li>
            <li>Maintain sole responsibility for the content you create and distribute.</li>
            <li>Comply with all applicable federal, state, and local laws, including but not limited to 18 U.S.C. § 2257 record-keeping requirements.</li>
            <li>Provide accurate and complete information to the Agency.</li>
            <li>Never engage in any activity that could harm the reputation or operations of the Agency.</li>
          </ul>

          <h2>4. Confidentiality</h2>
          <p>
            Your relationship with BNE is governed by our Non-Disclosure Agreement (NDA). We are committed to protecting your privacy and confidential information.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            You retain all ownership rights to your content and intellectual property. By engaging our services, you grant BNE a limited, non-exclusive license to use your brand assets and content solely for the purpose of marketing and managing your brand as outlined in our service agreement. All materials, strategies, and systems provided by BNE to you remain the intellectual property of BNE.
          </p>

          <h2>6. Disclaimers and Limitation of Liability</h2>
          <p>
            BNE provides services on an "as-is" basis. We make no guarantees regarding specific income levels or follower counts, as success is dependent on numerous factors including your content, work ethic, and market conditions. Our goal is to provide you with the strategy and tools to succeed, but the ultimate responsibility for implementation and success lies with you.
          </p>
          <p>
            IN NO EVENT WILL THE AGENCY BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OF OUR SERVICES.
          </p>

          <h2>7. Termination</h2>
          <p>
            Either party may terminate the service agreement according to the terms specified within that agreement. BNE reserves the right to terminate our relationship immediately if you are found to be in breach of these Terms, engaging in illegal activities, or misrepresenting yourself or your content.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of the State of Washington, without regard to its conflict of law provisions.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of our services after such changes constitutes your acceptance of the new Terms.
          </p>

          <h2>10. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:info@bne.agency">info@bne.agency</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}