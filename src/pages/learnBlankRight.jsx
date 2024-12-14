import React from "react";

const LearnBlankRight = React.forwardRef((props, ref) => {
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
            <h2>Learn</h2>
            <p>Coming Soon ...</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LearnBlankRight;
