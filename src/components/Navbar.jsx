// src/components/Navbar.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import logoImage from '../navimages/black-WebArtifacts_transparent_final.png';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [showServicesDropdown, setShowServicesDropdown] = useState(false);
    const [showSupportDropdown, setShowSupportDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const servicesDropdownRef = useRef(null);
    const supportDropdownRef = useRef(null);
    const navLinksRef = useRef(null);

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

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        try {
            if (loggedInUser) {
                setUser(JSON.parse(loggedInUser));
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
            localStorage.clear();
        }
    }, [location]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNavLinkClick = useCallback(() => {
        setShowServicesDropdown(false);
        setShowSupportDropdown(false);
        setShowMobileMenu(false);
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
                setShowServicesDropdown(false);
            }
            if (supportDropdownRef.current && !supportDropdownRef.current.contains(event.target)) {
                setShowSupportDropdown(false);
            }
            const toggleButton = document.querySelector('.menu-toggle');
            if (showMobileMenu && navLinksRef.current && !navLinksRef.current.contains(event.target) && (!toggleButton || !toggleButton.contains(event.target))) {
                setShowMobileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [showMobileMenu, handleNavLinkClick]);

    const toggleServices = (e) => {
        e.preventDefault();
        setShowServicesDropdown(!showServicesDropdown);
        setShowSupportDropdown(false);
    };

    const toggleSupport = (e) => {
        e.preventDefault();
        setShowSupportDropdown(!showSupportDropdown);
        setShowServicesDropdown(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    // This function handles the scroll logic for the "About Us" and "Contact Us" links.
    const handleScrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        handleNavLinkClick();
    };

    return (
        <nav className={`navbar ${scrolled ? 'shadow-lg' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="brand" onClick={() => { window.scrollTo(0, 0); handleNavLinkClick(); }}>
                    <img src={logoImage} alt="WebArtifacts Logo" className="navbar-logo" />
                </Link>

                <div className="menu-toggle" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    {showMobileMenu ? <FaTimes /> : <FaBars />}
                </div>

                <div className={`nav-links ${showMobileMenu ? 'mobile-nav-active' : ''}`} ref={navLinksRef}>
                    <div className="support-container" ref={servicesDropdownRef}>
                        <Link to="#" onClick={toggleServices} className="nav-link">SERVICES</Link>
                        <div className={`support-menu ${showServicesDropdown ? 'show-dropdown' : ''}`}>
                            {services.map((service, index) => (
                                <Link
                                    key={index}
                                    to={`${service.path}#service-detail-top`}
                                    className="support-item"
                                    onClick={() => {
                                        handleNavLinkClick();
                                        window.scrollTo({ top: 0, behavior: 'auto' });
                                    }}
                                >
                                    {service.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="support-container" ref={supportDropdownRef}>
                        <Link to="#" onClick={toggleSupport} className="nav-link">SUPPORT CENTRE</Link>
                        <div className={`support-menu ${showSupportDropdown ? 'show-dropdown' : ''}`}>
                            <Link to="/client/complaint" className="support-item" onClick={handleNavLinkClick}>COMPLAINT</Link>
                            <Link to="/client/feedback" className="support-item" onClick={handleNavLinkClick}>FEEDBACK</Link>
                            <a
                                href="/#testimonials"
                                className="support-item"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/#testimonials');
                                }}
                            >
                                TESTIMONIALS
                            </a>
                        </div>
                    </div>

                    <Link
                        to="/careers#careers-top"
                        className="nav-link"
                        onClick={handleNavLinkClick}
                    >
                        CAREERS
                    </Link>

                    {/* This is the corrected 'About Us' link */}
                    <a
                        href={location.pathname + '#about'}
                        className="nav-link"
                        onClick={(e) => {
                            e.preventDefault();
                            handleScrollToSection('about');
                        }}
                    >
                        ABOUT US
                    </a>

                    {user ? (
                        <>
                            {(user.role === 'admin' || user.role === 'Admin') && (
                                <Link to="/admin-dashboard" className="nav-link" onClick={handleNavLinkClick}>
                                    ADMIN DASHBOARD
                                </Link>
                            )}
                            {(user.role === 'staff' || user.role === 'Staff') && (
                                <Link to="/staff-dashboard" className="nav-link" onClick={handleNavLinkClick}>
                                    STAFF DASHBOARD
                                </Link>
                            )}
                            <button onClick={handleLogout} className="logout-btn">LOGOUT</button>
                        </>
                    ) : (
                        <a
                            href={location.pathname + '#contact-form'}
                            className="contact-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                handleScrollToSection('contact-form');
                            }}
                        >
                            CONTACT US
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;




// // Navbar.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import './Navbar.css';
// import logoImage from '../navimages/black-WebArtifacts_transparent_final.png';

// const Navbar = ({ footerRef }) => { // Accept footerRef as a prop
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
//   const [showServicesDropdown, setShowServicesDropdown] = useState(false);
//   const [showSupportDropdown, setShowSupportDropdown] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   const servicesDropdownRef = useRef(null);
//   const supportDropdownRef = useRef(null);
//   const navLinksRef = useRef(null);

//   const services = [
//     { title: "MANAGED IT SUPPORT", path: "/services/MANAGED%20IT%20SUPPORT" },
//     { title: "CLOUD DEPLOYMENT & BACKUP", path: "/services/CLOUD%20DEPLOYMENT%20%26%20BACKUP" },
//     { title: "CUSTOM SOFTWARE DEVELOPMENT", path: "/services/CUSTOM%20SOFTWARE%20DEVELOPMENT" },
//     { title: "CYBERSECURITY CONSULTING", path: "/services/CYBERSECURITY%20CONSULTING" },
//     { title: "WEBSITE & APP DEVELOPMENT", path: "/services/WEBSITE%20%26%20APP%20DEVELOPMENT" },
//     { title: "ERP & DOCUMENT MANAGEMENT", path: "/services/ERP%20%26%20DOCUMENT%20MANAGEMENT" },
//     { title: "HELP DESK SUPPORT", path: "/services/HELP%20DESK%20SUPPORT" },
//     { title: "BACKUP & DISASTER RECOVERY", path: "/services/BACKUP%20%26%20DISASTER%20RECOVERY" },
//     { title: "NETWORK & SERVER MANAGEMENT", path: "/services/NETWORK%20%26%20SERVER%20MANAGEMENT" },
//     { title: "IT CONSULTING / VIRTUAL CIO", path: "/services/IT%20CONSULTING%20%2F%20VIRTUAL%20CIO" },
//     { title: "VOIP / UNIFIED COMMUNICATION", path: "/services/VOIP%20%2F%20UNIFIED%20COMMUNICATION" },
//     { title: "DATA ANALYTICS & DASHBOARDS", path: "/services/DATA%20ANALYTICS%20%26%20DASHBOARDS" },
//     { title: "REMOTE WORK ENABLEMENT", path: "/services/REMOTE%20WORK%20ENABLEMENT" },
//     { title: "DEVOPS & CI/CD PIPELINES", path: "/services/DEVOPS%20%26%20CI%2FCD%20PIPELINES" },
//     { title: "AI & AUTOMATION SOLUTIONS", path: "/services/AI%20%26%20AUTOMATION%20SOLUTIONS" },
//     { title: "HARDWARE PROCUREMENT & SETUP", path: "/services/HARDWARE%20PROCUREMENT%20%26%20SETUP" }
//   ];

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem('user');
//     try {
//       if (loggedInUser) {
//         setUser(JSON.parse(loggedInUser));
//       } else {
//         setUser(null);
//       }
//     } catch {
//       setUser(null);
//       localStorage.clear();
//     }
//   }, [location]);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
//         setShowServicesDropdown(false);
//       }
//       if (supportDropdownRef.current && !supportDropdownRef.current.contains(event.target)) {
//         setShowSupportDropdown(false);
//       }
//       const toggleButton = document.querySelector('.menu-toggle');
//       if (showMobileMenu && navLinksRef.current && !navLinksRef.current.contains(event.target) && (!toggleButton || !toggleButton.contains(event.target))) {
//         setShowMobileMenu(false);
//       }
//     };
//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => document.removeEventListener('mousedown', handleOutsideClick);
//   }, [showMobileMenu]);

//   const toggleServices = (e) => {
//     e.preventDefault();
//     setShowServicesDropdown(!showServicesDropdown);
//     setShowSupportDropdown(false);
//   };

//   const toggleSupport = (e) => {
//     e.preventDefault();
//     setShowSupportDropdown(!showSupportDropdown);
//     setShowServicesDropdown(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/');
//   };

//   const handleContactClick = (e) => {
//     e.preventDefault();
//     setShowMobileMenu(false);
//     if (location.pathname === '/contact') {
//       const formElement = document.getElementById('contact-form');
//       if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       else window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else {
//       navigate('/contact#contact-form');
//     }
//   };

//   const handleNavLinkClick = () => {
//     setShowServicesDropdown(false);
//     setShowSupportDropdown(false);
//     setShowMobileMenu(false);
//   };

//   // NEW: handleAboutClick uses the footerRef
//   const handleAboutClick = (e) => {
//     e.preventDefault();
//     if (footerRef && footerRef.current) {
//       footerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//     handleNavLinkClick(); // Close mobile menu/dropdowns
//   };

//   return (
//     <nav className={`navbar ${scrolled ? 'shadow-lg' : ''}`}>
//       <div className="nav-container">
//         <Link to="/" className="brand" onClick={() => { window.scrollTo(0, 0); handleNavLinkClick(); }}>
//           <img src={logoImage} alt="WebArtifacts Logo" className="navbar-logo" />
//         </Link>

//         <div className="menu-toggle" onClick={() => setShowMobileMenu(!showMobileMenu)}>
//           {showMobileMenu ? <FaTimes /> : <FaBars />}
//         </div>

//         <div className={`nav-links ${showMobileMenu ? 'mobile-nav-active' : ''}`} ref={navLinksRef}>
//           <div className="support-container" ref={servicesDropdownRef}>
//             <Link to="#" onClick={toggleServices} className="nav-link">SERVICES</Link>
//             <div className={`support-menu ${showServicesDropdown ? 'show-dropdown' : ''}`}>
//               {services.map((service, index) => (
//                 <Link
//                   key={index}
//                   to={`${service.path}#service-detail-top`}
//                   className="support-item"
//                   onClick={() => {
//                     handleNavLinkClick();
//                     window.scrollTo({ top: 0, behavior: 'auto' });
//                   }}
//                 >
//                   {service.title}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <div className="support-container" ref={supportDropdownRef}>
//             <Link to="#" onClick={toggleSupport} className="nav-link">SUPPORT CENTRE</Link>
//             <div className={`support-menu ${showSupportDropdown ? 'show-dropdown' : ''}`}>
//               <Link to="/client/complaint" className="support-item" onClick={handleNavLinkClick}>COMPLAINT</Link>
//               <Link to="/client/feedback" className="support-item" onClick={handleNavLinkClick}>FEEDBACK</Link>
//               <Link to="/#testimonials" className="support-item" onClick={handleNavLinkClick}>TESTIMONIALS</Link>
//             </div>
//           </div>

//           <Link
//             to="/careers#careers-top"
//             className="nav-link"
//             onClick={handleNavLinkClick}
//           >
//             CAREERS
//           </Link>

//           {/* UPDATED: About Us link now uses handleAboutClick */}
//           <Link
//             to="#"
//             className="nav-link"
//             onClick={handleAboutClick}
//           >
//             ABOUT US
//           </Link>
          
//           {user ? (
//             <>
//               {(user.role === 'admin' || user.role === 'Admin') && (
//                 <Link to="/admin-dashboard" className="nav-link" onClick={handleNavLinkClick}>
//                   ADMIN DASHBOARD
//                 </Link>
//               )}
//               {(user.role === 'staff' || user.role === 'Staff') && (
//                 <Link to="/staff-dashboard" className="nav-link" onClick={handleNavLinkClick}>
//                   STAFF DASHBOARD
//                 </Link>
//               )}
//               <button onClick={handleLogout} className="logout-btn">LOGOUT</button>
//             </>
//           ) : (
//             <Link to="/contact" className="contact-btn" onClick={handleContactClick}>
//               CONTACT US
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;