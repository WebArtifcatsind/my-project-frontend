
//D:\office\webartifacts\webartifacts-frontend\src\pages\Terms.jsx

import React, { useEffect } from "react";
import "./legal.css";

const Terms = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const lastUpdated = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <main className="legal-page">
      <header className="legal-hero">
        <h1>Terms of Service</h1>
        <p className="meta">Last updated: {lastUpdated}</p>
      </header>

      <section>
        <h2>1. Overview</h2>
        <p>
          These Terms of Service (“Terms”) govern your access to and use of the websites,
          applications, and services provided by <strong>WebArtifacts Pvt Ltd</strong>
          (“WebArtifacts”, “we”, “our”, “us”). By using our site or engaging our services,
          you agree to these Terms.
        </p>
        <p className="note">This is a business-friendly template. Please review with counsel for your specific needs.</p>
      </section>

      <section>
        <h2>2. Our Services</h2>
        <p>We provide IT solutions including (non-exhaustive):</p>
        <ul>
          <li>Managed IT Support</li>
          <li>Cloud Deployment &amp; Backup</li>
          <li>Custom Software Development</li>
          <li>Cybersecurity Consulting</li>
          <li>Website &amp; App Development</li>
          <li>ERP &amp; Document Management</li>
          <li>Help Desk Support</li>
          <li>Backup &amp; Disaster Recovery</li>
          <li>Network &amp; Server Management</li>
          <li>IT Consulting / Virtual CIO</li>
          <li>VoIP / Unified Communication</li>
          <li>Data Analytics &amp; Dashboards</li>
          <li>Remote Work Enablement</li>
          <li>DevOps &amp; CI/CD Pipelines</li>
          <li>AI &amp; Automation Solutions</li>
          <li>Hardware Procurement &amp; Setup</li>
        </ul>
      </section>

      <section>
        <h2>3. Proposals, SOWs &amp; Changes</h2>
        <p>
          Engagements are typically defined in a quotation, proposal, or Statement of Work (“SOW”).
          Any changes to scope, timeline, or cost must be agreed in writing as a change order.
        </p>
      </section>

      <section>
        <h2>4. Fees, Invoicing &amp; Taxes</h2>
        <p>
          Fees are as quoted or in the SOW. Unless otherwise stated, taxes, duties, and government
          charges are additional and your responsibility. Invoices are payable per the payment terms
          stated on the invoice or SOW.
        </p>
      </section>

      <section>
        <h2>5. Acceptable Use</h2>
        <p>
          You will not misuse our services, attempt to gain unauthorized access, infringe intellectual
          property, or violate applicable law. You’re responsible for content you provide and the
          actions of users you authorize.
        </p>
      </section>

      <section>
        <h2>6. Data Security &amp; Privacy</h2>
        <p>
          We apply reasonable technical and organizational measures to protect data processed as part
          of our services. Our <a href="/privacy">Privacy Policy</a> explains how we collect and use personal data.
        </p>
      </section>

      <section>
        <h2>7. Intellectual Property</h2>
        <p>
          We retain rights in our pre-existing IP, tools, frameworks, and know-how. Unless otherwise
          agreed in the SOW, deliverables developed specifically for you are licensed for your internal
          business use. Third-party components remain subject to their respective licenses.
        </p>
      </section>

      <section>
        <h2>8. Third-Party Services</h2>
        <p>
          Some solutions use third-party services (e.g., cloud platforms, analytics, communications).
          Their terms govern your use of those services. We are not responsible for third-party outages
          or changes.
        </p>
      </section>

      <section>
        <h2>9. Warranties &amp; Disclaimers</h2>
        <p>
          Services are provided on an “as is” and “as available” basis. To the maximum extent permitted
          by law, we disclaim warranties of merchantability, fitness for a particular purpose, and
          non-infringement. We do not guarantee error-free or uninterrupted operation.
        </p>
      </section>

      <section>
        <h2>10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, neither party will be liable for indirect, incidental,
          special, consequential, or punitive damages, or loss of profits, revenue, data, or business.
          Our aggregate liability arising out of or relating to the services is limited to the fees paid
          to us for the specific service giving rise to the claim in the 6 months preceding the event.
        </p>
      </section>

      <section>
        <h2>11. Indemnity</h2>
        <p>
          You agree to indemnify and hold WebArtifacts harmless from claims arising out of your misuse
          of the services or breach of these Terms. We will indemnify you for claims alleging that our
          deliverables infringe IP rights, subject to customary exclusions and your prompt notice and
          cooperation.
        </p>
      </section>

      <section>
        <h2>12. Suspension &amp; Termination</h2>
        <p>
          We may suspend or terminate services for non-payment, security risks, legal compliance, or
          material breach. Either party may terminate an SOW for cause on written notice if the other
          party fails to cure a material breach within 30 days of notice.
        </p>
      </section>

      <section>
        <h2>13. Governing Law &amp; Dispute Resolution</h2>
        <p>
          These Terms are governed by the laws of India. Courts in Nagpur, Maharashtra shall have
          exclusive jurisdiction, subject to any mutually agreed alternative dispute resolution.
        </p>
      </section>

      <section>
        <h2>14. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Material changes will be posted here with a new
          “Last updated” date. Continued use of our services indicates acceptance.
        </p>
      </section>

      <section>
        <h2>15. Contact</h2>
        <p>
          WebArtifacts Pvt Ltd<br />
          Plot no.20, Behind Venue Corner, Balaji Nagar, Nagpur, Maharashtra 440027<br />
          +91 7758969022 • <a href="mailto:webartifactsind@gmail.com">webartifactsind@gmail.com</a>
        </p>
      </section>
    </main>
  );
};

export default Terms;
