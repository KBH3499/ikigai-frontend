import React from "react";

const GalleryPage2 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage flip_book_right_background" ref={ref}>
      <div className="flip_page_padding">
        <div
          style={{
            height: "15%",
            display: "flex",
            justifyContent: "center",
            width: "calc(100% - 30px)",
          }}
        >
          <h1
            className="SamuraiBlast gallery_title"
            style={{ textAlign: "center" }}
          >
            IKIGAI MEMES GALLERY
          </h1>
        </div>
        <div className="page_content" style={{ height: "75%" }}>
          <div style={{ height: "100%" }}>
            <div className="display-wrap" style={{ height: "100%" }}>
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
                  src="/assets/gallery/image (7).jpg"
                />
              </div>
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
                  src="/assets/gallery/image (8).jpg"
                />
              </div>
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
                  src="/assets/gallery/image (9).jpg"
                />
              </div>
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
                  src="/assets/gallery/image (10).jpg"
                />
              </div>
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
                  src="/assets/gallery/image (11).jpg"
                />
              </div>
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
                  src="/assets/gallery/image (12).jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default GalleryPage2;