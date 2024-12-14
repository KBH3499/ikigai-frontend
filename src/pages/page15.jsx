import html2canvas from "html2canvas";
import React, { useEffect } from "react";

const Page15 = React.forwardRef((props, ref) => {
  useEffect(() => {
    if (1) {
      setTimeout(() => {
        initialPage();
      }, 500);
    }
  }, [props.pageNumber]);

  const initialPage = () => {
    const backgrounds = document.querySelectorAll(".laboratory-background");
    const skins = document.querySelectorAll(
      ".laboratory-skin .laboratory-image"
    );
    const mouths = document.querySelectorAll(
      ".laboratory-mouth .laboratory-image"
    );
    const eyes = document.querySelectorAll(".laboratory-eye .laboratory-image");
    const glasses = document.querySelectorAll(
      ".laboratory-glasse .laboratory-image"
    );
    const clothes = document.querySelectorAll(
      ".laboratory-clothe .laboratory-image"
    );
    const heads = document.querySelectorAll(
      ".laboratory-head .laboratory-image"
    );
    //const colors = ["#597cff", "#ffd200", "#00a36c", "#ff4d6d"];

    //ChangeBackground();
    ChangeItem(backgrounds, "pfp-background");
    ChangeItem(skins, "pfp-skin");
    ChangeItem(mouths, "pfp-mouth");
    ChangeItem(eyes, "pfp-eyes");
    ChangeItem(glasses, "pfp-glasses");
    ChangeItem(clothes, "pfp-clothes");
    ChangeItem(heads, "pfp-head");

    scroll(".laboratory-backgrounds-wraper", ".scroll-backgrounds");
    scroll(".laboratory-skins-wraper", ".scroll-skins");
    scroll(".laboratory-mouths-wraper", ".scroll-mouths");
    scroll(".laboratory-eyes-wraper", ".scroll-eyes");
    scroll(".laboratory-clothes-wraper", ".scroll-clothes");
    scroll(".laboratory-heads-wraper", ".scroll-heads");
    scroll(".laboratory-glasses-wraper", ".scroll-glasses");

    document.querySelector(".random-button").addEventListener("click", () => {
      document.getElementById(
        "pfp-background"
      ).style.backgroundImage = `url("${backgrounds[
        getRandomInt(0, backgrounds.length)
      ].style.backgroundImage
        .slice(4, -1)
        .replace(/"/g, "")}")`;

      document.getElementById("pfp-skin").style.backgroundImage = `url("${skins[
        getRandomInt(0, skins.length)
      ].style.backgroundImage
        .slice(4, -1)
        .replace(/"/g, "")}")`;

      document.getElementById(
        "pfp-mouth"
      ).style.backgroundImage = `url("${mouths[
        getRandomInt(0, mouths.length)
      ].style.backgroundImage
        .slice(4, -1)
        .replace(/"/g, "")}")`;

      document.getElementById("pfp-eyes").style.backgroundImage = `url("${eyes[
        getRandomInt(0, eyes.length)
      ].style.backgroundImage
        .slice(4, -1)
        .replace(/"/g, "")}")`;

      document.getElementById(
        "pfp-glasses"
      ).style.backgroundImage = `url("${glasses[
        getRandomInt(0, glasses.length)
      ].style.backgroundImage
        .slice(4, -1)
        .replace(/"/g, "")}")`;

      document.getElementById(
        "pfp-clothes"
      ).style.backgroundImage = `url("${clothes[
        getRandomInt(0, clothes.length)
      ].style.backgroundImage
        .slice(4, -1)
        .replace(/"/g, "")}")`;

      document.getElementById("pfp-head").style.backgroundImage = `url("${heads[
        getRandomInt(0, heads.length)
      ].style.backgroundImage
        .slice(4, -1)
        .replace(/"/g, "")}")`;

      // document.querySelector(
      //   ".pfp-elements.pfp-background"
      // ).style.backgroundColor = colors[getRandomInt(0, colors.length)];
    });

    var old_element = document.querySelector(".download-button");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);

    document.querySelector(".download-button").addEventListener("click", () => {
      const pfp = document.querySelector(".pfp");
      const clone = pfp.cloneNode(true);

      clone.style.width = "1024px";
      clone.style.height = "1024px";
      clone.style.position = "absolute";
      clone.style.top = "-9999px"; // Position it off-screen

      document.body.appendChild(clone);

      html2canvas(clone, {
        useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "pfp.webp";
        link.click();

        // document.body.removeChild(clone);
      });
    });

    function ChangeBackground() {
      const backgrounds = document.querySelectorAll(".laboratory-background");
      const pfpBackground = document.querySelector(
        ".pfp-elements.pfp-background"
      );

      backgrounds.forEach((background) => {
        background.addEventListener("click", function () {
          const newColor = window.getComputedStyle(this).backgroundColor;
          pfpBackground.style.backgroundColor = newColor;
        });
      });
    }

    function ChangeItem(skins, item) {
      const mainSkin = document.getElementById(item);
      skins.forEach((skin) => {
        skin.addEventListener("click", () => {
          const newSrc = skin.style.backgroundImage
            .slice(4, -1)
            .replace(/"/g, "");
          mainSkin.style.backgroundImage = `url("${newSrc}")`;
        });
      });
    }

    function scroll(wraper, scrolltype) {
      const scrollRight = document.querySelector(".scroll-right" + scrolltype);
      const scrollLeft = document.querySelector(".scroll-left" + scrolltype);
      const scrollWrapper = document.querySelector(wraper);

      function updateButtonVisibility() {
        if (
          scrollWrapper.scrollLeft + scrollWrapper.clientWidth >=
          scrollWrapper.scrollWidth
        ) {
          scrollRight.classList.add("hidden-lab");
        } else {
          scrollRight.classList.remove("hidden-lab");
        }
      }

      function updateLeftButtonVisibility() {
        if (scrollWrapper.scrollLeft > 0) {
          scrollLeft.classList.remove("hidden-lab");
        } else {
          scrollLeft.classList.add("hidden-lab");
        }
      }

      scrollRight.onclick = function () {
        document.querySelector(wraper).scrollBy({
          left: 80,
          behavior: "smooth",
        });
      };

      scrollLeft.onclick = function () {
        document.querySelector(wraper).scrollBy({
          left: -80,
          behavior: "smooth",
        });
      };

      // Update button visibility on scroll
      scrollWrapper.addEventListener("scroll", updateButtonVisibility);
      scrollWrapper.addEventListener("scroll", updateLeftButtonVisibility);

      // Initial check
      updateButtonVisibility();
      updateLeftButtonVisibility();
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min); // Round up from min
      max = Math.floor(max); // Round down from max
      return Math.floor(Math.random() * (max - min)) + min;
    }

    document.addEventListener("DOMContentLoaded", () => {
      // Function to create and animate the bear text
      function createBearText() {
        const bearText = document.createElement("div");
        bearText.classList.add("bear-text");
        bearText.textContent = "IKIGAI";
        document.body.appendChild(bearText);

        // Randomize position
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        bearText.style.left = `${posX}px`;
        bearText.style.top = `${posY}px`;

        // Randomize size
        const fontSize = Math.random() * (40 - 20) + 20; // Random font size between 20 and 60
        bearText.style.fontSize = `${fontSize}px`;

        // Animation
        bearText.animate(
          [
            { opacity: 1, transform: "scale(0.2)" },
            { opacity: 1, transform: "scale(1.25)" },
            { opacity: 0, transform: "scale(2)" },
          ],
          {
            duration: 2000 + Math.random() * 1000, // Duration between 2 to 3 seconds
            easing: "ease-in-out",
            iterations: 1,
            fill: "forwards", // Ensure the element remains at the end keyframe
          }
        );

        // Remove the element after animation
        bearText.addEventListener("animationend", () => {
          bearText.remove();
        });
      }

      // Function to repeatedly create bear text
      function repeatBearText() {
        setInterval(() => {
          createBearText();
        }, 2000); // Interval between each creation (in milliseconds)
      }

      // Start creating bear text
      repeatBearText();
    });
  };

  return (
    <div className="demoPage flip_book_left_background" ref={ref}>
      <div className="tokenomics_element">
        <section
          className="laboratory"
          style={{ height: "100%", width: "100%" }}
        >
          <div
            className="laboratory-container hidden net7 show"
            style={{ height: "100%", width: "100%" }}
          >
            <h2 className="laboratory-title">BUILD YOUR IKIGAI</h2>
            <div className="laboratory-elements">
              <div className="laboratory-skins">
                <h4>HEADS</h4>
                <div className="laboratory-skins-container">
                  <div className="scroll-left scroll-skins">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M512,185.823H232.213l70.136-70.136L221.331,34.67L0,256.001l221.331,221.33l81.018-81.018l-70.136-70.136H512V185.823z     M491.915,306.093H183.723l90.221,90.221l-52.614,52.613L28.404,256.001L221.331,63.077l52.614,52.612l-90.221,90.221h308.191    V306.093z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="146.142"
                            y="250.443"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -193.1483 209.3919)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="laboratory-skins-wraper">
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Beanie/Beanie 1.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Beanie/Beanie 2.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Beanie/Beanie 3.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Beanie/Beanie 4.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Beanie/Beanie 5.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Beanie/Beanie 6.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Buzz cut/Buzz cut 1.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Buzz cut/Buzz cut 2.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Buzz cut/Buzz cut 3.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Buzz cut/Buzz cut 4.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Middle part hair/middle part hair 1.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Middle part hair/middle part hair 2.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Middle part hair/middle part hair 3.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Middle part hair/middle part hair 4.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-skin laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Head/Middle part hair/middle part hair 5.webp")',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="scroll-right scroll-skins hidden-lab">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M290.669,34.669l-81.018,81.018l70.136,70.136H0v140.354h279.787l-70.136,70.136l81.018,81.017L512,256L290.669,34.669z     M238.055,396.314l90.221-90.223H20.085V205.909h308.191l-90.221-90.221l52.614-52.614L483.596,256L290.669,448.926    L238.055,396.314z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="345.758"
                            y="86.749"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -18.9325 302.5973)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="laboratory-mouths">
                <h4>HAND OBJECTS</h4>
                <div className="laboratory-mouths-container">
                  <div className="scroll-left scroll-mouths">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M512,185.823H232.213l70.136-70.136L221.331,34.67L0,256.001l221.331,221.33l81.018-81.018l-70.136-70.136H512V185.823z     M491.915,306.093H183.723l90.221,90.221l-52.614,52.613L28.404,256.001L221.331,63.077l52.614,52.612l-90.221,90.221h308.191    V306.093z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="146.142"
                            y="250.443"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -193.1483 209.3919)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="laboratory-mouths-wraper">
                    <div
                      className="laboratory-mouth laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/hand objects/cash.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-mouth laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("assets/pfp/hand objects/Coffee.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-mouth laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/hand objects/fire hydrant.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-mouth laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/hand objects/Flag.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-mouth laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/hand objects/flower.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-mouth laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/hand objects/Hammer.webp")',
                        }}
                      ></div>
                    </div>

                    <div
                      className="laboratory-mouth laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/hand objects/Icecream.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-mouth laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/hand objects/Remote.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-mouth laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/hand objects/sword.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-mouth laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/hand objects/Torch.webp")',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="scroll-right scroll-mouths hidden-lab">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M290.669,34.669l-81.018,81.018l70.136,70.136H0v140.354h279.787l-70.136,70.136l81.018,81.017L512,256L290.669,34.669z     M238.055,396.314l90.221-90.223H20.085V205.909h308.191l-90.221-90.221l52.614-52.614L483.596,256L290.669,448.926    L238.055,396.314z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="345.758"
                            y="86.749"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -18.9325 302.5973)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="laboratory-eyes">
                <h4>TOPS</h4>
                <div className="laboratory-eyes-container">
                  <div className="scroll-left scroll-eyes">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M512,185.823H232.213l70.136-70.136L221.331,34.67L0,256.001l221.331,221.33l81.018-81.018l-70.136-70.136H512V185.823z     M491.915,306.093H183.723l90.221,90.221l-52.614,52.613L28.404,256.001L221.331,63.077l52.614,52.612l-90.221,90.221h308.191    V306.093z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="146.142"
                            y="250.443"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -193.1483 209.3919)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="laboratory-eyes-wraper">
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/black jacket.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage: 'url("/assets/pfp/Tops/mage.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage: 'url("/assets/pfp/Tops/Suit.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/Tank top.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/trench coat.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/Hoodie/Hoodie 1.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/Hoodie/Hoodie 2.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/Hoodie/Hoodie 3.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/Hoodie/Hoodie 4.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/Hoodie/Hoodie 5.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/Hoodie/Hoodie 6.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/tshirt/tshirt 1.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/tshirt/tshirt 2.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/tshirt/tshirt 3.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/tshirt/tshirt 4.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-eye laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Tops/tshirt/tshirt 5.webp")',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="scroll-right scroll-eyes hidden-lab">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M290.669,34.669l-81.018,81.018l70.136,70.136H0v140.354h279.787l-70.136,70.136l81.018,81.017L512,256L290.669,34.669z     M238.055,396.314l90.221-90.223H20.085V205.909h308.191l-90.221-90.221l52.614-52.614L483.596,256L290.669,448.926    L238.055,396.314z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="345.758"
                            y="86.749"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -18.9325 302.5973)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="laboratory-glasses">
                <h4>Bottoms</h4>
                <div className="laboratory-glasses-container">
                  <div className="scroll-left scroll-glasses hidden-lab">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M512,185.823H232.213l70.136-70.136L221.331,34.67L0,256.001l221.331,221.33l81.018-81.018l-70.136-70.136H512V185.823z     M491.915,306.093H183.723l90.221,90.221l-52.614,52.613L28.404,256.001L221.331,63.077l52.614,52.612l-90.221,90.221h308.191    V306.093z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="146.142"
                            y="250.443"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -193.1483 209.3919)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="laboratory-glasses-wraper">
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Black pants.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/cargos.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Jeans.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Shorts.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Joggers/Joggers 1.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Joggers/Joggers 2.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Joggers/Joggers 3.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Joggers/Joggers 4.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Joggers/Joggers 5.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Joggers/Joggers 6.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Joggers/Joggers 7.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Joggers/Joggers 8.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Pants/Pants 1.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Pants/Pants 2.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Pants/Pants 3.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Pants/Pants 4.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Pants/Pants 5.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Pants/Pants 6.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Pants/pants 7.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-glasse laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Bottoms/Pants/Pants 8.webp")',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="scroll-right scroll-glasses">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M290.669,34.669l-81.018,81.018l70.136,70.136H0v140.354h279.787l-70.136,70.136l81.018,81.017L512,256L290.669,34.669z     M238.055,396.314l90.221-90.223H20.085V205.909h308.191l-90.221-90.221l52.614-52.614L483.596,256L290.669,448.926    L238.055,396.314z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="345.758"
                            y="86.749"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -18.9325 302.5973)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="laboratory-clothes">
                <h4>EXPRESSIONS</h4>
                <div className="laboratory-clothes-container">
                  <div className="scroll-left scroll-clothes hidden-lab">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M512,185.823H232.213l70.136-70.136L221.331,34.67L0,256.001l221.331,221.33l81.018-81.018l-70.136-70.136H512V185.823z     M491.915,306.093H183.723l90.221,90.221l-52.614,52.613L28.404,256.001L221.331,63.077l52.614,52.612l-90.221,90.221h308.191    V306.093z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="146.142"
                            y="250.443"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -193.1483 209.3919)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="laboratory-clothes-wraper">
                    <div
                      className="laboratory-clothe laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Expression/Angry.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-clothe laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Expression/Open smile.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-clothe laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Expression/Puppy.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-clothe laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Expression/Sad.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-clothe laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Expression/Scared.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-clothe laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Expression/Shocked.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-clothe laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Expression/Smile.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-clothe laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Expression/Smoking.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-clothe laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Expression/Teeth.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-clothe laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Expression/Troll face.webp")',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="scroll-right scroll-clothes">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M290.669,34.669l-81.018,81.018l70.136,70.136H0v140.354h279.787l-70.136,70.136l81.018,81.017L512,256L290.669,34.669z     M238.055,396.314l90.221-90.223H20.085V205.909h308.191l-90.221-90.221l52.614-52.614L483.596,256L290.669,448.926    L238.055,396.314z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="345.758"
                            y="86.749"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -18.9325 302.5973)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="laboratory-heads">
                <h4>BACK ACCESSORIES</h4>
                <div className="laboratory-heads-container">
                  <div className="scroll-left scroll-heads hidden-lab">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M512,185.823H232.213l70.136-70.136L221.331,34.67L0,256.001l221.331,221.33l81.018-81.018l-70.136-70.136H512V185.823z     M491.915,306.093H183.723l90.221,90.221l-52.614,52.613L28.404,256.001L221.331,63.077l52.614,52.612l-90.221,90.221h308.191    V306.093z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="146.142"
                            y="250.443"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -193.1483 209.3919)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="laboratory-heads-wraper">
                    <div
                      className="laboratory-head laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Back Accessories/AK47.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-head laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Back Accessories/Angelwings.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-head laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Back Accessories/Aura.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-head laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Back Accessories/Carrot quiver.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-head laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Back Accessories/Ikigai flag.webp")',
                        }}
                      ></div>
                    </div>
                    <div
                      className="laboratory-head laboratory-img"
                      style={{
                        backgroundImage: 'url("/assets/pfp/Base.webp")',
                      }}
                    >
                      <div
                        className="laboratory-image"
                        style={{
                          backgroundImage:
                            'url("/assets/pfp/Back Accessories/Poison Blade.webp")',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="scroll-right scroll-heads">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M290.669,34.669l-81.018,81.018l70.136,70.136H0v140.354h279.787l-70.136,70.136l81.018,81.017L512,256L290.669,34.669z     M238.055,396.314l90.221-90.223H20.085V205.909h308.191l-90.221-90.221l52.614-52.614L483.596,256L290.669,448.926    L238.055,396.314z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="345.758"
                            y="86.749"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -18.9325 302.5973)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="laboratory-backgrounds">
                <h4>BACKGROUNDS</h4>
                <div className="laboratory-backgrounds-container">
                  <div className="scroll-left scroll-backgrounds hidden-lab">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M512,185.823H232.213l70.136-70.136L221.331,34.67L0,256.001l221.331,221.33l81.018-81.018l-70.136-70.136H512V185.823z     M491.915,306.093H183.723l90.221,90.221l-52.614,52.613L28.404,256.001L221.331,63.077l52.614,52.612l-90.221,90.221h308.191    V306.093z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="146.142"
                            y="250.443"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -193.1483 209.3919)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="laboratory-backgrounds-wraper">
                    <div
                      className="laboratory-background laboratory-img"
                      style={{
                        backgroundImage:
                          'url("/assets/pfp/Backgrounds/blue.webp")',
                      }}
                    ></div>
                    <div
                      className="laboratory-background laboratory-img"
                      style={{
                        backgroundImage:
                          'url("/assets/pfp/Backgrounds/blue_orange.webp")',
                      }}
                    ></div>
                    <div
                      className="laboratory-background laboratory-img"
                      style={{
                        backgroundImage:
                          'url("/assets/pfp/Backgrounds/green.webp")',
                      }}
                    ></div>
                    <div
                      className="laboratory-background laboratory-img"
                      style={{
                        backgroundImage:
                          'url("/assets/pfp/Backgrounds/green_orange.webp")',
                      }}
                    ></div>
                    <div
                      className="laboratory-background laboratory-img"
                      style={{
                        backgroundImage:
                          'url("/assets/pfp/Backgrounds/orange.webp")',
                      }}
                    ></div>
                    <div
                      className="laboratory-background laboratory-img"
                      style={{
                        backgroundImage:
                          'url("/assets/pfp/Backgrounds/pink.webp")',
                      }}
                    ></div>
                    <div
                      className="laboratory-background laboratory-img"
                      style={{
                        backgroundImage:
                          'url("/assets/pfp/Backgrounds/purple.webp")',
                      }}
                    ></div>
                    <div
                      className="laboratory-background laboratory-img"
                      style={{
                        backgroundImage:
                          'url("/assets/pfp/Backgrounds/red.webp")',
                      }}
                    ></div>
                    <div
                      className="laboratory-background laboratory-img"
                      style={{
                        backgroundImage:
                          'url("/assets/pfp/Backgrounds/yellow.webp")',
                      }}
                    ></div>
                  </div>
                  <div className="scroll-right scroll-backgrounds">
                    <svg
                      style={{ padding: "10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path d="M290.669,34.669l-81.018,81.018l70.136,70.136H0v140.354h279.787l-70.136,70.136l81.018,81.017L512,256L290.669,34.669z     M238.055,396.314l90.221-90.223H20.085V205.909h308.191l-90.221-90.221l52.614-52.614L483.596,256L290.669,448.926    L238.055,396.314z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="345.758"
                            y="86.749"
                            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -18.9325 302.5973)"
                            width="20.085"
                            height="174.807"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});

export default Page15;
