// D:/office/webartifacts/webartifacts-frontend/src/pages/About.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./About.css";

const services = [
  { title: "MANAGED IT SUPPORT", path: "/services/MANAGED%20IT%20SUPPORT" },
  { title: "CLOUD DEPLOYMENT & BACKUP", path: "/services/CLOUD%20DEPLOYMENT%20%26%20BACKUP" },
  { title: "CUSTOM SOFTWARE DEVELOPMENT", path: "/services/CUSTOM%20SOFTWARE%20DEVELOPMENT" },
  { title: "CYBERSECURITY CONSULTING", path: "/services/CYBERSECURITY%20CONSULTING" },
  { title: "WEBSITE & APP DEVELOPMENT", path: "/services/WEBSITE%20%26%20APP%20DEVELOPMENT" },
  { title: "ERP & DOCUMENT MANAGEMENT", path: "/services/ERP%20%26%20DOCUMENT%20MANAGEMENT" },
  { title: "HELP DESK SUPPORT", path: "/services/HELP%20DESK%20SUPPORT" },
  { title: "BACKUP & DISASTER RECOVERY", path: "/services/BACKUP%20%26%20DISASTER%20RECOVERY" },
  { title: "NETWORK & SERVER MANAGEMENT", path: "/services/NETWORK%20%26%20SERVER%20MANAGEMENT" },
  { title: "IT CONSULTING / VIRTUAL CIO", path: "/services/IT%20CONSULTING%20%2F%20VIRTUAL%20CIO" },
  { title: "VOIP / UNIFIED COMMUNICATION", path: "/services/VOIP%20%2F%20UNIFIED%20COMMUNICATION" },
  { title: "DATA ANALYTICS & DASHBOARDS", path: "/services/DATA%20ANALYTICS%20%26%20DASHBOARDS" },
  { title: "REMOTE WORK ENABLEMENT", path: "/services/REMOTE%20WORK%20ENABLEMENT" },
  { title: "DEVOPS & CI/CD PIPELINES", path: "/services/DEVOPS%20%26%20CI%2FCD%20PIPELINES" },
  { title: "AI & AUTOMATION SOLUTIONS", path: "/services/AI%20%26%20AUTOMATION%20SOLUTIONS" },
  { title: "HARDWARE PROCUREMENT & SETUP", path: "/services/HARDWARE%20PROCUREMENT%20%26%20SETUP" }
];

const team = [
  { name: "Yogesh Satpute", title: "Founder & CEO", initials: "YS" },
//   { name: "Priya Verma", title: "Head of Engineering", initials: "PV" },
//   { name: "Rahul Mehta", title: "Cloud Architect", initials: "RM" },
//   { name: "Sneha Kulkarni", title: "Cybersecurity Lead", initials: "SK" }
];

