import React from "react";
import "react-awesome-button/dist/styles.css";
import "react-awesome-button/dist/themes/theme-blue.css";
import "./nftPageLeft.css"
import { useMediaQuery } from "react-responsive";
import nft1 from "../../../public/images/nft/Nft1.png"

const NftPageLeft = React.forwardRef((props, ref) => {
  const isMobileSmall = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="demoPage comic_background_white_left" ref={ref}>
      <h1 className="font stake_main_font_style nft-panel-heading">NFT Panel</h1>
      <div className="nft">
        <img
          src={nft1}
          alt="nft1"
        />
      </div>
    </div>
  );
});

export default NftPageLeft;
