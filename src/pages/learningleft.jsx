import React from "react";

const LearningLeft = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage flip_book_left_background" ref={ref}>
      <div className="flip_page_padding">
        <div
          style={{
            height: "16%",
            display: "flex",
            justifyContent: "center",
            width: "calc(100% - 30px)",
          }}
        >
          <h1
            className="SamuraiBlast gallery_title"
            style={{ textAlign: "center" }}
          >
            Iki Educates
          </h1>
        </div>
        <div className="page_content" style={{ height: "75%" }}>
          <div style={{ height: "100%" }}>
            <div
              className="display-wrap"
              style={{ width: "100%", height: "100%" }}
            >
              <div className="animation_movie_element_learn">
                <video
                  className="animation_video"
                  src="/assets/learn/learn1.mp4"
                  controls
                  preload="auto"
                  controlsList="nodownload"
                ></video>
              </div>
              <div className="animation_movie_element_learn">
                <video
                  className="animation_video"
                  src="/assets/learn/learn2.mp4"
                  controls
                  preload="auto"
                  controlsList="nodownload"
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LearningLeft;
