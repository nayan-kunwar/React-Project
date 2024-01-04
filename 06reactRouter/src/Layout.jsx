import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet /> {/* Now outlet can be changed accordingly, header and footer will be same */}
      <Footer />
    </>
  );
}
