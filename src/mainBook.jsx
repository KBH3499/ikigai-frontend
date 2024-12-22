import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "react-awesome-button/dist/styles.css";
import "react-awesome-button/dist/themes/theme-blue.css";
import Navbar from "./components/presentation/navbar";
import Footer from "./components/presentation/footer";

// Hooks
import { useDarkMode } from "./provider/theme-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { stakingData } from "./utils/constants";

const Page1 = React.lazy(() => import("./pages/page1"));
const Page2 = React.lazy(() => import("./pages/page2"));
const Page3 = React.lazy(() => import("./pages/page3"));
const Page4 = React.lazy(() => import("./pages/page4"));
const ComicPage1 = React.lazy(() => import("./pages/comicPage1"));
const ComicPage2 = React.lazy(() => import("./pages/comicPage2"));
const ComicPage3 = React.lazy(() => import("./pages/comicPage3"));
const ComicPage4 = React.lazy(() => import("./pages/comicPage4"));
const ComicPage5 = React.lazy(() => import("./pages/comicPage5"));
const ComicPage6 = React.lazy(() => import("./pages/comicPage6"));
const ComicPage7 = React.lazy(() => import("./pages/comicPage7"));
const ComicPage8 = React.lazy(() => import("./pages/comicPage8"));
const ComicPage9 = React.lazy(() => import("./pages/comicPage9"));
const ComicPage10 = React.lazy(() => import("./pages/comicPage10"));
const ComicPage11 = React.lazy(() => import("./pages/comicPage11"));
const ComicPage12 = React.lazy(() => import("./pages/comicPage12"));
const ComicPage13 = React.lazy(() => import("./pages/comicPage13"));
const Page12 = React.lazy(() => import("./pages/page12"));
const Page13 = React.lazy(() => import("./pages/page13"));
const Page15 = React.lazy(() => import("./pages/page15"));
const Page16 = React.lazy(() => import("./pages/page16"));
const ComicPage1_2 = React.lazy(() => import("./pages/comicPage1_2"));
const ComicPage2_2 = React.lazy(() => import("./pages/comicPage2_2"));
const ComicPage3_2 = React.lazy(() => import("./pages/comicPage3_2"));
const ComicPage4_2 = React.lazy(() => import("./pages/comicPage4_2"));
const ComicPage5_2 = React.lazy(() => import("./pages/comicPage5_2"));
const ComicPage6_2 = React.lazy(() => import("./pages/comicPage6_2"));
const ComicPage7_2 = React.lazy(() => import("./pages/comicPage7_2"));
const ComicPage8_2 = React.lazy(() => import("./pages/comicPage8_2"));
const ComicPage9_2 = React.lazy(() => import("./pages/comicPage9_2"));
const ComicPage10_2 = React.lazy(() => import("./pages/comicPage10_2"));
const ComicPage11_2 = React.lazy(() => import("./pages/comicPage11_2"));
const ComicPage12_2 = React.lazy(() => import("./pages/comicPage12_2"));
const ComicPage1_3 = React.lazy(() => import("./pages/comicPage1_3"));
const ComicPage2_3 = React.lazy(() => import("./pages/comicPage2_3"));
const ComicPage3_3 = React.lazy(() => import("./pages/comicPage3_3"));
const ComicPage4_3 = React.lazy(() => import("./pages/comicPage4_3"));
const ComicPage5_3 = React.lazy(() => import("./pages/comicPage5_3"));
const ComicPage6_3 = React.lazy(() => import("./pages/comicPage6_3"));
const ComicPage7_3 = React.lazy(() => import("./pages/comicPage7_3"));
const ComicPage8_3 = React.lazy(() => import("./pages/comicPage8_3"));
const ComicPage9_3 = React.lazy(() => import("./pages/comicPage9_3"));
const ComicPage10_3 = React.lazy(() => import("./pages/comicPage10_3"));
const ComicPage11_3 = React.lazy(() => import("./pages/comicPage11_3"));
const ComicPage12_3 = React.lazy(() => import("./pages/comicPage12_3"));

