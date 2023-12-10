import { useState } from "react";

import "./Style.scss";

import ContentWrapper from "../../../contentWrapper/ContentWrapper";
import LazyLoadImg from "../../../components/lazyLoadImage/LazyLoadImg";
import PopupVideo from "../../../components/popupVideo/PopupVideo";
import { PlayIcon } from "../bannerDetails/PlayButton";

const VideoSection = ({ data, loading }) => {
  const [play, setPlay] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Related Videos</div>
        {!loading ? (
          <div className="videos">
            {data?.results?.map((video) => (
              <div
                key={video.id}
                className="videoItem"
                onClick={() => {
                  setVideoId(video.key);
                  setPlay(true);
                }}
              >
                <div className="videoThumbnail">
                  <LazyLoadImg
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <div className="videoTitle">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <PopupVideo
        play={play}
        setPlay={setPlay}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideoSection;
