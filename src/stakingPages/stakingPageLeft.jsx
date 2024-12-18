import { useState, useRef, useEffect } from "react";
import React from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "react-awesome-button/dist/themes/theme-blue.css";
import { useWalletConnect } from "../provider/staking-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";

const StakingPageLeft = React.forwardRef((props, ref) => {
  const [percentage, setPercentage] = useState(0); // Tracks the percentage dragged
  const [isDisConnecting, setIsDisConnecting] = useState(false);
  const lineRef = useRef(null); // Reference to the line
  const {
    isWalletConnectVisible,
    openWalletConnect,
    closeWalletConnect,
    isWalletConnectConfirming,
    openWalletConnectConfirming,
    closeWalletConnectConfirming,
    isWalletConnected,
    connectedWallet,
    setIsWalletConnected,
  } = useWalletConnect();

  const {
    connected,
    publicKey,
    connect,
    disconnect,
    connecting,
    select,
    wallets,
  } = useWallet();

  const handleConnect = async () => {
    try {

      const phantomWallet = wallets.find(
        (wallet) => wallet.adapter.name === "Phantom",
      );
      if (!phantomWallet) {
        alert("Phantom wallet not available. Please install Phantom.");
        return;
      }

      if (
        phantomWallet.readyState !== WalletReadyState.Installed &&
        phantomWallet.readyState !== WalletReadyState.Loadable
      ) {
        alert(
          "Phantom wallet is not ready. Please ensure it is installed and active.",
        );
        return;
      }

      select(phantomWallet.adapter.name);
      console.log(2222222);
      await connect();

    } catch (error) {

      console.error("Wallet connection failed:", error.message);
    }
  };

  const handleDisconnect = async () => {
    setIsDisConnecting(true);
    await disconnect();
    setIsWalletConnected(false);
    setIsDisConnecting(false);
  };

  const handleDrag = (e) => {
    const line = lineRef.current.getBoundingClientRect(); // Get line's dimensions
    const offsetX = e.clientX - line.left; // Mouse position relative to the line
    let newPercentage = (offsetX / line.width) * 100;

    // Clamp percentage between 0 and 100
    newPercentage = Math.max(0, Math.min(newPercentage, 100));
    setPercentage(newPercentage);
  };

  useEffect(() => {
    if (connected) {
      setIsWalletConnected(true);
      closeWalletConnect();
    }
  }, [connected]);

  return (
    <div
      className="demoPage comic_background_white_left"
      ref={ref}
      style={{ width: "100%" }}
    >
      <div
        style={{
          height: "100%",
          width: "90%",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div style={{ height: "30%", width: "100%", display: "flex" }}>
          <div
            className="stake_main_font_style stake_flex_align_center"
            style={{ textAlign: "start", margin: "0", flex: "80%" }}
          >
            <div>
              <h1 style={{ margin: "0" }}>STAKING</h1>
              <span className="stake_main_title_content">
                {" "}
                Our content is designed to educate the 500,000+
                crypto earning investors who use the CoinLedger
                platform. Though our and form are for
                informational purposes.
              </span>
            </div>
          </div>
          <div
            className="display_flex_center"
            style={{
              height: "auto",
              boxSizing: "border-box",
              flex: "20%",
            }}
          >
            <img
              alt=""
              src="/assets/staking/dfe9730f62f014b284d1e9197277cf00.png"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div
          className="stake_border"
          style={{ height: "40%", width: "100%" }}
        >
          <div
            className="stake_element1"
            style={{ overflowY: "auto" }}
          >
            <div className=" stake_main_font_style stake_wrap stake_flex_align_center">
              <div className="stake_flex_align_center">
                <div>
                  <span style={{ fontSize: "30px" }}>
                    STAKEikigai
                  </span>
                </div>
                <div
                  style={{
                    height: "70px",
                    width: "auto",
                    boxSizing: "border-box",
                  }}
                >
                  <img
                    alt=""
                    src="/assets/staking/logo1.gif"
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
              <div className="stake_flex_align_center">
                <div>
                  <AwesomeButton
                    className="stake-aws-btn"
                    type="primary"
                    style={{
                      fontSize: "8px",
                      fontFamily: "KaoriGelBold",
                      padding: 0,
                    }}
                    onPress={() => {
                      console.log("invite friends");
                    }}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.08571 0C2.0127 0 1.14286 0.869847 1.14286 1.94286C1.14286 3.01587 2.0127 3.88571 3.08571 3.88571C4.15872 3.88571 5.02857 3.01587 5.02857 1.94286C5.02857 0.869847 4.15872 0 3.08571 0Z"
                        fill="#070808"
                      />
                      <path
                        d="M4.23226 4.75007C3.4727 4.62885 2.69873 4.62885 1.93917 4.75007L1.85775 4.76306C0.787507 4.93387 0 5.85702 0 6.94081C0 7.52579 0.474213 8 1.05919 8H5.11224C5.69722 8 6.17143 7.52579 6.17143 6.94081C6.17143 5.85702 5.38392 4.93387 4.31368 4.76306L4.23226 4.75007Z"
                        fill="#070808"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.74286 2.74286C6.93221 2.74286 7.08571 2.89636 7.08571 3.08571V3.65714H7.65714C7.8465 3.65714 8 3.81065 8 4C8 4.18935 7.8465 4.34286 7.65714 4.34286H7.08571V4.91429C7.08571 5.10364 6.93221 5.25714 6.74286 5.25714C6.5535 5.25714 6.4 5.10364 6.4 4.91429V4.34286H5.82857C5.63922 4.34286 5.48571 4.18935 5.48571 4C5.48571 3.81065 5.63922 3.65714 5.82857 3.65714H6.4V3.08571C6.4 2.89636 6.5535 2.74286 6.74286 2.74286Z"
                        fill="#070808"
                      />
                    </svg>
                    <span className="stake_main_font_style">
                      INVITE FRIENDS
                    </span>
                  </AwesomeButton>
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <AwesomeButton
                    className="stake-aws-btn"
                    type="primary"
                    style={{
                      fontSize: "8px",
                      fontFamily: "KaoriGelBold",
                      padding: 0,
                    }}
                    onPress={() => {
                      console.log("invite friends");
                    }}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.36139 0.0472828C4.43427 0.091855 4.49207 0.150731 4.55225 0.210201C4.57404 0.23131 4.57404 0.23131 4.59627 0.252845C4.64474 0.299881 4.69294 0.347167 4.74115 0.394457C4.77591 0.428297 4.81068 0.462123 4.84547 0.495933C4.93002 0.578163 5.01437 0.660583 5.09865 0.743074C5.16716 0.810122 5.23574 0.877101 5.30437 0.94403C5.31415 0.953567 5.32393 0.963104 5.33401 0.97293C5.35388 0.992306 5.37374 1.01168 5.39361 1.03106C5.57976 1.2126 5.76569 1.39435 5.95154 1.57618C6.11094 1.73213 6.27053 1.88788 6.43026 2.0435C6.61588 2.22434 6.80137 2.4053 6.98668 2.58644C7.00645 2.60576 7.02621 2.62508 7.04598 2.6444C7.05571 2.65391 7.06543 2.66341 7.07545 2.67321C7.14392 2.74012 7.21247 2.80694 7.28106 2.87374C7.36466 2.95515 7.44812 3.03669 7.53141 3.1184C7.5739 3.16006 7.61646 3.20165 7.65914 3.24313C7.70542 3.28812 7.75148 3.33333 7.79748 3.3786C7.81098 3.39162 7.82448 3.40464 7.8384 3.41806C7.92913 3.50801 7.98327 3.58162 8 3.70994C7.97313 3.92355 7.78666 4.05354 7.62857 4.18548C7.58388 4.22449 7.54196 4.26565 7.49983 4.30728C7.43564 4.37072 7.36982 4.43014 7.30044 4.48804C7.25575 4.52705 7.21383 4.56821 7.1717 4.60985C7.10751 4.67328 7.04169 4.73271 6.97231 4.79061C6.92762 4.82961 6.8857 4.87078 6.84357 4.91241C6.77938 4.97584 6.71356 5.03527 6.64418 5.09317C6.59949 5.13218 6.55757 5.17334 6.51544 5.21497C6.45125 5.27841 6.38543 5.33783 6.31605 5.39573C6.27136 5.43474 6.22944 5.4759 6.18731 5.51754C6.12312 5.58097 6.0573 5.6404 5.98792 5.6983C5.94323 5.7373 5.90131 5.77847 5.85918 5.8201C5.79499 5.88353 5.72917 5.94296 5.65979 6.00086C5.6151 6.03987 5.57318 6.08103 5.53105 6.12266C5.46686 6.1861 5.40104 6.24552 5.33166 6.30342C5.28697 6.34243 5.24505 6.38359 5.20292 6.42523C5.13873 6.48866 5.07291 6.54809 5.00353 6.60599C4.95884 6.64499 4.91692 6.68616 4.87479 6.72779C4.81059 6.79123 4.74484 6.85072 4.67533 6.90848C4.63068 6.94761 4.5895 6.98937 4.54779 7.03147C4.34345 7.23067 4.34345 7.23067 4.1889 7.23725C4.09361 7.2314 4.03815 7.21309 3.96331 7.15494C3.88664 7.05111 3.88018 6.97053 3.88212 6.84466C3.88211 6.82642 3.88209 6.80817 3.88208 6.78937C3.88213 6.72937 3.8827 6.66939 3.88327 6.60939C3.88341 6.56767 3.88351 6.52595 3.88359 6.48423C3.88386 6.37465 3.88458 6.26508 3.88539 6.15551C3.88613 6.0436 3.88647 5.93169 3.88683 5.81979C3.88761 5.60038 3.88886 5.38098 3.89039 5.16158C3.82453 5.17232 3.75869 5.18324 3.69286 5.19419C3.67449 5.19718 3.65611 5.20018 3.63718 5.20326C2.96437 5.31573 2.37258 5.62769 1.86692 6.06927C1.85667 6.07818 1.84642 6.08709 1.83586 6.09627C1.71705 6.2 1.60447 6.30553 1.50233 6.42523C1.48619 6.44309 1.47 6.4609 1.45377 6.47869C1.3109 6.63632 1.18476 6.80215 1.06483 6.97696C1.05144 6.99639 1.05144 6.99639 1.03778 7.01621C0.86684 7.26641 0.71964 7.53086 0.588412 7.80294C0.539807 7.90317 0.496533 7.9526 0.390336 7.99144C0.27448 8.01334 0.190649 7.99328 0.093039 7.9306C0.0305842 7.87357 0.00442861 7.82073 0.000440726 7.73787C8.47579e-05 7.70752 4.32989e-05 7.67716 0.000253803 7.64681C0.000177523 7.63031 0.000100965 7.6138 2.23742e-05 7.5968C-9.30269e-05 7.54258 0.00025471 7.48837 0.000681056 7.43414C0.000759814 7.4155 0.000838016 7.39686 0.000919161 7.37765C0.00828664 5.88462 0.257484 4.24643 1.33827 3.11483C1.35077 3.10166 1.36327 3.08849 1.37615 3.07492C1.49283 2.95636 1.62254 2.85653 1.75755 2.75887C1.76773 2.75142 1.77791 2.74396 1.78841 2.73628C2.34384 2.33494 3.12038 2.09822 3.81162 2.10013C3.83375 2.10018 3.83375 2.10018 3.85634 2.10023C3.86758 2.10027 3.87881 2.10031 3.89039 2.10035C3.89021 2.06525 3.89021 2.06525 3.89003 2.02945C3.88892 1.80895 3.8881 1.58845 3.88756 1.36795C3.88727 1.25459 3.88689 1.14123 3.88627 1.02787C3.88567 0.918467 3.88535 0.809071 3.8852 0.699671C3.8851 0.657932 3.88491 0.616194 3.88461 0.574456C3.88421 0.515996 3.88416 0.457545 3.88419 0.399084C3.88399 0.381827 3.88379 0.36457 3.88359 0.346791C3.88403 0.253293 3.89108 0.187673 3.94508 0.106993C4.07301 -0.0113291 4.20586 -0.0319378 4.36139 0.0472828Z"
                        fill="black"
                      />
                    </svg>
                    <span className="stake_main_font_style">
                      SHARE
                    </span>
                  </AwesomeButton>
                </div>
              </div>
            </div>
            <div
              style={{
                justifyContent: "start",
                display: "flex",
              }}
            >
              <div>
                <span
                  className="stake_main_font_style"
                  style={{
                    textAlign: "start",
                    fontSize: "12px",
                  }}
                >
                  Current Reward Balance IKIGAI
                </span>
              </div>
            </div>
            <div className="stake_flex_align_center stake_wrap">
              <div style={{ display: "flex" }}>
                <div>
                  <span
                    className="stake_main_font_style"
                    style={{ fontSize: "25px" }}
                  >
                    345,555,555
                  </span>
                </div>
                <div>
                  <span
                    className="stake_main_font_style"
                    style={{
                      fontSize: "14px",
                      color: "#018790",
                    }}
                  >
                    20.33$
                  </span>
                </div>
              </div>

              {isWalletConnected && <div style={{ display: "flex" }}>
                <div style={{ paddingLeft: "10px" }}>
                  <AwesomeButton
                    className="stake-aws-btn"
                    type="secondary"
                    style={{
                      fontSize: "11px",
                      fontFamily: "KaoriGelBold",
                      padding: 0,
                    }}
                    onPress={() => {
                      console.log("invite friends");
                    }}
                  >
                    <span className="stake_main_font_style">
                      UPGRADE
                    </span>
                  </AwesomeButton>
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <AwesomeButton
                    className="stake-aws-btn"
                    type="secondary"
                    style={{
                      fontSize: "11px",
                      fontFamily: "KaoriGelBold",
                      padding: 0,
                    }}
                    onPress={() => {
                      console.log("invite friends");
                    }}
                  >
                    <span className="stake_main_font_style">
                      UNSTAKE
                    </span>
                  </AwesomeButton>
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <AwesomeButton
                    className="stake-aws-btn"
                    type="secondary"
                    style={{
                      fontSize: "11px",
                      fontFamily: "KaoriGelBold",
                      padding: 0,
                    }}
                    onPress={() => {
                      console.log("invite friends");
                    }}
                  >
                    <span className="stake_main_font_style">
                      RESTAKE
                    </span>
                  </AwesomeButton>
                </div>
              </div>}
            </div>
            <div
              className="stake_flex_align_center"
              style={{ justifyContent: "center", padding: "20px" }}
            >
              <div style={{ paddingLeft: "10px", width: "100%" }}>
                <AwesomeButton
                  className="stake-aws-btn2 "
                  type="primary"
                  style={{
                    // fontSize: "17px",
                    width: "100%",
                    height: "auto",
                  }}
                  onPress={() => {
                    if (!isWalletConnected) {
                      openWalletConnect();
                    } else {
                      console.log("hres");
                      handleDisconnect();
                    }
                    console.log("invite friends");
                  }}
                  disabled={isDisConnecting}
                >
                  <span className="stake_main_font_style">
                    {isWalletConnected
                      ? isDisConnecting
                        ? "Disconnecting...."
                        : "DISCONNECT WALLET"
                      : "CONNECT WALLET TO START STAKING"}
                  </span>
                </AwesomeButton>
              </div>
            </div>
          </div>
        </div>
        {isWalletConnected && (
          <>
            <div
              style={{
                height: "5%",
                width: "100%",
                justifyContent: "start",
              }}
              className="stake_flex_align_center"
            >
              <div style={{ paddingTop: "10px" }}>
                <span className="stake_main_font_style">
                  POTENTIAL EARNINGS
                </span>
              </div>
            </div>
            <div className="stake-container">
              <div className="stake-box">
                <div className="stake-header">
                  <span className="staking-font">
                    STAKING RATIO
                  </span>
                  <div className="inner-box">
                    <span>24HRS</span>
                  </div>
                </div>
                <div className="stacking-percentage">
                  {Math.round(percentage)}%
                </div>
                <div className="drag-line-container">
                  <div
                    className="horizontal-line"
                    ref={lineRef}
                    onMouseMove={(e) =>
                      e.buttons === 1 && handleDrag(e)
                    }
                    onClick={handleDrag}
                  >
                    <div
                      className="cursor"
                      style={{ left: `${percentage}%` }}
                    ></div>
                    <div
                      className="selected-line"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="stake-box">
                <div className="stake-header">
                  <span className="staking-font">
                    STAKING REWARD
                  </span>
                  <div className="inner-box">
                    <span>24HRS</span>
                  </div>
                </div>
                <div className="stacking-percentage">
                  70.40%
                </div>
                <div className="stacking-font-light">
                  CURRENT REWARD BALANCE
                </div>
              </div>

              <div className="stake-box">
                <div className="stake-header">
                  <span className="staking-font">
                    DAILY CASHOUT
                  </span>
                  <div className="inner-box">
                    <span>24HRS</span>
                  </div>
                </div>
                <div className="stacking-percentage">
                  70.40%
                </div>
                <div className="stacking-font-light">
                  CURRENT REWARD BALANCE
                </div>
              </div>
            </div>
          </>
        )}

        {!isWalletConnected && (
          <>
            <div
              className="stake_main_font_style"
              style={{
                textAlign: "start",
                fontSize: "20px",
                marginTop: "10px",
              }}
            >
              <div>
                <span>Lottery Tickets</span>
              </div>
            </div>
            <div
              className="stake_border stake_element1"
              style={{ height: "15%", overflowY: "auto" }}
            >
              <div
                style={{ height: "30%" }}
                className="stake_flex_align_center"
              >
                <div
                  className="stake_main_font_style"
                  style={{ justifyContent: "start" }}
                >
                  <span>USER: </span>
                  <span>mark34</span>
                </div>
              </div>
              <div
                className="stake_flex_align_center"
                style={{
                  height: "70%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="stake_main_font_style"
                  style={{ textAlign: "start" }}
                >
                  <div>
                    <span>Lottery tickets earned</span>
                  </div>
                  <div style={{ fontSize: "30px" }}>
                    <span>0 </span>
                    <span>lottery tickets</span>
                  </div>
                </div>
                <div style={{ paddingRight: "10px" }}>
                  <AwesomeButton
                    className="stake-aws-btn3"
                    type="secondary"
                    style={{
                      fontSize: "16px",
                      fontFamily: "KaoriGelBold",
                      padding: 0,
                    }}
                    onPress={() => {
                      console.log("invite friends");
                    }}
                  >
                    <span className="stake_main_font_style">
                      BET
                    </span>
                  </AwesomeButton>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Wallet Connect Component */}

        {isWalletConnectVisible && (
          <div className="stake_stake">
            <div className="stake_unstake1_bg">
              <div className="stake_unstake1_comp">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    height: "45px",
                  }}
                >
                  <button
                    className="stake_close_button"
                    onClick={() => {
                      closeWalletConnect();
                    }}
                  >
                    ×
                  </button>
                </div>
                <div className="stake_unstake1_layout">
                  <div style={{ marginBottom: "20px" }}>
                    <span style={{ fontSize: "20px" }}>
                      Connect Wallet
                    </span>
                  </div>
                  <div
                    className="stake_wallet_state"
                    style={{ marginBottom: "20px" }}
                  >
                    <div
                      style={{
                        height: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      <img
                        alt=""
                        src="/assets/staking/dfe9730f62f014b284d1e9197277cf00.png"
                        style={{
                          height: "60px",
                          paddingTop: "10px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "start",
                        padding: "10px",
                      }}
                    >
                      <span style={{ fontSize: "10px" }}>
                        By connecting your wallet, you
                        acknowledge that you have read,
                        understand, and accept the terms
                        in the disclaimer
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      className="stake_phantom_wallet_select"
                      style={{
                        margin: "20px",
                        padding: "5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent:
                            "space-between",
                          height: "100%",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{ height: "100%" }}
                          >
                            <img
                              alt=""
                              src="/assets/staking/pngaaa.com-6547356 1.png"
                              style={{
                                height: "80%",
                              }}
                            />
                          </div>
                          <span>Phantom Wallet</span>
                          {/* <WalletMultiButton /> */}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="vehicle1"
                            name="vehicle1"
                            value="Bike"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      paddingRight: "10px",
                      width: "80%",
                    }}
                  >
                    <AwesomeButton
                      className="stake-aws-btn3"
                      type="primary"
                      style={{
                        width: "100%",
                        fontSize: "16px",
                        fontFamily: "KaoriGelBold",
                        padding: 0,
                      }}
                      // onPress={() => {
                      //   closeWalletConnect();
                      //   openWalletConnectConfirming();
                      //   connectedWallet();
                      //   console.log("approve button clicked");

                      // }}
                      onPress={handleConnect}
                      disabled={connecting}
                    >
                      <span className="stake_main_font_style">
                        {connecting
                          ? "Connecting...."
                          : "APPROVE"}
                      </span>
                    </AwesomeButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
{
  /* /////////////////////////////////////////////////// */
}
{
  /* /////////////////////////////////////////// Wallet connect confirm component */
}
{
  /* {isWalletConnectConfirming && (
      <div className="stake_unstake">
        <div className="stake_unstake1_bg">
          <div
            className="stake_unstake1_comp"
            style={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                marginTop: "20px",
                border: "2px solid #000000",
                borderRadius: "50%",
                height: "40px",
                width: "40px",
                backgroundColor: "#05FF7E",
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              <svg
                width="24"
                height="21"
                viewBox="0 0 24 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.75911 10.1941L2.43564 10.9305L1.7591 10.1941C0.821036 11.0559 0.743512 12.5213 1.57611 13.4808L2.3314 12.8254L1.57611 13.4808L6.54504 19.2071C6.97891 19.7071 7.60657 20 8.27329 20C8.94002 20 9.56768 19.7071 10.0015 19.2072L22.4239 4.89137C23.2565 3.93187 23.179 2.46639 22.2409 1.60458C21.2863 0.727622 19.8143 0.816829 18.9674 1.79286L8.27329 14.117L5.03261 10.3823C4.18567 9.4063 2.71367 9.31709 1.75911 10.1941Z"
                  fill="white"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontSize: "20px" }}>CONNECTION SUCCESSFUL</span>
            </div>
            <div style={{ width: "100%", marginBottom: "20px" }}>
              <div
                className="stake_phantom_wallet_select"
                style={{
                  margin: "20px",
                  padding: "5px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ heigth: "100%" }}>
                    <img
                      alt=""
                      src="/assets/staking/pngaaa.com-6547356 1.png"
                      style={{ height: "80%" }}
                    />
                  </div>

                  <div>
                    <span style={{ color: "#018790" }}>CONGRATULATIONS!</span>
                    <br />
                    <span style={{ fontSize: "10px" }}>
                      Your phantom wallet has been succesfully connected
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ paddingRight: "20px", marginBottom: "20px" }}>
              <AwesomeButton
                className="stake-aws-btn3"
                type="primary"
                style={{
                  fontSize: "16px",
                  fontFamily: "KaoriGelBold",
                  padding: 0,
                }}
                onPress={() => {
                  closeWalletConnectConfirming();
                  console.log("Go to dashboard button clicked");
                }}
              >
                <span className="stake_main_font_style">START STAKING</span>
              </AwesomeButton>
            </div>
          </div>
        </div>
      </div>
    )} */
}

export default StakingPageLeft;
