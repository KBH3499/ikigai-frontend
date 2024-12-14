import React from "react";

const Page11 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage flip_book_left_background" ref={ref}>
      <div
        className="tokenomics_element"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              width: "calc(100% - 30px)",
            }}
          ></div>
          <div className="pfp_canvas">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "33%",
                  height: "33%",
                  boxSizing: "border-box",
                  padding: "5px",
                }}
              >
                <img
                  alt=""
                  className="gallery_image"
                  src="/assets/189868.png"
                />
              </div>
            </div>
            <div>
              <p className="luckiest_guy_regular about_us_title">PFP MAKER</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="dextools_button" style={{ width: "20%" }}>
                <a
                  href="https://ikigaionsol.com/pfp.html"
                  style={{ textDecoration: "none" }}
                >
                  <span>Try now!</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Page11;
