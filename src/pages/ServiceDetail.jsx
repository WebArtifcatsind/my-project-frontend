// D:\office\webartifacts\webartifacts-frontend\src\pages\ServiceDetail.jsx
import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ServiceDetail.css";
import { InteractiveParticles } from "../components/interactive";
import { Canvas } from "@react-three/fiber";
import { useSwipeable } from "react-swipeable";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

//why choose us images
import whychoose from "../serviceimages/whychoose.png";

// Managed IT Support
import Monitoring from "../serviceimages/Monitoring.png";
import RemoteDesktopHelp from "../serviceimages/RemoteDesktopHelp.png";
import AssetLifecycleTracking from "../serviceimages/AssetLifecycleTracking.png";
import PatchManagement from "../serviceimages/PatchManagement.png";
import ProactiveTroubleshooting from "../serviceimages/ProactiveTroubleshooting.png";
import NetworkSecurity from "../serviceimages/Network Security.png";
import CloudIntegration from "../serviceimages/CloudIntegration.png";
import HelpDeskSupport from "../serviceimages/HelpDeskSupport.png";

// Cloud Deployment & Backup
import multiCloudDeployment from "../serviceimages/multi-cloud-deployment.png";
import dataMigration from "../serviceimages/data-migration.png";
import automatedBackups from "../serviceimages/automated-backups.png";
import disasterRecoverySetup from "../serviceimages/disaster-recovery-setup.png";
import secureCloudStorage from "../serviceimages/secure-cloud-storage.png";
import costOptimization from "../serviceimages/cost-optimization.png";
import complianceManagement from "../serviceimages/compliance-management.png";
import performanceMonitoring from "../serviceimages/performance-monitoring.png";

// Custom Software Development
import webMobileApps from "../serviceimages/web-mobile-apps.jpg";
import agileSprints from "../serviceimages/agile-sprints.png";
import customApis from "../serviceimages/custom-apis.jpg";
import secureCodeReview from "../serviceimages/secure-code-review.jpg";
import uiUxDesign from "../serviceimages/ui-ux-design.jpg";
import qualityAssurance from "../serviceimages/quality-assurance.jpg";
import devopsIntegration from "../serviceimages/devops-integration.jpg";
import maintenanceSupport from "../serviceimages/maintenance-support.jpg";

// Cybersecurity Consulting
import firewallSetup from "../serviceimages/firewall-setup.png";
import threatDetection from "../serviceimages/threat-detection.png";
import dataLossPrevention from "../serviceimages/data-loss-prevention.png";
import securityPolicies from "../serviceimages/security-policies.png";
import auditReports from "../serviceimages/audit-reports.png";
import vulnerabilityAssessment from "../serviceimages/vulnerability-assessment.png";
import incidentResponse from "../serviceimages/incident-response.png";
import securityTraining from "../serviceimages/security-training.png";

// Website & App Development
import responsiveUi from "../serviceimages/responsive-ui.png";
import seoReady from "../serviceimages/seo-ready.png";
import mobileCompatibility from "../serviceimages/mobile-compatibility.png";
import performanceOptimized from "../serviceimages/performance-optimized.png";
import customIntegrations from "../serviceimages/custom-integrations.png";
import ecommerceSolutions from "../serviceimages/e-commerce-solutions.jpg";
import contentManagement from "../serviceimages/content-management.png";
import pwa from "../serviceimages/pwa.png";

// ERP & Document Management
import accessControl from "../serviceimages/access-control.png";
import digitalArchiving from "../serviceimages/digital-archiving.png";
import financeModules from "../serviceimages/finance-modules.png";
import employeeManagement from "../serviceimages/employee-management.png";
import analyticsDashboards from "../serviceimages/analytics-dashboards.png";
import workflowAutomation from "../serviceimages/workflow-automation.png";
import supplyChainIntegration from "../serviceimages/supply-chain-integration.png";
import mobileAccessibility from "../serviceimages/mobile-accessibility.png";

// Help Desk Support
import ticketingSystem from "../serviceimages/ticketing-system.png";
import firstResponseSla from "../serviceimages/first-response-sla.jpg";
import knowledgeBase from "../serviceimages/knowledge-base.png";
import multiChannelSupport from "../serviceimages/multi-channel-support.png";
import remoteTroubleshooting from "../serviceimages/remote-troubleshooting.png";
import helpDeskAssetManagement from "../serviceimages/help-desk-asset-management.png";
import userTraining from "../serviceimages/user-training.png";
import serviceAnalytics from "../serviceimages/service-analytics.png";

// Backup & Disaster Recovery
import regularBackups from "../serviceimages/regular-backups.png";
import instantRecovery from "../serviceimages/instant-recovery.png";
import offsiteStorage from "../serviceimages/offsite-storage.png";
import drDrills from "../serviceimages/dr-drills.png";
import ransomwareProtection from "../serviceimages/ransomware-protection.png";
import complianceReady from "../serviceimages/compliance-ready.png";
import cloudBackup from "../serviceimages/cloud-backup.png";
import testingServices from "../serviceimages/testing-services.png";

// // Network & Server Management
import firewallConfig from "../serviceimages/firewall-config.jpg";
import serverHardening from "../serviceimages/server-hardening.jpg";
import patchUpdates from "../serviceimages/patch-updates.jpg";
import performanceTuning from "../serviceimages/performance-tuning.jpg";
import capacityPlanning from "../serviceimages/capacity-planning.jpg";
import networkMonitoring from "../serviceimages/network-monitoring.jpg";
import virtualization from "../serviceimages/virtualization.jpg";
import cloudIntegrationNetwork from "../serviceimages/cloud-integration-network.jpg";

// // IT Consulting / Virtual CIO
import budgetPlanning from "../serviceimages/budget-planning.png";
import techRoadmaps from "../serviceimages/tech-roadmaps.png";
import complianceAdvice from "../serviceimages/compliance-advice.png";
import vendorSelection from "../serviceimages/vendor-selection.png";
import digitalTransformation from "../serviceimages/digital-transformation.png";
import itGovernance from "../serviceimages/it-governance.jpg";
import riskAssessment from "../serviceimages/risk-assessment.png";
import teamTraining from "../serviceimages/team-training.png";

