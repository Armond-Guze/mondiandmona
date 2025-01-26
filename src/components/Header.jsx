import React from "react";

const Header = () => {
  return (
    <div className="h-[90vh] md:h-screen w-full bg-red-300 flex items-start justify-center">
      <div className="container mx-auto px-6 text-center mt-12 md:mt-20">
        {/* Subheading (h2) */}
        <h2 className="text-white text-2xl md:text-3xl font-medium mb-4">
          Welcome to M&M Adventures
        </h2>
      </div>
    </div>
  );
};

export default Header;
