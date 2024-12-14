import React from "react";

const LoadingPage1 = React.forwardRef((props, ref) => {
  return <div className="demoPage loadingPage1_background" ref={ref}></div>;
});

export default LoadingPage1;
