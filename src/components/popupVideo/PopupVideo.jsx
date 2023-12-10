import ReactPlayer from "react-player/youtube";

import "./Style.scss";

const PopupVideo = ({ play, setPlay, videoId, setVideoId }) => {
  const hidePopup = () => {
    setPlay(false);
    setVideoId(null);
  };
  return (
    <div className={`popupVideo ${play ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidePopup}>
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${
            videoId ? videoId : "8tPnX7OPo0Q"
          }`}
          controls
          width="100%"
          height="100%"
          // playing={true}
        />
      </div>
    </div>
  );
};

export default PopupVideo;
