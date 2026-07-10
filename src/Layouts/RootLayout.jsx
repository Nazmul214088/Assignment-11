import { Outlet } from "react-router";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const RootLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
