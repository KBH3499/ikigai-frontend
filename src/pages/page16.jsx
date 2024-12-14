import React from "react";

const Page16 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage flip_book_right_background" ref={ref}>
      <div className="tokenomics_element">
        <section
          className="pfp-display"
          style={{ height: "100%", width: "100%" }}
        >
          <div
            className="pfp-container hidden net4 show"
            style={{ height: "60%", width: "100%" }}
          >
            <div className="pfp" style={{ top: "-99px" }}>
              <div
                className="pfp-elements pfp-background"
                style={{ backgroundColor: "#597cff" }}
              >
                <div
                  id="pfp-person"
                  className="pfp-elements pfp-img-elements"
                  style={{ backgroundImage: 'url("/assets/pfp/Base.webp")' }}
                ></div>
                <div
                  id="pfp-background"
                  className="pfp-elements pfp-img-elements"
                  style={{
                    backgroundImage:
                      'url("/assets/pfp/Backgrounds/orange.webp")',
                  }}
                ></div>
                <div
                  id="pfp-skin"
                  className="pfp-elements pfp-img-elements"
                  style={{
                    backgroundImage:
                      'url("/assets/pfp/Head/Beanie/Beanie 6.webp")',
                  }}
                ></div>
                <div
                  id="pfp-head"
                  className="pfp-elements pfp-img-elements"
                  style={{
                    backgroundImage:
                      'url("/assets/pfp/Back Accessories/AK47.webp")',
                  }}
                ></div>
                <div
                  id="pfp-mouth"
                  className="pfp-elements pfp-img-elements"
                  style={{
                    backgroundImage:
                      'url("/assets/pfp/hand objects/Icecream.webp")',
                  }}
                ></div>
                <div
                  id="pfp-clothes"
                  className="pfp-elements pfp-img-elements"
                  style={{
                    backgroundImage: 'url("/assets/pfp/Expression/Angry.webp")',
                  }}
                ></div>

                <div
                  id="pfp-eyes"
                  className="pfp-elements pfp-img-elements"
                  style={{
                    backgroundImage:
                      'url("/assets/pfp/Tops/tshirt/tshirt 4.webp")',
                  }}
                ></div>

                <div
                  id="pfp-glasses"
                  className="pfp-elements pfp-img-elements"
                  style={{
                    backgroundImage:
                      'url("/assets/pfp/Bottoms/Pants/Pants 6.webp")',
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="random-container">
            <div className="random-button hidden net5 show">
              <i className="bi bi-dice-5"></i> GENERATE RANDOM
            </div>
          </div>
          <div className="download-container">
            <div className="download-button hidden net6 show">
              <i className="bi bi-cloud-arrow-down"></i> DOWNLOAD
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});

export default Page16;
