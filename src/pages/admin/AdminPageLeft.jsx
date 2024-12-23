import React from "react";

const AdminPageLeft = React.forwardRef((props, ref) => {

  return (
    <div className={`demoPage comic_background_white_left ${props?.isMobile ? "" : "center_div"}`} ref={ref}>
      <h1 className="font">Admin Actions</h1>
    </div>
  );
});

export default AdminPageLeft;
