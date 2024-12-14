import React from "react";

const RoadMapRight = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage road_map_right" ref={ref}>
      <img
        alt=""
        src="/assets/roadmapright.webp"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});

export default RoadMapRight;
