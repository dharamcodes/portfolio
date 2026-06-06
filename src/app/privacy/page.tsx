import Link from "next/link";
import resumeData from "../../data/resume.json";

export const metadata = {
  title: "Privacy Policy | Dharmendra Awasthi",
  description: "Privacy policy and data protection disclosures for Dharmendra Awasthi's professional portfolio.",
  robots: {
    index: false, // Prevents SEO dilution since it's a legal disclaimer, but remains crawlable for compliance checks
  }
};

export default function PrivacyPolicy() {
  const { personal, contact } = resumeData;

  return (
    <>
      <div className="bg-blob"></div>
      <div className="bg-blob-2"></div>

      <header className="header">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ textDecoration: "none" }} prefetch={false}>
            <div className="logo" style={{ cursor: "pointer" }} aria-label={`${personal.name} portfolio homepage`}>
              dharam<span className="gradient-text">.dev</span>
            </div>
          </Link>
          <Link href="/" className="btn btn-secondary" style={{ padding: "0.5rem 1.5rem", fontSize: "0.85rem", textDecoration: "none" }} prefetch={false}>
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="container" style={{ paddingTop: "140px", paddingBottom: "80px", maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }} className="gradient-text">Privacy Policy</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2.5rem" }}>
          Last Updated: June 2026
        </p>

        <section style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--text-primary)" }}>
            Welcome to the professional portfolio of <strong>{personal.name}</strong>. I respect your privacy and am committed to protecting your personal data. This privacy policy explains how data is handled when you visit my website (<a href="https://github.com/dharamcodes" className="gradient-text" style={{ fontWeight: 600, textDecoration: "none" }}>github.com/dharamcodes</a>).
          </p>
        </section>

        <hr style={{ border: "0", borderTop: "1px solid var(--glass-border)", margin: "2.5rem 0" }} />

        <h2 style={{ fontSize: "1.6rem", marginTop: "2rem", marginBottom: "1rem" }}>1. Data Collection & Processing</h2>
        
        <h3 style={{ fontSize: "1.15rem", marginTop: "1.5rem", marginBottom: "0.5rem", color: "var(--accent-1)" }}>A. Analytics & Traffic Monitoring</h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.25rem" }}>
          This website uses <strong>Vercel Analytics</strong> to understand visitor traffic and page performance. Vercel Analytics is privacy-friendly, cookie-less, and does not collect or store any personally identifiable information (PII). All traffic metrics are aggregated and anonymous.
        </p>

        <h3 style={{ fontSize: "1.15rem", marginTop: "1.5rem", marginBottom: "0.5rem", color: "var(--accent-1)" }}>B. Hosting & Infrastructure Logs</h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.25rem" }}>
          This website is statically hosted on <strong>GitHub Pages</strong>. When you access this site, GitHub servers automatically collect certain request headers and infrastructure logs (such as your IP address, browser type, and timestamps) for security purposes, load balancing, and operational maintenance. This data is handled in accordance with GitHub&apos;s privacy statement.
        </p>

        <h3 style={{ fontSize: "1.15rem", marginTop: "1.5rem", marginBottom: "0.5rem", color: "var(--accent-1)" }}>C. Direct Inquiries & Communications</h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.25rem" }}>
          If you contact me directly via email ({contact.email}), LinkedIn, or GitHub, I will collect your name, email address, and any information you include in your message. This data is used solely to respond to your professional inquiries and is never shared, sold, or used for advertising/marketing.
        </p>

        <hr style={{ border: "0", borderTop: "1px solid var(--glass-border)", margin: "2.5rem 0" }} />

        <h2 style={{ fontSize: "1.6rem", marginTop: "2rem", marginBottom: "1rem" }}>2. International Privacy Standards Compliance</h2>

        <h3 style={{ fontSize: "1.15rem", marginTop: "1.5rem", marginBottom: "0.5rem", color: "var(--accent-2)" }}>A. India (DPDPA 2023)</h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.25rem" }}>
          In compliance with the <strong>Digital Personal Data Protection Act (DPDPA)</strong> of India, data processing on this website is consent-based or for legitimate uses (e.g. communication requests initiated by you). You have the right to withdraw consent, correct, or request erasure of your data by reaching out to the contact details provided below.
        </p>

        <h3 style={{ fontSize: "1.15rem", marginTop: "1.5rem", marginBottom: "0.5rem", color: "var(--accent-2)" }}>B. European Union (GDPR)</h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.25rem" }}>
          Under the <strong>General Data Protection Regulation (GDPR)</strong>, EU citizens have specific rights:
        </p>
        <ul style={{ color: "var(--text-secondary)", lineHeight: "1.7", paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>
          <li>Right to access your personal data.</li>
          <li>Right to rectify incorrect personal details.</li>
          <li>Right to erasure (&apos;right to be forgotten&apos;) of your communication records.</li>
          <li>Right to data portability.</li>
        </ul>

        <h3 style={{ fontSize: "1.15rem", marginTop: "1.5rem", marginBottom: "0.5rem", color: "var(--accent-2)" }}>C. United States (CalOPPA & CCPA/CPRA)</h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.25rem" }}>
          In accordance with US privacy laws (including the <strong>California Consumer Privacy Act</strong>), I disclose that:
        </p>
        <ul style={{ color: "var(--text-secondary)", lineHeight: "1.7", paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>
          <li>No personal data is collected or processed for financial gain or profiling.</li>
          <li>No personal data is &quot;sold&quot; or &quot;shared&quot; with third-party data brokers.</li>
          <li>Users can request a summary of the data we hold or request its deletion.</li>
        </ul>

        <hr style={{ border: "0", borderTop: "1px solid var(--glass-border)", margin: "2.5rem 0" }} />

        <h2 style={{ fontSize: "1.6rem", marginTop: "2rem", marginBottom: "1rem" }}>3. Data Retention</h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.25rem" }}>
          Direct email correspondence is retained only for as long as necessary to address your professional queries or maintain ongoing business relations.
        </p>

        <hr style={{ border: "0", borderTop: "1px solid var(--glass-border)", margin: "2.5rem 0" }} />

        <h2 style={{ fontSize: "1.6rem", marginTop: "2rem", marginBottom: "1rem" }}>4. Contact & Grievance</h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "2.5rem" }}>
          If you have any questions about this privacy statement, or if you would like to exercise any of your data protection rights, please contact me directly:
        </p>
        <div className="glass" style={{ padding: "1.5rem 2rem", display: "inline-block", width: "100%" }}>
          <strong style={{ display: "block", marginBottom: "0.5rem" }}>{personal.name}</strong>
          <span style={{ display: "block", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Email: <a href={`mailto:${contact.email}`} className="gradient-text" style={{ fontWeight: 600, textDecoration: "none" }}>{contact.email}</a></span>
          <span style={{ display: "block", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Location: {contact.location}</span>
          <span style={{ display: "block", color: "var(--text-secondary)" }}>LinkedIn: <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="gradient-text" style={{ fontWeight: 600, textDecoration: "none" }}>{contact.linkedin.replace("https://", "")}</a></span>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} {personal.name}. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