// VoIP / Unified Communication
import hostedPabx from "../serviceimages/hosted-pbx.png";
import voicemailToEmail from "../serviceimages/voicemail-to-email.png";
import videoChat from "../serviceimages/video-chat.png";
import teamMessaging from "../serviceimages/team-messaging.png";
import callAnalytics from "../serviceimages/call-analytics.png";
import crmIntegration from "../serviceimages/crm-integration.png";
import mobileApps from "../serviceimages/mobile-apps.png";
import callCenterFeatures from "../serviceimages/call-center-features.png";

// Data Analytics & Dashboards
import customReports from "../serviceimages/custom-reports.png";
import realTimeDashboards from "../serviceimages/real-time-dashboards.png";
import dataCleaning from "../serviceimages/data-cleaning.png";
import integrationWithCrms from "../serviceimages/integration-with-crms.png";
import predictiveAnalytics from "../serviceimages/predictive-analytics.png";
import dataWarehousing from "../serviceimages/data-warehousing.png";
import aiInsights from "../serviceimages/ai-insights.png";
import automatedAlerts from "../serviceimages/automated-alerts.png";

// Remote Work Enablement
import vpnSetup from "../serviceimages/vpn-setup.png";
import cloudApps from "../serviceimages/cloud-apps.png";
import deviceManagement from "../serviceimages/device-management.png";
import remoteAccess from "../serviceimages/remote-access.png";
import collaborationTools from "../serviceimages/collaboration-tools.png";
import securityTrainingRemote from "../serviceimages/security-training-remote.png";
import homeOfficeSetup from "../serviceimages/home-office-setup.png";
import productivityMonitoring from "../serviceimages/productivity-monitoring.png";

// DevOps & CI/CD Pipelines
import codePipelines from "../serviceimages/code-pipelines.png";
import dockerKubernetes from "../serviceimages/docker-kubernetes.png";
import gitops from "../serviceimages/gitops.png";
import monitoringDashboards from "../serviceimages/monitoring-dashboards.png";
import infrastructureAsCode from "../serviceimages/infrastructure-as-code.png";
import securityScanning from "../serviceimages/security-scanning.png";
import performanceTesting from "../serviceimages/performance-testing.png";
import incidentManagementDevops from "../serviceimages/incident-management-devops.png";

// AI & Automation Solutions
import chatbots from "../serviceimages/chatbots.png";
import rpa from "../serviceimages/rpa.png";
import predictiveAnalyticsAi from "../serviceimages/predictive-analytics-ai.png";
import aiAssistants from "../serviceimages/ai-assistants.png";
import computerVision from "../serviceimages/computer-vision.png";
import documentProcessing from "../serviceimages/document-processing.png";
import sentimentAnalysis from "../serviceimages/sentiment-analysis.png";
import processMining from "../serviceimages/process-mining.png";

// Hardware Procurement & Setup
import vendorNegotiation from "../serviceimages/vendor-negotiation.png";
import bulkLicensing from "../serviceimages/bulk-licensing.png";
import assetInventory from "../serviceimages/asset-inventory.png";
import warrantyHandling from "../serviceimages/warranty-handling.png";
import deviceConfiguration from "../serviceimages/device-configuration.jpg";
import deploymentServices from "../serviceimages/deployment-services.png";
import leaseOptions from "../serviceimages/lease-options.png";
import recyclingPrograms from "../serviceimages/recycling-programs.png";

