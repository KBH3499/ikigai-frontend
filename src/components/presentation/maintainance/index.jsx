import { useEffect } from "react";

const MaintanancePage = ({ isDarkModeEnabled }) => {
  useEffect(() => {
    document.body.style.fontFamily = "";
    document.body.style.webkitFontSmoothing = "";
    document.body.style.mozOsxFontSmoothing = "";
    // document.body.style.overflow = "";
    document.body.style.transition = "";
    document.body.style.backgroundSize = "contain";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.height = "100vh"; // Ensure the body takes the full viewport height
    document.body.style.margin = "0"; // Remove any default margins
    document.body.style.backgroundImage = 'url("/assets/maintanence.jpeg")';
    
    if (!isDarkModeEnabled) {
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    return () => {
      if (!isDarkModeEnabled) {
        document.body.classList.remove("light-mode");
        document.body.style.backgroundImage = 'url("/assets/background1.webp")';
      } else {
        document.body.classList.remove("dark-mode");
        document.body.style.backgroundImage =
          'url("/assets/darkbackground.svg")';
      }

      // document.body.style.margin = "0";
      document.body.style.fontFamily =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
      // document.body.style.webkitFontSmoothing = "antialiased";
      // document.body.style.mozOsxFontSmoothing = "grayscale";
      // document.body.style.overflow = "hidden";
      // document.body.style.backgroundSize = "cover";
      // document.body.style.backgroundRepeat = "no-repeat";
      // document.body.style.backgroundAttachment = "fixed";
      // document.body.style.transition = "background-image 1s ease-in-out";
    };
  }, []);

  return;
};

export default MaintanancePage;
