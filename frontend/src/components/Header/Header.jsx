import { useContext } from "react";
import HeaderNoConnect from "./HeaderNoConnect";
import HeaderConnect from "./HeaderConnect";
import AuthContext from "../../context/AuthContext";

function Header() {
  const auth = useContext(AuthContext);
  return (
    <>
      {!auth.user && <HeaderNoConnect />}
      {auth.user && <HeaderConnect />}
    </>
  );
}

export default Header;
