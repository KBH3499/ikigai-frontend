import React from "react";
import { AwesomeButton } from "react-awesome-button";

const NftPage = React.forwardRef((props, ref) => {
  return (
    // <div className="demoPage comic_background_white_left" ref={ref}>
    //   <div className="pt-10 px-[5%] h-full">
    //     <div className="stake_main_font_style mb-4 text-left">
    //       <div>
    //         <h2 className="text-[20px] m-0 mb-4">Take part in current round</h2>
    //       </div>
    //     </div>
    //     <div className="p-3 px-[26px] mb-4 bg-[#fff] stake_border_1">
    //       <div className="flex items-center justify-between mb-4 stake_main_font_style">
    //         <p className="text-[14px] font-medium m-0">Pick 6 numbers</p>
    //         <div className="stake_border_1 bg-[#00B8C4] p-1">
    //           <p className="text-[11px] flex justify-between items-center m-0">
    //             Jackpot{" "}
    //             <span className="text-[12px] font-bold ml-11 underline">
    //               300,000.30 IKIGAI
    //             </span>
    //           </p>
    //         </div>
    //       </div>
    //       <div className="flex items-center flex-wrap gap-3 mb-4">
    //         <div className="w-11 h-11 flex items-center justify-center bg-[#D9D9D9] tile_border inner_shadow">
    //           <span className="text-[16px] font-extrabold">30</span>
    //         </div>
    //         <div className="w-11 h-11 flex items-center justify-center bg-[#FFAD33] tile_active_border inner_active_shadow text-white">
    //           <span className="text-[16px] font-extrabold">30</span>
    //         </div>
    //         <div className="w-11 h-11 flex items-center justify-center bg-[#D9D9D9] tile_border inner_shadow">
    //           <span className="text-[16px] font-extrabold">30</span>
    //         </div>
    //         <div className="w-11 h-11 flex items-center justify-center bg-[#FFAD33] tile_active_border inner_active_shadow text-white">
    //           <span className="text-[16px] font-extrabold">30</span>
    //         </div>
    //         <div className="w-11 h-11 flex items-center justify-center bg-[#D9D9D9] tile_border inner_shadow">
    //           <span className="text-[16px] font-extrabold">30</span>
    //         </div>
    //         <div className="w-11 h-11 flex items-center justify-center bg-[#FFAD33] tile_active_border inner_active_shadow text-white">
    //           <span className="text-[16px] font-extrabold">30</span>
    //         </div>
    //         <div className="w-11 h-11 flex items-center justify-center bg-[#D9D9D9] tile_border inner_shadow">
    //           <span className="text-[16px] font-extrabold">30</span>
    //         </div>
    //         <div className="w-11 h-11 flex items-center justify-center bg-[#FFAD33] tile_active_border inner_active_shadow text-white">
    //           <span className="text-[16px] font-extrabold">30</span>
    //         </div>
    //       </div>
    //       <AwesomeButton
    //         className="stake-aws-btn4 !h-[42px]"
    //         type="primary"
    //         style={{
    //           width: "100%",
    //           height: "auto",
    //         }}
    //       >
    //         <span className="stake_main_font_style font-medium">
    //           PLACE BETS
    //         </span>
    //       </AwesomeButton>
    //     </div>
    //     <p className="text-[20px] m-0 mb-2 uppercase text-left font-medium stake_main_font_style">CHECK WINNINGS</p>
    //     <div className="flex items-center gap-2">
    //       <AwesomeButton
    //         className="stake-aws-btn2 !h-[39px]"
    //         type="primary"
    //         style={{
    //           width: "100%",
    //           height: "auto",
    //         }}
    //       >
    //         <span className="stake_main_font_style font-medium text-white">
    //         Check Status
    //         </span>
    //       </AwesomeButton>
    //       <AwesomeButton
    //         className="stake-aws-btn3 !h-[39px]"
    //         type="primary"
    //         style={{
    //           width: "100%",
    //           height: "auto",
    //         }}
    //       >
    //         <span className="stake_main_font_style font-medium">
    //         Winnings
    //         </span>
    //       </AwesomeButton>
    //     </div>
    //   </div>
    // </div>

    // nft panel view
    <div className="demoPage comic_background_white_left" ref={ref}>
      <div
        className="pt-10 px-[5%] h-full">
        <div className="stake_main_font_style mb-4 text-left">
          <h1 className="font">NFT Panel</h1>
        </div>
        <div className="stake_border_1 p-3 flex gap-2 justify-between mb-3">
          <div
            className="stake_border_1"
            style={{ width: "52px", height: "80px" }}
          >
            <img
              alt=""
              className="gallery_image"
              src="/assets/gallery/image (1).jpg"
              style={{ borderRadius: "0" }}
            />
          </div>
          <div className="text-left self-end pb-1">
            <h2 className="stake_main_font_style text-[11px] font-extrabold m-0 mb-2">
              DETAILS
            </h2>
            <p className="text-gray m-0 text-[10px]">Stake for 12 months</p>
            <p className="text-gray m-0 text-[10px]">Buy 100 lottery tickets</p>
          </div>
          <div className="text-left self-end pb-1">
            <h2 className="stake_main_font_style text-[11px] font-extrabold m-0 mb-2">
              REWARD
            </h2>
            <p className="text-gray m-0 text-[10px]">
              Ticket price 10% decrease
            </p>
            <p className="text-gray m-0 text-[10px]">APY 5% increase</p>
          </div>
          <div className="self-end pb-1">
            <div className="text-blue stake_main_font_style text-[14px] mb-4">
            Price <span className="stake_border_1 p-1">343,090</span>
            </div>
            <AwesomeButton
              className="stake-aws-btn2 "
              type="primary"
              style={{
                // fontSize: "17px",
                width: "100%",
                height: "auto",
              }}
            >
              <span className="stake_main_font_style">Mint</span>
            </AwesomeButton>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NftPage;
