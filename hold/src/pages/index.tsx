import React, { useEffect, useRef, useState } from 'react';
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const HomePage: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const savedTimer = localStorage.getItem('timer');
    if (savedTimer) {
      setTimer(parseInt(savedTimer, 10));
    }

    const audio = new Audio('https://tom.so/media/holdmusic.mp3');
    audio.loop = true;
    audio.play();
    audioRef.current = audio;

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('timer', timer.toString());
  }, [timer]);

  return (
      <><Head>
      <title>Hold</title>
      <meta property="og:title" content="Hold" key="title" />
      <meta property="twitter:title" content="Hold" />
      <meta name="theme-color" content="#000000" />
      <meta property="description" content="As I await your response, my memory of you grows with time." />
      <meta property="og:description" content="As I await your response, my memory of you grows with time" />
      <meta property="twitter:description" content="As I await your response, my memory of you grows with time" />
      <meta property="og:url" content="https://work.tom.so/hold" />
      <meta property="og:image" content="/hold/og.png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content="/hold/og.png" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/hold/apple-touch-icon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/hold/favicon-32x32.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/hold/favicon-16x16.png" />
      <link rel="manifest" href="/hold/site.webmanifest" />
    </Head><div className="min-h-screen bg-black text-white relative">
        <main
          className={`flex min-h-screen flex-col text-left justify-between p-24 ${inter.className}`}
        >
          <p className="text-2xl">
            You have been waiting for: {`${Math.floor(timer / 3600)} hours, ${Math.floor((timer % 3600) / 60)} minutes, and ${timer % 60} seconds.`}
          </p>

          </main>
      </div>
    </>
  );
};

export default HomePage;