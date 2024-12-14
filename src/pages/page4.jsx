import React from "react";

const Page4 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage flip_book_right_background" ref={ref}>
      <div className="tokenomics_element">
        <div
          style={{
            height: "15%",
            display: "flex",
            justifyContent: "start",
            width: "calc(100% - 1vw)",
          }}
        >
          <h1
            className="luckiest_guy_regular about_us_title text_align_start"
            style={{ visibility: "hidden" }}
          >
            TOKENOMICS
          </h1>
        </div>
        <div className="tokenomics_canvas">
          <div
            style={{
              overflowY: "auto",
              height: "90%",
              padding: "1vw",
              paddingLeft: "1vw",
              paddingRight: "1vw",
            }}
          >
            <div className="luckiest_guy_regular about_us_subtitle">
              BURNS TO DATE
            </div>
            <div className="responsive_paragraph_wrapper">
              <div className="main_paragraph_font">
                <p>Details of total ikigai burnt to date:</p>
                <ul>
                  <li>40m – 31st May – 4%</li>
                  <li>16.3m – 17th July – 1.6%</li>
                  <li>14.7m – 20th July – 1.4%</li>
                  <li>3.5m – July 22nd – 0.3%</li>
                  <li>2.98m – July 23rd – 0.2%</li>
                  <li>15m July 28th – 1.5%</li>
                  <li>75m July 31st – 7.5%</li>
                </ul>{" "}
                <p>
                  50 sol worth LP added at 190k mcap and burnt. 25m is divided
                  in two charity wallets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Page4;
