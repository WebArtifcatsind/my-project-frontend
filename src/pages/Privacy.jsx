

import React, { useEffect } from "react";
import "./legal.css";

const Privacy = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const lastUpdated = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <main className="legal-page">
      <header className="legal-hero">
        <h1>Privacy Policy</h1>
        <p className="meta">Last updated: {lastUpdated}</p>
      </header>

      <section>
        <h2>Who We Are</h2>
        <p>
          <strong>WebArtifacts Pvt Ltd</strong> (“WebArtifacts”, “we”, “our”, “us”) is an IT company
          providing consulting and technology services. This Policy explains how we collect, use, share, and
          protect personal data when you use our website, contact us, or engage our services.
        </p>
      </section>

      <section>
        <h2>Scope &amp; Legal Bases</h2>
        <p>
          We process data under applicable laws (e.g., India’s DPDP Act 2023, GDPR, and other local laws where applicable),
          relying on consent, contract necessity, legal obligation, and legitimate interests.
        </p>
      </section>

      <section>
        <h2>Data We Collect</h2>
        <ul>
          <li><strong>Contact &amp; Business Info:</strong> name, email, phone, company, role.</li>
          <li><strong>Account &amp; Support:</strong> login data, tickets, communications.</li>
          <li><strong>Billing:</strong> addresses, tax info, transaction details.</li>
          <li><strong>Usage &amp; Device:</strong> IP address, pages visited, identifiers, browser, OS.</li>
          <li><strong>Cookies &amp; Similar Tech:</strong> see our <a href="/cookies">Cookie Policy</a>.</li>
        </ul>
      </section>

      <section>
        <h2>How We Use Data</h2>
        <ul>
          <li>Provide and improve our services and website.</li>
          <li>Respond to inquiries, support requests, and proposals/SOWs.</li>
          <li>Security, fraud prevention, and compliance.</li>
          <li>Analytics and service performance.</li>
          <li>Communications (transactional; and, with consent/opt-in, marketing).</li>
        </ul>
      </section>

      <section>
        <h2>Sharing &amp; Transfers</h2>
        <p>
          We may share data with trusted service providers (e.g., hosting, analytics, communications, payment processors)
          under appropriate contracts and safeguards. If data is transferred internationally, we use lawful transfer
          mechanisms where required.
        </p>
      </section>

      <section>
        <h2>Retention</h2>
        <p>
          We keep personal data only as long as necessary for the purposes described or as required by law,
          then delete or anonymize it.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          We use reasonable technical and organizational measures to protect data. No system is 100% secure;
          please contact us immediately if you suspect an issue.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>
          Subject to applicable law, you may have rights to access, correct, delete, restrict processing, object,
          data portability, and withdraw consent. To exercise these rights, contact us at
          <a href="mailto:webartifactsind@gmail.com"> webartifactsind@gmail.com</a>.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          Our services are intended for business use and not for children. We do not knowingly collect personal data
          from children.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update this Policy periodically. We’ll post updates here with a new “Last updated” date.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          WebArtifacts Pvt Ltd<br />
          Plot no.20, Behind Venue Corner, Balaji Nagar, Nagpur, Maharashtra 440027<br />
          +91 7758969022 • <a href="mailto:webartifactsind@gmail.com">webartifactsind@gmail.com</a>
        </p>
      </section>
    </main>
  );
};

export default Privacy;
