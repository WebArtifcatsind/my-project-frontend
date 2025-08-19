//D:\office\webartifacts\webartifacts-frontend\src\pages\ServiceDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import "./ServiceDetail.css";
import HeroParticles from "../components/HeroParticles.jsx";


const serviceContent = {
  "Managed IT Support": {
    banner: "https://source.unsplash.com/1600x900/?it,network",
    description: "We manage your IT infrastructure with 24/7 support, monitoring, and maintenance.",
    benefits: [
      "24/7 Monitoring",
      "Remote Desktop Help",
      "Asset Lifecycle Tracking",
      "Patch Management",
      "Proactive Troubleshooting",
    ],
    benefitImages: [
      "https://wallpaperaccess.com/full/266471.jpg",
      "https://st2.depositphotos.com/3223379/5387/i/450/depositphotos_53875805-stock-photo-information-technology-background.jpg",
      "https://media.istockphoto.com/id/1383963898/photo/technology-icons-transfer-data-through-programming-codes.jpg?b=1&s=170667a&w=0&k=20&c=XGN9MqaC8YZ4vvH9b4MF-FBmgiDUyA1mr1fS4u1TKpQ=",
      "https://static.vecteezy.com/system/resources/thumbnails/037/387/023/small_2x/ai-generated-close-up-of-patch-panel-with-colored-cords-in-server-room-technology-concept-photo.jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/049/222/504/small_2x/wires-and-cables-in-an-industrial-power-supply-enclosure-photo.jpg"
    ],
    tools: ["TeamViewer", "AnyDesk", "SCCM", "ManageEngine"],
    whyChooseUs: "Our expert technicians minimize downtime and optimize systems proactively."
  },
  "Cloud Deployment & Backup": {
    banner: "https://media.istockphoto.com/id/1383963898/photo/technology-icons-transfer-data-through-programming-codes.jpg?b=1&s=170667a&w=0&k=20&c=XGN9MqaC8YZ4vvH9b4MF-FBmgiDUyA1mr1fS4u1TKpQ=",
    description: "Deploy, manage, and back up your cloud data with industry-grade tools and policies.",
    benefits: [
      "Multi-Cloud Deployment",
      "Data Migration",
      "Automated Backups",
      "Disaster Recovery Setup",
      "Secure Cloud Storage"
    ],
    benefitImages: [
      "https://source.unsplash.com/600x400/?cloud,deployment",
      "https://source.unsplash.com/600x600/?data,migration",
      "https://tse2.mm.bing.net/th/id/OIP.F6pB_MEV7_mqlDjWxO0QBgHaEJ?pid=Api&P=0&h=180",
      "https://source.unsplash.com/600x400/?disaster,recovery",
      "https://source.unsplash.com/600x400/?secure,storage"
    ],
    tools: ["AWS", "Azure", "Google Cloud", "Cloudflare", "Veeam"],
    whyChooseUs: "Seamless migrations and bulletproof data protection — that's our guarantee."
  },
  "Custom Software Development": {
    banner: "https://source.unsplash.com/1200x400/?software-development",
    description: "We build tailored software systems that match your workflow and scale with your needs.",
    benefits: ["Web & Mobile Apps", "Agile Sprints", "Custom APIs", "Secure Code Review", "UI/UX Design"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?web,apps",
      "https://source.unsplash.com/600x600/?agile,development",
      "https://source.unsplash.com/800x400/?api,integration",
      "https://source.unsplash.com/600x400/?code,security",
      "https://source.unsplash.com/600x400/?ui,design"
    ],
    tools: ["React", "Node.js", "MongoDB", "MySQL", "Docker"],
    whyChooseUs: "From ideation to launch, we build with your business goals in mind."
  },
  "Cybersecurity Consulting": {
    banner: "https://source.unsplash.com/1200x400/?cybersecurity",
    description: "Defend your systems with expert audits, firewalls, pen testing, and awareness training.",
    benefits: ["Firewall Setup", "Threat Detection", "Data Loss Prevention", "Security Policies", "Audit Reports"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?firewall,security",
      "https://source.unsplash.com/600x600/?threat,detection",
      "https://source.unsplash.com/800x400/?data,protection",
      "https://source.unsplash.com/600x400/?security,policy",
      "https://source.unsplash.com/600x400/?audit,report"
    ],
    tools: ["Wireshark", "Nessus", "Metasploit", "Kali Linux"],
    whyChooseUs: "We're certified to keep your infrastructure and data safe from modern threats."
  },
  "Website & App Development": {
    banner: "https://source.unsplash.com/1200x400/?website,app",
    description: "Visually stunning and functionally powerful websites and mobile apps.",
    benefits: ["Responsive UI", "SEO Ready", "Mobile Compatibility", "Performance Optimized", "Custom Integrations"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?responsive,design",
      "https://source.unsplash.com/600x600/?seo,optimization",
      "https://source.unsplash.com/800x400/?mobile,app",
      "https://source.unsplash.com/600x400/?performance,speed",
      "https://source.unsplash.com/600x400/?custom,integration"
    ],
    tools: ["React", "Next.js", "Flutter", "TailwindCSS", "Figma"],
    whyChooseUs: "Design, performance, and conversion-focused development under one roof."
  },
  "ERP & Document Management": {
    banner: "https://source.unsplash.com/1200x400/?erp,documents",
    description: "Automate business processes with ERP tools and secure digital document flows.",
    benefits: ["Access Control", "Digital Archiving", "Finance Modules", "Employee Management", "Analytics Dashboards"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?access,control",
      "https://source.unsplash.com/600x600/?digital,archive",
      "https://source.unsplash.com/800x400/?finance,erp",
      "https://source.unsplash.com/600x400/?employee,management",
      "https://source.unsplash.com/600x400/?analytics,dashboard"
    ],
    tools: ["Odoo", "ERPNext", "MySQL", "Node.js"],
    whyChooseUs: "We create ERP solutions that bring all your data together securely."
  },
  "Help Desk Support": {
    banner: "https://source.unsplash.com/1200x400/?helpdesk,support",
    description: "24/7 support center to solve IT issues, queries, and requests quickly and efficiently.",
    benefits: ["Ticketing System", "First Response SLA", "Knowledge Base", "Multi-Channel Support"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?ticketing,system",
      "https://source.unsplash.com/600x600/?support,response",
      "https://source.unsplash.com/800x400/?knowledge,base",
      "https://source.unsplash.com/600x400/?multi,channel",
      "https://source.unsplash.com/600x400/?helpdesk,team"
    ],
    tools: ["Freshdesk", "Zoho Desk", "Jira Service Desk"],
    whyChooseUs: "Quick response, human approach — that's our help desk."
  },
  "Backup & Disaster Recovery": {
    banner: "https://source.unsplash.com/1200x400/?disaster,backup",
    description: "Protect your business from data loss through automated backups and disaster plans.",
    benefitImages: [
      "https://source.unsplash.com/600x400/?automated,backup",
      "https://source.unsplash.com/600x600/?data,recovery",
      "https://source.unsplash.com/800x400/?disaster,recovery",
      "https://source.unsplash.com/600x400/?offsite,storage",
      "https://source.unsplash.com/600x400/?backup,drill"
    ],
    benefits: ["Regular Backups", "Instant Recovery", "Offsite Storage", "DR Drills"],
    tools: ["Veeam", "Acronis", "Backblaze"],
    whyChooseUs: "Stay protected, even when the unexpected strikes."
  },
  "Network & Server Management": {
    banner: "https://source.unsplash.com/1200x400/?network,server",
    description: "Setup, monitor, and manage secure server environments and networks.",
    benefits: ["Firewall Config", "Server Hardening", "Patch Updates", "Performance Tuning"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?firewall,network",
      "https://source.unsplash.com/600x600/?server,security",
      "https://source.unsplash.com/800x400/?patch,update",
      "https://source.unsplash.com/600x400/?performance,tuning",
      "https://source.unsplash.com/600x400/?network,monitoring"
    ],
    tools: ["Nagios", "Zabbix", "Wireshark", "Ubiquiti"],
    whyChooseUs: "Reliable networks = reliable business."
  },
  "IT Consulting / Virtual CIO": {
    banner: "https://source.unsplash.com/1200x400/?consulting,technology",
    description: "We help you align technology to your business vision, growth and compliance needs.",
    benefits: ["Budget Planning", "Tech Roadmaps", "Compliance Advice", "Tech Vendor Selection"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?budget,planning",
      "https://source.unsplash.com/600x600/?technology,roadmap",
      "https://source.unsplash.com/800x400/?compliance,regulation",
      "https://source.unsplash.com/600x400/?vendor,selection",
      "https://source.unsplash.com/600x400/?it,consulting"
    ],
    tools: ["MS Office", "Asana", "Trello"],
    whyChooseUs: "You get a strategic tech partner, not just advice."
  },
  "VoIP / Unified Communication": {
    banner: "https://source.unsplash.com/1200x400/?voip,communication",
    description: "Advanced VoIP solutions with video conferencing, chat, call routing, and CRM linking.",
    benefits: ["Hosted PBX", "Voicemail to Email", "Video Chat", "Team Messaging"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?voip,pbx",
      "https://source.unsplash.com/600x600/?voicemail,email",
      "https://source.unsplash.com/800x400/?video,conference",
      "https://source.unsplash.com/600x400/?team,messaging",
      "https://source.unsplash.com/600x400/?unified,communication"
    ],
    tools: ["Zoom", "RingCentral", "3CX", "Microsoft Teams"],
    whyChooseUs: "Communicate clearly. Anywhere. Anytime."
  },
  "Data Analytics & Dashboards": {
    banner: "https://source.unsplash.com/1200x400/?data,analytics",
    description: "Turn your raw data into smart dashboards for decision-making.",
    benefits: ["Custom Reports", "Real-Time Dashboards", "Data Cleaning", "Integration with CRMs"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?data,reports",
      "https://source.unsplash.com/600x600/?dashboard,analytics",
      "https://source.unsplash.com/800x400/?data,cleaning",
      "https://source.unsplash.com/600x400/?crm,integration",
      "https://source.unsplash.com/600x400/?business,intelligence"
    ],
    tools: ["Power BI", "Tableau", "Google Data Studio"],
    whyChooseUs: "Make decisions backed by numbers — not guesswork."
  },
  "Remote Work Enablement": {
    banner: "https://source.unsplash.com/1200x400/?remote,work",
    description: "Make your remote workforce productive and secure from anywhere.",
    benefits: ["VPN Setup", "Cloud Apps", "Device Management", "Remote Access"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?vpn,security",
      "https://source.unsplash.com/600x600/?cloud,apps",
      "https://source.unsplash.com/800x400/?device,management",
      "https://source.unsplash.com/600x400/?remote,access",
      "https://source.unsplash.com/600x400/?work,from,home"
    ],
    tools: ["Zoom", "Slack", "Google Workspace", "Microsoft 365"],
    whyChooseUs: "We ensure work never stops — no matter where you are."
  },
  "DevOps & CI/CD Pipelines": {
    banner: "https://source.unsplash.com/1200x400/?devops,cicd",
    description: "Faster builds, safer releases with modern DevOps and automated CI/CD pipelines.",
    benefits: ["Code Pipelines", "Docker & Kubernetes", "GitOps", "Monitoring Dashboards"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?code,pipeline",
      "https://source.unsplash.com/600x600/?docker,kubernetes",
      "https://source.unsplash.com/800x400/?gitops,automation",
      "https://source.unsplash.com/600x400/?monitoring,dashboard",
      "https://source.unsplash.com/600x400/?devops,workflow"
    ],
    tools: ["Jenkins", "GitHub Actions", "GitLab CI", "Docker", "K8s"],
    whyChooseUs: "Deliver faster, more reliably, and with fewer bugs."
  },
  "AI & Automation Solutions": {
    banner: "https://source.unsplash.com/1200x400/?ai,automation",
    description: "Integrate AI for smarter workflows, automation, and better customer experiences.",
    benefits: ["Chatbots", "RPA", "Predictive Analytics", "AI Assistants"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?chatbot,ai",
      "https://source.unsplash.com/600x600/?rpa,automation",
      "https://source.unsplash.com/800x400/?predictive,analytics",
      "https://source.unsplash.com/600x400/?ai,assistant",
      "https://source.unsplash.com/600x400/?smart,workflow"
    ],
    tools: ["TensorFlow", "OpenAI", "Zapier", "UiPath"],
    whyChooseUs: "Future-ready your business with smart automation."
  },
  "Hardware Procurement & Setup": {
    banner: "https://source.unsplash.com/1200x400/?hardware,setup",
    description: "We procure, configure, and deploy workstations, laptops, routers and servers.",
    benefits: ["Vendor Negotiation", "Bulk Licensing", "Asset Inventory", "Warranty Handling"],
    benefitImages: [
      "https://source.unsplash.com/600x400/?vendor,negotiation",
      "https://source.unsplash.com/600x600/?bulk,licensing",
      "https://source.unsplash.com/800x400/?asset,inventory",
      "https://source.unsplash.com/600x400/?warranty,service",
      "https://source.unsplash.com/600x400/?hardware,setup"
    ],
    tools: ["Dell", "HP", "Cisco", "Lenovo"],
    whyChooseUs: "One-stop hardware setup with support and maintenance included."
  }
};


