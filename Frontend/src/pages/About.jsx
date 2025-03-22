import React from 'react';

function About() {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">About Us</h2>
      <p className="text-center text-gray-600 mb-6">
        We are a company committed to providing excellent service and high-quality products to our customers.
      </p>
      
      <p className="text-center text-gray-800 mb-4">
        Our mission is to ensure customer satisfaction and create long-lasting relationships through top-notch customer support and innovative solutions.
      </p>

      <div className="mt-6 text-center">
        <p className="text-gray-600">Want to learn more? Feel free to get in touch!</p>
      </div>
    </div>
  );
}

export default About;
