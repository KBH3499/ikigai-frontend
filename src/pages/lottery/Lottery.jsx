import React from "react";
import { AwesomeButton } from "react-awesome-button";

const Lottery = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage comic_background_white_left" ref={ref}>
      <div className="pt-10 px-[5%] h-full">
        <div className="stake_main_font_style mb-4 text-left flex items-center">
          <div>
            <h1 class="font">Lottery</h1>
            <p className="text-[12px]">
              Our content is designed to educate the 500,000+ crypto earning
              investors who use the CoinLedger platform.
            </p>
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
        <div className="p-3 mb-4 bg-[#FFAD33] border_blue">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[12px] m-0">Active round</h3>
            <h3 className="text-[12px] m-0">399 spots</h3>
            <p className="text-[12px] text-orange m-0 font-medium">
              ends wed/10/2024
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start pr-16">
              <p className="text-[11px] font-extrabold m-0 mb-[1px]">
                30,5000 ikigai <span className="text-black">(2$)</span>
              </p>
              <p className="text-[10px] m-0">
                Our content is designed to educate the 500,000+ crypto
              </p>
            </div>
            <AwesomeButton
              className="stake-aws-btn2 flex-1"
              type="primary"
              style={{
                // fontSize: "17px",
                width: "100%",
                height: "auto",
              }}
            >
              <span className="stake_main_font_style">Buy Ticket</span>
            </AwesomeButton>
          </div>
        </div>
        <div className="text-right">
          <AwesomeButton
            className="stake-aws-btn3"
            type="primary"
            style={{
              // fontSize: "17px",
              width: "max-content",
              height: "auto",
            }}
          >
            <span className="stake_main_font_style">Connect wallet</span>
          </AwesomeButton>
        </div>
        <h3 className="text-[14px] text-left m-0 mb-1">Lottery Rewards</h3>
        <div className="p-3 mb-4 bg-[#fff] stake_border_1 flex items-center flex-wrap gap-9">
          <div className="flex flex-col items-start gap-1 w-[calc(33%-24px)]">
            <h3 className="text-[11px] m-0 font-extrabold">Match first 3</h3>
            <p className="text-[10px] m-0 uppercase">WINNERS GET 5%</p>
            <p className="text-[12px] m-0 font-medium">300,000.30 IKIGAI</p>
          </div>
          <div className="flex flex-col items-start gap-1 w-[calc(33%-24px)]">
            <h3 className="text-[11px] m-0 font-extrabold">Match first 4</h3>
            <p className="text-[10px] m-0 uppercase">WINNERS GET 10%</p>
            <p className="text-[12px] m-0 font-medium">300,000.30 IKIGAI</p>
          </div>
          <div className="flex flex-col items-start gap-1 w-[calc(33%-24px)]">
            <h3 className="text-[11px] m-0 font-extrabold">Match first 5</h3>
            <p className="text-[10px] m-0 uppercase">WINNERS GET 30%</p>
            <p className="text-[12px] m-0 font-medium">300,000.30 IKIGAI</p>
          </div>
          <div className="flex flex-col items-start gap-1 w-[calc(33%-24px)]">
            <h3 className="text-[11px] m-0 font-extrabold">Match first 6</h3>
            <p className="text-[10px] m-0 uppercase">WINNERS GET Jackpot</p>
            <p className="text-[12px] m-0 font-medium">300,000.30 IKIGAI</p>
          </div>
          <div className="flex items-center gap-1 w-[calc(33%-24px)]">
            <span className="text-[28px] font-extrabold">+</span>
            <div
              className="stake_border_1 bg-[#FFAD33] font-extrabold flex items-center justify-center"
              style={{ width: "42px", height: "52px" }}
            >
              ?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Lottery;
