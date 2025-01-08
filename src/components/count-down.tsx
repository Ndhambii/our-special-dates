"use client"
// components/CountdownTimer.tsx
import { useState, useEffect, JSX } from "react";

const CountdownTimer: React.FC = () => {
  const [eventName, setEventName] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [countdownStarted, setCountdownStarted] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {

    if (countdownStarted && eventDate) {

      const countdownInterval = setInterval(() => {

        const currentTime = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        let remainingTime = eventTime - currentTime;

        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(countdownInterval);
          alert("Countdown complete!");
        }

        setTimeRemaining(remainingTime);
      }, 1000);

      return () => clearInterval(countdownInterval);

    }
    
  }, [countdownStarted, eventDate]);

  useEffect(() => {
    if (countdownStarted) {
      document.title = eventName || "Our Special Dates";
    }
  }, [countdownStarted, eventName]);

  const handleSetCountdown = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setCountdownStarted(true);
    localStorage.setItem("eventDate", eventDate);
    localStorage.setItem("eventName", eventName);
    console.log("nome: " + eventName);
    console.log("data: " + eventDate);
  };

  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatTime = (time: number): JSX.Element => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return (
      <div className="countdown-display">
        <div className="countdown-value">
          {days.toString().padStart(2, "0")} <span>days</span>
        </div>
        <div className="countdown-value">
          {hours.toString().padStart(2, "0")} <span>hours</span>
        </div>
        <div className="countdown-value">
          {minutes.toString().padStart(2, "0")} <span>minutes</span>
        </div>
        <div className="countdown-value">
          {seconds.toString().padStart(2, "0")} <span>seconds</span>
        </div>
      </div>
    );
  };

  return (
    <div className="countdown-timer-container">
      <h2 className="countdown-name jersey-10-regular">
        {countdownStarted ? eventName : "Our Special Dates"}
      </h2>
      <p className="countdown-date">
         {countdownStarted && ("---" + formatDate(eventDate) + "---")} 
      </p>

      {formatTime(timeRemaining)}
       
    </div>
  );
};

export default CountdownTimer;
