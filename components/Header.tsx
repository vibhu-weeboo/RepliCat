import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-6xl sm:text-8xl font-bold pb-2 tracking-wide title-cartoonnetwork">
        RepliCat
      </h1>
      <p className="mt-2 text-lg text-text-secondary font-medium max-w-2xl mx-auto">
        Your creative copy cat for crafting perfect AI-native prompts.
      </p>
    </header>
  );
};

export default Header;