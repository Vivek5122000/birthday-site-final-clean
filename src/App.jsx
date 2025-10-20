import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

// Cake images
import cakeOff from "./assets/Cake.jpg";
import cakeLit from "./assets/Candles Lit.jpg";
import cakeBlown from "./assets/Candles blow.jpg";

// Diary images
import diary1 from "./assets/diary1.jpg";
import diary2 from "./assets/diary2.jpg";
import diary3 from "./assets/diary3.jpg";
import diary4 from "./assets/diary4.jpeg";
import diary5 from "./assets/diary5.jpeg";
import diary6 from "./assets/diary6.jpeg";
import diary7 from "./assets/diary7.jpeg";

// Video files
import pappaWish from "./assets/pappa_wish.mp4";
import mummaWish from "./assets/mumma_wish.mp4";
import bhaiWish from "./assets/bhai_wish.mp4";
import sonuWish from "./assets/sonu_wish.mp4";
import vishnuWish from "./assets/vishnu_wish.mp4";
import lifeStory from "./assets/lifestory.mp4";

// Background music
import bgMusic from "./assets/song2.mp3";

import "./App.css";

function App() {
  const [page, setPage] = useState("landing");
  const [cakeState, setCakeState] = useState("off");
  const [showConfetti, setShowConfetti] = useState(false);
  const [diaryIndex, setDiaryIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  const audioRef = useRef(null);

  // Start background music once when component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0.3; // start from 0.3 sec
      audio.play().catch(() => {}); // handle autoplay block
    }
  }, []);

  // Pause music only when entering video pages
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (page === "video") {
      audio.pause();
    } else {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    }
  }, [page]);

  const diaryPages = [
    { image: diary1, story: "Hello Sir, aise hi khus raho aap dono" },
    { image: diary2, story: "Deva, remember this place...." },
    { image: diary3, story: "Ummmmmm,so sweet...Bhaiya ek cup or ho jaaye" },
    { image: diary4, story: "Spiderman, Spiderman......" },
    { image: diary5, story: "Om namah Sivay..... Mai hu baaba tillu.....ek phookh maar k bhasm kar dunga" },
    { image: diary6, story: "All these memories make today extra special. Happy Birthday once again!" },
    { image: diary7, story: "Cherishing every moment we've shared, and looking forward to many more." }
  ];

  const videoPages = [
    { heading: "Wish from Papa Ji", video: pappaWish },
    { heading: "Wish from Mama Ji", video: mummaWish },
    { heading: "Wish from Bhai", video: bhaiWish },
    { heading: "Wish from Sonu", video: sonuWish },
    { heading: "Wish from Vishnu", video: vishnuWish },
    { heading: "Special Surprise", video: lifeStory }
  ];

  const handleLightCandles = () => setCakeState("lit");
  const handleBlowCandles = () => {
    setCakeState("blown");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleNextDiary = () => {
    if (diaryIndex < diaryPages.length - 1) {
      setDiaryIndex(diaryIndex + 1);
    } else {
      setPage("video");
      setVideoIndex(0);
    }
  };

  const handleNextVideo = () => {
    if (videoIndex < videoPages.length - 1) {
      setVideoIndex(videoIndex + 1);
    } else {
      alert("All wishes completed! 🎉");
    }
  };

  const cakeImage =
    cakeState === "off" ? cakeOff : cakeState === "lit" ? cakeLit : cakeBlown;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 text-white text-center font-sans p-4 overflow-hidden">
      <audio ref={audioRef} src={bgMusic} loop />
      {showConfetti && <Confetti numberOfPieces={200} />}

      <AnimatePresence mode="wait">
        {page === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="p-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Knock, Knock 👀</h1>
            <p className="text-lg md:text-xl mb-8">
              The world got better 24 years ago. Wanna know why?
            </p>
            <button
              onClick={() => setPage("birthday")}
              className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-full shadow-lg hover:bg-purple-100 transition"
            >
              Find Out 💌
            </button>
          </motion.div>
        )}

        {page === "birthday" && (
          <motion.div
            key="birthday"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="p-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Because it’s your Birthday! 🥳
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Happy Birthday, Sir! Wishing you endless smiles and success 🎉
            </p>
            <button
              onClick={() => setPage("cake")}
              className="px-6 py-3 bg-white text-pink-700 font-semibold rounded-full shadow-lg hover:bg-pink-100 transition"
            >
              We have a surprise for you 🎁
            </button>
          </motion.div>
        )}

        {page === "cake" && (
          <motion.div
            key="cake"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="p-6"
          >
            <h1 className="text-4xl font-bold mb-6">
              {cakeState === "blown"
                ? "🎉 Make a wish and celebrate! 🎉"
                : "🎂 Your Cake Awaits! 🎂"}
            </h1>

            <div className="my-8 mx-auto w-64 relative">
              <img
                src={cakeImage}
                alt="Birthday Cake"
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {cakeState === "off" && (
              <button
                onClick={handleLightCandles}
                className="px-6 py-3 bg-yellow-400 text-purple-700 font-semibold rounded-full shadow hover:bg-yellow-300 transition"
              >
                Light the candles 🕯️
              </button>
            )}
            {cakeState === "lit" && (
              <button
                onClick={handleBlowCandles}
                className="px-6 py-3 bg-red-400 text-white font-semibold rounded-full shadow ml-4 hover:bg-red-300 transition"
              >
                Blow Out 🎈
              </button>
            )}
            {cakeState === "blown" && (
              <button
                onClick={() => setPage("diary")}
                className="px-6 py-3 bg-green-400 text-white font-semibold rounded-full shadow ml-4 hover:bg-green-300 transition"
              >
                Begin the Celebration 🎊
              </button>
            )}
          </motion.div>
        )}

        {page === "diary" && (
          <motion.div
            key={`diary-${diaryIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="p-4 max-w-lg bg-white text-gray-900 rounded-xl shadow-lg mx-auto flex flex-col items-center justify-between h-[90vh]"
          >
            <img
              src={diaryPages[diaryIndex].image}
              alt={`Diary ${diaryIndex + 1}`}
              className="rounded-lg shadow mb-4 w-full h-[30vh] object-cover"
            />

            <div className="flex-1 overflow-auto text-center px-2">
              <p className="text-lg">{diaryPages[diaryIndex].story}</p>
            </div>

            <button
              onClick={handleNextDiary}
              className="mt-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-full shadow hover:bg-purple-500 transition"
            >
              {diaryIndex === diaryPages.length - 1
                ? "Now Wishes Time 🎥"
                : "Next ➡️"}
            </button>
          </motion.div>
        )}

        {page === "video" && (
          <motion.div
            key={`video-${videoIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="p-4 max-w-lg bg-white text-gray-900 rounded-xl shadow-lg mx-auto flex flex-col items-center justify-between h-[90vh]"
          >
            <h2 className="text-2xl font-bold mb-4">
              {videoPages[videoIndex].heading}
            </h2>

            <div className="w-full h-[60vh] flex items-center justify-center bg-gray-200 text-gray-800 rounded-lg shadow-lg mb-4">
              <video
                src={videoPages[videoIndex].video}
                controls
                className="w-full h-full rounded-lg object-cover"
              />
            </div>

            <button
              onClick={handleNextVideo}
              className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow hover:bg-green-500 transition"
            >
              Next ➡️
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
