import React from "react";

const Page13 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage flip_book_left_background" ref={ref}>
      <div className="flip_page_padding">
        <div>
          {/* <div
            style={{
              width: "150px",
              height: "150px",
              boxSizing: "border-box",
              padding: "5px",
            }}
          >
            <img
              alt=""
              src="/assets/bnr-img-1-1.svg"
              style={{ borderRadius: "50%", height: "100%", width: "100%" }}
            />
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              width: "calc(100% - 30px)",
            }}
          >
            <h1 className="SamuraiBlast about_us_title text_align_start">
              CONTACT US
            </h1>
          </div>
          <div className="page_content" style={{ textAlign: "start" }}>
            <div>
              <h2
                className="luckiest_guy_regular contact_us_subtitle"
                style={{ margin: "0" }}
              >
                HAVE A QUESTION? WANT TO SHARE YOUR IKIGAI?
              </h2>
              <p
                className="main_paragraph_font"
                style={{ color: "#474747", padding: "10px" }}
              >
                We’re here to listen, Share your ikigai with us and we will be
                happy to post it on our socials, with your custom made ikigai of
                course.
              </p>
              <h2
                className="luckiest_guy_regular contact_us_subtitle"
            
              >
                ANYTIME YOU FOUND YOUR IKIGAI
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Page13;
