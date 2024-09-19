import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./profil.css";
import UserProfil from "../UserProfil/UserProfil";
import AdminProfil from "../AdminProfil/AdminProfil";

function Profil() {
  const { user } = useContext(AuthContext);
  return <> {user.admin ? <AdminProfil /> : <UserProfil />} </>;
}

export default Profil;
