import React from "react";
import { AwesomeButton } from "react-awesome-button";

const SuccessWallet = React.forwardRef((props, ref) => {
  return (
    <div
      className="demoPage comic_background_white_left flex items-center justify-center relative"
      ref={ref}
    >
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
          <div className="flex items-center justify-center mb-4">
            <img alt="" src="/assets/staking/success.png" />
          </div>
          <h3 className="sumrai_font_style m-0 text-[16px] mb-4">
            CONNECTION SUCCESFUL
          </h3>
          <div className="stake_main_font_style stake_border_1 py-4 px-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <img
                  className="w-10 h-10"
                  src="/assets/staking/pngaaa.com-6547356 1.png"
                />
              </div>
              <div className="text-left">
                <h4 className="text-[16px] m-0 mb-1 text-blue">
                  Congratulations
                </h4>
                <p className="font-extrabold text-[11px] m-0">
                  Your phantom wallet has been succesfully connected
                </p>
              </div>
            </div>
          </div>
          <AwesomeButton
            className="stake-aws-btn2 !h-[54px]"
            type="primary"
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <span className="stake_main_font_style font-medium text-[20px]">
              VIEW HISTORY
            </span>
          </AwesomeButton>
        </div>
      </div>
    </div>
  );
});

export default SuccessWallet;
