import React from "react";
import Header from "../shared/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/Footer";

const MainLayout = () => {
  const location = useLocation();

  let showFooter = true;
  if (location.pathname === "/signin" || location.pathname === "/register") {
    showFooter = false;
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-screen"> {/* Full height layout */}
      <Header />
      <div className="flex-grow"> {/* Content area will grow */}
        <Outlet />
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
