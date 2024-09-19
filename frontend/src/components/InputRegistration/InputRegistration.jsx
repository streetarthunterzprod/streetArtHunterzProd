/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import anonymous from "../../assets/images/img/pngwing.com.png";
import AnonymousRegister from "../../assets/images/img/anonymous_register.png";
import "./inputRegistration.css";

function InputRegistration() {
  // HOOK de Navigation
  const navigate = useNavigate();

  // State input Pseudo - Email - Password - Confirm Password//
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Gestion changement Pseudo //
  const HandlePseudoChange = (event) => {
    setPseudo(event.target.value);
  };
  // Gestion changement Email //
  const HandleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  // Gestion changement Password //
  const HandlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const HandleconfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Gestion soumission de formulaire //
  const handleSubmit = async (event) => {
    event.preventDefault();
    const registrationDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Api Call pour création nouvel utilisateur //
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pseudo,
            email,
            password,
            registration_date: registrationDate,
            score: 0,
            admin: 0,
          }),
        }
      );
      if (response.status === 201) {
        const user = await response.json();
        navigate("/");
      } else {
        console.error("veuillez verifier votre saisie.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Function to handle the "Enter" key being pressed in the input field
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <section className="Display_Desktop_Register Global_height">
      <div className="Picture_DesKtop_Register">
        <img className="AnonymousReg" src={AnonymousRegister} alt="paintMan" />
      </div>
      <div className="Block_Register">
        <div className="Register">
          <h1 className="Title_Register">REGISTER</h1>
          <div className="Pseudo_Register">
            <p>Choose a pseudo</p>
            <input
              className="Input_Register"
              type="text"
              placeholder=""
              value={pseudo}
              onChange={HandlePseudoChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="Pseudo_Register">
            <p>Enter your mail</p>
            <input
              className="Input_Register"
              type="text"
              placeholder=""
              value={email}
              onChange={HandleEmailChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="Password_Register">
            <p>Choose a password</p>
            <input
              className="Input_Register"
              type="password"
              placeholder=""
              value={password}
              onChange={HandlePasswordChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="Password_Register">
            <p>Confirm password</p>
            <input
              className="Input_Register"
              type="password"
              placeholder=""
              value={confirmPassword}
              onChange={HandleconfirmPasswordChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div
            className="Button-Register"
            role="button"
            onClick={handleSubmit}
            onKeyDown={handleKeyDown}
            tabIndex="0"
          >
            VALIDATION
          </div>
        </div>
        <div className="Anonymous_Register">
          <img
            className="Anonymus_Picture_Register"
            src={anonymous}
            alt="Anonymous"
          />
        </div>
      </div>
      <div className="Picture_DesKtop_Register">
        <img
          className="AnonymousReg AnonymousReg_right"
          src={AnonymousRegister}
          alt="paintMan"
        />
      </div>
    </section>
  );
}
export default InputRegistration;