const About = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <main className="about-page" id="about-top">
      {/* Hero */}
      <header className="about-hero">
        <div className="about-hero-inner">
          <h1>
            <span className="accent">Web</span>Artifacts
          </h1>
          <p className="kicker">Your partner for secure, scalable & affordable IT.</p>
          <p className="sub">
            We design, build, and manage technology that helps businesses grow—without the
            headaches. From managed support to cloud, apps, cybersecurity and AI, we’ve got you.
          </p>
          <div className="hero-actions">
            <Link to="/contact#contact-form" className="cta">Talk to an expert</Link>
            <a href="#our-story" className="cta ghost">Our story</a>
          </div>
        </div>
      </header>

      {/* Snapshot / Stats */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="num">150+</div>
              <div className="lbl">Projects Delivered</div>
            </div>
            <div className="stat">
              <div className="num">99.9%</div>
              <div className="lbl">Cloud Uptime Targets</div>
            </div>
            <div className="stat">
              <div className="num">4.8/5</div>
              <div className="lbl">Average CSAT</div>
            </div>
            <div className="stat">
              <div className="num">24×7</div>
              <div className="lbl">Proactive Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / Story */}
      <section id="our-story" className="about-section">
        <div className="container split">
          <div className="left">
            <h2>Who we are</h2>
            <p>
            <strong>WebArtifacts Pvt Ltd</strong> is a Nagpur-based IT company built to remove friction
            between business goals and technology. We combine engineering depth with practical
            execution: discover the real need, design a lean solution, deliver fast, and support it
            like it’s our own.
            </p>

            <ul className="checklist">
            <li>Outcome-driven delivery, not endless tickets</li>
            <li>Security-first mindset across everything we build</li>
            <li>Transparent pricing &amp; clear SOWs—no surprises</li>
            <li>Engineers who speak business, not jargon</li>
            </ul>

            <p><strong>How we work</strong></p>
            <ul className="bullets compact">
            <li><strong>Discover:</strong> goals, constraints, success metrics.</li>
            <li><strong>Build:</strong> simplest secure architecture, quick iterations.</li>
            <li><strong>Operate:</strong> 24×7 monitoring, SLOs, and continuous improvement.</li>
            </ul>

            <p><strong>Focus areas</strong></p>
            <ul className="bullets compact">
            <li>Cloud &amp; backup / disaster recovery</li>
            <li>Secure apps &amp; APIs</li>
            <li>Data analytics &amp; dashboards</li>
            <li>DevOps &amp; automation</li>
            </ul>

          </div>


          <div className="right card">
            <h3>What we do</h3>
            <p>
              End-to-end services across infrastructure, apps, data, and support—so you don’t have to
              coordinate ten different vendors.
            </p>
            <div className="chips">
              {services.map((s) => (
                <Link key={s.title} to={`${s.path}#service-detail-top`} className="chip">
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section alt">
        <div className="container">
          <h2>Our values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="emoji" aria-hidden>🛡️</div>
              <h4>Secure by Default</h4>
              <p>Hardened baselines, least privilege, audits, and continuous monitoring.</p>
            </div>
            <div className="value-card">
              <div className="emoji" aria-hidden>⚙️</div>
              <h4>Automate the Boring</h4>
              <p>CI/CD, IaC, and smart runbooks to reduce toil and speed up delivery.</p>
            </div>
            <div className="value-card">
              <div className="emoji" aria-hidden>📈</div>
              <h4>Measurable Outcomes</h4>
              <p>SLAs, SLOs, and KPIs built into every engagement & review.</p>
            </div>
            <div className="value-card">
              <div className="emoji" aria-hidden>🤝</div>
              <h4>Long-Term Partners</h4>
              <p>We succeed only when your business runs smoother and grows faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-section" id="milestones">
  <div className="container">
    <h2>Milestones &amp; Roadmap</h2>

    <div className="timeline">
      <div className="t-row">
        <div className="t-dot" />
        <div className="t-year">2025 • Q1</div>
        <div className="t-desc">
          WebArtifacts is founded; core team formed; first retainers signed for Managed IT Support.
        </div>
      </div>
      <div className="t-row">
        <div className="t-dot" />
        <div className="t-year">2025 • Q2</div>
        <div className="t-desc">
          Cloud &amp; DevOps practice launched; first 10+ client projects delivered (M365, Azure/AWS).
        </div>
      </div>
      <div className="t-row">
        <div className="t-dot" />
        <div className="t-year">2025 • Q3</div>
        <div className="t-desc">
          24×7 remote help desk and monitoring go live; baseline SOC hardening rolled out for customers.
        </div>
      </div>
      <div className="t-row">
        <div className="t-dot" />
        <div className="t-year">2025 • Q4</div>
        <div className="t-desc">
          Web &amp; app development pods spun up; first analytics dashboards and CI/CD pipelines in production.
        </div>
      </div>
      <div className="t-row">
        <div className="t-dot" />
        <div className="t-year">2026 • Q5</div>
        <div className="t-desc">
          AI &amp; automation offerings, compliance playbooks, and expansion to new regions (Pune/Remote).
        </div>
      </div>
    </div>

    {/* Extras: quick snapshot of now & next */}
    <div className="split" style={{ marginTop: '1rem' }}>
      <div className="leftcard">
        <h3>Recent highlights</h3>
        <ul className="bullets">
          <li>Multiple infrastructure cutovers without downtime</li>
          <li>First wave of ERP integrations &amp; secure APIs</li>
          <li>Standardized onboarding runbooks and SLAs</li>
        </ul>
      </div>

      <div className="rightcard">
        <h3>What’s next</h3>
        <ul className="bullets compact">
          <li>ISO-style controls &amp; change management pack</li>
          <li>Managed security bundle (M365 + EDR + backups)</li>
          <li>Automation playbooks for common support tasks</li>
        </ul>
      </div>
    </div>
  </div>
</section>

      {/* Team */}
      <section className="about-section alt">
        <div className="container">
          <h2>Leadership</h2>
          <div className="team-grid">
            {team.map((m) => (
              <div key={m.name} className="team-card">
                <div className="avatar" data-initials={m.initials} aria-hidden />
                <div className="meta">
                  <h4>{m.name}</h4>
                  <p>{m.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance / Certifications */}
      <section className="about-section">
        <div className="container split">
          <div className="leftside">
            <h2>Compliance & Best Practices</h2>
            <p>
              We align to leading frameworks and platform guidance so your stack remains compliant,
              maintainable, and audit-ready.
            </p>
            <ul className="bullets">
              <li>ISO-style controls & change management discipline</li>
              <li>OWASP ASVS guidance for apps; CIS benchmarks for infra</li>
              <li>Cloud provider Well-Architected principles (AWS/Azure/GCP)</li>
            </ul>
          </div>
          <div className="right card">
            <h3>Tooling & Partners</h3>
            <ul className="bullets compact">
              <li>Microsoft 365 / Azure / Defender</li>
              <li>AWS / GCP</li>
              <li>Docker / Kubernetes / Terraform / GitHub Actions</li>
              <li>Elastic / Grafana / Prometheus</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container cta-card">
          <h3>Ready to modernize your IT?</h3>
          <p>Tell us your goals—we’ll bring the architecture, security, and delivery.</p>
          <div className="cta-actions">
            <Link to="/contact#contact-form" className="cta">Start a project</Link>
            {/* <Link to="/testimonials" className="cta ghost">See testimonials</Link> */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
