import { useEffect, useState } from "react";

export const UsardarkMode= () => {
const [darkMode, setDarkMode] = useState(false);
    
  useEffect(() => {
      const storedDarkMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(storedDarkMode);
      document.body.classList.toggle("darkMode", storedDarkMode);
  }, []);

  const activarDarkMode = () => {
      setDarkMode(prev => {
          const newDarkMode = !prev;
          document.body.classList.toggle("darkMode", newDarkMode);
          localStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
          return newDarkMode;
      });
  }; 
  return { darkMode, activarDarkMode };
}