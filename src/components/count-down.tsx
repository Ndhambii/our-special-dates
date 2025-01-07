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
      document.title = eventName || "Contagem Regrassiva";
    }
  }, [countdownStarted, eventName]);

  const handleSetCountdown = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setCountdownStarted(true);
    localStorage.setItem("eventDate", eventDate);
    localStorage.setItem("eventName", eventName);
  };

  const handleStopCountdown = (): void => {
    setCountdownStarted(false);
    setTimeRemaining(0);
  };

  const handleResetCountdown = (): void => {
    setCountdownStarted(false);
    setEventDate("");
    setEventName("");
    setTimeRemaining(0);
    localStorage.removeItem("eventDate");
    localStorage.removeItem("eventName");
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
        {countdownStarted ? eventName : "Contagem Regressiva"}
      </h2>
      <p className="countdown-date">
        --- {countdownStarted && formatDate(eventDate)} ---
      </p>

      {!countdownStarted ? (
        <form className="countdown-form" onSubmit={handleSetCountdown}>
          <label htmlFor="title">Nome do evento:</label>
          <input
            name="title"
            type="text"
            placeholder="ex: Meu Aniversário"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />

          <label htmlFor="date-picker">Data do evento:</label>
          <input
            name="date-picker"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <button   type="submit"> iniciar </button>
        </form>
      ) : (
        <>
          <h2 className="countdown-name">
            ...
          </h2>

          {formatTime(timeRemaining)}
          <div className="control-buttons">
            <button onClick={handleStopCountdown}>Stop</button>
            <button onClick={handleResetCountdown}>Reset</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