const OurTeamLeft = React.lazy(() => import("./pages/our_team_left"));
const HomeLeft = React.lazy(() => import("./pages/home_left"));
const Animation1 = React.lazy(() => import("./pages/animation1"));
const LearningLeft = React.lazy(() => import("./pages/learningleft"));
const LearningRight = React.lazy(() => import("./pages/learningright"));
const GalleryPage1 = React.lazy(() => import("./pages/galleryImage1"));
const Animation2 = React.lazy(() => import("./pages/animation2"));
const GalleryPage2 = React.lazy(() => import("./pages/galleryImage2"));
const ComicBlankLeft = React.lazy(() => import("./pages/comicBlankLeft"));
const RoadMapLeft = React.lazy(() => import("./pages/roadMapLeft"));
const RoadMapRight = React.lazy(() => import("./pages/roadMapRight"));
const AboutUsLeft = React.lazy(() => import("./pages/aboutUsLeft"));
const ContactUs = React.lazy(() => import("./pages/contactUs"));

const StakingPageLeft = React.lazy(() =>
  import("./stakingPages/stakingPageLeft")
);
const StakingPageRight = React.lazy(() =>
  import("./stakingPages/stakingPageRight")
);
const MusicPageLeft = React.lazy(() =>
  import("./pages/music-section/MusicPageLeft")
);
const MusicPageRight = React.lazy(() =>
  import("./pages/music-section/MusicPageRight")
);
const AdminPageLeft = React.lazy(() =>
  import("./pages/admin/AdminPageLeft")
);
const AmdinPageRight = React.lazy(() =>
  import("./pages/admin/AdminPageRight")
);

