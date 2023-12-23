import { useState } from "react";
import "../styles/SelectAvatar.css";
import Button from "./Button";
export default function SelectAvatar({ onClose }) {
  const [gender, setGender] = useState("");
  const [isSelected, setIsSelected] = useState(null);

  function selectingHandler(gender, index) {
    setIsSelected(index);
    localStorage.setItem("gender", gender);
    localStorage.setItem("avatarIndex", index);
  }
  return (
    <div className="avatars-wrapper">
      <form action="#" className="register-form--wrapper photos-form-wrapper">
        <div className="register-form--input photos-form--input">
          <label htmlFor="gender">Please select your gender</label>
          <select
            className="gender-wrapper"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option></option>
            <option>Female</option>
            <option>Male</option>
          </select>
        </div>
      </form>
      {gender && (
        <div className="avatars-box">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className={
                i + 1 === isSelected
                  ? "avatar-photo-wrapper active"
                  : "avatar-photo-wrapper"
              }
            >
              <img
                src={`/src/assets/avatars/${gender}/Avatar Image-${i + 1}.jpg`}
                onClick={(e) => selectingHandler(gender, i + 1)}
              />
            </div>
          ))}
        </div>
      )}
      <Button
        action={onClose}
        color={"#fff"}
        backgroundColor={"#ff4c8e"}
        border={"none"}
        fontSize={"1rem"}
        padding={".2rem .5rem"}
        cursor={"pointer"}
        hoverBackground={"#fc3e83"}
        position={"absolute"}
        top={"-20px"}
        left={"0"}
      >
        {isSelected && gender ? "+" : "x"}
      </Button>
    </div>
  );
}
