import React from "react";

const Page2 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage comic_background_white_right" ref={ref}>
      <div>
        <h1 className="SamuraiBlast about_us_title">ABOUT US</h1>
      </div>
      <div
        className="display_flex align_items_center"
        style={{ height: "80%", overflowY: "auto" }}
      >
        <div className="about_img">
          <img
            alt=""
            decoding="async"
            width="90%"
            height="100%"
            src="/assets/WEBGIF.gif"
          ></img>
        </div>
        <div className="about_content">
          <p className="main_paragraph_font" style={{ padding: "0" }}>
            <b>
              We are not Developers, just usual crypto ikigais, with an aim to
              change people lives. If only one person can find the meaning of
              his life after reading about ikigai, we will have achieved our
              goal of creating an ikigai, literally
            </b>
          </p>
          <h3 className="luckiest_guy_regular about_us_subtitle">
            Didn't buy ikigai? be an ikigai
          </h3>
          <p className="main_paragraph_font">
            we feel every crypto trader needs to be an ikigai as well, due to
            the amount of ups and downs we face in crypto. Is crypto your
            ikigai? what makes you feel worth living? lets share it with us
          </p>
        </div>
      </div>
    </div>
  );
});

export default Page2;
