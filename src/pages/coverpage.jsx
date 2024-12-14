import React from "react";

const CoverPage = React.forwardRef((props, ref) => {
  return <div className="demoPage cover_background" ref={ref}></div>;
});

export default CoverPage;
