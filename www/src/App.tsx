import Navbar from "@features/header/navbar.tsx";
import Footer from "@features/footer/footer.tsx";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="p-5 h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
