const AnimationsComponent = ({isMobile}) => {
  return (
    <>
      <div
        style={{
          width: "40%",
          position: "absolute",
          right: "0",
          bottom: "0",
          pointerEvents: "none",
        }}
      >
        <div
          className="display_flex_center"
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <img
            className="sakura_gif"
            alt=""
            src="/assets/Sakura_FinalGIF.gif"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default AnimationsComponent;
