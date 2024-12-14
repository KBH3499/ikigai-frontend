import React from "react";

const Page1 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage comic_background_white_left" ref={ref}>
      <div className="ikigai_title">
        <img
          alt=""
          decoding="async"
          width="90%"
          height="auto"
          src="/assets/output-onlinegiftools.gif"
        ></img>
      </div>
      <div className="">
        <h1 className="SamuraiBlast">Where Crypto Meets Kindness</h1>
      </div>
    </div>
  );
});

export default Page1;
