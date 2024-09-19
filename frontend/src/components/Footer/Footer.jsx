import { useContext } from "react";
import FooterNotConnected from "./FooterNotConnected";
import FooterConnected from "./FooterConnected";
import AuthContext from "../../context/AuthContext";

function Footer() {
  const auth = useContext(AuthContext);
  return (
    <>
      {!auth.user && <FooterNotConnected />}
      {auth.user && <FooterConnected user={auth.user} />}
    </>
  );
}
export default Footer;
