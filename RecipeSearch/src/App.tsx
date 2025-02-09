import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

function App() {
  // Initialize state from localStorage with proper type conversion
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Apply dark mode class immediately when component mounts
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  // Toggle with proper transition handling
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="w-screen min-h-screen p-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <SearchBar />
      <button
        className="rounded-full p-2 border border-gray-300 dark:border-gray-600 
        hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 
        absolute top-8 right-12 bg-white dark:bg-gray-800"
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <CiLight className="text-yellow-400 w-6 h-6" />
        ) : (
          <MdDarkMode className="text-gray-800 dark:text-gray-200 w-6 h-6" />
        )}
      </button>
    </div>
  );
}

export default App;
