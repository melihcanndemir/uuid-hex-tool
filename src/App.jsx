import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import {
  ClipboardDocumentIcon,
  ArrowPathIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

function App() {
  const [uuid, setUuid] = useState("");
  const [hexKey, setHexKey] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    // localStorage'dan tema tercihini al, yoksa sistem tercihini kontrol et
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Sistem karanlık modda ise true, değilse false döndür
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Tema değiştiğinde localStorage'a kaydet
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const generateUUID = () => {
    const newUuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
    setUuid(newUuid);
    toast.success("UUID generated!", {
      position: "bottom-center",
      duration: 2000,
      style: {
        background: darkMode ? "#1a1b26" : "#ffffff",
        color: darkMode ? "#a9b1d6" : "#1f2937",
        border: darkMode ? "1px solid #414868" : "1px solid #e5e7eb",
        fontWeight: 500,
      },
      iconTheme: {
        primary: darkMode ? "#7aa2f7" : "#3b82f6",
        secondary: darkMode ? "#1a1b26" : "#ffffff",
      },
    });
  };

  const generateHexKey = () => {
    const hex = "0123456789abcdef";
    let key = "";
    for (let i = 0; i < 64; i++) {
      key += hex[Math.floor(Math.random() * 16)];
    }
    setHexKey(key);
    toast.success("Hex Key generated!", {
      position: "bottom-center",
      duration: 2000,
      style: {
        background: darkMode ? "#1a1b26" : "#ffffff",
        color: darkMode ? "#a9b1d6" : "#1f2937",
        border: darkMode ? "1px solid #414868" : "1px solid #e5e7eb",
        fontWeight: 500,
      },
      iconTheme: {
        primary: darkMode ? "#7aa2f7" : "#3b82f6",
        secondary: darkMode ? "#1a1b26" : "#ffffff",
      },
    });
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied!`, {
        position: "bottom-center",
        duration: 2000,
        style: {
          background: darkMode ? "#1a1b26" : "#ffffff",
          color: darkMode ? "#a9b1d6" : "#1f2937",
          border: darkMode ? "1px solid #414868" : "1px solid #e5e7eb",
          fontWeight: 500,
        },
        iconTheme: {
          primary: darkMode ? "#7aa2f7" : "#3b82f6",
          secondary: darkMode ? "#1a1b26" : "#ffffff",
        },
      });
    } catch {
      toast.error("Failed to copy", {
        position: "bottom-center",
        style: {
          background: darkMode ? "#1a1b26" : "#ffffff",
          color: darkMode ? "#f87171" : "#ef4444",
          border: darkMode ? "1px solid #414868" : "1px solid #e5e7eb",
          fontWeight: 500,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-dark-100 dark:to-dark-200 p-4 md:p-8 transition-colors duration-200">
      <Toaster />
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-2 rounded-lg bg-white/80 dark:bg-dark-300/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-white dark:hover:bg-dark-300 transition-all duration-200"
      >
        {darkMode ? (
          <SunIcon className="w-6 h-6 text-yellow-500" />
        ) : (
          <MoonIcon className="w-6 h-6 text-gray-600" />
        )}
      </button>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold py-4 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 animate-gradient bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-blue-400"
            style={{ lineHeight: "1.4", backgroundSize: "200% auto" }}
          >
            UUID & Hex Key Generator
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate secure UUIDs and Hex Keys with modern tools
          </p>
        </div>

        <div className="grid gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-dark-300/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-glow border border-white/20 dark:border-gray-700 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 leading-normal">
                  Generate UUID
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateUUID}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-size-200 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-right transition-all duration-500 shadow-lg hover:shadow-glow-lg"
                >
                  <ArrowPathIcon className="w-5 h-5" />
                  Generate
                </motion.button>
              </div>
              <div className="relative">
                <input
                  value={uuid}
                  type="text"
                  className="w-full bg-gray-50/50 dark:bg-dark-200/50 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 pr-12 font-mono text-gray-800 dark:text-gray-200"
                  readOnly
                  placeholder="Generated UUID will appear here"
                />
                {uuid && (
                  <button
                    onClick={() => copyToClipboard(uuid, "UUID")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 flex items-center justify-center"
                  >
                    <ClipboardDocumentIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-dark-300/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-glow border border-white/20 dark:border-gray-700 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 leading-normal">
                  Generate Hex Key
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateHexKey}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-size-200 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-right transition-all duration-500 shadow-lg hover:shadow-glow-lg"
                >
                  <ArrowPathIcon className="w-5 h-5" />
                  Generate
                </motion.button>
              </div>
              <div className="relative">
                <input
                  value={hexKey}
                  type="text"
                  className="w-full bg-gray-50/50 dark:bg-dark-200/50 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 pr-12 font-mono text-gray-800 dark:text-gray-200"
                  readOnly
                  placeholder="Generated Hex Key will appear here"
                />
                {hexKey && (
                  <button
                    onClick={() => copyToClipboard(hexKey, "Hex Key")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center justify-center"
                  >
                    <ClipboardDocumentIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-4 py-8"
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <p className="text-gray-500 dark:text-[#a9b1d6] text-sm font-medium bg-white/90 dark:bg-[#1f2335] backdrop-blur-sm inline-flex items-center px-5 py-2.5 rounded-xl shadow-sm border border-gray-200/50 dark:border-[#414868]">
              Made with <span className="text-red-500 mx-1.5">❤️</span>
              by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7aa2f7] via-[#ad8ee6] to-[#bb9af7] font-bold ml-1.5">
                Melih Can Demir
              </span>
            </p>
            <a
              href="https://github.com/melihcanndemir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/90 dark:bg-[#1f2335] backdrop-blur-sm px-5 py-2.5 rounded-xl text-gray-500 dark:text-[#a9b1d6] hover:text-[#7aa2f7] dark:hover:text-[#7aa2f7] transition-all duration-200 shadow-sm border border-gray-200/50 dark:border-[#414868]"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Follow on GitHub</span>
            </a>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default App;
