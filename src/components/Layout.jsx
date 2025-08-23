
// src/components/Layout.jsx
import React, { useRef } from "react"; // Import useRef
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const footerRef = useRef(null); // Create the ref here

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar footerRef={footerRef} /> {/* Pass the ref to Navbar */}
      <main className="flex-grow">
        {children}
      </main>
      <Footer ref={footerRef} /> {/* Pass the ref to Footer */}
    </div>
  );
};

export default Layout;




// // src/components/Layout.jsx
// import React from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// const Layout = ({ children }) => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow">
//         {children}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;