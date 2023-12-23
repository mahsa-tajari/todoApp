import { useEffect, useState } from "react";
import "../styles/register.css";
import SelectAvatar from "./SelectAvatar";
import Button from "./Button";
export default function Register({ onRegister }) {
  const [popup, setPopup] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState(function () {
    const gender = localStorage.getItem("gender");
    const avatarIndex = localStorage.getItem("avatarIndex");
    const value = avatarIndex
      ? `Local images/${gender}/Image${avatarIndex}`
      : "";
    return value;
  });
  const [openImgs, setOpenImgs] = useState(false);
  useEffect(function () {
    setTimeout(() => {
      setPopup((popup) => !popup);
    }, 1000);
    return function () {
      setPopup((popup) => !popup);
    };
  }, []);
  function formHandler() {
    const userInfo = { name: userName, avatarUrl: avatar };
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUserName("");
    setAvatar("");
    onRegister();
  }

  function openImgsHndler() {
    setOpenImgs((prev) => !prev);
  }

  return !openImgs ? (
    <div className={popup ? "register-wrapper show-popup" : "register-wrapper"}>
      <div className="register-text">
        <span>Welcome to Todo app</span>
      </div>
      <form action="#" className="register-form--wrapper">
        <div className="register-form--input">
          <label htmlFor="userName">Please enter your name!</label>
          <input
            type="text"
            name="userName"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="register-form--input">
          <label htmlFor="avatar">Please enter your profile URL!</label>
          <input
            type="text"
            name="avatar"
            className="avatar-input"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <a
            href="#"
            className="register-avatar--link"
            onClick={openImgsHndler}
          >
            Or select a photo from our avatars!
          </a>
        </div>
        <div className="register-btn--wrapper">
          <Button
            color={"#fff"}
            backgroundColor={"#278D8D"}
            border={"2px solid #000"}
            fontSize={"1rem"}
            padding={".5rem"}
            cursor={"pointer"}
            borderRadius={".8rem"}
            width={"50%"}
            margin={"1rem 0 0 0"}
            hoverBackground={"#227979"}
            action={formHandler}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  ) : (
    <SelectAvatar onClose={openImgsHndler} />
  );
}
