import React from "react";

const ComicPage1_2 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage comic_white_left" ref={ref}>
      <div
        className=""
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt=""
          decoding="async"
          height="100%"
          width="100%"
          src="/assets/comic/chapter 2/Page 1.webp"
          style={{ objectFit: "contain" }}
        ></img>
      </div>
    </div>
  );
});

export default ComicPage1_2;