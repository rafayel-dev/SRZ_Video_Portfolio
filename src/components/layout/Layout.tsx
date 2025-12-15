import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "../whatsapp/WhatsAppFloat";

const Layout: React.FC = () => {
  return (
    <div className="relative hidden w-full min-h-screen text-white bg-black md:block">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Layout;
