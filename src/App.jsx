import "./Navbar.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import MainBook from "./mainBook";
import Social_Nav from "./pages/socialNav";
import { useDarkMode } from "./provider/theme-provider";
import AnimationsComponent from "./animations";
import MaintanancePage from "./components/presentation/maintainance";
import { useMediaQuery } from "react-responsive";


const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      /* ref required */
      <h1>Page Header</h1>
      <p>{props.children}</p>
      <p>Page number: {props.number}</p>
    </div>
  );
});
// const handleAudio = () => {
//   const audio = new Audio("/assets/mixkit-birds-in-the-jungle-2434.wav"); // Adjust the path as necessary
//   audio.play();
// };

const App = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 490px)" });

  const { isDarkModeEnabled, setIsDarkModeEnabled } = useDarkMode();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds for demonstration

    return () => clearTimeout(timer);
  }, []);

  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   console.log("mobile",isMobile);
  // }, [isMobile]);

  // create an event listener
  // useEffect(() => {
  //   if (window.innerWidth < 792) {
  //     setIsMobile(true);
  //   } else {
  //     setIsMobile(false);
  //   }
  //   //choose the screen size
  //   const handleResize = () => {
  //     if (window.innerWidth < 792) {
  //       setIsMobile(true);
  //     } else {
  //       setIsMobile(false);
  //     }
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  // }, []);


  useEffect(() => {

    const handleVisibilityChange = () => {
      const isDarkMode = localStorage.getItem("is_dark_mode_enabled") === "true";
      setIsDarkModeEnabled(isDarkMode);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [])



  useEffect(() => {
    if (isDarkModeEnabled) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkModeEnabled]);

  return (
    <div
      // onClick={handleAudio}
      className="main_background"
      style={{ height: "100vh", width: "100vw", position: "relative" }}
    >
      <div className="flip_book" style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            height: "100%",
            visibility: loading ? "hidden" : "",
          }}
        >
          <MainBook />
        </div>
      </div>

      {isDarkModeEnabled ? null : <AnimationsComponent isMobile={isMobile} />}
      {!loading && <div
        style={{
          position: "absolute",
          right: isMobile ? "2px" : "15px",
          bottom: isMobile ? "7%" : "35%",
        }}
      >
        <Social_Nav isMobile={isMobile} />
      </div>}
    </div>
  );
};

export default App;
