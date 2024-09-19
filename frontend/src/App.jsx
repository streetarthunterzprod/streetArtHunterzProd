import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const location = useLocation();
  const hideHeaderFooter = ["/"];
  const showHeaderFooter = !hideHeaderFooter.includes(location.pathname);

  return (
    <main>
      {showHeaderFooter && <Header />}
      <Outlet />
      {showHeaderFooter && <Footer />}
    </main>
  );
}

export default App;
