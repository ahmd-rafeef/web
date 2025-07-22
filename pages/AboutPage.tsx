import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="text-center py-10 px-4">
      <h1 className="text-4xl font-bold text-brand-primary mb-4">About CHAMP</h1>
      <p className="text-lg text-brand-secondary max-w-2xl mx-auto">
        CHAMP is the premier destination for sourcing the most sought-after luxury and exclusive sneakers. We are dedicated to providing collectors and enthusiasts with authentic, high-quality products and a seamless shopping experience.
      </p>
      <div className="mt-12 p-6 bg-brand-surface rounded-lg max-w-md mx-auto border border-brand-border shadow-sm">
        <h2 className="text-xl font-semibold text-brand-primary mb-2">Admin Access</h2>
        <p className="text-brand-secondary">
          To manage products and store settings, please navigate directly to the admin panel.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          (Bookmark the <code className="bg-gray-100 px-1.5 py-1 rounded text-brand-accent">/admin</code> route for easy access)
        </p>
      </div>
    </div>
  );
};

export default AboutPage;