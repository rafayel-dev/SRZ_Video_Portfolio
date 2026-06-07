"use client";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "../whatsapp/WhatsAppFloat";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative hidden w-full min-h-screen text-white bg-black md:block">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Layout;
