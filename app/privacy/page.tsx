import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | Elder Support Training PSW",
  description: "Privacy Policy for Elder Support Training PSW — compliant with PIPEDA and Canadian privacy law.",
}

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,var(--primary-dark),var(--primary))", color: "white", padding: "3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: "0.82rem", opacity: 0.7, marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
            {" › "}Privacy Policy
          </div>
          <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: "2.2rem", marginBottom: "0.5rem" }}>
            Privacy Policy
          </h1>
          <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
            Last updated: May 17, 2026 &nbsp;·&nbsp; Effective: May 17, 2026
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ background: "white", borderRadius: 16, border: "1px solid var(--border)", padding: "2.5rem", boxShadow: "var(--shadow)" }}>

          {/* Intro */}
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--text)", marginBottom: "2rem" }}>
            Elder Support Training PSW ("<strong>we</strong>", "<strong>our</strong>", or "<strong>us</strong>") is committed to protecting your personal information in accordance with the <strong>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong>, applicable provincial privacy legislation, and Canadian healthcare privacy standards. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our PSW training platform at <strong>hanin-care.vercel.app</strong>.
          </p>

          <Section title="1. Who We Are">
            <p>Elder Support Training PSW is a Canadian PSW training platform developed by Hanin Zouikli (B.Sc. Psychology), M-Nour Zouikli (B.Sc. Psychology &amp; Business), and Ahmad Zouikli (Software Engineer). We are based in Canada and our platform is designed to serve Personal Support Workers, healthcare students, and care organizations across Canada.</p>
            <p style={{ marginTop: "0.75rem" }}>For privacy inquiries, contact us at: <strong>privacy@hanin-care.ca</strong></p>
          </Section>

          <Section title="2. Information We Collect">
            <SubHeading>2.1 Information You Provide</SubHeading>
            <ul>
              <li><strong>Account Registration:</strong> Full name, email address, password (encrypted), and selected training plan.</li>
              <li><strong>Profile Information:</strong> Optional professional information relevant to your PSW training.</li>
              <li><strong>Communications:</strong> Messages you send us through support channels.</li>
            </ul>
            <SubHeading>2.2 Information Collected Automatically</SubHeading>
            <ul>
              <li><strong>Learning Progress:</strong> Units completed, quiz scores, case study progress, time spent on content.</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, session duration, and interaction patterns within the platform.</li>
              <li><strong>Technical Data:</strong> IP address, browser type and version, device type, operating system, and referring URLs.</li>
              <li><strong>Cookies:</strong> Session cookies (required for login) and functional cookies (to remember your preferences). We do not use advertising cookies.</li>
            </ul>
            <SubHeading>2.3 Information We Do NOT Collect</SubHeading>
            <ul>
              <li>We do not collect health information about you personally.</li>
              <li>We do not collect payment card information directly (processed by third-party payment processors).</li>
              <li>We do not knowingly collect information from persons under 16 years of age.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use your personal information for the following purposes, consistent with PIPEDA's requirement of legitimate purposes:</p>
            <ul>
              <li>To create and manage your training account</li>
              <li>To deliver PSW training content and track your learning progress</li>
              <li>To generate and issue certificates of completion</li>
              <li>To communicate with you about your account and our services</li>
              <li>To improve our platform, content, and user experience</li>
              <li>To comply with legal obligations</li>
              <li>To prevent fraud and ensure platform security</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>We will not use your personal information for purposes beyond those stated here without your consent.</p>
          </Section>

          <Section title="4. Legal Basis for Processing (PIPEDA)">
            <p>Under PIPEDA, we process your personal information based on:</p>
            <ul>
              <li><strong>Consent:</strong> Your voluntary registration and continued use of the platform constitutes consent for the collection and use described in this policy.</li>
              <li><strong>Contractual Necessity:</strong> Processing necessary to fulfill our service agreement with you (providing training, issuing certificates).</li>
              <li><strong>Legitimate Interests:</strong> Platform security, fraud prevention, and service improvement.</li>
              <li><strong>Legal Obligation:</strong> Compliance with applicable Canadian law.</li>
            </ul>
          </Section>

          <Section title="5. Information Sharing and Disclosure">
            <p>We do <strong>not sell</strong> your personal information. We may share your information only in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> Trusted third parties who assist us in operating the platform (Supabase for database hosting, Vercel for platform hosting). These providers are bound by data processing agreements and may not use your data for other purposes.</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government authority.</li>
              <li><strong>Safety:</strong> To protect the safety of users or the public where necessary.</li>
              <li><strong>Business Transfer:</strong> In the event of a merger or acquisition, with prior notice to you.</li>
              <li><strong>With Your Consent:</strong> For any purpose you explicitly authorize.</li>
            </ul>
          </Section>

          <Section title="6. Data Storage and Security">
            <p>Your data is stored on secure servers provided by Supabase (hosted in the United States). As a Canadian organization transferring data outside Canada, we ensure comparable protection through contractual safeguards consistent with PIPEDA Schedule 1 Principle 7.</p>
            <p style={{ marginTop: "0.75rem" }}>Security measures include:</p>
            <ul>
              <li>Encrypted data transmission (HTTPS/TLS)</li>
              <li>Encrypted password storage (bcrypt)</li>
              <li>Row-level security policies on database access</li>
              <li>Regular security audits and access controls</li>
              <li>Minimal data collection principle — we collect only what is necessary</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>No method of transmission over the internet is 100% secure. We implement industry-standard measures but cannot guarantee absolute security.</p>
          </Section>

          <Section title="7. Data Retention">
            <p>We retain your personal information for as long as your account is active or as needed to provide services. Specifically:</p>
            <ul>
              <li><strong>Account data:</strong> Retained while your account is active and for 2 years after deletion (for legal and audit purposes)</li>
              <li><strong>Learning progress and certificates:</strong> Retained for 5 years to support professional verification</li>
              <li><strong>Usage logs:</strong> Retained for 12 months</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>You may request deletion of your account and personal data at any time (see Section 9).</p>
          </Section>

          <Section title="8. Cookies and Tracking">
            <p>We use the following types of cookies:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for platform login and security. Cannot be disabled.</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences (language, settings). Can be disabled in browser settings.</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>We do <strong>not</strong> use advertising, marketing, or third-party tracking cookies. Our platform is ad-free.</p>
          </Section>

          <Section title="9. Your Rights Under PIPEDA">
            <p>As a Canadian resident, you have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Right of Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete information.</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for non-essential processing (note: this may affect your ability to use the platform).</li>
              <li><strong>Right to Account Deletion:</strong> Request deletion of your account and personal data.</li>
              <li><strong>Right to Complain:</strong> File a complaint with the <strong>Office of the Privacy Commissioner of Canada (OPC)</strong> at <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>www.priv.gc.ca</a> if you believe your privacy rights have been violated.</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>To exercise any of these rights, contact us at <strong>privacy@hanin-care.ca</strong>. We will respond within 30 days.</p>
          </Section>

          <Section title="10. Children's Privacy">
            <p>Our platform is intended for adults (18+) pursuing PSW training and healthcare education. We do not knowingly collect personal information from persons under 16 years of age. If we become aware that we have collected information from a minor, we will delete it promptly.</p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. We will notify you of material changes by email or by a prominent notice on the platform. Your continued use of the platform after changes take effect constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="12. Contact Us">
            <p>For any privacy concerns, requests, or questions:</p>
            <ul>
              <li><strong>Email:</strong> privacy@hanin-care.ca</li>
              <li><strong>Platform:</strong> hanin-care.vercel.app</li>
              <li><strong>Privacy Officer:</strong> Hanin Zouikli, Program Director</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>
              For unresolved privacy concerns, you may contact the <strong>Office of the Privacy Commissioner of Canada</strong>:<br />
              📞 1-800-282-1376 &nbsp;·&nbsp; 🌐 <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>www.priv.gc.ca</a>
            </p>
          </Section>

        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.85rem", color: "var(--text-light)" }}>
          <Link href="/terms" style={{ color: "var(--primary)", textDecoration: "none", marginRight: "1.5rem" }}>Terms of Service</Link>
          <Link href="/" style={{ color: "var(--primary)", textDecoration: "none" }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "2px solid var(--border)" }}>
        {title}
      </h2>
      <div style={{ fontSize: "0.93rem", lineHeight: 1.8, color: "var(--text)" }}>
        {children}
      </div>
    </div>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontWeight: 700, color: "var(--text)", marginTop: "1rem", marginBottom: "0.4rem", fontSize: "0.93rem" }}>
      {children}
    </p>
  )
}
