import React from "react";

const Page1 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage comic_background_white_left " ref={ref}>
      <div className="display_flex_center" style={{ height: "100%" }}>
        <div style={{ height: "100%" }}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img
              alt=""
              decoding="async"
              width="100%"
              height="auto"
              src="/assets/Header-for-Website-Darker.gif"
            ></img>
          </div>
          <div className="first_page_content">WHERE</div>
          <div className="first_page_subtitle">CRYPTO</div>
          <div className="first_page_content">MEETS</div>
          <div className="first_page_subtitle">KINDNESS</div>
        </div>
      </div>
    </div>
  );
});

export default Page1;
