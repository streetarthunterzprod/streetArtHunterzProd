/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../mailForm.css";
import "./reclamation.css";
import AnonymousMegaphone from "../../../assets/images/img/anonymous_megaphonev3.png";

function Reclamation() {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  async function sendEmail() {
    console.info(email, text);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/mail/claim`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: email,
            text,
          }),
        }
      );

      if (response.status === 200) {
        console.info("email envoyée");
        setIsEmailSent(true);
        toast.success("Your mail is send");
      } else {
        toast.error(
          "An error occurred while sending the email. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while sending the email. Please try again."
      );
    }
  }

  return (
    <div className="Main_ContactUs Main_MailUs">
      <div className="anonymousMegaphone_container">
        <img
          src={AnonymousMegaphone}
          alt="anonymous question"
          className="anonymousMegaphone anonymousMegaphone_right"
        />{" "}
      </div>
      <div className="MailUs_Form MailUs_Form_claim">
        {!isEmailSent && (
          <>
            <h2
              onClick={() => {
                navigate("/contactus");
              }}
              onKeyDown={() => {
                navigate("/contactus");
              }}
              role="button"
              tabIndex={0}
            >
              claim
            </h2>
            <h3>Email</h3>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              name="email"
              placeholder="votrenom@domaine.fr"
            />
            <h3>Question</h3>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              type="text"
              name="body"
              placeholder="What is your claim brother ?"
            />

            <input
              type="button"
              className="contact_send_btn"
              value="SEND"
              onClick={() => sendEmail()}
            />
          </>
        )}
        {isEmailSent && (
          <>
            <p className="SendEmailConfirmation">email successfully sent !</p>
            <div
              className="contact_back_btn"
              onClick={() => {
                navigate("/contactus");
              }}
              onKeyDown={() => {
                navigate("/contactus");
              }}
              role="button"
              tabIndex={0}
            >
              BACK
            </div>
          </>
        )}
      </div>
      <div className="anonymousMegaphone_container">
        <img
          src={AnonymousMegaphone}
          alt="anonymous question"
          className="anonymousMegaphone"
        />{" "}
      </div>
    </div>
  );
}

export default Reclamation;
