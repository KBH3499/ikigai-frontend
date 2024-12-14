import React from "react";
import musicList from "../../json/music-list.json";
import { AwesomeButton } from "react-awesome-button";
import { useMusicPlayer } from "../../provider/music-provider";
import { useDarkMode } from "../../provider/theme-provider";

const MusicPageRight = React.forwardRef((props, ref) => {
  const {isDarkModeEnabled}=useDarkMode();
  const {
    songIndex,
    isMusicPlaying,
    handlePrevSong,
    handleNextSong,
    handlePlayPause}=useMusicPlayer();
  const buttonType=isDarkModeEnabled ? "facebook" : "primary";
  // Get the current song
//   const currentSong = musicList[songIndex];
//   const audioSrc = `${basePath}/${currentSong?.audioSrc}`;
    
  return (
    <div className={`demoPage comic_background_white_right ${props?.isMobile ? "": "center_div"}`} ref={ref}>
      <div className={`playlist ${props?.isMobile ? "center_div_mobile" : ""}`}>
        <h2 className="playlist-title">My Playlist</h2>
        <ul className="playlist-list">
          {musicList.map((song, index) => (
            <li
              key={index}
              className={`playlist-item ${isDarkModeEnabled ? "dark-mode-color" : ""}`}
              style={{
                backgroundColor: index === songIndex ? "rgb(85 197 204)" : "transparent", // Highlight the current song
              }}
            >
              <div className="track-info">
                <span className="track-title">{song.title}</span>
                <span className="track-artist">{song.artist}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Audio player */}
        {/* <audio ref={audioRef} src={audioSrc} /> */}

        <div className="playlist-controls">
          <AwesomeButton
            type={buttonType}
            style={{
              fontFamily: "KaoriGelBold",
              paddingRight: "2px",
              paddingLeft: "2px",
            }}
            onPress={handlePrevSong}
          >
            Previous
          </AwesomeButton>

          <button className={`play-btn ${isDarkModeEnabled ? "dark-mode-color" : ""}`}  onClick={handlePlayPause}>
            {isMusicPlaying ? "❚❚" : "▶"} {/* Change icon based on play/pause state */}
          </button>

          <AwesomeButton
            type={buttonType}
            style={{
              fontFamily: "KaoriGelBold",
              paddingRight: "2px",
              paddingLeft: "2px",
            }}
            onPress={handleNextSong}
          >
            Next
          </AwesomeButton>
        </div>
      </div>
    </div>
  );
});

export default MusicPageRight;
