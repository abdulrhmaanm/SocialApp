import { Outlet } from "react-router-dom";
import { NavbarComp } from './Navbar';
import { FooterComponent } from "./Footer";

function Layout() {
  return (
    <div className="bg-gray-300 min-h-screen">
    <NavbarComp/>
      <Outlet /> {}
    <FooterComponent/>
    </div>
  );
}

export default Layout;