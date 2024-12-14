const Footer = () => {
  return (
    <div style={{ backgroundColor: "rgb(255 255 255 / 30%)", zIndex: "1" }}>
      <div className="footer">
        <marquee behavior="scroll">
          <h3 className="marquee_content">
            {Array(30)
              .fill(
                "Where Crypto meets Kindness | Meme with Purpose | Meme For Good | "
              )
              .map((text, index) => (
                <span key={index}>{text}</span>
              ))}
          </h3>
        </marquee>
      </div>
    </div>
  );
};

export default Footer;
