import React from "react";

const Animation1 = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage flip_book_left_background" ref={ref}>
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
            ANIMATION MOVIES
          </h1>
        </div>
        <div className="page_content" style={{ height: "75%" }}>
          <div style={{ height: "100%" }}>
            <div
              className="display-wrap"
              style={{ width: "100%", height: "100%" }}
            >
              <div className="animation_movie_element">
                <video
                  className="animation_video"
                  src="/assets/animations/animation (1).mp4"
                  controls
                  preload="auto"
                  controlsList="nodownload"
                ></video>
              </div>
              <div className="animation_movie_element">
                <video
                  className="animation_video"
                  src="/assets/animations/animation (2).mp4"
                  controls
                  preload="auto"
                  controlsList="nodownload"
                ></video>
              </div>
              <div className="animation_movie_element">
                <video
                  className="animation_video"
                  src="/assets/animations/animation (3).mp4"
                  controls
                  preload="auto"
                  controlsList="nodownload"
                ></video>
              </div>
              <div className="animation_movie_element">
                <video
                  className="animation_video"
                  src="/assets/animations/animation (4).mp4"
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

export default Animation1;
