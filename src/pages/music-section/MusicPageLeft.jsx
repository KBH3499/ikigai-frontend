import React from "react";
import { useMusicPlayer } from "../../provider/music-provider";
import musicList from "../../json/music-list.json"
const MusicPageLeft = React.forwardRef((props, ref) => {
   const {songIndex}=useMusicPlayer();
  return (
    <div className="demoPage comic_background_white_left music_page_container" ref={ref}>
         <h2 className="playlist-title" style={{marginTop:"20%"}}>Music</h2>
        <div className="music-item">
        <img src={`/music-assets/${musicList[songIndex].imgSrc}`} style={{height:'60%',width:'60%'}} alt="Song Artwork" />
        </div>
        <div className="description">
            <p>{musicList[songIndex].description}</p>
        </div>
        </div>
  );
});

export default MusicPageLeft;
