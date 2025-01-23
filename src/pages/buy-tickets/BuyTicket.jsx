import React from "react";
import { AwesomeButton } from "react-awesome-button";

const BuyTicket = React.forwardRef((props, ref) => {
  return (
    <div
      className="demoPage comic_background_white_left flex items-center justify-center relative"
      ref={ref}
    >
      <div className="pt-10 px-[3%] h-[85%] bg-[#fff] mx-[4%] w-full">
        <AwesomeButton
          className="stake-aws-btn2 !h-[34px] absolute top-[35px] right-[7%]"
          type="primary"
          style={{
            width: "34px",
            height: "auto",
          }}
        >
          <span className="stake_main_font_style font-medium text-[20px]">
            X
          </span>
        </AwesomeButton>
        <p className="text-[24px] stake_main_font_style m-0 mb-4">BUY TICKET</p>
        <p className="stake_main_font_style m-0 mb-9">Round <span className="stake_border_1 bg-[#00B8C4] px-2">203</span></p>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] font-medium m-0 stake_main_font_style text-orange">
            starts 30 june 2024
          </p>
          <div className="p-1 stake_main_font_style">
            <p className="text-[11px] flex justify-between items-center m-0">
              Jackpot{" "}
              <span className="text-[12px] font-bold ml-5 underline">
                300,000.30 IKIGAI
              </span>
            </p>
          </div>
        </div>
        <div className="p-3 mb-4 bg-[#fff] stake_border_1 flex items-center justify-between">
          <div className="flex flex-col items-start gap-1 flex-1 pr-[100px]">
            <h3 className="text-[11px] m-0 mb-1 font-normal" style={{ fontFamily: "ArchitectsDaughter-Regular" }}>Pending Reward</h3>
            <p className="text-[14px] m-0 uppercase stake_main_font_style">0 IKIGAI</p>
            <p className="text-[12px] m-0 font-medium">0$</p>
          </div>
          <AwesomeButton
            className="stake-aws-btn2 flex-1 !h-[32px]"
            type="primary"
            style={{
              // fontSize: "17px",
              width: "100%",
              height: "auto",
            }}
          >
            <span className="stake_main_font_style !font-normal">Buy Ticket</span>
          </AwesomeButton>
        </div>
        <div className="p-3 mb-4 bg-[#FFCE2F] border_blue flex items-center justify-between">
          <div className="flex flex-col items-start">
            <h3 className="text-[10px] m-0 mb-1 font-normal" style={{ fontFamily: "ArchitectsDaughter-Regular" }}>Total pending reward</h3>
            <p className="text-[11px] font-semibold m-0 stake_main_font_style">50,0000 IKIGAI</p>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-[10px] m-0 mb-1 font-normal" style={{ fontFamily: "ArchitectsDaughter-Regular" }}>Total pending reward</h3>
            <p className="text-[11px] font-semibold m-0 stake_main_font_style">50,0000 IKIGAI</p>
          </div>
          <div className="flex items-start flex-col">
            <h3 className="text-[10px] m-0 mb-1 font-normal" style={{ fontFamily: "ArchitectsDaughter-Regular" }}>Liquidity</h3>
            <p className="text-[11px] font-semibold m-0 stake_main_font_style">50,0000 IKIGAI</p>
          </div>
        </div>
        <AwesomeButton
          className="stake-aws-btn4 !h-[42px]"
          type="primary"
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          <span className="stake_main_font_style font-medium">PLACE BETS</span>
        </AwesomeButton>
      </div>
    </div>
  );
});

export default BuyTicket;
