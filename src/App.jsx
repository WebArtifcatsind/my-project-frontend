// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import PublicTestimonials from "./pages/PublicTestimonials";
import ClientComplaintForm from "./pages/ClientComplaintForm";
import ClientFeedbackForm from "./pages/ClientFeedbackForm";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import About from "./pages/About";

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    // If we're already on the correct page, just scroll to the section.
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Otherwise, navigate to the home page with a state, which triggers a scroll after navigation.
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  // This useEffect listens for the 'scrollTo' state from the navigation
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Clear the state so subsequent visits don't scroll unexpectedly
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state]);

  return (
    <Routes>
      {/* Routes that need the Navbar and Footer */}
      <Route path="/" element={<Layout scrollToSection={scrollToSection}><Home /></Layout>} />
      <Route path="/services/:serviceName" element={<Layout scrollToSection={scrollToSection}><ServiceDetail /></Layout>} />
      <Route path="/testimonials" element={<Layout scrollToSection={scrollToSection}><PublicTestimonials /></Layout>} />
      <Route path="/client/complaint" element={<Layout scrollToSection={scrollToSection}><ClientComplaintForm /></Layout>} />
      <Route path="/client/feedback" element={<Layout scrollToSection={scrollToSection}><ClientFeedbackForm /></Layout>} />
      <Route path="/contact" element={<Layout scrollToSection={scrollToSection}><Contact /></Layout>} />
      <Route path="/careers" element={<Layout scrollToSection={scrollToSection}><Careers /></Layout>} />
      <Route path="/admin-dashboard" element={<Layout scrollToSection={scrollToSection}><AdminDashboard /></Layout>} />
      <Route path="/staff-dashboard" element={<Layout scrollToSection={scrollToSection}><StaffDashboard /></Layout>} />

      {/* Legal pages (with Layout so they include header/footer) */}
      <Route path="/terms" element={<Layout scrollToSection={scrollToSection}><Terms /></Layout>} />
      <Route path="/privacy" element={<Layout scrollToSection={scrollToSection}><Privacy /></Layout>} />
      <Route path="/cookies" element={<Layout scrollToSection={scrollToSection}><Cookies /></Layout>} />
      <Route path="/about" element={<Layout scrollToSection={scrollToSection}><About /></Layout>} />

      {/* Routes without the Navbar and Footer */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
























// // src/App.js
// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
// import StaffDashboard from "./pages/StaffDashboard";
// import PublicTestimonials from "./pages/PublicTestimonials";
// import ClientComplaintForm from "./pages/ClientComplaintForm";
// import ClientFeedbackForm from "./pages/ClientFeedbackForm";
// import ServiceDetail from "./pages/ServiceDetail";
// import Contact from "./pages/Contact";
// import Careers from "./pages/Careers";
// import Terms from "./pages/Terms";
// import Privacy from "./pages/Privacy";
// import Cookies from "./pages/Cookies";

// const AppContent = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const scrollToSection = (sectionId) => {
//     // If we're already on the correct page, just scroll to the section.
//     if (location.pathname === '/') {
//       const element = document.getElementById(sectionId);
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     } else {
//       // Otherwise, navigate to the home page with a state, which triggers a scroll after navigation.
//       navigate('/', { state: { scrollTo: sectionId } });
//     }
//   };

//   // This useEffect listens for the 'scrollTo' state from the navigation
//   useEffect(() => {
//     if (location.state && location.state.scrollTo) {
//       const element = document.getElementById(location.state.scrollTo);
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//         // Clear the state so subsequent visits don't scroll unexpectedly
//         window.history.replaceState({}, document.title);
//       }
//     }
//   }, [location.state]);

//   return (
//     <Routes>
//       {/* Routes that need the Navbar and Footer */}
//       <Route path="/" element={<Layout scrollToSection={scrollToSection}><Home /></Layout>} />
//       <Route path="/services/:serviceName" element={<Layout scrollToSection={scrollToSection}><ServiceDetail /></Layout>} />
//       <Route path="/testimonials" element={<Layout scrollToSection={scrollToSection}><PublicTestimonials /></Layout>} />
//       <Route path="/client/complaint" element={<Layout scrollToSection={scrollToSection}><ClientComplaintForm /></Layout>} />
//       <Route path="/client/feedback" element={<Layout scrollToSection={scrollToSection}><ClientFeedbackForm /></Layout>} />
//       <Route path="/contact" element={<Layout scrollToSection={scrollToSection}><Contact /></Layout>} />
//       <Route path="/careers" element={<Layout scrollToSection={scrollToSection}><Careers /></Layout>} />
//       <Route path="/admin-dashboard" element={<Layout scrollToSection={scrollToSection}><AdminDashboard /></Layout>} />
//       <Route path="/staff-dashboard" element={<Layout scrollToSection={scrollToSection}><StaffDashboard /></Layout>} />

//       {/* Routes without the Navbar and Footer */}
//       <Route path="/login" element={<Login />} />
//     </Routes>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// };

// export default App;













// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
// import StaffDashboard from "./pages/StaffDashboard";
// import PublicTestimonials from "./pages/PublicTestimonials";
// import ClientComplaintForm from "./pages/ClientComplaintForm";
// import ClientFeedbackForm from "./pages/ClientFeedbackForm";
// import ServiceDetail from "./pages/ServiceDetail";
// import Contact from "./pages/Contact";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public routes with Navbar & Footer */}
//         <Route path="/" element={<Layout><Home /></Layout>} />
//         <Route path="/services/:serviceName" element={<Layout><ServiceDetail /></Layout>} />
//         <Route path="/testimonials" element={<Layout><PublicTestimonials /></Layout>} />
//         <Route path="/client/complaint" element={<Layout><ClientComplaintForm /></Layout>} />
//         <Route path="/client/feedback" element={<Layout><ClientFeedbackForm /></Layout>} />
//         <Route path="/contact" element={<Layout><Contact /></Layout>} />

//         {/* Auth routes with Navbar & Footer */}
//         <Route path="/admin-dashboard" element={<Layout><AdminDashboard /></Layout>} />
//         <Route path="/staff-dashboard" element={<Layout><StaffDashboard /></Layout>} />

//         {/* Auth routes without Layout */}
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;










