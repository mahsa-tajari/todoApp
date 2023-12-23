import { useState } from "react";
import "./styles/base.css";
import Header from "./components/Header";
import Dates from "./components/dates";
import Register from "./components/Register";
import Tasks from "./components/Tasks";
function App() {
  const [registered, setRegistered] = useState(function () {
    const value = localStorage.getItem("user");
    return JSON.parse(value);
  });
  const [activeDay, setActiveDay] = useState({
    day: new Date().getDate(),
    weekDay: new Date().toLocaleDateString("en-US", { weekday: "short" }),
    month: new Date().toLocaleDateString("en-US", { month: "short" }),
  });
  function activeDayHandler(newActiveDay) {
    const date = new Date();
    const fullDate = new Date(date.getYear(), date.getMonth(), newActiveDay);
    const weekday = fullDate.toLocaleDateString("en-US", { weekday: "short" });
    setActiveDay({ ...activeDay, day: newActiveDay, weekDay: weekday });
  }

  function registerHandler() {
    setRegistered(JSON.parse(localStorage.getItem("user")));
  }
  return (
    <div className="container">
      {registered ? (
        <>
          <Header userInfo={registered} />
          <Dates
            onChangeDate={activeDayHandler}
            currentMonth={activeDay.month}
          ></Dates>
          <Tasks activeDate={activeDay}></Tasks>
        </>
      ) : (
        <Register onRegister={registerHandler} />
      )}
    </div>
  );
}

export default App;
