import React, { lazy, useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "react-awesome-button/dist/styles.css";
import "react-awesome-button/dist/themes/theme-blue.css";
import Navbar from "./components/presentation/navbar";
import Footer from "./components/presentation/footer";

// Hooks
import { useDarkMode } from "./provider/theme-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { stakingData } from "./utils/constants";
import NftPage from "./pages/nft/NftPage";
import Lottery from "./pages/lottery/Lottery";
import ConnectWallet from "./pages/connect-wallet/ConnectWallet";
import BuyTicket from "./pages/buy-tickets/BuyTicket";
import HistoryTicket from "./pages/history-ticket/HistoryTicket";
import { createTransferCheckedInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { create, fetchAsset, fetchCollection } from "@metaplex-foundation/mpl-core";
import { generateSigner } from "@metaplex-foundation/umi";
import bs58 from "bs58"; // ✅ Import bs58 for Base58 encoding
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import { toast } from "react-toastify";
import "@solana/wallet-adapter-react-ui/styles.css";


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
const ComicPage14 = React.lazy(() => import("./pages/comicPage14"));
const ComicPage14_2 = React.lazy(() => import("./pages/comicPage14_2"));
const ComicPage14_3 = React.lazy(() => import("./pages/comicPage14_3"));
const ComicPage14_4 = React.lazy(() => import("./pages/comicPage14_4"));
const ComicPage14_5 = React.lazy(() => import("./pages/comicPage14_5"));
const ComicPage14_6 = React.lazy(() => import("./pages/comicPage14_6"));
const ComicPage14_7 = React.lazy(() => import("./pages/comicPage14_7"));
const ComicPage14_8 = React.lazy(() => import("./pages/comicPage14_8"));
const ComicPage14_9 = React.lazy(() => import("./pages/comicPage14_9"));
const ComicPage14_10 = React.lazy(() => import("./pages/comicPage14_10"));
const ComicPage14_11 = React.lazy(() => import("./pages/comicPage14_11"));
const ComicPage14_12 = React.lazy(() => import("./pages/comicPage14_12"));
const ComicPage14_13 = React.lazy(() => import("./pages/comicPage14_13"));
const ComicPage15 = React.lazy(() => import("./pages/comicPage15"));
const ComicPage15_2 = React.lazy(() => import("./pages/comicPage15_2"));
const ComicPage15_3 = React.lazy(() => import("./pages/comicPage15_3"));
const ComicPage15_4 = React.lazy(() => import("./pages/comicPage15_4"));
const ComicPage15_5 = React.lazy(() => import("./pages/comicPage15_5"));
const ComicPage15_6 = React.lazy(() => import("./pages/comicPage15_6"));
const ComicPage15_7 = React.lazy(() => import("./pages/comicPage15_7"));
const ComicPage15_8 = React.lazy(() => import("./pages/comicPage15_8"));
const ComicPage15_9 = React.lazy(() => import("./pages/comicPage15_9"));
const ComicPage15_10 = React.lazy(() => import("./pages/comicPage15_10"));
const ComicPage15_11 = React.lazy(() => import("./pages/comicPage15_11"));
const ComicPage15_12 = React.lazy(() => import("./pages/comicPage15_12"));

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
const NftPageLeft = React.lazy(() => import("./pages/nft/NftPageLeft"));
const NftPageRight = React.lazy(() => import("./pages/nft/NftPageRight"));
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
const AdminPageLeft = React.lazy(() => import("./pages/admin/AdminPageLeft"));
const AmdinPageRight = React.lazy(() => import("./pages/admin/AdminPageRight"));

const MainBook = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const { isDarkModeEnabled } = useDarkMode();
  const wallet = useWallet();
  const umi = createUmi(endpoint);

  const connection = new Connection(endpoint);

  const { publicKey, signTransaction, connected } = wallet;
  const [isAdminPanelEnabled, setIsAdminPanelEnabled] = useState();
  const [isClaimed, setIsClaimed] = useState(false);
  const [totalReward, setTotalReward] = useState(0);

  const flipBook = useRef();
  const [isShrinkNav, setIsShrinkNav] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVisiblePage, setCurrentVisiblePage] = useState(0);
  const [minting, setMinting] = useState(false);
  const [mintingAsset, setMintingAsset] = useState("");

  const handleClick = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
    }, 1800); // Hide after 1 seconds
  };

  const handleAudio = () => {
    const audio = new Audio("/assets/page-flip-10.mp3");
    audio.play();
  };

  const prevButtonClick = () => {
    flipBook.current.pageFlip().flipPrev();
    setCurrentPage(flipBook.current.pageFlip().pages.currentPageIndex);
  };

  const nextButtonClick = () => {
    const nextPageIndex = flipBook.current.pageFlip().getCurrentPageIndex() + 1;
    if (
      (nextPageIndex === 92 || (!isMobile && nextPageIndex === 91)) &&
      !isAdminPanelEnabled
    ) {
      return;
    }
    flipBook.current.pageFlip().flipNext();
    setCurrentPage(flipBook.current.pageFlip().getCurrentPageIndex());
  };

  const createAsset = async (assetId, amount) => {
    setMinting(true)
    setMintingAsset(assetId)
    let assets = [];
    if (!publicKey || !connected) {
      console.error("Wallet not connected");
      return;
    }

    const BASE_URL = `https://nft.ikigaionsol.com/media/${assetId}.json`;
    umi.use(walletAdapterIdentity(wallet));

    // Token and admin addresses (use actual addresses here)
    const tokenAddress = new PublicKey(
      "84AYw2XZ5HcyWWmVNR6s4uS3baHrMLpPMnEfBTm6JkdE"
    );
    const adminAddress = new PublicKey(
      "DG6ZWtgMqYo4P9wsjF5vetosPZmthk33AxJCgeBEY7nr"
    );

    const userTokenAccount = await getAssociatedTokenAddress(
      tokenAddress,
      publicKey
    );
    const adminTokenAccount = await getAssociatedTokenAddress(
      tokenAddress,
      adminAddress
    );
    
    
    try {

      let collection;
      console.log({umi})
      const collectionAddress = new PublicKey(
        "3SsoHng2czRKa1Prdsihgm95DdKpo9Wi2F6yB8ANN8zi"
      );

      collection = await fetchCollection(umi, collectionAddress);
      console.log(`Fetched Collection Address: ${collection.publicKey}`);
      if (!wallet || !wallet.publicKey || !collection ) {
        console.error(
          "Phantom wallet is not connected or publicKey is missing."
        );
        return;
      }

      // Fetch the latest blockhash for transaction finalization
      const { blockhash } = await connection.getLatestBlockhash();

      // Create the transfer instruction
      const transferInstruction = createTransferCheckedInstruction(
        userTokenAccount, // Sender's token account
        tokenAddress, // Token address (mint address)
        adminTokenAccount, // Receiver's token account
        wallet.publicKey, // Sender's public key (signer)
        amount * 10 ** 9, // Amount (5 tokens with 9 decimals)
        9 // Token decimals
      );

      // Create a new transaction
      const transferTx = new Transaction().add(transferInstruction);

      // Set blockhash and fee payer
      transferTx.recentBlockhash = blockhash;
      transferTx.feePayer = wallet.publicKey;

      // Sign transaction with wallet
      const signedTx = await signTransaction(transferTx);

      // Send transaction
      const transferSignature = await connection.sendRawTransaction(
        signedTx.serialize()
      );

      // Confirm transaction
      await connection.confirmTransaction(transferSignature, "finalized");


      console.log(`Token transfer successful: ${transferSignature}`);

      if (transferSignature) {

        const assetAddress = generateSigner(umi);
        console.log(`Creating asset: ${assetAddress.publicKey}`);

        const transaction = create(umi, {
          asset: assetAddress,
          collection: collection.publicKey,
          owner: umi.identity.publicKey,
          authority: umi.identity.publicKey,
          name: `IKIGAI NFT`,
          uri: BASE_URL,
        });

        // ✅ Ensure `txSignature` is Base58 encoded
        const txSignatureUint8Array = (await transaction.sendAndConfirm(umi))
          .signature;
        const txSignature = bs58.encode(txSignatureUint8Array); // Convert Uint8Array to Base58

        console.log(`Asset creation confirmed with signature: ${txSignature}`);

        // ✅ Ensure finalization before fetching asset
        await connection.confirmTransaction(txSignature, "finalized");
        console.log("Transaction finalized on-chain.");
        setMinting(false)
        setMintingAsset("")
  
        // ✅ Retry fetching the asset with a delay
        let asset;
        for (let attempt = 0; attempt < 5; attempt++) {
          try {
            asset = await fetchAsset(umi, assetAddress.publicKey);
            console.log(`Fetched Asset Details: ${asset.publicKey}`);
            assets.push(asset);
            return assetAddress.publicKey;
          } catch (error) {
            console.warn(`Retrying asset fetch (Attempt ${attempt + 1}/5)...`);
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        }

        console.error("Failed to fetch asset after multiple attempts.");
      }
    } catch (error) {
      toast.error(error)
      setMinting(false)
      setMintingAsset("")
      console.error("Error in token transfer:", error);
    }
  };

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
    };
  }, []);

  useEffect(() => {
    if (connected) {
      const temporaryAdmin = Keypair.fromSeed(publicKey.toBytes());
      const temporaryAdminPublicKey = temporaryAdmin?.publicKey?.toString();
      if (
        temporaryAdminPublicKey ===
          stakingData["ikigai"]?.admin?.publicKey?.toString() ||
        temporaryAdminPublicKey ===
          stakingData["tyke"]?.admin?.publicKey?.toString()
      ) {
        setIsAdminPanelEnabled(true);
      } else {
        setIsAdminPanelEnabled(false);
      }
    } else {
      setIsAdminPanelEnabled(false);
    }
  }, [connected]);

  const pages = [
    <HomeLeft />,
    <Page1 />,
    <AboutUsLeft />,
    <Page2 />,
    <ComicBlankLeft />,
    <ComicPage1 />,
    <ComicPage2 />,
    <ComicPage3 />,
    <ComicPage4 />,
    <ComicPage5 />,
    <ComicPage6 />,
    <ComicPage7 />,
    <ComicPage8 />,
    <ComicPage9 />,
    <ComicPage10 />,
    <ComicPage11 />,
    <ComicPage12 />,
    <ComicPage13 />,
    <ComicPage1_2 />,
    <ComicPage2_2 />,
    <ComicPage3_2 />,
    <ComicPage4_2 />,
    <ComicPage5_2 />,
    <ComicPage6_2 />,
    <ComicPage7_2 />,
    <ComicPage8_2 />,
    <ComicPage9_2 />,
    <ComicPage10_2 />,
    <ComicPage11_2 />,
    <ComicPage12_2 />,
    <ComicPage1_3 />,
    <ComicPage2_3 />,
    <ComicPage3_3 />,
    <ComicPage4_3 />,
    <ComicPage5_3 />,
    <ComicPage6_3 />,
    <ComicPage7_3 />,
    <ComicPage8_3 />,
    <ComicPage9_3 />,
    <ComicPage10_3 />,
    <ComicPage11_3 />,
    <ComicPage12_3 />,
    <ComicPage14 />,
    <ComicPage14_2 />,
    <ComicPage14_3 />,
    <ComicPage14_4 />,
    <ComicPage14_5 />,
    <ComicPage14_6 />,
    <ComicPage14_7 />,
    <ComicPage14_8 />,
    <ComicPage14_9 />,
    <ComicPage14_10 />,
    <ComicPage14_11 />,
    <ComicPage14_12 />,
    <ComicPage14_13 />,
    <ComicPage15 />,
    <ComicPage15_2 />,
    <ComicPage15_3 />,
    <ComicPage15_4 />,
    <ComicPage15_5 />,
    <ComicPage15_6 />,
    <ComicPage15_7 />,
    <ComicPage15_8 />,
    <ComicPage15_9 />,
    <ComicPage15_10 />,
    <ComicPage15_11 />,
    <ComicPage15_12 />,
    <Page3 />,
    <Page4 />,
    <RoadMapLeft />,
    <RoadMapRight />,
    <Animation1 />,
    <GalleryPage1 />,
    <Animation2 />,
    <GalleryPage2 />,
    <Page12 />,
    <Page13 />,
    <ContactUs />,
    <LearningLeft />,
    <LearningRight />,
    <Page15 pageNumber={currentPage} />,
    <Page16 pageNumber={currentPage} />,
    <StakingPageLeft isClaimed={isClaimed} totalReward={totalReward} />,
    <StakingPageRight
      setIsClaimed={setIsClaimed}
      setTotalReward={setTotalReward}
    />,
    <MusicPageLeft />,
    <MusicPageRight isMobile={isMobile} />,
    <NftPageLeft createAsset={createAsset} minting={minting} mintingAsset={mintingAsset} connected={connected}/>,
    <NftPageRight createAsset={createAsset} minting={minting} mintingAsset={mintingAsset} connected={connected}/>,
    // <HistoryTicket />,
    // <ConnectWallet />,
    // <BuyTicket />,
    // <Lottery />,
    // <AdminPageLeft />,
    // <AmdinPageRight isMobile={isMobile} />,
  ];

  const handleFlip = (e) => {
    setCurrentVisiblePage(e.data); // Update the current visible page
  };

  // Conditionally render pages near the current page
  const renderPage = (index) => {
    if (
      index === currentVisiblePage ||
      index === currentVisiblePage - 1 ||
      index === currentVisiblePage + 1
    ) {
      return pages[index]; // Render the page if it's current, previous, or next
    }
    return (
      <div className="demoPage comic_background_white_left loading-placeholder">
        <div className="spinner"></div>
      </div>
    );
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

        <div
          className={`book-cover ${
            !isMobile && window.innerWidth <= 1535 ? "book-cover-small" : ""
          }`}
          style={{ position: "relative" }}
        >
          <div style={{ width: "100%", height: "80%", position: "relative" }}>
            <div className="demo-book">
              <HTMLFlipBook
                width={isMobile ? 300 : 500}
                height={isMobile ? 450 : 500}
                size={isMobile ? "fixed" : "stretch"}
                minWidth={5}
                maxWidth={1200}
                usePortrait={true}
                minHeight={5}
                maxHeight={500}
                swipeDistance={30}
                onChangeOrientation={true}
                maxShadowOpacity={0.2}
                ref={flipBook}
                useMouseEvents={false}
                showPageCorners={false}
                onFlip={handleFlip}
                flippingTime={1500}
              >
                {pages.map((_, index) => (
                  <div key={index}>{renderPage(index)}</div>
                ))}
              </HTMLFlipBook>
            </div>
            {!isMobile && (
              <>
                <div className="idle-right">
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
                {!isDarkModeEnabled && (
                  <>
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
                )}
              </>
            )}
            {isDarkModeEnabled && !isMobile && (
              <div className="idle-left">
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
