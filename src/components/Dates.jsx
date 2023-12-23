import { useRef, useState, useEffect } from "react";
import "../styles/dates.css";
import { register } from "swiper/element/bundle";
export default function Dates({ onChangeDate, currentMonth }) {
  const swiperRef = useRef(null);
  let days = [];
  const date = new Date();
  const today = date.getDate();
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  for (let index = today; index <= daysInMonth; index++) {
    days.push(index);
  }
  useEffect(() => {
    // Register Swiper web component
    register();

    // Add event listener
    swiperRef.current.addEventListener("swiperslidechange", (e) => {
      onChangeDate(days[e.detail[0].activeIndex]);
    });

    // Object with parameters
    const params = {
      // or pass it in on
      on: {
        slideChange(s) {
          console.log(s);
        },
      },
    };

    // Assign it to swiper element
    Object.assign(swiperRef.current, params);

    // initialize swiper
    swiperRef.current.initialize();
  }, []);
  return (
    <swiper-container
      class="mySwiper"
      space-between="16"
      slides-per-view="auto"
      centered-slides="true"
      ref={swiperRef}
    >
      {days.map((day, index) => (
        <swiper-slide key={index}>
          {day == new Date().getDate() ? (
            "Today"
          ) : (
            <div className="date-wrapper">
              <span>{currentMonth}</span>
              <span>{day}</span>
            </div>
          )}
        </swiper-slide>
      ))}
    </swiper-container>
  );
}
