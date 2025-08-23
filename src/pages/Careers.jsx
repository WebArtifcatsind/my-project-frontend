// D:\office\webartifacts\webartifacts-frontend\src\components\Careers.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./Careers.css";
import Logo from "../heroimages/WebArtifacts_transparent white font.png";

/* set CSS vars to real navbar/quicknav heights so sticky/fixed aligns perfectly */
const setStickyOffsets = () => {
  const navbar = document.querySelector(".navbar");
  const quicknav = document.querySelector(".careers-quicknav");
  const navH = navbar ? navbar.offsetHeight : 64;
  const qnH = quicknav ? quicknav.offsetHeight : 60;
  document.documentElement.style.setProperty("--nav-h", `${navH}px`);
  document.documentElement.style.setProperty("--quicknav-h", `${qnH}px`);
};

/* smooth scroll to hash anchors */
const scrollToHash = (hash) => {
  if (hash) {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

const Careers = () => {
  const location = useLocation();

  useEffect(() => {
    // This effect ensures we scroll to the hash on initial load or navigation
    if (location.hash) {
      setTimeout(() => {
        scrollToHash(location.hash);
      }, 100);
    } else {
      // If there's no hash, scroll to the top of the page.
      window.scrollTo(0, 0);
    }
  }, [location]); // Re-run effect when the location (including hash) changes

  useEffect(() => {
    // Your existing code for sticky navigation and resize observers
    setStickyOffsets();

    const navbar = document.querySelector(".navbar");
    const quicknav = document.querySelector(".careers-quicknav");

    const ro1 = navbar ? new ResizeObserver(setStickyOffsets) : null;
    const ro2 = quicknav ? new ResizeObserver(setStickyOffsets) : null;
    ro1?.observe(navbar);
    ro2?.observe(quicknav);

    const onResize = () => setStickyOffsets();
    window.addEventListener("resize", onResize);

    let fixThreshold = 0;
    const spacerId = "quicknav-spacer";
    const ensureThreshold = () => {
      if (!quicknav) return;
      const rect = quicknav.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 64;
      fixThreshold = rect.top + scrollTop - navH;
    };

    const ensureSpacer = () => {
      if (!quicknav) return null;
      let spacer = document.getElementById(spacerId);
      if (!spacer) {
        spacer = document.createElement("div");
        spacer.id = spacerId;
        spacer.style.height = "0px";
        quicknav.parentNode.insertBefore(spacer, quicknav.nextSibling);
      }
      return spacer;
    };

    const spacer = ensureSpacer();
    ensureThreshold();

    const onScroll = () => {
      if (!quicknav) return;
      const shouldFix = (window.scrollY || window.pageYOffset) >= fixThreshold;
      quicknav.classList.toggle("is-fixed", shouldFix);
      if (spacer) spacer.style.height = shouldFix ? `${quicknav.offsetHeight}px` : "0px";
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const recompute = () => {
      setStickyOffsets();
      ensureThreshold();
      onScroll();
    };
    window.addEventListener("orientationchange", recompute);
    window.addEventListener("load", recompute);

    onScroll();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("orientationchange", recompute);
      window.removeEventListener("load", recompute);
      ro1?.disconnect();
      ro2?.disconnect();
    };
  }, []);

  return (
    <div className="careers-page" id="careers-top">
      {/* HERO */}
      <section className="careers-hero">
        <div className="careers-hero-inner">
          <h1 className="careers-title">
            JOIN{" "}
            <img
              src={Logo}
              alt="WebArtifacts"
              className="brand-inline on-dark"
            />
          </h1>

          <p className="careers-subtitle">
            Build reliable systems, beautiful UIs, resilient data layers, and
            world-class delivery pipelines with us.
          </p>
        </div>
      </section>

      {/* QUICK NAV */}
      <nav className="careers-quicknav" aria-label="Careers quick navigation">
        <a href="#python-dev" className="quicknav-link">Python Developer</a>
        <a href="#frontend" className="quicknav-link">Frontend Developer</a>
        <a href="#postgres-dba" className="quicknav-link">PostgreSQL DBA</a>
        <a href="#devops" className="quicknav-link">DevOps Engineer</a>
      </nav>

      {/* CONTENT */}
      <main className="careers-content">
        {/* 1) PYTHON DEVELOPER */}
        <section id="python-dev" className="role-section">
          <header className="role-header">
            <h2 className="role-title">Python Developer</h2>
            <p className="role-meta">Full-time · 3–7 years · Remote/Hybrid</p>
          </header>

          <div className="role-grid">
            <article className="role-card">
              <h3 className="card-title">Must-have Skills</h3>
              <ul className="skill-list">
                <li>Strong Core Python (OOP, data structures, typing)</li>
                <li>Web frameworks: <b>Django</b> (incl. ORM), <b>DRF</b>, <b>FastAPI</b>, Flask</li>
                <li>API design: REST fundamentals, versioning, OpenAPI/Swagger</li>
                <li>Auth & Security: sessions, JWT/OAuth2, CSRF/XSS basics</li>
                <li>Asynchronous Python: <b>asyncio</b>, <b>uvicorn</b>, <b>gunicorn</b></li>
                <li>Relational DBs: <b>PostgreSQL</b>/MySQL, indexes, transactions</li>
                <li>Caching & Queues: Redis, Celery/RQ; background jobs & scheduling</li>
                <li>Testing: <b>pytest</b>/unittest, factories/fixtures, coverage</li>
                <li>Packaging & Env: pip/poetry, virtualenv, .env, settings management</li>
                <li>Containers/CI: Docker, docker-compose, CI/CD (GitHub Actions/GitLab/Jenkins)</li>
                <li>Linux basics, Git workflows (PRs, code review)</li>
              </ul>
            </article>

            <article className="role-card">
              <h3 className="card-title">Nice-to-have</h3>
              <ul className="skill-list">
                <li>ORM deep-dive: SQLAlchemy, migrations (Alembic/Django migrations)</li>
                <li>Observability: logging (struct), metrics, tracing (OpenTelemetry)</li>
                <li>Performance: profiling, caching strategies, N+1 detection</li>
                <li>Message brokers: RabbitMQ, Kafka (producers/consumers)</li>
                <li>Cloud basics: AWS/GCP/Azure, object storage (S3), Secrets</li>
                <li>Static typing & models: <b>mypy</b>, <b>Pydantic</b></li>
                <li>GraphQL (Strawberry/Graphene), WebSockets</li>
              </ul>
            </article>

            <article className="role-card">
              <h3 className="card-title">Key Responsibilities</h3>
              <ul className="skill-list">
                <li>Design, build, and maintain backend services & APIs</li>
                <li>Ensure code quality via reviews, tests, and standards</li>
                <li>Own deployments with Docker/CI and basic infra ops</li>
                <li>Troubleshoot production issues; monitor performance</li>
                <li>Collaborate with frontend, DevOps, and product teams</li>
              </ul>
              <a href="/contact#contact-form" className="apply-btn">Apply Now</a>
            </article>
          </div>
        </section>

        {/* 2) FRONTEND DEVELOPER (React & Vue) */}
        <section id="frontend" className="role-section">
          <header className="role-header">
            <h2 className="role-title">Frontend Developer</h2>
            <p className="role-meta">Full-time · 2–6 years · Remote/Hybrid</p>
          </header>

          <div className="role-subtitle">i) React</div>
          <div className="role-grid">
            <article className="role-card">
              <h3 className="card-title">Must-have (React)</h3>
              <ul className="skill-list">
                <li>Strong JS/TS (ES6+), HTML5, CSS3 (Flex/Grid, responsive)</li>
                <li>React 18: hooks, context, refs, portals, error boundaries</li>
                <li>Routing: React Router; data fetching with fetch/Axios</li>
                <li>State mgmt: Redux Toolkit / Zustand (or equivalent)</li>
                <li>Forms & validation: React Hook Form / Formik + Yup</li>
                <li>Performance: memo, useMemo/useCallback, code-split, lazy/Suspense</li>
                <li>Testing: Jest + React Testing Library</li>
                <li>Tooling: Vite/Webpack, ESLint, Prettier, npm/yarn/pnpm</li>
                <li>A11y (WCAG), cross-browser quirks, basic security (XSS/CSRF)</li>
              </ul>
            </article>

            <article className="role-card">
              <h3 className="card-title">Nice-to-have (React)</h3>
              <ul className="skill-list">
                <li>Next.js (SSR/SSG), App Router basics</li>
                <li>UI systems: TailwindCSS, CSS-in-JS (Styled Components/Emotion)</li>
                <li>Design libs: MUI/Ant/Chakra, Storybook</li>
                <li>PWA fundamentals, i18n, analytics</li>
              </ul>
            </article>

            <article className="role-card">
              <h3 className="card-title">Key Responsibilities (React)</h3>
              <ul className="skill-list">
                <li>Build modular, accessible UI components & pages</li>
                <li>Integrate REST/GraphQL APIs, manage app state & caching</li>
                <li>Own performance: code-splitting, profiling, lighthouse budgets</li>
                <li>Maintain consistency via design systems & Storybook</li>
                <li>Write tests and participate in code reviews</li>
              </ul>
              <a href="/contact#contact-form" className="apply-btn">Apply Now</a>
            </article>
          </div>

          <div className="role-subtitle">ii) Vue.js</div>
          <div className="role-grid">
            <article className="role-card">
              <h3 className="card-title">Must-have (Vue)</h3>
              <ul className="skill-list">
                <li>Vue 3 + Composition API, reactivity fundamentals</li>
                <li>SFCs (template/script/style), props/emit, slots</li>
                <li>Routing: Vue Router; State: <b>Pinia</b> (or Vuex)</li>
                <li>Build tooling: Vite, ESLint, Prettier; TS in Vue</li>
                <li>Forms & validation, transitions/animations</li>
                <li>Testing: Vitest/Jest + Vue Testing Library</li>
                <li>API integration with Axios/fetch; error & loading states</li>
                <li>Accessibility & performance best practices</li>
              </ul>
            </article>

            <article className="role-card">
              <h3 className="card-title">Nice-to-have (Vue)</h3>
              <ul className="skill-list">
                <li>Nuxt (SSR/SSG), server routes</li>
                <li>UI libs: Vuetify, Element Plus, Naive UI</li>
                <li>i18n, PWA, micro-frontends</li>
              </ul>
            </article>

            <article className="role-card">
              <h3 className="card-title">Key Responsibilities (Vue)</h3>
              <ul className="skill-list">
                <li>Develop SFC-based features with Composition API</li>
                <li>Structure stores in Pinia and handle async data flows</li>
                <li>Create smooth transitions and high-quality UX</li>
                <li>Maintain component libraries & documentation</li>
                <li>Ensure a11y and performance budgets are met</li>
              </ul>
              <a href="/contact#contact-form" className="apply-btn">Apply Now</a>
            </article>
          </div>
        </section>

        {/* 3) POSTGRES DBA */}
        <section id="postgres-dba" className="role-section">
          <header className="role-header">
            <h2 className="role-title">PostgreSQL Database Administrator</h2>
            <p className="role-meta">Full-time · 4–10 years · Remote/Hybrid</p>
          </header>

          <div className="role-grid">
            <article className="role-card">
              <h3 className="card-title">Must-have Skills</h3>
              <ul className="skill-list">
                <li>Install/upgrade, architecture & internals basics</li>
                <li>SQL mastery; schema design & normalization</li>
                <li>Performance tuning: EXPLAIN/ANALYZE, indexes (BTREE/GIN/GiST/BRIN)</li>
                <li>Vacuum/Analyze/Autovacuum, statistics, bloat management</li>
                <li>Backups & PITR: pg_dump/pg_restore, pg_basebackup, WAL archiving</li>
                <li>Replication: streaming, logical; failover concepts (hot standby)</li>
                <li>Security: roles/privileges, pg_hba.conf, TLS, RLS</li>
                <li>Monitoring: pg_stat_statements, alerts; Grafana/Prometheus</li>
                <li>OS tuning (Linux), filesystem & resource configs</li>
                <li>Migrations: Flyway/Liquibase; downtime strategy</li>
              </ul>
            </article>

            <article className="role-card">
              <h3 className="card-title">Nice-to-have</h3>
              <ul className="skill-list">
                <li>HA stacks: Patroni/repmgr, Pacemaker/Corosync</li>
                <li>Extensions: PostGIS, pgcrypto, TimescaleDB</li>
                <li>Cloud DBs: AWS RDS/Aurora, GCP Cloud SQL</li>
                <li>DR planning, auditing & compliance</li>
              </ul>
            </article>

            <article className="role-card">
              <h3 className="card-title">Key Responsibilities</h3>
              <ul className="skill-list">
                <li>Own PostgreSQL availability, performance, and security</li>
                <li>Design schemas, review queries, and optimize indexes</li>
                <li>Implement backups, PITR, replication & failover strategies</li>
                <li>Monitor with metrics/logs; automate routine ops</li>
                <li>Plan & execute upgrades and migrations</li>
              </ul>
              <a href="/contact#contact-form" className="apply-btn">Apply Now</a>
            </article>
          </div>
        </section>

        {/* 4) DEVOPS */}
        <section id="devops" className="role-section">
          <header className="role-header">
            <h2 className="role-title">DevOps Engineer</h2>
            <p className="role-meta">Full-time · 3–8 years · Remote/Hybrid</p>
          </header>

          <div className="role-grid">
            <article className="role-card">
              <h3 className="card-title">Must-have Skills</h3>
              <ul className="skill-list">
                <li>CI/CD: GitHub Actions / GitLab CI / Jenkins (pipelines, artifacts)</li>
                <li>Containers & Orchestration: Docker, Kubernetes, Helm</li>
                <li>Infrastructure as Code: Terraform (or CloudFormation)</li>
                <li>Cloud: AWS / GCP / Azure fundamentals (IAM, VPC/VNet, LB, DNS)</li>
                <li>Config mgmt: Ansible (or Chef/Puppet)</li>
                <li>Observability: Prometheus, Grafana, ELK/OpenSearch, OpenTelemetry</li>
                <li>Networking basics: subnets, routing, NAT, TLS, ingress</li>
                <li>Security: secrets (Vault/SOPS), image scanning, policies (OPA/Kyverno)</li>
                <li>Linux admin, Bash/Python scripting, Git workflows</li>
              </ul>
            </article>

            <article className="role-card">
              <h3 className="card-title">Nice-to-have</h3>
              <ul className="skill-list">
                <li>Advanced K8s: HPA/VPA, service mesh (Istio/Linkerd)</li>
                <li>Release strats: blue/green, canary, feature flags</li>
                <li>Cost mgmt/FinOps, backups & DR automation</li>
                <li>SRE: SLI/SLO/error budgets, incident response/on-call</li>
              </ul>
            </article>

            <article className="role-card">
              <h3 className="card-title">Key Responsibilities</h3>
              <ul className="skill-list">
                <li>Design, maintain, and secure CI/CD pipelines</li>
                <li>Provision infra with IaC; manage K8s clusters and workloads</li>
                <li>Implement observability & on-call practices</li>
                <li>Automate operations, cost controls, and backup/DR</li>
                <li>Partner with eng teams on release strategies & reliability</li>
              </ul>
              <a href="/contact#contact-form" className="apply-btn">Apply Now</a>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Careers;