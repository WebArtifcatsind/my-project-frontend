

import React, { useEffect } from "react";
import "./legal.css";

const Cookies = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const lastUpdated = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <main className="legal-page">
      <header className="legal-hero">
        <h1>Cookie Policy</h1>
        <p className="meta">Last updated: {lastUpdated}</p>
      </header>

      <section>
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device that help websites function, improve performance,
          and provide insights into usage. Similar technologies include pixels, local storage, and SDKs.
        </p>
      </section>

      <section>
        <h2>How We Use Cookies</h2>
        <ul>
          <li><strong>Strictly Necessary:</strong> security, load balancing, basic site features.</li>
          <li><strong>Performance &amp; Analytics:</strong> aggregated stats on pages visited, features used.</li>
          <li><strong>Functionality:</strong> remember preferences and enhance experience.</li>
          <li><strong>Advertising/Third-party (if applicable):</strong> measure campaigns and reach.</li>
        </ul>
      </section>

      <section>
        <h2>Examples of Cookies/Providers</h2>
        <ul>
          <li>Analytics (e.g., Google Analytics)</li>
          <li>CDN &amp; Security (e.g., Cloudflare)</li>
          <li>Session/Load Balancing</li>
        </ul>
        <p className="note">Actual providers depend on your current stack and may change over time.</p>
      </section>

      <section>
        <h2>Managing Cookies</h2>
        <p>
          You can control cookies via your browser settings (block, delete, or limit cookies). Some features may
          not work properly if certain cookies are disabled. Where required by law, we will request consent for
          non-essential cookies.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update this Cookie Policy periodically. We’ll post updates here with a new “Last updated” date.
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

export default Cookies;
