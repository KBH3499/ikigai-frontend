import React, { useEffect, useRef, useState } from "react";

const DexButton = () => {
  const colors = ["#d41279", "#4ad6c6", "#2bb5a5", "#7a8288"];
  const [dexcurrentColor, setDexCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDexCurrentColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        return colors[(currentIndex + 1) % colors.length];
      });
    }, 500); // Change color every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [colors]);
  return (
    <div>
      <a
        className="side_dextools_button"
        href="https://www.dextools.io/app/en/solana/pair-explorer/9fDEGZKgVvLEeQJGPyC9iacqYS9nhG1ZQRBsCDm9sCvu?t=1716340469947"
        style={{ textDecoration: "none", color: dexcurrentColor }}
      >
        <span>DEXTOOLS</span>
      </a>
    </div>
  );
};

export default DexButton;