const images = {
  // Why Choose Us
  whychoose: whychoose,

  // Managed IT Support
  Monitoring: Monitoring,
  RemoteDesktopHelp: RemoteDesktopHelp,
  AssetLifecycleTracking: AssetLifecycleTracking,
  PatchManagement: PatchManagement,
  ProactiveTroubleshooting: ProactiveTroubleshooting,
  NetworkSecurity: NetworkSecurity,
  CloudIntegration: CloudIntegration,
  HelpDeskSupport: HelpDeskSupport,

  // Cloud Deployment & Backup
  "multi-cloud-deployment": multiCloudDeployment,
  "data-migration": dataMigration,
  "automated-backups": automatedBackups,
  "disaster-recovery-setup": disasterRecoverySetup,
  "secure-cloud-storage": secureCloudStorage,
  "cost-optimization": costOptimization,
  "compliance-management": complianceManagement,
  "performance-monitoring": performanceMonitoring,

  // Custom Software Development
  "web-mobile-apps": webMobileApps,
  "agile-sprints": agileSprints,
  "custom-apis": customApis,
  "secure-code-review": secureCodeReview,
  "ui-ux-design": uiUxDesign,
  "quality-assurance": qualityAssurance,
  "devops-integration": devopsIntegration,
  "maintenance-support": maintenanceSupport,

  // Cybersecurity Consulting
  "firewall-setup": firewallSetup,
  "threat-detection": threatDetection,
  "data-loss-prevention": dataLossPrevention,
  "security-policies": securityPolicies,
  "audit-reports": auditReports,
  "vulnerability-assessment": vulnerabilityAssessment,
  "incident-response": incidentResponse,
  "security-training": securityTraining,

  // Website & App Development
  "responsive-ui": responsiveUi,
  "seo-ready": seoReady,
  "mobile-compatibility": mobileCompatibility,
  "performance-optimized": performanceOptimized,
  "custom-integrations": customIntegrations,
  "e-commerce-solutions": ecommerceSolutions,
  "content-management": contentManagement,
  pwa: pwa,

  // ERP & Document Management
  "access-control": accessControl,
  "digital-archiving": digitalArchiving,
  "finance-modules": financeModules,
  "employee-management": employeeManagement,
  "analytics-dashboards": analyticsDashboards,
  "workflow-automation": workflowAutomation,
  "supply-chain-integration": supplyChainIntegration,
  "mobile-accessibility": mobileAccessibility,

  // Help Desk Support
  "ticketing-system": ticketingSystem,
  "first-response-sla": firstResponseSla,
  "knowledge-base": knowledgeBase,
  "multi-channel-support": multiChannelSupport,
  "remote-troubleshooting": remoteTroubleshooting,
  "help-desk-asset-management": helpDeskAssetManagement,
  "user-training": userTraining,
  "service-analytics": serviceAnalytics,

  // Backup & Disaster Recovery
  "regular-backups": regularBackups,
  "instant-recovery": instantRecovery,
  "offsite-storage": offsiteStorage,
  "dr-drills": drDrills,
  "ransomware-protection": ransomwareProtection,
  "compliance-ready": complianceReady,
  "cloud-backup": cloudBackup,
  "testing-services": testingServices,

  // Network & Server Management
  "firewall-config": firewallConfig,
  "server-hardening": serverHardening,
  "patch-updates": patchUpdates,
  "performance-tuning": performanceTuning,
  "capacity-planning": capacityPlanning,
  "network-monitoring": networkMonitoring,
  virtualization: virtualization,
  "cloud-integration-network": cloudIntegrationNetwork,

  // IT Consulting / Virtual CIO
  "budget-planning": budgetPlanning,
  "tech-roadmaps": techRoadmaps,
  "compliance-advice": complianceAdvice,
  "vendor-selection": vendorSelection,
  "digital-transformation": digitalTransformation,
  "it-governance": itGovernance,
  "risk-assessment": riskAssessment,
  "team-training": teamTraining,

  // VoIP / Unified Communication
  "hosted-pbx": hostedPabx,
  "voicemail-to-email": voicemailToEmail,
  "video-chat": videoChat,
  "team-messaging": teamMessaging,
  "call-analytics": callAnalytics,
  "crm-integration": crmIntegration,
  "mobile-apps": mobileApps,
  "call-center-features": callCenterFeatures,

  // Data Analytics & Dashboards
  "custom-reports": customReports,
  "real-time-dashboards": realTimeDashboards,
  "data-cleaning": dataCleaning,
  "integration-with-crms": integrationWithCrms,
  "predictive-analytics": predictiveAnalytics,
  "data-warehousing": dataWarehousing,
  "ai-insights": aiInsights,
  "automated-alerts": automatedAlerts,

  // Remote Work Enablement
  "vpn-setup": vpnSetup,
  "cloud-apps": cloudApps,
  "device-management": deviceManagement,
  "remote-access": remoteAccess,
  "collaboration-tools": collaborationTools,
  "security-training-remote": securityTrainingRemote,
  "home-office-setup": homeOfficeSetup,
  "productivity-monitoring": productivityMonitoring,

  // DevOps & CI/CD Pipelines
  "code-pipelines": codePipelines,
  "docker-kubernetes": dockerKubernetes,
  gitops: gitops,
  "monitoring-dashboards": monitoringDashboards,
  "infrastructure-as-code": infrastructureAsCode,
  "security-scanning": securityScanning,
  "performance-testing": performanceTesting,
  "incident-management-devops": incidentManagementDevops,

  // AI & Automation Solutions
  chatbots: chatbots,
  rpa: rpa,
  "predictive-analytics-ai": predictiveAnalyticsAi,
  "ai-assistants": aiAssistants,
  "computer-vision": computerVision,
  "document-processing": documentProcessing,
  "sentiment-analysis": sentimentAnalysis,
  "process-mining": processMining,

  // Hardware Procurement & Setup
  "vendor-negotiation": vendorNegotiation,
  "bulk-licensing": bulkLicensing,
  "asset-inventory": assetInventory,
  "warranty-handling": warrantyHandling,
  "device-configuration": deviceConfiguration,
  "deployment-services": deploymentServices,
  "lease-options": leaseOptions,
  "recycling-programs": recyclingPrograms,
};

