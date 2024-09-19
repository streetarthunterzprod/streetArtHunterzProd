/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../mailForm.css";
import "./askUs.css";
import AnonymousQuestion from "../../../assets/images/img/anonymous_question.png";

function AskUs() {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  async function sendEmail() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/mail/question`,
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
      <div className="anonymousQuestion_container">
        <img
          src={AnonymousQuestion}
          alt="anonymous question"
          className="anonymousquestion"
        />{" "}
      </div>
      <div className="MailUs_Form">
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
              ¿ question ?
            </h2>
            <h3>Email</h3>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              name="email"
              placeholder="votrenom@domaine.fr"
            />
            <input type="hidden" name="object" value="a new question" />
            <h3>Question</h3>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              type="text"
              name="body"
              placeholder="Write your questions !"
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
              role="button"
              tabIndex="0"
              onClick={() => {
                navigate("/contactus");
              }}
              onKeyDown={() => {
                navigate("/contactus");
              }}
            >
              BACK
            </div>
          </>
        )}
      </div>
      <div className="anonymousQuestion_container">
        <img
          src={AnonymousQuestion}
          alt="anonymous question"
          className="anonymousquestion anonymousquestion_left"
        />{" "}
      </div>
    </div>
  );
}

export default AskUs;
