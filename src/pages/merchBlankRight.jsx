import React from "react";

const MerchBlankRight = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage comic_background_white_left" ref={ref}>
      <div className="flip_page_padding">
        <div className="page_content" style={{ height: "90%" }}>
          <div
            className="first_page_subtitle coming_soon"
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <h3>Merch</h3>
            <p>Coming Soon ...</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MerchBlankRight;
