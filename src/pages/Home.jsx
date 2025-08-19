// D:\office\webartifacts\webartifacts-frontend\src\pages\Home.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";
import GeminiChatbot from "../components/GeminiChatbot";

// Import your local images
import heroImage from "../homeimages/9396710.png";
import Logo from "../heroimages/WebArtifacts_transparent white font.png";
import collaborationImage from "../homeimages/collaboration.png";
import contactImage from "../homeimages/customer-support.png";

import managedIT from '../homeimages/managed-it.png';
import cloudDeployment from '../homeimages/cloud-deployment.png';
import customSoftware from '../homeimages/custom-software.png';
import cybersecurity from '../homeimages/cybersecurity.png';
import webAppDevelopment from '../homeimages/web-app-development.png';
import erp from '../homeimages/erp.png';
import helpDesk from '../homeimages/help-desk.png';
import backupRecovery from '../homeimages/backup-recovery.png';
import networkServer from '../homeimages/network-server.png';
import itConsulting from '../homeimages/it-consulting.png';
import voip from '../homeimages/voip.png';
import dataAnalytics from '../homeimages/data-analytics.png';
import remoteWork from '../homeimages/remote-work.png';
import devops from '../homeimages/devops.png';
import aiAutomation from '../homeimages/ai-automation.png';
import hardwareProcurement from '../homeimages/hardware-procurement.png';

const serviceImages = {
    'managed-it': managedIT,
    'cloud-deployment': cloudDeployment,
    'custom-software': customSoftware,
    'cybersecurity': cybersecurity,
    'web-app-development': webAppDevelopment,
    'erp': erp,
    'help-desk': helpDesk,
    'backup-recovery': backupRecovery,
    'network-server': networkServer,
    'it-consulting': itConsulting,
    'voip': voip,
    'data-analytics': dataAnalytics,
    'remote-work': remoteWork,
    'devops': devops,
    'ai-automation': aiAutomation,
    'hardware-procurement': hardwareProcurement,
};

