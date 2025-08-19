


// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Careers from "./pages/Careers"; // ⬅️ ADD THIS

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes with Navbar & Footer */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/services/:serviceName" element={<Layout><ServiceDetail /></Layout>} />
        <Route path="/testimonials" element={<Layout><PublicTestimonials /></Layout>} />
        <Route path="/client/complaint" element={<Layout><ClientComplaintForm /></Layout>} />
        <Route path="/client/feedback" element={<Layout><ClientFeedbackForm /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/careers" element={<Layout><Careers /></Layout>} /> {/* ⬅️ ADD THIS */}

        {/* Auth routes with Navbar & Footer */}
        <Route path="/admin-dashboard" element={<Layout><AdminDashboard /></Layout>} />
        <Route path="/staff-dashboard" element={<Layout><StaffDashboard /></Layout>} />

        {/* Auth routes without Layout */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;













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










