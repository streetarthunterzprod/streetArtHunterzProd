/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MenuBurgerConnected from "./MenuBurgerConnected";
import useUser from "../../context/AuthContext";
import "./headerConnect.css";

function HeaderAdmin() {
  const navigate = useNavigate();
  const { setUser, setIsLoading } = useContext(useUser);
  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        setUser(null);
        setIsLoading(true);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="Navbar">
      <div
        className="Title-Header"
        onClick={() => {
          navigate("/homepage");
        }}
      >
        STREET ART HUNTERZ
      </div>
      <div className="LogOut-img" onClick={logout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
        </svg>
      </div>
      <div className="Burger-Header">
        <MenuBurgerConnected />
      </div>
    </nav>
  );
}
export default HeaderAdmin;