const services = [
    {
        title: "Managed IT Support",
        image: "managed-it",
        description: "We provide complete IT infrastructure management, support, and desktop services for businesses."
    },
    {
        title: "Cloud Deployment & Backup",
        image: "cloud-deployment",
        description: "Expert deployment and backup on AWS, Azure, and GCP with disaster recovery."
    },
    {
        title: "Custom Software Development",
        image: "custom-software",
        description: "We build tailored software solutions using React, Node.js, and modern stacks."
    },
    {
        title: "Cybersecurity Consulting",
        image: "cybersecurity",
        description: "Our experts secure your infrastructure with audits, firewalls, and best practices."
    },
    {
        title: "Website & App Development",
        image: "web-app-development",
        description: "Responsive and scalable websites or mobile apps using the latest tech."
    },
    {
        title: "ERP & Document Management",
        image: "erp",
        description: "Digitize all your workflows and documents into one smart ERP system."
    },
    {
        title: "Help Desk Support",
        image: "help-desk",
        description: "24/7 help desk support to assist employees and clients with technical queries."
    },
    {
        title: "Backup & Disaster Recovery",
        image: "backup-recovery",
        description: "Automated backup, failover systems, and disaster recovery planning."
    },
    {
        title: "Network & Server Management",
        image: "network-server",
        description: "Secure and optimized network/server infrastructure with regular maintenance."
    },
    {
        title: "IT Consulting / Virtual CIO",
        image: "it-consulting",
        description: "Strategic technology consulting and virtual CIO services for long-term growth."
    },
    {
        title: "VoIP / Unified Communication",
        image: "voip",
        description: "Voice-over-IP systems and unified communication solutions for remote work."
    },
    {
        title: "Data Analytics & Dashboards",
        image: "data-analytics",
        description: "Turn raw data into actionable insights using interactive dashboards."
    },
    {
        title: "Remote Work Enablement",
        image: "remote-work",
        description: "Tools and infrastructure to support secure and productive remote work."
    },
    {
        title: "DevOps & CI/CD Pipelines",
        image: "devops",
        description: "Automate your development and deployment using modern DevOps pipelines."
    },
    {
        title: "AI & Automation Solutions",
        image: "ai-automation",
        description: "Leverage artificial intelligence to automate workflows and decision-making."
    },
    {
        title: "Hardware Procurement & Setup",
        image: "hardware-procurement",
        description: "Procurement, installation, and maintenance of hardware for your company."
    }
];

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [testimonials, setTestimonials] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const testimonialsRef = useRef(null);
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

    // State to determine if it's a mobile view
    const [isMobile, setIsMobile] = useState(false);

    // Effect to check screen width on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 480); // Define mobile breakpoint, e.g., 480px
        };

        checkMobile(); // Initial check
        window.addEventListener('resize', checkMobile); // Add resize listener

        return () => {
            window.removeEventListener('resize', checkMobile); // Clean up listener
        };
    }, []);

    // Determine servicesPerPage dynamically based on screen size
    // For mobile (<=480px), show 1 card per page. For larger screens, show 4.
    const servicesPerPage = isMobile ? 1 : 4; 

    // Calculate total pages for services based on the dynamic servicesPerPage
    const pageCount = Math.ceil(services.length / servicesPerPage);

    // Slice the services array to display only the relevant cards for the current page
    const displayedServices = services.slice(
        currentPage * servicesPerPage,
        (currentPage + 1) * servicesPerPage
    );

    // Handle scroll to hash links
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.hash]);

    // Fetch testimonials
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await axios.get("https://my-project-backend.vercel.app/api/client/public-feedbacks");
                setTestimonials(res.data);
            } catch (err) {
                console.error("Error fetching testimonials", err);
            }
        };
        fetchTestimonials();
    }, []);

    // Pagination handlers for services section
    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));
    };

    const goToPage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    // Testimonial scroll handlers (unrelated to services pagination)
    const handleTestimonialScroll = () => {
        if (testimonialsRef.current) {
            const scrollPosition = testimonialsRef.current.scrollLeft;
            const cardWidth = testimonialsRef.current.offsetWidth * 0.9;
            const newIndex = Math.round(scrollPosition / cardWidth);
            setCurrentTestimonialIndex(newIndex);
        }
    };

    const goToTestimonial = (index) => {
        if (testimonialsRef.current) {
            const cardWidth = testimonialsRef.current.offsetWidth * 0.9;
            testimonialsRef.current.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            setCurrentTestimonialIndex(index);
        }
    };

    // Helper function to render pagination dots
    const renderPaginationDots = (totalItemsLength, currentIndex, goToFunction) => {
        const dots = [];
        const numDots = Math.ceil(totalItemsLength / (totalItemsLength === services.length ? servicesPerPage : 4)); // Using 4 for testimonials pagination
        for (let i = 0; i < numDots; i++) {
            dots.push(
                <button
                    key={`dot-${i}-${totalItemsLength}`} // Unique key combining index and length
                    className={`pagination-dot ${currentIndex === i ? 'active' : ''}`}
                    onClick={() => goToFunction(i)}
                    aria-label={`Go to page ${i + 1}`}
                />
            );
        }
        return dots;
    };


    return (
        <div className="home-wrapper">

            <section className="hero-section">
                <div className="hero-banner">
                    <img
                        src={heroImage}
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
                            <img
                                src={Logo} // Using the uploaded image file
                                alt="WebArtifacts Logo"
                                className="hero-logo-image"
                            />
                            <p>We deliver secure, scalable, & smart IT solutions for your business.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <main className="main-content">
                <section className="section tailored-section">
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
                                    bg: "rgba(16, 185, 129, 0.1)"
                                },
                                {
                                    icon: "⚙️",
                                    title: "Scalable Solutions",
                                    desc: "Infrastructure that grows seamlessly with your business.",
                                    bg: "rgba(99, 102, 241, 0.1)"
                                },
                                {
                                    icon: "🚀",
                                    title: "Business Focused",
                                    desc: "Technology aligned with your strategic objectives.",
                                    bg: "rgba(245, 158, 11, 0.1)"
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
                </section>

                <section className="section manage-it-section">
                    <div className="manage-it-container">
                        <motion.div
                            className="manage-it-content"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className="manage-it-header">
                                <h1> Working Process</h1>
                                <p className="subtitle">A systematic approach to ensure your success at every stage</p>
                            </div>

                            <div className="working-process">
                                <div className="process-steps">
                                    {[
                                        {
                                            number: "1",
                                            title: "Strategic Connect",
                                            description: "We initiate with in-depth consultations to fully grasp your business objectives and technical requirements."
                                        },
                                        {
                                            number: "2",
                                            title: "Precision Management",
                                            description: "Our certified partners across India implement solutions with military-grade precision."
                                        },
                                        {
                                            number: "3",
                                            title: "Growth Planning",
                                            description: "We architect scalable roadmaps that anticipate your future needs and market shifts."
                                        },
                                        {
                                            number: "4",
                                            title: "Flawless Execution",
                                            description: "Cutting-edge implementation with continuous optimization for sustained growth."
                                        }
                                    ].map((step, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            whileHover={{ y: -10 }}
                                            className="process-step"
                                        >
                                            <div className="step-number">{step.number}</div>
                                            <h4>{step.title}</h4>
                                            <p>{step.description}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    viewport={{ once: true }}
                                    className="process-cta"
                                >
                                    <button className="btn-primary" onClick={() => navigate("/contact#contact-form")}>
                                        <span>Start Your Project</span>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="manage-it-image"
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <img
                                src={collaborationImage}
                                alt="IT professionals collaborating"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </section>


                <section className="section services-section">
                    <div className="section-container">
                        <h2 className="section-title">Our Services</h2>

                        <div className="services-container">
                            <button
                                className="pagination-arrow"
                                onClick={handlePrevPage}
                                disabled={currentPage === 0}
                                aria-label="Previous page"
                            >
                                &lt;
                            </button>

                            {/* No direct ref needed here as pagination is handled by slicing in React state */}
                            <div className="services-grid"> 
                                {displayedServices.map((service) => (
                                    <div
                                        key={service.title}
                                        className="service-card"
                                        onClick={() => navigate(`/services/${encodeURIComponent(service.title)}`)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && navigate(`/services/${encodeURIComponent(service.title)}`)}
                                    >
                                        <div className="service-image-half">
                                            <img
                                                src={serviceImages[service.image]}
                                                alt={service.title}
                                                className="service-image-full"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="service-content-half">
                                            <h3>{service.title}</h3>
                                            <p>{service.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="pagination-arrow"
                                onClick={handleNextPage}
                                disabled={currentPage === pageCount - 1}
                                aria-label="Next page"
                            >
                                &gt;
                            </button>
                        </div>

                        <div className="pagination-dots">
                            {renderPaginationDots(services.length, currentPage, goToPage)}
                        </div>
                    </div>
                </section>

                <section id="testimonials" className="section testimonials-section">
                    <div className="testimonials-container">
                        <motion.div
                            className="testimonials-header"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2>Client Testimonials</h2>
                            <p>Hear what our clients say about working with us</p>
                        </motion.div>

                        <div
                            className="testimonials-grid"
                            ref={testimonialsRef}
                            onScroll={handleTestimonialScroll}
                        >
                            {testimonials.map((testimonial) => (
                                <motion.div
                                    key={testimonial._id}
                                    className="testimonial-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="testimonial-content">
                                        <p>"{testimonial.message}"</p>
                                    </div>
                                    <div className="testimonial-author">
                                        <div className="testimonial-avatar">
                                            {testimonial.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="testimonial-author-info">
                                            <span className="testimonial-author-name">{testimonial.name}</span>
                                            <span className="testimonial-author-company">{testimonial.company}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="testimonials-pagination">
                            {renderPaginationDots(testimonials.length, currentTestimonialIndex, goToTestimonial)}
                        </div>
                    </div>
                </section>

                <section className="section contact-preview-section">
                    <div className="section-container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="contact-preview-content"
                        >
                            <div className="contact-preview-text">
                                <h2>Ready to Get Started?</h2>
                                <p>
                                    Have questions about our services or want to discuss your project?
                                    Our team is ready to help you find the perfect solution.
                                </p>
                                <button
                                    onClick={() => navigate('/contact#contact-form')}
                                    className="btn-primary"
                                >
                                    Contact Our Team
                                </button>
                            </div>
                            <div className="contact-preview-image">
                                <img
                                    src={contactImage}
                                    alt="Contact our team"
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

            </main>

            <GeminiChatbot />
        </div>
    );
};

export default Home;







// import React, { useEffect, useState , useRef} from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import "./Home.css";
// import GeminiChatbot from "../components/GeminiChatbot";



// const services = [
//   {
//     title: "Managed IT Support",
//     image: "https://images.unsplash.com/photo-1753087380647-38a2496b60bc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     description: "We provide complete IT infrastructure management, support, and desktop services for businesses."
//   },
//   {
//     title: "Cloud Deployment & Backup",
//     image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     description: "Expert deployment and backup on AWS, Azure, and GCP with disaster recovery."
//   },
//   {
//     title: "Custom Software Development",
//     image: "https://images.unsplash.com/photo-1504941214544-9c1c44559ab4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     description: "We build tailored software solutions using React, Node.js, and modern stacks."
//   },
//   {
//     title: "Cybersecurity Consulting",
//     image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     description: "Our experts secure your infrastructure with audits, firewalls, and best practices."
//   },
//   {
//     title: "Website & App Development",
//     image: "https://miro.medium.com/max/1200/0*M4bxiCIjcTK-2Xr6.jpeg",
//     description: "Responsive and scalable websites or mobile apps using the latest tech."
//   },
//   {
//     title: "ERP & Document Management",
//     image: "https://thumbs.dreamstime.com/b/erp-enterprise-resource-planning-businessman-using-computer-to-document-management-digital-technology-269328491.jpg",
//     description: "Digitize all your workflows and documents into one smart ERP system."
//   },
//   {
//     title: "Help Desk Support",
//     image: "https://thumbs.dreamstime.com/b/help-desk-word-cloud-concept-grey-background-90730346.jpg",
//     description: "24/7 help desk support to assist employees and clients with technical queries."
//   },
//   {
//     title: "Backup & Disaster Recovery",
//     image: "https://tweakyourbiz.com/wp-content/uploads/2022/12/Backup-And-Disaster-Recovery-Plan-scaled-1.jpg",
//     description: "Automated backup, failover systems, and disaster recovery planning."
//   },
//   {
//     title: "Network & Server Management",
//     image: "https://www.marconet.com/hubfs/GettyImages-1141224907.jpg#keepProtocol",
//     description: "Secure and optimized network/server infrastructure with regular maintenance."
//   },
//   {
//     title: "IT Consulting / Virtual CIO",
//     image: "https://www.greatsys.com/wp-content/uploads/2025/03/What-Is-a-vCIO-Virtual-CIO-1024x559.png",
//     description: "Strategic technology consulting and virtual CIO services for long-term growth."
//   },
//   {
//     title: "VoIP / Unified Communication",
//     image: "https://i.pinimg.com/originals/59/f9/2e/59f92e741212f322d1704b8c8963cd51.jpg",
//     description: "Voice-over-IP systems and unified communication solutions for remote work."
//   },
//   {
//     title: "Data Analytics & Dashboards",
//     image: "https://www.finereport.com/en/wp-content/themes/blogs/images/2019083001L.png",
//     description: "Turn raw data into actionable insights using interactive dashboards."
//   },
//   {
//     title: "Remote Work Enablement",
//     image: "https://media.xbyte.com/cdn-cgi/image/width=1000,format=auto/blog/Blog_2024-05_remote-worker-enablement-header.jpg",
//     description: "Tools and infrastructure to support secure and productive remote work."
//   },
//   {
//     title: "DevOps & CI/CD Pipelines",
//     image: "https://bestarion.com/wp-content/uploads/2022/06/cicd-1024x539.png",
//     description: "Automate your development and deployment using modern DevOps pipelines."
//   },
//   {
//     title: "AI & Automation Solutions",
//     image: "https://www.omegavp.com/wp-content/uploads/2022/04/automationpic.jpeg",
//     description: "Leverage artificial intelligence to automate workflows and decision-making."
//   },
//   {
//     title: "Hardware Procurement & Setup",
//     image: "https://thephishingreport.net/wp-content/uploads/2024/09/whitebeardwizard_hyper_realistic_IT_professionals_conducting_an_57902dd6-0925-4705-a0f8-8928f5c7666f.jpg",
//     description: "Procurement, installation, and maintenance of hardware for your company."
//   }
// ];

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [testimonials, setTestimonials] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const testimonialsRef = useRef(null);
//   const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
//   const servicesPerPage = 4;

//   // Scroll to anchor on hash change
//   useEffect(() => {
//     if (location.hash) {
//       const element = document.getElementById(location.hash.substring(1));
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   }, [location.hash]);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const res = await axios.get("http://localhost:5001/api/client/public-feedbacks");
//         setTestimonials(res.data);
//       } catch (err) {
//         console.error("Error fetching testimonials", err);
//       }
//     };
//     fetchTestimonials();
//   }, []);

//   // Calculate pagination values
//     // Calculate pagination values for services
//   const pageCount = Math.ceil(services.length / servicesPerPage);
//   const displayedServices = services.slice(
//     currentPage * servicesPerPage,
//     (currentPage + 1) * servicesPerPage
//   );

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 0));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));
//   };

//   const goToPage = (pageIndex) => {
//     setCurrentPage(pageIndex);
//   };

//   // Testimonial carousel functions
//   const handleTestimonialScroll = () => {
//     if (testimonialsRef.current) {
//       const scrollPosition = testimonialsRef.current.scrollLeft;
//       const cardWidth = testimonialsRef.current.offsetWidth * 0.9;
//       const newIndex = Math.round(scrollPosition / cardWidth);
//       setCurrentTestimonialIndex(newIndex);
//     }
//   };

//   const goToTestimonial = (index) => {
//     if (testimonialsRef.current) {
//       const cardWidth = testimonialsRef.current.offsetWidth * 0.9;
//       testimonialsRef.current.scrollTo({
//         left: index * cardWidth,
//         behavior: 'smooth'
//       });
//       setCurrentTestimonialIndex(index);
//     }
//   };

//   return (
//     <div className="home-wrapper">
//       {/* Full-width Hero Section */}
//       <section className="hero-section">

//   {/* Hero Content */}
//   <div className="hero-banner">
//     <img 
//       src="https://wallpaperaccess.com/full/9396710.jpg" 
//       alt="IT Services" 
//       className="hero-image"
//     />
//     <div className="hero-overlay">
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="hero-content"
//       >
//         {/* Logo Circle - Simplified Version */}
//         <div className="logo-badge">
//           <div className="logo-circle">
//             <img 
//               src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80"  // Replace with your logo
//               alt="WebArtifacts Logo"
//             />
//           </div>
//         </div>
//         
//         <h1>WebArtifacts</h1>
//         <p>We deliver secure, scalable, and smart IT solutions tailored to your business.</p>
//       </motion.div>
//     </div>
//   </div>
// </section>

//       {/* Main Content Container */}
//       <main className="main-content">
//         
//         {/* Tailored Solutions Section */}
//         <section  className="section tailored-section">
//           <div className="section-container">
//             <motion.h2 
//               className="section-title"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true, amount: 0.2 }}
//             >
//               Tailored IT Solutions Designed for <span className="text-gradient">Growth</span>
//             </motion.h2>
//             
//             <motion.p 
//               className="section-subtitle"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               viewport={{ once: true, amount: 0.2 }}
//             >
//               At WebArtifacts, we don't just provide IT services — we deliver <span className="highlight">transformation</span>.
//             </motion.p>
//             
//             <div className="features-grid">
//               {[
//                 { 
//                   icon: "🔒", 
//                   title: "Security First", 
//                   desc: "Your data is always safe with enterprise-grade protection.",
//                   bg: "rgba(16, 185, 129, 0.1)"
//                 },
//                 { 
//                   icon: "⚙️", 
//                   title: "Scalable Solutions", 
//                   desc: "Infrastructure that grows seamlessly with your business.",
//                   bg: "rgba(99, 102, 241, 0.1)"
//                 },
//                 { 
//                   icon: "🚀", 
//                   title: "Business Focused", 
//                   desc: "Technology aligned with your strategic objectives.",
//                   bg: "rgba(245, 158, 11, 0.1)"
//                 }
//               ].map((item, idx) => (
//                 <motion.div 
//                   key={idx}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: idx * 0.15 }}
//                   viewport={{ once: true, amount: 0.2 }}
//                   whileHover={{ y: -10 }}
//                   className="feature-card"
//                   style={{ background: item.bg }}
//                 >
//                   <div className="feature-icon">{item.icon}</div>
//                   <h3>{item.title}</h3>
//                   <p>{item.desc}</p>
//                   <div className="feature-hover-effect"></div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Manage IT Section */}
//         <section className="section manage-it-section">
//   <div className="manage-it-container">
//     <motion.div 
//       className="manage-it-content"
//       initial={{ opacity: 0, x: -30 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6 }}
//       viewport={{ once: true, amount: 0.2 }}
//     >
//       <div className="manage-it-header">
//         <h1> Working Process</h1>
//         <p className="subtitle">A systematic approach to ensure your success at every stage</p>
//       </div>

//       <div className="working-process">
//         <div className="process-steps">
//           {[
//             {
//               number: "1",
//               title: "Strategic Connect",
//               description: "We initiate with in-depth consultations to fully grasp your business objectives and technical requirements."
//             },
//             {
//               number: "2",
//               title: "Precision Management",
//               description: "Our certified partners across India implement solutions with military-grade precision."
//             },
//             {
//               number: "3",
//               title: "Growth Planning",
//               description: "We architect scalable roadmaps that anticipate your future needs and market shifts."
//             },
//             {
//               number: "4",
//               title: "Flawless Execution",
//               description: "Cutting-edge implementation with continuous optimization for sustained growth."
//             }
//           ].map((step, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: idx * 0.15 }}
//               viewport={{ once: true, amount: 0.2 }}
//               whileHover={{ y: -10 }}
//               className="process-step"
//             >
//               <div className="step-number">{step.number}</div>
//               <h4>{step.title}</h4>
//               <p>{step.description}</p>
//             </motion.div>
//           ))}
//         </div>
//         
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.6 }}
//           viewport={{ once: true }}
//           className="process-cta"
//         >
//           <button className="btn-primary" onClick={() => navigate("/contact")}>
//             <span>Start Your Project</span>
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </button>
//         </motion.div>
//       </div>
//     </motion.div>

//     <motion.div
//       className="manage-it-image"
//       initial={{ opacity: 0, x: 30 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6, delay: 0.3 }}
//       viewport={{ once: true }}
//       whileHover={{ scale: 1.02 }}
//     >
//       <img 
//         src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
//         alt="IT professionals collaborating"
//         loading="lazy"
//       />
//     </motion.div>
//   </div>
// </section>


//         {/* Services Section */}
//         <section className="section services-section">
//   <div className="section-container">
//     <h2 className="section-title">Our Services</h2>

//     <div className="services-container">
//       <button 
//         className="pagination-arrow" 
//         onClick={handlePrevPage}
//         disabled={currentPage === 0}
//         aria-label="Previous page"
//       >
//         &lt;
//       </button>

//       <div className="services-grid">
//         {displayedServices.map((service, idx) => (
//   <div
//     key={idx}
//     className="service-card"
//     onClick={() => navigate(`/services/${encodeURIComponent(service.title)}`)}
//     role="button"
//     tabIndex={0}
//     onKeyDown={(e) => e.key === 'Enter' && navigate(`/services/${encodeURIComponent(service.title)}`)}
//   >
//     <div className="service-image-half">
//       <img 
//         src={service.image} 
//         alt={service.title} 
//         className="service-image-full"
//         loading="lazy"
//       />
//     </div>
//     <div className="service-content-half">
//       <h3>{service.title}</h3>
//       <p>{service.description}</p>
//     </div>
//   </div>
// ))}
//       </div>

//       <button 
//         className="pagination-arrow" 
//         onClick={handleNextPage}
//         disabled={currentPage === pageCount - 1}
//         aria-label="Next page"
//       >
//         &gt;
//       </button>
//     </div>

//     <div className="pagination-dots">
//       {Array.from({ length: pageCount }).map((_, idx) => (
//         <button
//           key={idx}
//           className={`dot ${currentPage === idx ? 'active' : ''}`}
//           onClick={() => goToPage(idx)}
//           aria-label={`Go to page ${idx + 1}`}
//         />
//       ))}
//     </div>
//   </div>
// </section>



//        

//         {/* Testimonials Section */}
//          <section id="testimonials" className="section testimonials-section">
//   <div className="testimonials-container">
//     <motion.div
//       className="testimonials-header"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       viewport={{ once: true }}
//     >
//       <h2>Client Testimonials</h2>
//       <p>Hear what our clients say about working with us</p>
//     </motion.div>

//     <div 
//       className="testimonials-grid" 
//       ref={testimonialsRef}
//       onScroll={handleTestimonialScroll}
//     >
//       {testimonials.map((testimonial) => (
//         <motion.div
//           key={testimonial._id}
//           className="testimonial-card"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true, amount: 0.2 }}
//           whileHover={{ scale: 1.02 }}
//         >
//           <div className="testimonial-content">
//             <p>"{testimonial.message}"</p>
//           </div>
//           <div className="testimonial-author">
//             <div className="testimonial-avatar">
//               {testimonial.name.charAt(0).toUpperCase()}
//             </div>
//             <div className="testimonial-author-info">
//               <span className="testimonial-author-name">{testimonial.name}</span>
//               <span className="testimonial-author-company">{testimonial.company}</span>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>

//     <div className="testimonials-pagination">
//       {Array.from({ length: Math.ceil(testimonials.length / 4) }).map((_, index) => (
//         <button 
//           key={index} 
//           className={`pagination-dot ${currentTestimonialIndex === index ? 'active' : ''}`}
//           onClick={() => goToTestimonial(index)}
//           aria-label={`Go to testimonial ${index + 1}`}
//         />
//       ))}
//     </div>
//   </div>
// </section>


//         {/* Contact Preview Section */}
// <section className="section contact-preview-section">
//   <div className="section-container">
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       viewport={{ once: true, amount: 0.2 }}
//       className="contact-preview-content"
//     >
//       <div className="contact-preview-text">
//         <h2>Ready to Get Started?</h2>
//         <p>
//           Have questions about our services or want to discuss your project? 
//           Our team is ready to help you find the perfect solution.
//         </p>
//         <button 
//           onClick={() => navigate('/contact')}
//           className="btn-primary"
//         >
//           Contact Our Team
//         </button>
//       </div>
//       <div className="contact-preview-image">
//         <img 
//           src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg" 
//           alt="Contact our team" 
//         />
//       </div>
//     </motion.div>
//         </div>
//         </section>
//         
//       </main>

// <GeminiChatbot />
//     </div>
//   );
// };

// export default Home;