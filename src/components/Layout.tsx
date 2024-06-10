import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="min-h-[85vh] max-w-[1080px] mx-auto pt-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;