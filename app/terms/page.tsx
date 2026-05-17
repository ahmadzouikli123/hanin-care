import Link from "next/link"

export const metadata = {
  title: "Terms of Service | Elder Support Training PSW",
  description: "Terms of Service for Elder Support Training PSW — Canadian PSW training platform.",
}

export default function TermsOfServicePage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,var(--primary-dark),var(--primary))", color: "white", padding: "3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: "0.82rem", opacity: 0.7, marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
            {" › "}Terms of Service
          </div>
          <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: "2.2rem", marginBottom: "0.5rem" }}>
            Terms of Service
          </h1>
          <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
            Last updated: May 17, 2026 &nbsp;·&nbsp; Effective: May 17, 2026
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ background: "white", borderRadius: 16, border: "1px solid var(--border)", padding: "2.5rem", boxShadow: "var(--shadow)" }}>

          {/* Important Notice */}
          <div style={{ background: "#FEF3C7", border: "1.5px solid #FCD34D", borderRadius: 12, padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
            <p style={{ fontSize: "0.9rem", color: "#92400E", lineHeight: 1.7, margin: 0 }}>
              <strong>⚠️ Important:</strong> Elder Support Training PSW is an <strong>educational training platform</strong>. Completion of this program does not constitute professional licensure, registration with the HSCPOA, or certification as a Personal Support Worker in any Canadian province or territory. Always verify current regulatory requirements with the appropriate provincial authority.
            </p>
          </div>

          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--text)", marginBottom: "2rem" }}>
            These Terms of Service ("<strong>Terms</strong>") govern your access to and use of the Elder Support Training PSW platform ("<strong>Platform</strong>") operated by Elder Support Training PSW ("<strong>we</strong>", "<strong>our</strong>", or "<strong>us</strong>"). By creating an account or using the Platform, you agree to be bound by these Terms. If you do not agree, do not use the Platform.
          </p>

          <Section title="1. Acceptance of Terms">
            <p>By registering for an account, you confirm that:</p>
            <ul>
              <li>You are at least 18 years of age (or 16 with parental consent)</li>
              <li>You have read and understood these Terms and our Privacy Policy</li>
              <li>You are using the Platform for legitimate educational purposes</li>
              <li>The information you provide during registration is accurate and complete</li>
            </ul>
          </Section>

          <Section title="2. Description of Service">
            <p>Elder Support Training PSW provides an online educational platform for Personal Support Worker training aligned with Canadian healthcare standards. Our services include:</p>
            <ul>
              <li>27-unit PSW curriculum across Beginner, Intermediate, and Advanced levels</li>
              <li>Theory content, quizzes, case studies, and practical skill guidance</li>
              <li>Progress tracking and certificates of completion</li>
              <li>Educational videos and supplementary learning resources</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>The Platform is intended as a <strong>supplementary educational resource</strong>. It does not replace formal PSW college programs, clinical practicum placements, or employer-required training.</p>
          </Section>

          <Section title="3. Account Registration and Security">
            <ul>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You may not share your account with others or allow others to access the Platform using your credentials.</li>
              <li>You must notify us immediately of any unauthorized access to your account.</li>
              <li>Each person requires their own account. Institutional or group licensing requires a separate agreement.</li>
              <li>We reserve the right to suspend accounts that violate these Terms.</li>
            </ul>
          </Section>

          <Section title="4. Subscription Plans and Payment">
            <p>The Platform offers multiple subscription plans with different levels of content access. By subscribing:</p>
            <ul>
              <li>You authorize us to charge your payment method for the selected plan.</li>
              <li>Subscriptions renew automatically unless cancelled before the renewal date.</li>
              <li>Prices are in Canadian dollars (CAD) and are subject to applicable taxes (GST/HST).</li>
              <li>We reserve the right to modify pricing with 30 days notice to existing subscribers.</li>
            </ul>
            <SubHeading>Refund Policy</SubHeading>
            <p>We offer a <strong>7-day refund</strong> for new subscriptions if you have not accessed more than 20% of the content in your plan. Refund requests must be submitted to <strong>support@hanin-care.ca</strong>. After 7 days or if substantial content has been accessed, refunds are at our discretion.</p>
          </Section>

          <Section title="5. Acceptable Use">
            <p>You agree to use the Platform only for lawful educational purposes. You must NOT:</p>
            <ul>
              <li>Copy, reproduce, distribute, or sell any Platform content without written permission</li>
              <li>Use automated tools (bots, scrapers) to access content</li>
              <li>Attempt to circumvent subscription requirements or access controls</li>
              <li>Misrepresent your identity or credentials</li>
              <li>Upload or transmit harmful, offensive, or illegal content</li>
              <li>Use the Platform to harass, abuse, or harm others</li>
              <li>Claim that a Platform certificate constitutes professional licensure or regulatory registration</li>
              <li>Use Platform content to create competing educational products without our consent</li>
            </ul>
          </Section>

          <Section title="6. Intellectual Property">
            <p>All content on the Platform — including but not limited to curriculum text, case studies, quiz questions, graphics, and educational materials — is the intellectual property of Elder Support Training PSW and is protected by Canadian copyright law (<em>Copyright Act, R.S.C. 1985, c. C-42</em>).</p>
            <p style={{ marginTop: "0.75rem" }}>You are granted a <strong>limited, non-exclusive, non-transferable licence</strong> to access and use Platform content for your personal educational use only. This licence does not permit reproduction, distribution, or commercial use of any content.</p>
            <p style={{ marginTop: "0.75rem" }}>Third-party content (YouTube videos, referenced guidelines) remains the property of their respective owners.</p>
          </Section>

          <Section title="7. Certificates of Completion">
            <p>Certificates issued by Elder Support Training PSW:</p>
            <ul>
              <li>Confirm completion of our educational program requirements</li>
              <li>Are <strong>not</strong> equivalent to provincial PSW certification or HSCPOA registration</li>
              <li>Are <strong>not</strong> accredited by any provincial regulatory college</li>
              <li>May be presented to employers as evidence of supplementary training at the employer's discretion</li>
              <li>Remain valid for 2 years from the date of issue, after which re-assessment is recommended</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>We reserve the right to revoke certificates obtained through dishonest means (cheating, sharing answers, or misrepresenting completion).</p>
          </Section>

          <Section title="8. Educational Content Disclaimer">
            <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 8, padding: "1rem", marginBottom: "0.75rem" }}>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#991B1B" }}>
                <strong>Medical and Clinical Disclaimer:</strong> The clinical content on this Platform is provided for educational purposes only and does not constitute medical advice, clinical direction, or professional guidance. PSWs must always follow their employer's policies, care plans, and the direction of regulated health professionals. Content reflects general Canadian PSW standards and may not reflect every regional or employer-specific requirement.
              </p>
            </div>
            <p>We make reasonable efforts to ensure content accuracy and alignment with current Canadian healthcare standards. However:</p>
            <ul>
              <li>Healthcare guidelines and regulations change. Content may not reflect the most recent updates.</li>
              <li>Always verify current standards with your provincial regulatory body, employer, and care team.</li>
              <li>We are not liable for clinical decisions made based on Platform content.</li>
            </ul>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>To the maximum extent permitted by Canadian law:</p>
            <ul>
              <li>The Platform is provided "as is" without warranties of any kind, express or implied.</li>
              <li>We do not warrant that the Platform will be uninterrupted, error-free, or completely secure.</li>
              <li>We are not liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform.</li>
              <li>Our total liability to you for any claim shall not exceed the amount you paid to us in the 12 months preceding the claim.</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>Nothing in these Terms limits liability for fraud, gross negligence, or any liability that cannot be excluded under applicable Canadian consumer protection law.</p>
          </Section>

          <Section title="10. Termination">
            <p><strong>By You:</strong> You may cancel your account at any time by contacting support@hanin-care.ca. Cancellation stops future billing but does not entitle you to a refund of amounts already paid (unless within the 7-day refund window).</p>
            <p style={{ marginTop: "0.75rem" }}><strong>By Us:</strong> We may suspend or terminate your account without notice if you violate these Terms, engage in fraudulent activity, or if we cease operations. In the case of our ceasing operations, we will provide 30 days notice where possible.</p>
          </Section>

          <Section title="11. Governing Law">
            <p>These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Ontario, Canada.</p>
          </Section>

          <Section title="12. Changes to Terms">
            <p>We may update these Terms from time to time. Material changes will be communicated by email or platform notice at least 14 days before taking effect. Your continued use of the Platform after the effective date of updated Terms constitutes acceptance.</p>
          </Section>

          <Section title="13. Contact Us">
            <p>For questions about these Terms:</p>
            <ul>
              <li><strong>Email:</strong> legal@hanin-care.ca</li>
              <li><strong>Support:</strong> support@hanin-care.ca</li>
              <li><strong>Platform:</strong> hanin-care.vercel.app</li>
            </ul>
          </Section>

        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.85rem", color: "var(--text-light)" }}>
          <Link href="/privacy" style={{ color: "var(--primary)", textDecoration: "none", marginRight: "1.5rem" }}>Privacy Policy</Link>
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
