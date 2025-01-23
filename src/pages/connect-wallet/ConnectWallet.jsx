import React from "react";
import { AwesomeButton } from "react-awesome-button";

const ConnectWallet = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage comic_background_white_left flex items-center justify-center relative" ref={ref}>
      <div className="pt-10 px-[3%] h-[85%] bg-white mx-[4%] w-full">
        <ul className="flex items-center stake_main_font_style stake_border_1 rounded-full max-w-max mx-auto mb-1 p-0 m-0 gap-2">
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
        <p className="text-[24px] stake_main_font_style">Finished Rounds</p>
        <div className="p-3 mb-4 bg-[#FAF8F0] stake_border_1">
          <h3 className="text-blue stake_main_font_style text-[12px] text-center mb-8">
            Connect wallet to check your history
          </h3>
          <div className="stake_main_font_style border_blue_3 py-4 px-4 mb-5">
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <img alt="" src="/assets/staking/pngaaa.com-6547356 1.png" />
                Phantom wallet
              </div>
              <span className="bg-[#D9D9D9] border_blue p-[1px] w-4 h-[18px] flex items-center justify-center">
                <span className="w-[9px] h-[12px] block bg-blue"></span>
              </span>
            </div>
          </div>
          <p className="m-0 stake_main_font_style text-[12px] text-left mb-10">
            SECURE CONNECTION
          </p>
          <AwesomeButton
            className="stake-aws-btn2 !h-[54px]"
            type="primary"
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <span className="stake_main_font_style font-medium text-[20px]">
              CONNECT WALLET
            </span>
          </AwesomeButton>
        </div>
      </div>
    </div>
  );
});

export default ConnectWallet;
