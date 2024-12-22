import { AwesomeButton } from "react-awesome-button";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDarkMode } from "../../../provider/theme-provider";
import { useWallet } from "@solana/wallet-adapter-react";

const Navbar = ({ flipBook, nextButtonClick, isShrinkNav, isAdminPanelEnabled }) => {
  const hamburgerMenuButton = useRef();
  const { isDarkModeEnabled, toggleDarkMode } = useDarkMode();
  const themeImage = isDarkModeEnabled
    ? "../../../assets/navbar/themedark.svg"
    : "../../../assets/navbar/themelight.svg";
  const toggleMenu = () => {
    // setIsOpen(!isOpen);
    if (hamburgerMenuButton.current) {
      hamburgerMenuButton.current.style.display =
        hamburgerMenuButton.current.style.display === "none" ? "block" : "none";
    }
  };
  const buttonType = useMemo(() => {
    return isDarkModeEnabled ? "facebook" : "primary";
  }, [isDarkModeEnabled]);


  return (
    <div>
      <nav
        className={`navbar ${isDarkModeEnabled ? "navbar-dark-mode" : "navbar-light-mode"
          }`}
      >
        <div
          className="display_flex_center image"
          style={{
            height: "100%",
            width: `${!isShrinkNav ? "100%" : "68%"}`,
            margin: isShrinkNav ? "auto" : "",
            justifyContent: isShrinkNav ? "space-between" : "center ",
          }}
        >
          {!isShrinkNav && (
            <div bis_skin_checked="1" className="logo-img">
              <img src="../../../../assets/Header-for-Website-Darker.gif" />
            </div>

          )}

          <div
            style={isShrinkNav ? {
              margin: isShrinkNav ? "" : "auto",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }: {
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >

            <div
              ref={hamburgerMenuButton}
              style={{ display: isShrinkNav ? "none" : "" }}
              className={isShrinkNav ? "menu open" : "menu"}
            >
              <ul style={{ display: isShrinkNav ? "" : "flex" }}>
                <div
                  className="comic_dropdown"
                  style={{ position: "relative" }}
                >
                  {/* <button class="home-button">HOME</button> */}
                  <AwesomeButton
                    className="nav_button_padding"
                    type={buttonType}
                    style={{
                      fontFamily: "KaoriGelBold",
                      paddingRight: "2px",
                      paddingLeft: "2px",
                    }}
                    onPress={() => {
                      flipBook.current.pageFlip().flip(1, "top");
                      if (isShrinkNav) {
                        toggleMenu();
                      }
                    }}
                  >
                    <span style={{ color: "yellow" }}>
                      Home
                    </span>
                  </AwesomeButton>

                  <div className="dropdown">
                    <div className="dropdown-content">
                      <div>
                        <AwesomeButton
                          className="nav_button_padding"
                          type="secondary"
                          style={{
                            fontFamily: "KaoriGelBold",
                            paddingTop: "10px",
                            paddingRight: "2px",
                            paddingLeft: "2px",
                          }}
                          onPress={() => {
                            flipBook.current.pageFlip().flip(3, "top");
                            if (isShrinkNav) {
                              toggleMenu();
                            }
                          }}
                        >
                          AboutUs
                        </AwesomeButton>
                      </div>
                      <div>
                        <AwesomeButton
                          className="nav_button_padding"
                          type="secondary"
                          style={{
                            fontFamily: "KaoriGelBold",
                            paddingTop: "10px",
                            paddingRight: "2px",
                            paddingLeft: "2px",
                          }}
                          onPress={() => {
                            flipBook.current.pageFlip().flip(51, "top");
                            if (isShrinkNav) {
                              toggleMenu();
                            }
                          }}
                        >
                          OurTeam
                        </AwesomeButton>
                      </div>
                      <div>
                        <AwesomeButton
                          className="nav_button_padding"
                          type="secondary"
                          style={{
                            fontFamily: "KaoriGelBold",
                            paddingTop: "10px",
                            paddingRight: "2px",
                            paddingLeft: "2px",
                          }}
                          onPress={() => {
                            flipBook.current.pageFlip().flip(52, "top");
                            if (isShrinkNav) {
                              toggleMenu();
                            }
                          }}
                        >
                          ContactUs
                        </AwesomeButton>
                      </div>

                      <a></a>
                    </div>
                  </div>
                </div>
                <div
                  className="comic_dropdown"
                  style={{ position: "relative" }}
                >
                  <AwesomeButton
                    className="nav_button_padding"
                    type={buttonType}
                    onPress={() => {
                      flipBook.current.pageFlip().flip(4, "top");
                    }}
                  >
                    <span style={{ color: "yellow" }}>
                      Comic
                    </span>
                  </AwesomeButton>
                  <div className="dropdown">
                    <div className="dropdown-content">
                      <div>
                        <AwesomeButton
                          className="nav_button_padding"
                          type="secondary"
                          style={{
                            fontFamily: "KaoriGelBold",
                            paddingTop: "10px",
                            paddingRight: "2px",
                            paddingLeft: "2px",
                          }}
                          onPress={() => {
                            flipBook.current.pageFlip().flip(30, "top");
                            if (isShrinkNav) {
                              toggleMenu();
                            }
                          }}
                        >
                          <p>Chapter3</p>
                          <p className="color-change">new</p>
                        </AwesomeButton>
                      </div>
                      <div>
                        <AwesomeButton
                          className="nav_button_padding"
                          type="secondary"
                          style={{
                            fontFamily: "KaoriGelBold",
                            paddingTop: "10px",
                            paddingRight: "2px",
                            paddingLeft: "2px",
                          }}
                          onPress={() => {
                            flipBook.current.pageFlip().flip(18, "top");
                            if (isShrinkNav) {
                              toggleMenu();
                            }
                          }}
                        >
                          Chapter2
                        </AwesomeButton>
                      </div>
                      <div>
                        {" "}
                        <AwesomeButton
                          className="nav_button_padding"
                          type="secondary"
                          style={{
                            fontFamily: "KaoriGelBold",
                            paddingTop: "10px",
                            paddingRight: "2px",
                            paddingLeft: "2px",
                          }}
                          onPress={() => {
                            flipBook.current.pageFlip().flip(5, "top");
                            if (isShrinkNav) {
                              toggleMenu();
                            }
                          }}
                        >
                          Chapter1
                        </AwesomeButton>
                      </div>

                      <a></a>
                    </div>
                  </div>
                </div>

                <AwesomeButton
                  className="nav_button_padding"
                  type={buttonType}
                  style={{
                    fontFamily: "KaoriGelBold",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                  }}
                  onPress={() => {
                    flipBook.current.pageFlip().flip(42, "top");
                    if (isShrinkNav) {
                      toggleMenu();
                    }
                  }}
                >
                  <span style={{ color: "yellow" }}>
                    Tokenomics
                  </span>
                </AwesomeButton>
                <AwesomeButton
                  className="nav_button_padding"
                  type={buttonType}
                  style={{
                    fontFamily: "KaoriGelBold",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                  }}
                  onPress={() => {
                    flipBook.current.pageFlip().flip(44, "top");
                    if (isShrinkNav) {
                      toggleMenu();
                    }
                  }}
                >
                  <span style={{ color: "yellow" }}>
                    RoadMap
                  </span>
                </AwesomeButton>
                <AwesomeButton
                  className="nav_button_padding"
                  type={buttonType}
                  style={{
                    fontFamily: "KaoriGelBold",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                  }}
                  onPress={() => {
                    flipBook.current.pageFlip().flip(46, "top");
                    if (isShrinkNav) {
                      toggleMenu();
                    }
                  }}
                >
                  <span style={{ color: "yellow" }}>
                    Gallery
                  </span>
                </AwesomeButton>
                <AwesomeButton
                  className="nav_button_padding"
                  type={buttonType}
                  style={{
                    fontFamily: "KaoriGelBold",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                  }}
                  onPress={() => {
                    flipBook.current.pageFlip().flip(56, "top");
                    if (isShrinkNav) {
                      toggleMenu();
                    }
                  }}
                >
                  <span style={{ color: "yellow" }}>
                    Learn
                  </span>
                </AwesomeButton>
                <AwesomeButton
                  className="nav_button_padding"
                  type={buttonType}
                  style={{
                    fontFamily: "KaoriGelBold",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                  }}
                  onPress={() => {
                    window?.open("https://shop.ikigaionsol.com/", "_blank")
                  }}
                >
                  <span style={{ color: "yellow" }}>
                    Merch
                  </span>
                </AwesomeButton>

                <AwesomeButton
                  className="nav_button_padding"
                  type={buttonType}
                  style={{
                    fontFamily: "KaoriGelBold",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                  }}
                  onPress={() => {
                    flipBook.current.pageFlip().flip(52, "top");
                    nextButtonClick();
                    // setCurrentPage(40);
                    // setCurrentPage(39);
                    if (isShrinkNav) {
                      toggleMenu();
                    }
                  }}
                >
                  <span style={{ color: "yellow" }}>
                    PFPmaker
                  </span>
                </AwesomeButton>
                <AwesomeButton
                  className="nav_button_padding"
                  type={buttonType}
                  style={{
                    fontFamily: "KaoriGelBold",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                  }}
                >
                  <a
                    href="https://www.dextools.io/app/en/solana/pair-explorer/9fDEGZKgVvLEeQJGPyC9iacqYS9nhG1ZQRBsCDm9sCvu?t=1716340469947"
                    target="_blank"
                    style={{ color: isDarkModeEnabled ? "darkgrey" : "#e3e300" }}
                  >
                    <span style={{ color: "yellow" }}>
                      DexTools
                    </span>
                  </a>
                </AwesomeButton>

                <AwesomeButton
                  className="nav_button_padding"
                  type={buttonType}
                  style={{
                    fontFamily: "KaoriGelBold",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                  }}
                  onPress={() => {
                    flipBook.current.pageFlip().flip(58, "top");
                    if (isShrinkNav) {
                      toggleMenu();
                    }
                  }}
                >
                  <span style={{ color: "yellow" }}>
                    Staking
                  </span>
                </AwesomeButton>
                {isAdminPanelEnabled && <AwesomeButton
                  className="nav_button_padding"
                  type={buttonType}
                  style={{
                    fontFamily: "KaoriGelBold",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                  }}
                  onPress={() => {
                    flipBook.current.pageFlip().flip(62, "top");
                    if (isShrinkNav) {
                      toggleMenu();
                    }
                  }}
                >
                  <span style={{ color: "yellow" }}>
                    Admin
                  </span>
                </AwesomeButton>}

                <AwesomeButton
                  className="nav_button_padding"
                  type={buttonType}
                  style={{
                    fontFamily: "KaoriGelBold",
                    paddingRight: "2px",
                    paddingLeft: "2px",
                  }}
                  onPress={() => {
                    flipBook.current.pageFlip().flip(60, "top");
                    if (isShrinkNav) {
                      toggleMenu();
                    }
                  }}
                >
                  <span style={{ color: "yellow" }}>
                    Music
                  </span>
                </AwesomeButton>

                <div onClick={toggleDarkMode}>
                  <img src={themeImage}></img>
                </div>
                <li
                  style={{ display: "flex", justifyContent: "center" }}
                ></li>
              </ul>
            </div>
            {isShrinkNav && <div
              className="menu-toggle"
              onClick={toggleMenu}
              style={{ paddingRight: "2vw" }}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>}
          </div>
          <div className="ikigai_logo">
            <img
              decoding="async"
              height="100%"
              src="/assets/logo2.gif"
            ></img>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