const MainBook = () => {
  const { isDarkModeEnabled } = useDarkMode();
  const { publicKey, connected } = useWallet();
  const [isAdminPanelEnabled, setIsAdminPanelEnabled] = useState()
  const [isClaimed, setIsClaimed] = useState(false);

  const handleAudio = () => {
    const audio = new Audio("/assets/page-flip-10.mp3"); // Adjust the path as necessary
    audio.play();
  };
  const flipBook = useRef();
  const [isShrinkNav, setIsShrinkNav] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  
  const nextButtonClick = () => {
    const nextPageIndex = flipBook.current.pageFlip().getCurrentPageIndex() + 1;
    if (nextPageIndex === 61 && !isAdminPanelEnabled) { 
      return;
    }
    flipBook.current.pageFlip().flipNext();
    setCurrentPage(flipBook.current.pageFlip().getCurrentPageIndex());
  };
  
  const prevButtonClick = () => {
    flipBook.current.pageFlip().flipPrev();
    setCurrentPage(flipBook.current.pageFlip().pages.currentPageIndex);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsShrinkNav(true);
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsShrinkNav(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (connected) {
      const temporaryAdmin = Keypair.fromSeed(publicKey.toBytes())
      const temporaryAdminPublicKey = temporaryAdmin?.publicKey?.toString();
      if (temporaryAdminPublicKey === stakingData['ikigai']?.admin?.publicKey?.toString() || temporaryAdminPublicKey === stakingData['tyke']?.admin?.publicKey?.toString()) {
        setIsAdminPanelEnabled(true);
        console.log("Connected Wallet is Admin", temporaryAdminPublicKey);
      } else {
        setIsAdminPanelEnabled(false);
        console.log("Connected Wallet is Not Admin", temporaryAdminPublicKey);
      }
    }else{
      setIsAdminPanelEnabled(false);
    }
  }, [connected])

  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
    }, 1800); // Hide after 1 seconds
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Navbar
        flipBook={flipBook}
        nextButtonClick={nextButtonClick}
        isShrinkNav={isShrinkNav}
        setIsShrinkNav={setIsShrinkNav}
        isAdminPanelEnabled={isAdminPanelEnabled}
      />
      <div
        className="display_flex_center main_element"
        style={{ position: "relative" }}
      >
        {isDarkModeEnabled && !isMobile && (
          <>
            {" "}
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: 0,
              }}
            >
              <img
                height="270"
                width="250"
                src="../assets/WEBGIF.gif"
                alt="Character"
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: -80,
                right: 0,
              }}
            >
              <img
                height="300"
                width="270"
                src="../assets/Character_Right_LookUp_FinalGIF.gif"
                alt="Character"
              />
            </div>
          </>
        )}

        {console.log({currentPage})}

        <div className={`book-cover ${!isMobile && window.innerWidth <= 1535 ? "book-cover-small" : ""}`} style={{ position: "relative" }}>
          <div style={{ width: "100%", height: "80%", position: "relative" }}>
            <div className="demo-book">
              <HTMLFlipBook
                width={isMobile ? 300 : 500}
                height={isMobile ? 450 : 500}
                size={isMobile ? "fixed" : "stretch"}
                minWidth={5}
                maxWidth={1200}
                // showCover={true}
                usePortrait={true}
                minHeight={5}
                maxHeight={500}
                swipeDistance={30}
                onChangeOrientation={true}
                // autoSize={true}
                // drawShadow={false}
                maxShadowOpacity={0.2}
                // mobileScrollSupport={true}
                ref={flipBook}
                useMouseEvents={false}
                showPageCorners={false}
                onFlip={(e) => {
                  // handleFlip(e)
                  console.log(e);
                }}
                flippingTime={1500}
              >
                <HomeLeft />
                <Page1 />
                <AboutUsLeft />
                <Page2 />
                <ComicBlankLeft />
                <ComicPage1 />
                <ComicPage2 />
                <ComicPage3 />
                <ComicPage4 />
                <ComicPage5 />
                <ComicPage6 />
                <ComicPage7 />
                <ComicPage8 />
                <ComicPage9 />
                <ComicPage10 />
                <ComicPage11 />
                <ComicPage12 />
                <ComicPage13 />
                <ComicPage1_2 />
                <ComicPage2_2 />
                <ComicPage3_2 />
                <ComicPage4_2 />
                <ComicPage5_2 />
                <ComicPage6_2 />
                <ComicPage7_2 />
                <ComicPage8_2 />
                <ComicPage9_2 />
                <ComicPage10_2 />
                <ComicPage11_2 />
                <ComicPage12_2 />
                <ComicPage1_3 />
                <ComicPage2_3 />
                <ComicPage3_3 />
                <ComicPage4_3 />
                <ComicPage5_3 />
                <ComicPage6_3 />
                <ComicPage7_3 />
                <ComicPage8_3 />
                <ComicPage9_3 />
                <ComicPage10_3 />
                <ComicPage11_3 />
                <ComicPage12_3 />
                <Page3 />
                <Page4 />
                <RoadMapLeft />
                <RoadMapRight />
                <Animation1 />
                <GalleryPage1 />
                <Animation2 />
                <GalleryPage2 />
                <OurTeamLeft />
                <Page12 />
                <Page13 />
                <ContactUs />
                <Page15 pageNumber={currentPage} />
                <Page16 pageNumber={currentPage} />
                <LearningLeft />
                <LearningRight />
                <StakingPageLeft isClaimed={isClaimed} />
                <StakingPageRight setIsClaimed={setIsClaimed} />
                <MusicPageLeft />
                <MusicPageRight isMobile={isMobile} />
                <AdminPageLeft />
                <AmdinPageRight isMobile={isMobile} />
              </HTMLFlipBook>
            </div>
            {!isMobile && (
              <>
                <div
                  className="idle-right"
                >
                  <div
                    className="display_flex_center"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      alt=""
                      src="/assets/Character_Right_Sit_FinalGIF.gif"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                {!isDarkModeEnabled &&
                  <><div
                    style={{
                      width: "92px",
                      position: "absolute",
                      left: "0",
                      top: "-75px",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      className="display_flex_center"
                      style={{
                        width: "100%",
                        height: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      <img
                        alt=""
                        src="/assets/Character_Left_Shock_FinalGIF.gif"
                        style={{
                          width: "100%",
                          display: isPlaying ? "block" : "none",
                        }}
                      />
                    </div>
                  </div>
                    <div
                      style={{
                        width: "92px",
                        position: "absolute",
                        left: "0",
                        top: "-75px",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className="display_flex_center"
                        style={{
                          width: "100%",
                          height: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <img
                          alt=""
                          src="/assets/Character_Left_Idle_FinalGIF.gif"
                          style={{
                            width: "100%",
                            display: isPlaying ? "none" : "block",
                          }}
                        />
                      </div>
                    </div>
                  </>
                }
              </>
            )}
            {isDarkModeEnabled && !isMobile && (
              <div
                className="idle-left"
              >
                <div
                  className="display_flex_center"
                  style={{
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <img
                    alt=""
                    src="/assets/Character_Left_Idle_FinalGIF.gif"
                    style={{
                      width: "100%",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="container prev_button">
            <div>
              {isDarkModeEnabled ? (
                <button
                  className="pagination_button"
                  type="button"
                  onClick={() => {
                    handleClick();
                    prevButtonClick();
                    if (
                      flipBook.current.pageFlip().pages.currentPageIndex != 0
                    ) {
                      handleAudio();
                    }
                  }}
                >
                  <img src="../../assets/arrows/left.svg" />
                </button>
              ) : (
                <button
                  className="pagination_button"
                  type="button"
                  onClick={() => {
                    handleClick();
                    prevButtonClick();
                    if (
                      flipBook.current.pageFlip().pages.currentPageIndex != 0
                    ) {
                      handleAudio();
                    }
                  }}
                >
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 175.000000 279.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,279.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path
                        d="M1540 2776 c-137 -51 -158 -68 -821 -661 -354 -316 -658 -593 -676
-615 -40 -50 -49 -103 -28 -157 13 -32 65 -84 237 -239 498 -447 976 -889
1015 -939 81 -103 198 -166 307 -164 81 1 118 18 144 70 20 38 23 54 18 114
-7 85 -30 176 -57 230 -23 43 -210 324 -409 615 -70 102 -135 200 -145 219
-24 47 -30 136 -15 216 12 62 33 99 255 454 133 212 267 424 298 471 104 153
115 278 31 366 -27 29 -38 34 -75 33 -24 0 -60 -6 -79 -13z"
                      />
                    </g>
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="container next_button">
            <div>
              {isDarkModeEnabled ? (
                <button
                  className="pagination_button"
                  type="button"
                  onClick={() => {
                    handleClick();
                    nextButtonClick();
                    handleAudio();
                  }}
                >
                  {" "}
                  <img src="../../assets/arrows/right.svg" />{" "}
                </button>
              ) : (
                <button
                  className="pagination_button"
                  type="button"
                  onClick={() => {
                    handleClick();
                    nextButtonClick();
                    handleAudio();
                  }}
                >
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 178.000000 280.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,280.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path
                        d="M141 2778 c-80 -30 -101 -129 -62 -293 25 -104 42 -133 366 -625 110
-168 206 -318 213 -333 21 -49 25 -128 8 -205 -14 -70 -30 -96 -273 -470 -141
-219 -273 -419 -294 -447 -59 -80 -82 -133 -87 -207 -4 -59 -1 -74 23 -122 18
-36 37 -59 56 -66 44 -19 120 -3 217 45 80 39 140 88 712 585 344 299 642 557
664 574 83 67 109 164 63 236 -12 20 -49 60 -82 91 -387 355 -1096 1028 -1125
1068 -41 55 -112 117 -172 147 -62 32 -171 42 -227 22z"
                      />
                    </g>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "rgb(255 255 255 / 30%)", zIndex: "1" }}>
        <Footer />
      </div>
    </div>
  );
};

export default MainBook;
