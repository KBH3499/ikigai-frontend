import React from "react";
import { AwesomeButton } from "react-awesome-button";

const HistoryTicket = React.forwardRef((props, ref) => {
  return (
    <div
      className="demoPage comic_background_white_left flex items-center justify-center relative"
      ref={ref}
    >
      <div className="pt-10 px-[3%] h-[85%] bg-[#fff] mx-[4%] w-full">
        <ul className="flex items-center stake_main_font_style stake_border_1 rounded-full max-w-max mx-auto mb-8 p-0 m-0 gap-2">
          <li className="bg-white rounded-full h-8 flex items-center justify-center px-3">
            All HISTORY
          </li>
          <li className="bg-[#00B8C4] stake_border_1 rounded-full h-8 flex items-center justify-center px-3">
            YOUR HISTORY
          </li>
        </ul>
        <AwesomeButton
          className="stake-aws-btn2 !h-[34px] absolute top-[60px] right-[7%]"
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
        <p className="text-[24px] stake_main_font_style m-0 mb-5">
          Finished Rounds
        </p>
        <div className="p-3 mb-4 bg-[#FAF8F0] stake_border_1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start gap-1">
              <p className="stake_main_font_style m-0 mb-2">
                Round{" "}
                <span className="stake_border_1 bg-[#00B8C4] px-2">203</span>
              </p>
              <h3 className="text-[12px] m-0 mb-1 luckiest_guy_regular !font-extrabold text-[#433636]">
                drawn: 23-10-2024
              </h3>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-[12px] m-0 mb-2 !font-extrabold text-[#433636] luckiest_guy_regular">
                Jackpot
              </h3>
              <p className="stake_main_font_style m-0 text-blue">
                300,000,000 ikigai
              </p>
            </div>
            <div className="cursor-pointer">
              <img alt="" src="/assets/staking/arrow-down.svg" />
            </div>
          </div>
        </div>
        <div className="p-3 mb-4 bg-[#FAF8F0] stake_border_1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start gap-1">
              <p className="stake_main_font_style m-0 mb-2">
                Round{" "}
                <span className="stake_border_1 bg-[#00B8C4] px-2">203</span>
              </p>
              <h3 className="text-[12px] m-0 mb-1 luckiest_guy_regular !font-extrabold text-[#433636]">
                drawn: 23-10-2024
              </h3>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-[12px] m-0 mb-2 !font-extrabold text-[#433636] luckiest_guy_regular">
                Jackpot
              </h3>
              <p className="stake_main_font_style m-0 text-blue">
                300,000,000 ikigai
              </p>
            </div>
            <div className="cursor-pointer">
              <img alt="" src="/assets/staking/arrow-down.svg" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-2 stake_border_top">
            <div className="text-left">
              <p className="m-0 stake_main_font_style text-[8px] mb-1">Jackpot</p>
              <h3 className="m-0 stake_main_font_style text-[12px] mb-1">200,000 IKIGAI</h3>
              <h4 className="m-0 luckiest_guy_regular !font-extrabold text-[#433636] text-[12px]">players: 300</h4>
            </div>
            <div className="text-left">
            <p className="m-0 stake_main_font_style text-[8px] mb-2">Winning number</p>
            <div className="flex items-center flex-wrap gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-[#FFAD33] tile_active_border inner_active_shadow text-white">
              <span className="text-[16px] font-extrabold">30</span>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-[#FFAD33] tile_active_border inner_active_shadow text-white">
              <span className="text-[16px] font-extrabold">30</span>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-[#FFAD33] tile_active_border inner_active_shadow text-white">
              <span className="text-[16px] font-extrabold">30</span>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-[#FFAD33] tile_active_border inner_active_shadow text-white">
              <span className="text-[16px] font-extrabold">30</span>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-[#FFAD33] tile_active_border inner_active_shadow text-white">
              <span className="text-[16px] font-extrabold">30</span>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-[#FFAD33] tile_active_border inner_active_shadow text-white">
              <span className="text-[16px] font-extrabold">30</span>
            </div>
            </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-2 stake_border_top">
            <div className="text-left">
              <p className="m-0 stake_main_font_style text-[8px] mb-1">Match 1st number</p>
              <h3 className="m-0 stake_main_font_style text-[12px] mb-1">200,000 IKIGAI</h3>
              <p className="m-0 text-[#433636] text-[6px]" style={{ fontFamily: "ArchitectsDaughter-Regular" }}>Our content is designed investors who use the.</p>
            </div>
            <div className="text-left">
              <p className="m-0 stake_main_font_style text-[8px] mb-1">Match 1st number</p>
              <h3 className="m-0 stake_main_font_style text-[12px] mb-1">200,000 IKIGAI</h3>
              <p className="m-0 text-[#433636] text-[6px]" style={{ fontFamily: "ArchitectsDaughter-Regular" }}>Our content is designed investors who use the.</p>
            </div>
            <div className="text-left">
              <p className="m-0 stake_main_font_style text-[8px] mb-1">Match 1st number</p>
              <h3 className="m-0 stake_main_font_style text-[12px] mb-1">200,000 IKIGAI</h3>
              <p className="m-0 text-[#433636] text-[6px]" style={{ fontFamily: "ArchitectsDaughter-Regular" }}>Our content is designed investors who use the.</p>
            </div>
            <div className="text-left">
              <p className="m-0 stake_main_font_style text-[8px] mb-1">Match 1st number</p>
              <h3 className="m-0 stake_main_font_style text-[12px] mb-1">200,000 IKIGAI</h3>
              <p className="m-0 text-[#433636] text-[6px]" style={{ fontFamily: "ArchitectsDaughter-Regular" }}>Our content is designed investors who use the.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HistoryTicket;
