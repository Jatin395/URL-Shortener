import React from 'react';

function Contact() {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Contact Us</h2>
      <p className="text-center text-gray-600 mb-6">
        If you have any questions or need assistance, feel free to reach out to us directly via email.
      </p>
      
      <p className="text-center text-gray-800 mb-4">
        We will get back to you as soon as possible.
      </p>

      <div className="mt-6 text-center">
        <p className="text-gray-600">You can email us at:</p>
        <a href="mailto:company@example.com" className="text-blue-500 font-semibold">
          company@example.com
        </a>
      </div>
    </div>
  );
}

export default Contact;
