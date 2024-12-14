import React, { useState, useEffect } from "react";
import { SocialIcon } from "react-social-icons";
import { useMediaQuery } from "react-responsive";

const Social_Nav = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 490px)" });
  const [isHidden, setIsHidden] = useState(true);

  const toggleIcons = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
    {!isHidden && isMobile && (
        <div className="flex flex-row-reverse">
          <div className="element_social_link">
            <SocialIcon
              target="blank"
              className="react_social_icon"
              url="https://t.me/IKIGAI_Token"
            />
          </div>
          <div className="element_social_link">
            <SocialIcon
              target="blank"
              className="react_social_icon"
              url="https://x.com/ikigaiOnSolana"
            />
          </div>
          <div className="element_social_link">
            <SocialIcon
              target="blank"
              className="react_social_icon"
              url="https://www.youtube.com/@ikigaionsolana"
            />
          </div>
          <div className="element_social_link">
            <SocialIcon
              target="blank"
              className="react_social_icon"
              url="https://www.instagram.com/ikigai.onsolana/?igsh=MTh4bmc4YmIxbmxvaQ%3D%3D&utm_source=qr"
            />
          </div>
          <div className="element_social_link">
            <SocialIcon
              target="blank"
              className="react_social_icon"
              url="https://www.tiktok.com/@ikigaionsolana?is_from_webapp=1&sender_device=pc"
            />
          </div>
        </div>
      )}
      {isMobile &&
        <div className="social_link_component">
          <div
            style={{ paddingLeft: "10px" }}
            // className={`element_social_link ${!isHidden ? "" : "grow-shrink"}`}
            onClick={toggleIcons}
          >
            <SocialIcon className="react_social_icon" />
          </div>
        </div>
      }


      {!isMobile && (
        <>
          <div className="element_social_link">
            <SocialIcon
              target="blank"
              className="react_social_icon"
              url="https://t.me/IKIGAI_Token"
            />
          </div>
          <div className="element_social_link">
            <SocialIcon
              target="blank"
              className="react_social_icon"
              url="https://x.com/ikigaiOnSolana"
            />
          </div>
          <div className="element_social_link">
            <SocialIcon
              target="blank"
              className="react_social_icon"
              url="https://www.youtube.com/@ikigaionsolana"
            />
          </div>
          <div className="element_social_link">
            <SocialIcon
              target="blank"
              className="react_social_icon"
              url="https://www.instagram.com/ikigai.onsolana/?igsh=MTh4bmc4YmIxbmxvaQ%3D%3D&utm_source=qr"
            />
          </div>
          <div className="element_social_link">
            <SocialIcon
              target="blank"
              className="react_social_icon"
              url="https://www.tiktok.com/@ikigaionsolana?is_from_webapp=1&sender_device=pc"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Social_Nav;
