import React, { useEffect, useRef, useState } from 'react';
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const HomePage: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const savedTimer = localStorage.getItem('timer');
    if (savedTimer) {
      setTimer(parseInt(savedTimer, 10));
    }

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

  const [isPlaybackInitiated, setIsPlaybackInitiated] = useState(false);

  const handleAudioStart = () => {
    const audio = new Audio('/hold/hold.mp3');
    audio.loop = true;
    audio.play().catch((error) => {
      console.error('Failed to play audio:', error);
    });
    audioRef.current = audio;
    setIsPlaybackInitiated(true);
    setIsPlaying(true); 
  };

const handleAudioToggle = () => {
  if (isPlaying) {
    audioRef.current?.pause();
    setIsPlaying(false);
  } else {
    audioRef.current?.play().catch((error) => {
      console.error('Failed to play audio:', error);
    });
    setIsPlaying(true);
  }
};

  return (
      <><Head>
      <title>Hold</title>
      <meta property="og:title" content="Hold" key="title" />
      <meta property="twitter:title" content="Hold" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)"/>
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
    </Head><div className="min-h-screen bg-white dark:bg-black dark:text-white text-black relative">
        <main
          className={`flex min-h-screen flex-col text-left justify-between p-24 ${inter.className}`}
        >
          <p className="text-2xl">
            You have been waiting for: {`${Math.floor(timer / 3600)} hours, ${Math.floor((timer % 3600) / 60)} minutes, and ${timer % 60} seconds.`}
          </p>
          {!isPlaybackInitiated && (
      <button onClick={handleAudioStart}>Trigger music</button>
    )}
    {isPlaybackInitiated && (
      <button onClick={handleAudioToggle}>
        {isPlaying ? 'Click to pause music' : 'Click to play music'}
      </button>
    )}
          </main>
      </div>
    </>
  );
};

export default HomePage;