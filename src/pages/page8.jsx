import React from "react";

const Page8 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage comic_background_white_right" ref={ref}>
      <div className="flip_page_padding">
        <div className="page_content" style={{ height: "90%" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <img
              alt=""
              src="/assets/portal-1.webp"
              style={{ height: "100%", width: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Page8;