const serviceContent = {
  "MANAGED IT SUPPORT": {
    description:
      "We manage your IT infrastructure with 24/7 support, monitoring, and maintenance.",
    benefits: [
      "24/7 Monitoring",
      "Remote Desktop Help",
      "Asset Lifecycle Tracking",
      "Patch Management",
      "Proactive Troubleshooting",
      "Network Security",
      "Cloud Integration",
      "Help Desk Support",
    ],
    benefitDescriptions: [
      "Continuous monitoring of your systems with real-time alerts to prevent downtime before it impacts your business operations.",
      "Immediate remote assistance from certified technicians to resolve issues without waiting for on-site visits.",
      "Complete inventory management from procurement to retirement, ensuring optimal utilization of your IT assets.",
      "Automated deployment of security patches and software updates to keep your systems protected and performing at their best.",
      "Advanced diagnostics that identify and resolve potential issues before they can affect your productivity.",
      "Enterprise-grade security solutions including firewalls, intrusion detection, and vulnerability scanning.",
      "Seamless integration with leading cloud platforms for hybrid infrastructure management.",
      "Dedicated support team available around the clock to resolve technical issues promptly.",
    ],
    benefitImages: [
      "Monitoring",
      "RemoteDesktopHelp",
      "AssetLifecycleTracking",
      "PatchManagement",
      "ProactiveTroubleshooting",
      "NetworkSecurity",
      "CloudIntegration",
      "HelpDeskSupport",
    ],

    tools: ["TeamViewer", "AnyDesk", "SCCM", "ManageEngine", "Pulseway", "NinjaRMM"],
    whyChooseUs:
      "Our expert technicians minimize downtime and optimize systems proactively.",
    banner: "whychoose",
  },
  "CLOUD DEPLOYMENT & BACKUP": {
    description:
      "Deploy, manage, and back up your cloud data with industry-grade tools and policies.",
    benefits: [
      "Multi-Cloud Deployment",
      "Data Migration",
      "Automated Backups",
      "Disaster Recovery Setup",
      "Secure Cloud Storage",
      "Cost Optimization",
      "Compliance Management",
      "Performance Monitoring",
    ],
    benefitDescriptions: [
      "Seamless deployment across AWS, Azure, and Google Cloud with optimized configurations for each platform.",
      "Zero-downtime migration of your critical data and applications to the cloud with complete integrity checks.",
      "Scheduled and incremental backups with encryption to ensure your data is always protected and recoverable.",
      "Comprehensive disaster recovery plans with failover systems to maintain business continuity during outages.",
      "Enterprise-grade encryption and access controls to protect your sensitive data in the cloud.",
      "Continuous analysis and optimization of cloud resources to reduce costs without compromising performance.",
      "Ensure compliance with industry regulations and data protection standards across all cloud environments.",
      "Real-time monitoring and analytics to track performance and resource utilization.",
    ],
    benefitImages: [
      "multi-cloud-deployment",
      "data-migration",
      "automated-backups",
      "disaster-recovery-setup",
      "secure-cloud-storage",
      "cost-optimization",
      "compliance-management",
      "performance-monitoring",
    ],
    tools: ["AWS", "Azure", "Google Cloud", "Cloudflare", "Veeam", "Druva", "Terraform"],
    whyChooseUs:
      "Seamless migrations and bulletproof data protection — that's our guarantee.",
    banner: "whychoose",
  },
  "CUSTOM SOFTWARE DEVELOPMENT": {
    description:
      "We build tailored software systems that match your workflow and scale with your needs.",
    benefits: [
      "Web & Mobile Apps",
      "Agile Sprints",
      "Custom APIs",
      "Secure Code Review",
      "UI/UX Design",
      "Quality Assurance",
      "DevOps Integration",
      "Maintenance & Support",
    ],

    benefitDescriptions: [
      "We create tailor-made applications that function on both web browsers and mobile devices. These apps are designed to meet your specific business requirements and provide a seamless user experience across different platforms.",
      "We use an iterative development process where a project is broken down into small, manageable cycles called sprints . This allows for faster delivery, continuous feedback, and the flexibility to adapt to changing requirements.",
      "We build Application Programming Interfaces (APIs) from scratch. These APIs allow your different software systems to communicate and share data securely, creating a more integrated and efficient ecosystem.",
      "Our team performs a thorough inspection of the code to identify and fix any potential security vulnerabilities, bugs, or quality issues. This ensures the software is robust, reliable, and protected against threats.",
      "We focus on creating an intuitive user interface (UI) and a positive user experience (UX). Our designs make the software easy and enjoyable to use, which helps increase user adoption and satisfaction.",
      "We conduct comprehensive testing throughout the development process. QA involves various tests, such as functional, performance, and security testing, to ensure the software is bug-free and meets all specifications.",
      "We integrate Development (Dev) and Operations (Ops) teams to automate and streamline the software development lifecycle. This leads to faster deployment, increased efficiency, and improved collaboration.",
      "Our services don't end at launch. We provide ongoing maintenance to keep your software running smoothly, along with technical support to address any issues or updates you may need. This ensures your software remains functional and up-to-date.",
    ],

    benefitImages: [
      "web-mobile-apps",
      "agile-sprints",
      "custom-apis",
      "secure-code-review",
      "ui-ux-design",
      "quality-assurance",
      "devops-integration",
      "maintenance-support",
    ],

    tools: ["React", "Node.js", "MongoDB", "MySQL", "Docker", "Kubernetes", "Jest"],
    whyChooseUs: "From ideation to launch, we build with your business goals in mind.",
    banner: "whychoose",
  },
  "CYBERSECURITY CONSULTING": {
    description:
      "Defend your systems with expert audits, firewalls, pen testing, and awareness training.",
    benefits: [
      "Firewall Setup",
      "Threat Detection",
      "Data Loss Prevention",
      "Security Policies",
      "Audit Reports",
      "Vulnerability Assessment",
      "Incident Response",
      "Security Training",
    ],
    benefitDescriptions: [
      "Enterprise-grade firewall configuration tailored to your network architecture and security requirements.",
      "AI-powered threat detection systems that identify and neutralize attacks in real-time.",
      "Comprehensive DLP solutions to prevent unauthorized access and transfer of sensitive data.",
      "Custom security policies and procedures that comply with industry regulations and best practices.",
      "Detailed audit reports with actionable recommendations to strengthen your security posture.",
      "Regular scanning and assessment to identify potential security vulnerabilities.",
      "24/7 incident response team ready to contain and mitigate security breaches.",
      "Employee training programs to build security awareness and prevent social engineering attacks.",
    ],
    benefitImages: [
      "firewall-setup",
      "threat-detection",
      "data-loss-prevention",
      "security-policies",
      "audit-reports",
      "vulnerability-assessment",
      "incident-response",
      "security-training",
    ],
    tools: ["Wireshark", "Nessus", "Metasploit", "Kali Linux", "SIEM", "Burp Suite"],
    whyChooseUs:
      "We're certified to keep your infrastructure and data safe from modern threats.",
    banner: "whychoose",
  },
  "WEBSITE & APP DEVELOPMENT": {
    description: "Visually stunning and functionally powerful websites and mobile apps.",
    benefits: [
      "Responsive UI",
      "SEO Ready",
      "Mobile Compatibility",
      "Performance Optimized",
      "Custom Integrations",
      "E-commerce Solutions",
      "Content Management",
      "Progressive Web Apps",
    ],
    benefitDescriptions: [
      "Fluid designs that adapt perfectly to any screen size from desktop to smartphone.",
      "Built-in SEO optimization with semantic markup and performance features that boost search rankings.",
      "Native-like experience on mobile devices with progressive web app capabilities and offline functionality.",
      "Lightning-fast load times achieved through code optimization, caching, and CDN integration.",
      "Seamless integration with your CRM, payment gateways, and other business systems.",
      "Secure online stores with payment processing, inventory management, and analytics.",
      "User-friendly CMS allowing easy content updates without technical knowledge.",
      "App-like experiences that work offline and can be installed on device home screens.",
    ],
    benefitImages: [
      "responsive-ui",
      "seo-ready",
      "mobile-compatibility",
      "performance-optimized",
      "custom-integrations",
      "e-commerce-solutions",
      "content-management",
      "pwa",
    ],
    tools: ["React", "Next.js", "Flutter", "TailwindCSS", "Figma", "Shopify", "WordPress"],
    whyChooseUs: "Design, performance, and conversion-focused development under one roof.",
    banner: "whychoose",
  },
  "ERP & DOCUMENT MANAGEMENT": {
    description:
      "Automate business processes with ERP tools and secure digital document flows.",
    benefits: [
      "Access Control",
      "Digital Archiving",
      "Finance Modules",
      "Employee Management",
      "Analytics Dashboards",
      "Workflow Automation",
      "Supply Chain Integration",
      "Mobile Accessibility",
    ],
    benefitDescriptions: [
      "Granular role-based access controls to ensure employees only see what they need for their job functions.",
      "Secure cloud-based document storage with version control and automated retention policies.",
      "Comprehensive accounting modules including AP/AR, general ledger, and financial reporting.",
      "Complete HR management system with onboarding, time tracking, and performance evaluation tools.",
      "Real-time business intelligence dashboards with customizable KPIs and drill-down capabilities.",
      "Automated approval workflows that streamline business processes and reduce manual tasks.",
      "End-to-end supply chain visibility from procurement to fulfillment and logistics.",
      "Mobile access to critical business data and approvals from anywhere, anytime.",
    ],
    benefitImages: [
      "access-control",
      "digital-archiving",
      "finance-modules",
      "employee-management",
      "analytics-dashboards",
      "workflow-automation",
      "supply-chain-integration",
      "mobile-accessibility",
    ],
    tools: ["Odoo", "ERPNext", "MySQL", "Node.js", "PowerBI", "Tableau"],
    whyChooseUs: "We create ERP solutions that bring all your data together securely.",
    banner: "whychoose",
  },
  "HELP DESK SUPPORT": {
    description:
      "24/7 support center to solve IT issues, queries, and requests quickly and efficiently.",
    benefits: [
      "Ticketing System",
      "First Response SLA",
      "Knowledge Base",
      "Multi-Channel Support",
      "Remote Troubleshooting",
      "Asset Management",
      "User Training",
      "Service Analytics",
    ],
    benefitDescriptions: [
      "Centralized ticketing system with automated routing and escalation based on issue type and urgency.",
      "Guaranteed first response times with different SLAs available based on your business priorities.",
      "Comprehensive self-service knowledge base with step-by-step guides and troubleshooting articles.",
      "Omnichannel support through email, phone, chat, and remote desktop with unified tracking.",
      "Secure remote access to diagnose and resolve issues without on-site visits.",
      "Complete inventory of hardware and software assets with lifecycle management.",
      "Training programs to help users become more proficient with company technology.",
      "Detailed reporting on support metrics to identify trends and improve service.",
    ],
    benefitImages: [
      "ticketing-system",
      "first-response-sla",
      "knowledge-base",
      "multi-channel-support",
      "remote-troubleshooting",
      "help-desk-asset-management",
      "user-training",
      "service-analytics",
    ],
    tools: ["Freshdesk", "Zoho Desk", "Jira Service Desk", "TeamViewer", "Snipe-IT"],
    whyChooseUs: "Quick response, human approach — that's our help desk.",
    banner: "whychoose",
  },
  "BACKUP & DISASTER RECOVERY": {
    description:
      "Protect your business from data loss through automated backups and disaster plans.",
    benefits: [
      "Regular Backups",
      "Instant Recovery",
      "Offsite Storage",
      "DR Drills",
      "Ransomware Protection",
      "Compliance Ready",
      "Cloud Backup",
      "Testing Services",
    ],
    benefitDescriptions: [
      "Automated daily, weekly, and monthly backup schedules tailored to your data criticality.",
      "Point-in-time recovery capabilities to restore systems to any moment before data loss occurred.",
      "Geo-redundant storage across multiple data centers to protect against regional disasters.",
      "Regular disaster recovery simulations to ensure your team knows exactly what to do in an emergency.",
      "Immutable backups and air-gapped solutions to protect against ransomware attacks.",
      "Solutions designed to meet HIPAA, GDPR, and other regulatory requirements.",
      "Secure cloud-based backup solutions with unlimited scalability.",
      "Regular testing of backup integrity and recovery procedures.",
    ],
    benefitImages: [
      "regular-backups",
      "instant-recovery",
      "offsite-storage",
      "dr-drills",
      "ransomware-protection",
      "compliance-ready",
      "cloud-backup",
      "testing-services",
    ],
    tools: ["Veeam", "Acronis", "Backblaze", "Datto", "Rubrik", "Zerto"],
    whyChooseUs: "Stay protected, even when the unexpected strikes.",
    banner: "whychoose",
  },
  "NETWORK & SERVER MANAGEMENT": {
    description: "Setup, monitor, and manage secure server environments and networks.",
    benefits: [
      "Firewall Config",
      "Server Hardening",
      "Patch Updates",
      "Performance Tuning",
      "Capacity Planning",
      "Network Monitoring",
      "Virtualization",
      "Cloud Integration",
    ],
    benefitDescriptions: [
      "Next-generation firewall configuration with intrusion prevention and deep packet inspection.",
      "Server hardening following CIS benchmarks to eliminate vulnerabilities in your infrastructure.",
      "Automated patch management with testing protocols to ensure updates don't disrupt operations.",
      "Continuous performance monitoring and optimization to keep your systems running at peak efficiency.",
      "Scaling recommendations based on usage trends and business growth projections.",
      "24/7 network monitoring with real-time alerts for potential issues.",
      "Virtualization solutions to maximize hardware utilization and flexibility.",
      "Hybrid cloud integration for seamless workload management across environments.",
    ],
    benefitImages: [
      "firewall-config",
      "server-hardening",
      "patch-updates",
      "performance-tuning",
      "capacity-planning",
      "network-monitoring",
      "virtualization",
      "cloud-integration-network",
    ],
    tools: ["Nagios", "Zabbix", "Wireshark", "Ubiquiti", "VMware", "Hyper-V"],
    whyChooseUs: "Reliable networks = reliable business.",
    banner: "whychoose",
  },
  "IT CONSULTING / VIRTUAL CIO": {
    description:
      "We help you align technology to your business vision, growth and compliance needs.",
    benefits: [
      "Budget Planning",
      "Tech Roadmaps",
      "Compliance Advice",
      "Tech Vendor Selection",
      "Digital Transformation",
      "IT Governance",
      "Risk Assessment",
      "Team Training",
    ],
    benefitDescriptions: [
      "IT budget optimization to maximize ROI while maintaining necessary capabilities and security.",
      "3-5 year technology roadmaps aligned with your business objectives and industry trends.",
      "Compliance guidance for GDPR, HIPAA, PCI-DSS and other regulatory requirements.",
      "Vendor evaluation and selection based on your specific needs and total cost of ownership.",
      "Strategic planning for adopting emerging technologies that drive business value.",
      "Framework development for IT decision-making aligned with business goals.",
      "Comprehensive risk analysis to identify and mitigate potential technology risks.",
      "Staff training programs to maximize technology adoption and utilization.",
    ],
    benefitImages: [
      "budget-planning",
      "tech-roadmaps",
      "compliance-advice",
      "vendor-selection",
      "digital-transformation",
      "it-governance",
      "risk-assessment",
      "team-training",
    ],
    tools: ["MS Office", "Asana", "Trello", "PowerBI", "ServiceNow", "Jira"],
    whyChooseUs: "You get a strategic tech partner, not just advice.",
    banner: "whychoose",
  },
  "VOIP / UNIFIED COMMUNICATION": {
    description:
      "Advanced VoIP solutions with video conferencing, chat, call routing, and CRM linking.",
    benefits: [
      "Hosted PBX",
      "Voicemail to Email",
      "Video Chat",
      "Team Messaging",
      "Call Analytics",
      "CRM Integration",
      "Mobile Apps",
      "Call Center Features",
    ],
    benefitDescriptions: [
      "Cloud-based PBX systems with unlimited extensions and advanced call routing features.",
      "Voicemail transcription and email delivery so you never miss important messages.",
      "High-definition video conferencing with screen sharing and recording capabilities.",
      "Secure team messaging with file sharing and integration with productivity tools.",
      "Detailed call metrics and analytics to optimize communication workflows.",
      "Deep CRM integration that logs calls and displays customer information during interactions.",
      "Native mobile applications for iOS and Android to stay connected on the go.",
      "Call center features including queues, IVR, and call monitoring for customer service teams.",
    ],
    benefitImages: [
      "hosted-pbx",
      "voicemail-to-email",
      "video-chat",
      "team-messaging",
      "call-analytics",
      "crm-integration",
      "mobile-apps",
      "call-center-features",
    ],
    tools: ["Zoom", "RingCentral", "3CX", "Microsoft Teams", "Twilio", "Aircall"],
    whyChooseUs: "Communicate clearly. Anywhere. Anytime.",
    banner: "whychoose",
  },
  "DATA ANALYTICS & DASHBOARDS": {
    description: "Turn your raw data into smart dashboards for decision-making.",
    benefits: [
      "Custom Reports",
      "Real-Time Dashboards",
      "Data Cleaning",
      "Integration with CRMs",
      "Predictive Analytics",
      "Data Warehousing",
      "AI Insights",
      "Automated Alerts",
    ],
    benefitDescriptions: [
      "Tailored reports that highlight the metrics most important to your business objectives.",
      "Live dashboards that update automatically to reflect current business performance.",
      "Data normalization and cleaning services to ensure your analytics are based on accurate information.",
      "Seamless integration with Salesforce, HubSpot and other CRM platforms.",
      "Machine learning models to forecast trends and identify opportunities.",
      "Centralized data storage solutions that consolidate information from multiple sources.",
      "AI-powered insights that uncover hidden patterns in your business data.",
      "Automated notifications when key metrics exceed defined thresholds.",
    ],
    benefitImages: [
      "custom-reports",
      "real-time-dashboards",
      "data-cleaning",
      "integration-with-crms",
      "predictive-analytics",
      "data-warehousing",
      "ai-insights",
      "automated-alerts",
    ],
    tools: ["Power BI", "Tableau", "Google Data Studio", "Snowflake", "Looker", "Alteryx"],
    whyChooseUs: "Make decisions backed by numbers — not guesswork.",
    banner: "whychoose",
  },
  "REMOTE WORK ENABLEMENT": {
    description: "Make your remote workforce productive and secure from anywhere.",
    benefits: [
      "VPN Setup",
      "Cloud Apps",
      "Device Management",
      "Remote Access",
      "Collaboration Tools",
      "Security Training",
      "Home Office Setup",
      "Productivity Monitoring",
    ],
    benefitDescriptions: [
      "Enterprise-grade VPN solutions with multi-factor authentication for secure remote access.",
      "Optimized cloud application stacks that mirror office productivity from any location.",
      "Mobile device management to enforce security policies on employee-owned devices.",
      "Secure remote desktop solutions with granular permission controls and session recording.",
      "Integrated suite of collaboration tools for seamless team communication.",
      "Cybersecurity awareness training tailored for remote work environments.",
      "Guidance and support for setting up ergonomic and efficient home offices.",
      "Tools to measure and optimize remote workforce productivity.",
    ],
    benefitImages: [
      "vpn-setup",
      "cloud-apps",
      "device-management",
      "remote-access",
      "collaboration-tools",
      "security-training-remote",
      "home-office-setup",
      "productivity-monitoring",
    ],
    tools: ["Zoom", "Slack", "Google Workspace", "Microsoft 365", "Jamf", "Okta"],
    whyChooseUs: "We ensure work never stops — no matter where you are.",
    banner: "whychoose",
  },
  "DEVOPS & CI/CD PIPELINES": {
    description:
      "Faster builds, safer releases with modern DevOps and automated CI/CD pipelines.",
    benefits: [
      "Code Pipelines",
      "Docker & Kubernetes",
      "GitOps",
      "Monitoring Dashboards",
      "Infrastructure as Code",
      "Security Scanning",
      "Performance Testing",
      "Incident Management",
    ],
    benefitDescriptions: [
      "Automated build-test-deploy pipelines that accelerate delivery while maintaining quality.",
      "Containerization and orchestration solutions that improve scalability and resource utilization.",
      "Git-based infrastructure as code for reproducible environments and version-controlled changes.",
      "Real-time monitoring dashboards that provide visibility into application performance and health.",
      "Terraform and CloudFormation templates for consistent environment provisioning.",
      "Integrated security scanning throughout the development lifecycle.",
      "Load testing and performance optimization for high-traffic applications.",
      "Streamlined incident response with automated alerts and runbooks.",
    ],
    benefitImages: [
      "code-pipelines",
      "docker-kubernetes",
      "gitops",
      "monitoring-dashboards",
      "infrastructure-as-code",
      "security-scanning",
      "performance-testing",
      "incident-management-devops",
    ],
    tools: ["Jenkins", "GitHub Actions", "GitLab CI", "Docker", "K8s", "Terraform", "Prometheus"],
    whyChooseUs: "Deliver faster, more reliably, and with fewer bugs.",
    banner: "whychoose",
  },
  "AI & AUTOMATION SOLUTIONS": {
    description:
      "Integrate AI for smarter workflows, automation, and better customer experiences.",
    benefits: [
      "Chatbots",
      "RPA",
      "Predictive Analytics",
      "AI Assistants",
      "Computer Vision",
      "Document Processing",
      "Sentiment Analysis",
      "Process Mining",
    ],
    benefitDescriptions: [
      "Intelligent chatbots that handle customer inquiries 24/7 with natural language processing.",
      "Robotic process automation that eliminates repetitive manual tasks across your organization.",
      "Predictive models that analyze historical data to forecast outcomes and recommend actions.",
      "AI-powered virtual assistants that help employees with information retrieval and task automation.",
      "Image recognition solutions for quality control, inventory management, and security applications.",
      "AI-driven document processing for invoices, contracts, and other business documents.",
      "Customer sentiment analysis from surveys, reviews, and social media interactions.",
      "Process discovery and optimization using AI to identify inefficiencies in workflows.",
    ],
    benefitImages: [
      "chatbots",
      "rpa",
      "predictive-analytics-ai",
      "ai-assistants",
      "computer-vision",
      "document-processing",
      "sentiment-analysis",
      "process-mining",
    ],
    tools: ["TensorFlow", "OpenAI", "Zapier", "UiPath", "Azure AI", "Google AI"],
    whyChooseUs: "Future-ready your business with smart automation.",
    banner: "whychoose",
  },
  "HARDWARE PROCUREMENT & SETUP": {
    description:
      "We procure, configure, and deploy workstations, laptops, routers and servers.",
    benefits: [
      "Vendor Negotiation",
      "Bulk Licensing",
      "Asset Inventory",
      "Warranty Handling",
      "Device Configuration",
      "Deployment Services",
      "Lease Options",
      "Recycling Programs",
    ],
    benefitDescriptions: [
      "Strategic vendor relationships that secure premium hardware at competitive prices.",
      "Volume licensing agreements that reduce software costs across your organization.",
      "Comprehensive asset tracking with barcode/RFID tagging and lifecycle management.",
      "Centralized warranty management to ensure timely repairs and replacements.",
      "Standardized device imaging and configuration for consistent employee onboarding.",
      "White-glove deployment services including setup, testing, and user training.",
      "Flexible leasing options to preserve capital and stay current with technology.",
      "Environmentally responsible disposal and recycling of outdated equipment.",
    ],
    benefitImages: [
      "vendor-negotiation",
      "bulk-licensing",
      "asset-inventory",
      "warranty-handling",
      "device-configuration",
      "deployment-services",
      "lease-options",
      "recycling-programs",
    ],
    tools: ["Dell", "HP", "Cisco", "Lenovo", "Microsoft", "Apple", "Samsung"],
    whyChooseUs: "One-stop hardware setup with support and maintenance included.",
    banner: "whychoose",
  },
};




