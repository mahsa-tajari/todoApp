import "../styles/header.css";

export default function Header({ userInfo }) {
  const userImg = localStorage.getItem("avatarIndex");
  const userGender = localStorage.getItem("gender");
  return (
    <header>
      <div className="profile-holder">
        <img
          src={`/src/assets/avatars/${userGender}/Avatar Image-${userImg}.jpg`}
          alt="user prof"
        />
      </div>
      <p className="header-text">Hi, {userInfo.name}!</p>
    </header>
  );
}