const ServiceDetail = () => {
  const { serviceName } = useParams();
  const title = decodeURIComponent(serviceName);
  const service = serviceContent[title];

  if (!service) {
    return (
      <div className="service-not-found">
        <h2 className="not-found-title">Service Not Found</h2>
        <p className="not-found-message">
          Please check the URL or go back to the homepage.
        </p>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      {/* Hero Section with Animated Background */}
      <section className="service-hero" aria-labelledby="service-title">
        <div className="particles-container">
          <HeroParticles />
        </div>
        <div className="hero-content-split">
          <div className="hero-left">
            <h1 id="service-title" className="service-title">{title}</h1>
          </div>
          <div className="hero-right">
            <p className="service-description">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section" aria-labelledby="benefits-title">
        <h2 id="benefits-title" className="section-title">Key Benefits</h2>
        <div className="mosaic-grid">
          {service.benefitImages.slice(0, 5).map((image, index) => (
            <div key={index} className={`mosaic-item mosaic-item-${index + 1}`}>
              <img 
                src={image} 
                alt={`Illustration for ${service.benefits[index]}`}
                loading="lazy"
                width="600"
                height="400"
              />
              <div className="benefit-text">
                {service.benefits[index]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section className="tools-section" aria-labelledby="tools-title">
        <h2 id="tools-title" className="section-title">Tools & Technologies</h2>
        <div className="tools-container">
          {service.tools.map((tool, index) => (
            <div key={index} className="tool-card" tabIndex="0">
              {tool}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section" aria-labelledby="why-choose-title">
        <h2 id="why-choose-title" className="section-title">Why Choose Us?</h2>
        <p className="why-choose-content">{service.whyChooseUs}</p>
      </section>
    </div>
  );
};

export default ServiceDetail;





{/* <section className="hero-section">
        <div className="hero-banner">
          <img 
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80" 
            alt="IT Services" 
            className="hero-image"
          />
          <div className="hero-overlay">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="hero-content"
            >
              <h1> WebArtifacts</h1>
              <p>We deliver secure, scalable, and smart IT solutions tailored to your business.</p>
            </motion.div>
          </div>
        </div>
      </section> */}





      // import React from "react";
      // import Particles from "react-tsparticles";
      // import { loadFull } from "tsparticles";
      
      // const HeroParticles = () => {
      //   const particlesInit = async (main) => {
      //     console.log("Particles init started"); // Debug log
      //     try {
      //       await loadFull(main);
      //       console.log("Particles loaded successfully"); // Debug log
      //     } catch (error) {
      //       console.error("Particles loading error:", error); // Debug log
      //     }
      //   };
      
      //   return (
      //     <Particles
      //       id="tsparticles"
      //       init={particlesInit}
      //       options={{
      //         fullScreen: { enable: false, zIndex: -1 }, // Important change
      //         background: {
      //           color: "#000000",
      //         },
      //         particles: {
      //           number: {
      //             value: 500,
      //             density: {
      //               enable: true,
      //               value_area: 3000,
      //             },
      //           },
      //           color: {
      //             value: "#0239ffff",
      //           },
      //           shape: {
      //             type: "circle",
      //           },
      //           opacity: {
      //             value: 0.5,
      //             random: true,
      //           },
      //           size: {
      //             value: 3,
      //             random: true,
      //           },
      //           links: {
      //             enable: true,
      //             distance: 150,
      //             color:  "#00eaffff",
      //             opacity: 0.4,
      //             width: 1,
      //           },
      //           move: {
      //             enable: true,
      //             speed: 2,
      //             direction: "none",
      //             random: true,
      //             straight: false,
      //             out_mode: "bounce",
      //             bounce: true,
      //           },
      //         },
      //         interactivity: {
      //           detect_on: "window",
      //           events: {
      //             onhover: {
      //               enable: true,
      //               mode: "repulse",
      //             },
      //             resize: true,
      //           },
      //           modes: {
      //             repulse: {
      //               distance: 100,
      //               duration: 0.4,
      //             },
      //           },
      //         },
      //         detectRetina: true,
      //       }}
      //       style={{
      //         position: "absolute",
      //         top: 0,
      //         left: 0,
      //         width: "100%",
      //         height: "100%",
      //       }}
      //     />
      //   );
      // };
      
      // export default HeroParticles;




// background: linear-gradient(to right, var(--primary), var(--secondary));









{/* <section className="section tailored-section">
          <div className="section-container">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              Tailored IT Solutions Designed for <span className="text-gradient">Growth</span>
            </motion.h2>
            
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              At WebArtifacts, we don't just provide IT services — we deliver <span className="highlight">transformation</span>.
            </motion.p>
            
            <div className="features-grid">
              {[
                { 
                  icon: "🔒", 
                  title: "Security First", 
                  desc: "Your data is always safe with enterprise-grade protection.",
                  bg: "rgba(0, 60, 255, 1)"
                },
                { 
                  icon: "⚙️", 
                  title: "Scalable Solutions", 
                  desc: "Infrastructure that grows seamlessly with your business.",
                  bg: "rgba(0, 60, 255, 1)"
                },
                { 
                  icon: "🚀", 
                  title: "Business Focused", 
                  desc: "Technology aligned with your strategic objectives.",
                  bg: "rgba(0, 60, 255, 1)"
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -10 }}
                  className="feature-card"
                  style={{ background: item.bg }}
                >
                  <div className="feature-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="feature-hover-effect"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}











AIzaSyDYjzOM6nDz1BO03MUmg0kVlqzt2hYjG5k        








