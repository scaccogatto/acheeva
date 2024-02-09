import { FC, useCallback, useEffect, useState } from "react";

interface CountDownProps {
  deadline: Date;
}

const CountDown: FC<CountDownProps> = ({ deadline }) => {
  const [days, setDays] = useState<number | undefined>(undefined);
  const [hours, setHours] = useState<number | undefined>(undefined);
  const [minutes, setMinutes] = useState<number | undefined>(undefined);
  const [seconds, setSeconds] = useState<number | undefined>(undefined);

  const getTime = useCallback(() => {
    const time = Date.parse(deadline.toString()) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  }, [deadline]);

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return seconds === undefined ? (
    <p className="text-2xl animate-fade animate-once animate-duration-[2000ms]">
      Coming soon
    </p>
  ) : seconds! <= 0 ? (
    <p>Online negli store</p>
  ) : (
    <p className="text-2xl animate-fade animate-once animate-duration-[2000ms] animate-delay-1000">{`${days! > 0 ? days : ""} ${days ? (days === 1 ? "giorno" : "giorni") : ""} ${hours}h ${minutes}m ${seconds}s`}</p>
  );
};

export default CountDown;