const splitTitle = (title) => {
  const words = title.split(" ");
  if (words.length <= 3) return [title];
  const midPoint = Math.ceil(words.length / 2);
  return [words.slice(0, midPoint).join(" "), words.slice(midPoint).join(" ")];
};

const highlightFirstLetter = (text) => {
  return text.split(" ").map((word, i) => (
    <React.Fragment key={i}>
      <span className="first-letter">{word.charAt(0)}</span>
      {word.slice(1)}{" "}
    </React.Fragment>
  ));
};

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const title = decodeURIComponent(serviceName).toUpperCase();
  const service = serviceContent[title];
  const [currentPage, setCurrentPage] = useState(0);

  const benefits = service?.benefits || [];
  const benefitDescriptions = service?.benefitDescriptions || [];
  const benefitImages = service?.benefitImages || [];

  const getBPP = () =>
    typeof window !== "undefined" && window.innerWidth <= 767 ? 1 : 4;
  const [benefitsPerPage, setBenefitsPerPage] = useState(getBPP());

  useEffect(() => {
    const onResize = () => setBenefitsPerPage(getBPP());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalPages = Math.ceil(benefits.length / benefitsPerPage);

  useEffect(() => {
    setCurrentPage((p) => Math.min(p, Math.max(totalPages - 1, 0)));
  }, [totalPages]);

  const paginatedBenefits = Array.from({ length: totalPages }, (_, i) => ({
    benefits: benefits.slice(i * benefitsPerPage, (i + 1) * benefitsPerPage),
    descriptions: benefitDescriptions.slice(
      i * benefitsPerPage,
      (i + 1) * benefitsPerPage
    ),
    images: benefitImages.slice(i * benefitsPerPage, (i + 1) * benefitsPerPage),
  }));

  const handlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    onSwiped: (eventData) => {
      if (eventData.touches && eventData.touches.length >= 2) {
        if (eventData.dir === "Left") goNext();
        if (eventData.dir === "Right") goPrev();
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  const goNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const goPrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const showPrevArrow = currentPage > 0;
const showNextArrow = currentPage < totalPages - 1;

  // Scroll to top on first mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ NEW: Scroll to top whenever the service changes (and reset carousel)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(0);
  }, [serviceName]);

  // Animations (unchanged)
  useEffect(() => {
    const handleScrollAnimations = () => {
      const scrollElements = document.querySelectorAll("[data-scroll]");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.setAttribute("data-scroll", "in");
              if (entry.target.classList.contains("mosaic-item")) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
              }
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      scrollElements.forEach((el) => observer.observe(el));
    };

    const handleWhyChooseUsAnimation = () => {
      const whyChooseSection = document.querySelector(".why-choose-section");
      if (!whyChooseSection) return;

      const whyChooseObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const image = entry.target.querySelector(".why-choose-image");
              const text = entry.target.querySelector(".why-choose-paragraph");
              if (image) {
                image.style.opacity = "1";
                image.style.transform = "translateX(0)";
                image.style.transition =
                  "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
              }
              if (text) {
                setTimeout(() => {
                  text.style.opacity = "1";
                  text.style.transform = "translateX(0)";
                  text.style.transition =
                    "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s";
                }, 400);
              }
              whyChooseObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      whyChooseObserver.observe(whyChooseSection);
    };

    handleScrollAnimations();
    handleWhyChooseUsAnimation();

    return () => {
      const observers = [];
      if (typeof IntersectionObserver !== "undefined") {
        observers.forEach((observer) => observer.disconnect());
      }
    };
  }, []);

  if (!service) {
    return (
      <div className="service-not-found">
        <h2 className="not-found-title">SERVICE NOT FOUND</h2>
        <p className="not-found-message">
          Please check the URL or go back to the homepage.
        </p>
      </div>
    );
  }

  return (
    <div className="service-detail-page" id="service-detail-top">
      <section className="service-hero" aria-labelledby="service-title">
        <div className="particles-container">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 75 }}
            dpr={[1, 2]}
            gl={{ antialias: true }}
          >
            <Suspense fallback={null}>
              <InteractiveParticles count={2000} />
            </Suspense>
          </Canvas>
        </div>

        <div className="hero-content-split">
          <div className="hero-left">
            <h1
              id="service-title"
              className={`service-title ${
                splitTitle(title).length === 1 ? "single-line" : ""
              }`}
            >
              {splitTitle(title).map((line, index) => (
                <span key={index} className={`title-line title-line-${index + 1}`}>
                  {highlightFirstLetter(line)}
                </span>
              ))}
            </h1>
          </div>
          <div className="hero-right">
            <p className="service-description">{service.description}</p>
          </div>
        </div>
      </section>

      <section className="benefits-carousel-section">
        <div className="carousel-wrapper" {...handlers}>
          <button className="carousel-arrow prev" onClick={goPrev} disabled={!showPrevArrow}>
            <FiChevronLeft size={24} />
          </button>

          <div className="carousel-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {paginatedBenefits.map((page, pageIndex) => (
                <div key={pageIndex} className="carousel-page">
                  {page.benefits.map((benefit, index) => (
                    <div key={`${pageIndex}-${index}`} className="benefit-card">
                      <div className="card-image-container">
                        <img
                          src={images[page.images[index]]}
                          alt={benefit}
                          className="card-image"
                          loading="lazy"
                        />
                        <div className="card-overlay"></div>
                      </div>
                      <div className="card-content">
                        <h3 className="card-title">{benefit}</h3>
                        <p className="card-description">
                          {page.descriptions[index]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-arrow next" onClick={goNext} disabled={!showNextArrow}>
            <FiChevronRight size={24} />
          </button>
        </div>

        {totalPages > 1 && (
          <div className="carousel-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`dot ${i === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(i)}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      <section className="tools-section" aria-labelledby="tools-title">
        <h2 id="tools-title" className="section-title">
          TOOLS & TECHNOLOGIES
        </h2>
        <div className="tools-container">
          {service.tools.map((tool, index) => (
            <div key={index} className="tool-card">
              <span className="tool-name">{tool}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="why-choose-section" aria-labelledby="why-choose-title">
        <h2
          id="why-choose-title"
          className="section-title"
          data-scroll
          style={{ textDecoration: "none", borderBottom: "none" }}
        >
          WHY CHOOSE US?
        </h2>

        <div className="why-choose-container">
          <div className="why-choose-content">
            <div className="why-choose-text">
              <div
                className="why-choose-paragraph"
                style={{
                  opacity: 0,
                  transform: "translateX(50px)",
                  color: "black",
                }}
              >
                {service.whyChooseUs}
                <p className="additional-paragraph">
                  With our proven track record in delivering enterprise-grade IT
                  solutions, we bring deep technical expertise and business
                  acumen to every project. Our team stays ahead of technology
                  trends to provide future-proof solutions tailored to your
                  specific needs.
                </p>
              </div>
            </div>
          </div>
          <div
            className="why-choose-image"
            style={{
              opacity: 0,
              transform: "translateX(-100px)",
            }}
          >
            <img
              src={images[service.banner]}
              alt="Our expert team at work"
              loading="lazy"
              className="why-choose-img"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;




















