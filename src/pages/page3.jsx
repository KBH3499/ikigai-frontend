import React from "react";

const Page3 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage flip_book_left_background" ref={ref}>
      <div className="tokenomics_element">
        <div
          style={{
            height: "15%",
            display: "flex",
            justifyContent: "start",
            width: "calc(100% - 1vw)",
          }}
        >
          <h1 className="SamuraiBlast about_us_title text_align_start">
            TOKENOMICS
          </h1>
        </div>
        <div className="tokenomics_canvas">
          <div
          className="responsive_scroll_container"
          >
            {/* <div className="luckiest_guy_regular about_us_subtitle">
              BURNS TO DATE
            </div> */}
            <div 
              className="responsive_paragraph_wrapper"
            >
              <div className="main_paragraph_font">
                <ul>
                  <li style={{ paddingTop: "1vw" }}>
                    TOTAL SUPPLY – 1 Billion
                  </li>
                  <li style={{ paddingTop: "1vw" }}>
                    BURNT TO DATE – 178 Million
                  </li>
                  <li style={{ paddingTop: "1vw" }}>
                    Circulating Supply – 822 Million
                  </li>
                  <li style={{ paddingTop: "1vw" }}>
                    RESERVED FOR CHARITY – 25 MIL
                  </li>
                  <li style={{ paddingTop: "1vw" }}>
                    TEAM ALLOCATION– All burnt
                  </li>
                </ul>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Page3;
