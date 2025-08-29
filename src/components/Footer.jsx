// src/components/Footer.jsx
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import "./footer.css";
import { Link, useNavigate } from 'react-router-dom';
import WebArtifactsLogo from '../heroimages/WebArtifacts_transparent white font.png';

const Footer = ({ scrollToSection }) => { // ⬅️ Accept scrollToSection as a prop
    const navigate = useNavigate();
    const services = [
        { title: "MANAGED IT SUPPORT", path: "/services/MANAGED%20IT%20SUPPORT" },
        { title: "CLOUD DEPLOYMENT & BACKUP", path: "/services/CLOUD%20DEPLOYMENT%20%26%20BACKUP" },
        { title: "CUSTOM SOFTWARE DEVELOPMENT", path: "/services/CUSTOM%20SOFTWARE%20DEVELOPMENT" },
        { title: "CYBERSECURITY CONSULTING", path: "/services/CYBERSECURITY%20CONSULTING" },
        { title: "WEBSITE & APP DEVELOPMENT", path: "/services/WEBSITE%20%26%20APP%20DEVELOPMENT" },
        { title: "ERP & DOCUMENT MANAGEMENT", path: "/services/ERP%20%26%20DOCUMENT%20MANAGEMENT" },
        { title: "HELP DESK SUPPORT", path: "/services/HELP%20DESK%20SUPPORT" },
        { title: "BACKUP & DISASTER RECOVERY", path: "/services/BACKUP%20%26%20DISASTER%20RECOVERY" },
        { title: "NETWORK & SERVER MANAGEMENT", "path": "/services/NETWORK%20%26%20SERVER%20MANAGEMENT" },
        { title: "IT CONSULTING / VIRTUAL CIO", path: "/services/IT%20CONSULTING%20%2F%20VIRTUAL%20CIO" },
        { title: "VOIP / UNIFIED COMMUNICATION", path: "/services/VOIP%20%2F%20UNIFIED%20COMMUNICATION" },
        { title: "DATA ANALYTICS & DASHBOARDS", path: "/services/DATA%20ANALYTICS%20%26%20DASHBOARDS" },
        { title: "REMOTE WORK ENABLEMENT", path: "/services/REMOTE%20WORK%20ENABLEMENT" },
        { title: "DEVOPS & CI/CD PIPELINES", path: "/services/DEVOPS%20%26%20CI%2FCD%20PIPELINES" },
        { title: "AI & AUTOMATION SOLUTIONS", path: "/services/AI%20%26%20AUTOMATION%20SOLUTIONS" },
        { title: "HARDWARE PROCUREMENT & SETUP", path: "/services/HARDWARE%20PROCUREMENT%20%26%20SETUP" }
    ];

    const handleCareersLinkClick = (event) => {
        event.preventDefault(); // Prevents the default anchor tag behavior
        navigate('/careers#careers-top'); // Programmatically navigates to the careers page and hash
    };

    return (
        <footer className="footer">
            <div className="footer-inner-wrapper">
                {/* About Us Section */}
                <div className="about-section">
                    <div className="about-container">
                        <div className="about-header">
                            <h1 id="about">About Us</h1>
                        </div>
                        <p className="about-description">
                            WebArtifacts is a leading IT solutions provider dedicated to helping businesses
                            leverage technology for growth and efficiency. With our team of certified experts,
                            we deliver innovative solutions tailored to your unique needs.
                        </p>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="section-divider"></div>

                <div className="footer-container">
                    <div className="footer-grid">
                        {/* Company Info */}
                        <div className="footer-section">
                            <img src={WebArtifactsLogo} alt="WebArtifacts Logo" className="company-logo" />
                            <p className="company-description">
                                Delivering secure, scalable and affordable IT solutions to power your business growth and digital transformation.
                            </p>
                            <div className="social-icons">
                                <a href="https://www.facebook.com/share/1GPnZfjhDJ/" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                                    <FaFacebook size={20} />
                                </a>
                                <a href="https://x.com/WebArtifacts" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                                    <FaTwitter size={20} />
                                </a>
                                <a href="https://www.linkedin.com/company/webartifactsind/about/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                                    <FaLinkedin size={20} />
                                </a>
                                <a href="https://www.instagram.com/webartifacts_/" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                                    <FaInstagram size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="footer-section">
                            <h4 className="footer-heading">Our Services</h4>
                            <div className="services-scroll-container">
                                <ul className="footer-links services-list">
                                    {services.map((service, index) => (
                                        <li key={index} className="footer-link">
                                            <a href={service.path}>{service.title}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-section">
                            <h4 className="footer-heading">Quick Links</h4>
                            <ul className="footer-links">
                                <li className="footer-link">
                                    <Link
    to="/#testimonials"
    onClick={(e) => {
      e.preventDefault();

      const goWithOffset = () => {
        const el = document.getElementById("testimonials");
        if (!el) {
          // fallback: set the hash so any listeners can react
          window.location.hash = "#testimonials";
          return;
        }
        const header = document.querySelector(".navbar");
        const offset = (header?.offsetHeight || 88) + 6; // +6 for breathing room
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      };

      if (window.location.pathname !== "/") {
        // Not on home: navigate, then scroll after paint
        // navigate comes from useNavigate() already in your component
        navigate("/#testimonials");
        // scroll on the next tick so the element exists
        setTimeout(goWithOffset, 50);
      } else {
        // Already on home: just scroll with offset
        goWithOffset();
      }
    }}
  >
    Testimonials
  </Link>
                                </li>
                                <li className="footer-link">Case Studies</li>
                                <li className="footer-link">Blog</li>
                                <li className="footer-link">
                                    <a href="/careers#careers-top" onClick={handleCareersLinkClick}>
                                        Careers
                                    </a>
                                </li>
                                <li className="footer-link">
                                    <Link to="/login#top">
                                        LOGIN
                                    </Link>
                                </li>
                                <li className="footer-link">
                                    <Link to="https://www.google.com/maps/place/WebArtifacts+Pvt+Ltd/@21.1102353,79.1006327,17z/data=!3m1!4b1!4m16!1m9!4m8!1m0!1m6!1m2!1s0x3bd4bf12b2fbcbe1:0x8930218e8469a6b6!2splot+no+20,+Manewada+Rd,+behind+Venu+Corner,+Bhoyar+Layout,+Balaji+Nagar,+Rameshwari,+Nagpur,+Maharashtra+440027!2m2!1d79.1032076!2d21.1102353!3m5!1s0x3bd4bf12b2fbcbe1:0x8930218e8469a6b6!8m2!3d21.1102353!4d79.1032076!16s%2Fg%2F11xrhhdhp1?hl=en-IN&entry=ttu&g_ep=EgoyMDI1MDgwNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                                        Sitemap
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-section">
                            <h4 className="footer-heading">Contact Us</h4>
                            <div className="footer-links">
                                <div className="contact-item">
                                    <FaMapMarkerAlt className="contact-icon" />
                                    <p>Plot no.20, Behind Venue Corner, Balaji Nagar, Nagpur, Maharashtra 440027</p>
                                </div>
                                <div className="contact-item">
                                    <FaPhone className="contact-icon" />
                                    <p>+91 7758969022</p>
                                </div>
                                <div className="contact-item">
                                    <FaEnvelope className="contact-icon" />
                                    <p>webartifactsind@gmail.com</p>
                                </div>
                                <div className="contact-item">
                                    <FaClock className="contact-icon" />
                                    <p>Monday to Saturday : 10AM - 6PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="copyright">
                        <div className="section-divider"></div>
                        <div className="copyright-content">
                            <p>© {new Date().getFullYear()} WebArtifacts. All rights reserved.</p>
                            <div className="copyright-links">
                                <Link to="/terms" className="copyright-link">Terms of Service</Link>
                                <Link to="/privacy" className="copyright-link">Privacy Policy</Link>
                                <Link to="/cookies" className="copyright-link">Cookie Policy</Link>
                            </div>
                        </div>
                        <div className="footer-bottom-space"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;











// // D:\office\webartifacts\webartifacts-frontend\src\components\Footer.jsx
// import React, { forwardRef } from "react"; // Import forwardRef
// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
// import "./footer.css";
// import { Link, useNavigate } from 'react-router-dom';

// import WebArtifactsLogo from '../heroimages/WebArtifacts_transparent white font.png';

// // Wrap the functional component with forwardRef
// const Footer = forwardRef((props, ref) => {
//     const navigate = useNavigate();
//     const services = [
//     { title: "MANAGED IT SUPPORT", path: "/services/MANAGED%20IT%20SUPPORT" },
//     { title: "CLOUD DEPLOYMENT & BACKUP", path: "/services/CLOUD%20DEPLOYMENT%20%26%20BACKUP" },
//     { title: "CUSTOM SOFTWARE DEVELOPMENT", path: "/services/CUSTOM%20SOFTWARE%20DEVELOPMENT" },
//     { title: "CYBERSECURITY CONSULTING", path: "/services/CYBERSECURITY%20CONSULTING" },
//     { title: "WEBSITE & APP DEVELOPMENT", path: "/services/WEBSITE%20%26%20APP%20DEVELOPMENT" },
//     { title: "ERP & DOCUMENT MANAGEMENT", path: "/services/ERP%20%26%20DOCUMENT%20MANAGEMENT" },
//     { title: "HELP DESK SUPPORT", path: "/services/HELP%20DESK%20SUPPORT" },
//     { title: "BACKUP & DISASTER RECOVERY", path: "/services/BACKUP%20%26%20DISASTER%20RECOVERY" },
//     { title: "NETWORK & SERVER MANAGEMENT", "path": "/services/NETWORK%20%26%20SERVER%20MANAGEMENT" },
//     { title: "IT CONSULTING / VIRTUAL CIO", path: "/services/IT%20CONSULTING%20%2F%20VIRTUAL%20CIO" },
//     { title: "VOIP / UNIFIED COMMUNICATION", path: "/services/VOIP%20%2F%20UNIFIED%20COMMUNICATION" },
//     { title: "DATA ANALYTICS & DASHBOARDS", path: "/services/DATA%20ANALYTICS%20%26%20DASHBOARDS" },
//     { title: "REMOTE WORK ENABLEMENT", path: "/services/REMOTE%20WORK%20ENABLEMENT" },
//     { title: "DEVOPS & CI/CD PIPELINES", path: "/services/DEVOPS%20%26%20CI%2FCD%20PIPELINES" },
//     { title: "AI & AUTOMATION SOLUTIONS", path: "/services/AI%20%26%20AUTOMATION%20SOLUTIONS" },
//     { title: "HARDWARE PROCUREMENT & SETUP", path: "/services/HARDWARE%20PROCUREMENT%20%26%20SETUP" }
//     ];

//     const handleCareersLinkClick = (event) => {
//         event.preventDefault(); // Prevents the default anchor tag behavior
//         navigate('/careers#careers-top'); // Programmatically navigates to the careers page and hash
//     };

//     return (
//         <footer className="footer" ref={ref}> {/* Attach the ref to the footer element */}
//             <div className="footer-inner-wrapper">
//                 {/* About Us Section */}
//                 <div className="about-section">
//                     <div className="about-container">
//                         <div className="about-header">
//                             <h1 id="about">About Us</h1>
//                         </div>
//                         <p className="about-description">
//                             WebArtifacts is a leading IT solutions provider dedicated to helping businesses
//                             leverage technology for growth and efficiency. With our team of certified experts,
//                             we deliver innovative solutions tailored to your unique needs.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Divider Line */}
//                 <div className="section-divider"></div>

//                 <div className="footer-container">
//                     <div className="footer-grid">
//                         {/* Company Info */}
//                         <div className="footer-section">
//                             <img src={WebArtifactsLogo} alt="WebArtifacts Logo" className="company-logo" />
//                             <p className="company-description">
//                                 Delivering secure, scalable and affordable IT solutions to power your business growth and digital transformation.
//                             </p>
//                             <div className="social-icons">
//                                 <a href="https://www.facebook.com/share/1GPnZfjhDJ/" target="_blank" className="social-icon facebook">
//                                     <FaFacebook size={20} />
//                                 </a>
//                                 <a href="https://x.com/WebArtifacts" target="_blank" className="social-icon twitter">
//                                     <FaTwitter size={20} />
//                                 </a>
//                                 <a href="https://www.linkedin.com/company/webartifactsind/about/" target="_blank" className="social-icon linkedin">
//                                     <FaLinkedin size={20} />
//                                 </a>
//                                 <a href="https://www.instagram.com/webartifacts_/" target="_blank" className="social-icon instagram">
//                                     <FaInstagram size={20} />
//                                 </a>
//                             </div>
//                         </div>

//                         {/* Services */}
//                         <div className="footer-section">
//                             <h4 className="footer-heading">Our Services</h4>
//                             <div className="services-scroll-container">
//                                 <ul className="footer-links services-list">
//                                     {services.map((service, index) => (
//                                         <li key={index} className="footer-link">
//                                             <a href={service.path}>{service.title}</a>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>

//                         {/* Quick Links */}
//                         <div className="footer-section">
//                             <h4 className="footer-heading">Quick Links</h4>
//                             <ul className="footer-links">
//                                 <li className="footer-link">
//                                     <Link to="/#testimonials">Testimonials</Link>
//                                 </li>
//                                 <li className="footer-link">Case Studies</li>
//                                 <li className="footer-link">Blog</li>
//                                 <li className="footer-link">
//                                     <a href="/careers#careers-top" onClick={handleCareersLinkClick}>
//                                         Careers
//                                     </a>
//                                 </li>
//                                 <li className="footer-link">
//                                     <Link to="/login#top" >
//                                         LOGIN
//                                     </Link>
//                                 </li>
//                                 <li className="footer-link"><Link to="https://www.google.com/maps/place/WebArtifacts+Pvt+Ltd/@21.1102353,79.1006327,17z/data=!3m1!4b1!4m16!1m9!4m8!1m0!1m6!1m2!1s0x3bd4bf12b2fbcbe1:0x8930218e8469a6b6!2splot+no+20,+Manewada+Rd,+behind+Venu+Corner,+Bhoyar+Layout,+Balaji+Nagar,+Rameshwari,+Nagpur,+Maharashtra+440027!2m2!1d79.1032076!2d21.1102353!3m5!1s0x3bd4bf12b2fbcbe1:0x8930218e8469a6b6!8m2!3d21.1102353!4d79.1032076!16s%2Fg%2F11xrhhdhp1?hl=en-IN&entry=ttu&g_ep=EgoyMDI1MDgwNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" >Sitemap</Link></li>
//                             </ul>
//                         </div>

//                         {/* Contact Info */}
//                         <div className="footer-section">
//                             <h4 className="footer-heading">Contact Us</h4>
//                             <div className="footer-links">
//                                 <div className="contact-item">
//                                     <FaMapMarkerAlt className="contact-icon" />
//                                     <p>Plot no.20, Behind Venue Corner, Balaji Nagar, Nagpur, Maharashtra 440027</p>
//                                 </div>
//                                 <div className="contact-item">
//                                     <FaPhone className="contact-icon" />
//                                     <p>+91 7758969022</p>
//                                 </div>
//                                 <div className="contact-item">
//                                     <FaEnvelope className="contact-icon" />
//                                     <p>webartifactsind@gmail.com</p>
//                                 </div>
//                                 <div className="contact-item">
//                                     <FaClock className="contact-icon" />
//                                     <p>Monday to Saturday : 10AM - 6PM</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Copyright */}
//                     <div className="copyright">
//                         <div className="section-divider"></div>
//                         <div className="copyright-content">
//                             <p>© {new Date().getFullYear()} WebArtifacts. All rights reserved.</p>
//                             <div className="copyright-links">
//                                 <a href="#" className="copyright-link">Terms of Service</a>
//                                 <a href="#" className="copyright-link">Privacy Policy</a>
//                                 <a href="#" className="copyright-link">Cookie Policy</a>
//                             </div>
//                         </div>
//                         <div className="footer-bottom-space"></div>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// });

// export default Footer;