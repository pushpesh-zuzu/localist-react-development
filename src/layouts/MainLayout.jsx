import { Outlet } from "react-router-dom";
import Navbar from "../component/common/navbar/Navbar";
import Footer from "../component/common/footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main style={{minHeight:"50vh"}}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
