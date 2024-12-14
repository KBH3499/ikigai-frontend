import React from "react";

const Page2 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage comic_background_white_left " ref={ref}>
      <div className="display_flex_center" style={{ height: "100%" }}>
        <div style={{ height: "100%", width: "100%", padding: "5px" }}>
          <div className="second_page_title">
            <p style={{ margin: "0" }}>ABOUT US</p>
          </div>
          <div className="second_page_content" style={{ textAlign: "start" }}>
            &nbsp;&nbsp;&nbsp;ikigai is an age old Japanese concept originated
            from Okinawa Japan, which refers to finding the true purpose of your
            life. <br />
            <br />
            &nbsp;&nbsp;&nbsp;In the journey 🚘 of life, discovering your
            ikigai, can be a powerful anchor ⚓️ especially during times of
            financial struggles. <br />
            <br />
            &nbsp;&nbsp;&nbsp;By focusing on your ikigai, you can navigate tough
            times with resilience, turning your passion into opportunities 🎁,
            and finding creative ways to meet both your financial and personal
            fulfillment needs. <br />
            &nbsp;&nbsp;&nbsp;It’s about staying true to your purpose, even when
            the path isn't easy, and trusting that aligning with your ikigai
            will eventually lead to both a meaningful life and sustainable
            financial well being.
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;Be an instrument of love, kindness and wealth.{" "}
            <br></br>
            &nbsp;&nbsp;&nbsp;We need at least one person who can find the
            purpose and meaning of his life, after reading about ikigai, and we
            would have achieved our goal of creating an ikigai, literally 😀
          </div>
          {/* <div className="second_page_subtitle">
            DIDN'T BUY IKIGAI?<br></br>BE AN IKIGAI
          </div>
          <div className="second_page_content" style={{ textAlign: "end" }}>
            We are not Developers, just usual crypto ikigais, with an aim to
            change people lives. If only one person can find the meaning of his
            life after reading about ikigai, we will have achieved our goal of
            creating an ikigai, literally
          </div> */}
        </div>
      </div>
    </div>
  );
});

export default Page2;
