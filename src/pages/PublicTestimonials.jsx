
//D:\office\webartifacts\webartifacts-frontend\src\pages\PublicTestimonials.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PublicTestimonials = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get("https://my-project-backend-tan.vercel.app/api/client/public-feedbacks")
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error("Error fetching public feedbacks", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">💬 What Our Clients Say</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {feedbacks.map((fb, idx) => (
          <div key={idx} className="bg-white shadow-md rounded p-4">
            <p className="font-semibold text-lg">🧑 {fb.name}</p>
            <p className="text-gray-600 italic">"{fb.message}"</p>
            <p className="text-sm text-gray-500 mt-2">
              🕒 {new Date(fb.submitted_at).toLocaleString()}
            </p>
          </div>
        ))}
        {feedbacks.length === 0 && (
          <p className="text-center col-span-2 text-gray-500">No feedbacks available yet.</p>
        )}
      </div>
    </div>
  );
};

export default PublicTestimonials;
