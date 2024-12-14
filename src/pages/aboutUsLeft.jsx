import React from "react";

const AboutUsLeft = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage comic_background_white_left" ref={ref}>
      <div className="flip_page_padding">
        <div className="page_content" style={{ height: "90%" }}>
          <div
            className="display_flex_center"
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <img alt="" src="/assets/WEBGIF.gif" style={{ width: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default AboutUsLeft;
