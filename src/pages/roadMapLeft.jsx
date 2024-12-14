import React from "react";

const RoadMapLeft = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage " ref={ref}>
      <img
        alt=""
        src="/assets/roadmapleft.webp"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});

export default RoadMapLeft;
