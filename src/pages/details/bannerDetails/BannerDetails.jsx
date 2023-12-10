import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./Style.scss";

import NoPoster from "../../../assets/no-poster.png";
import LazyLoadImg from "../../../components/lazyLoadImage/LazyLoadImg.jsx";
import PopupVideo from "../../../components/popupVideo/PopupVideo.jsx";
import CircleRating from "../../../components/circleRating/CircleRating.jsx";
import Genres from "../../../components/genres/Genres.jsx";
import useFetch from "../../../hooks/useFetch.jsx";
import ContentWrapper from "../../../contentWrapper/ContentWrapper.jsx";
import { PlayIcon } from "./PlayButton.jsx";

import PaymentInfo from "../../../components/payment/PaymentInfo.jsx";

const BannerDetails = ({ video, crew }) => {
  const [play, setPlay] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const detail_genres = data?.genres?.map((g) => g.id);

  const producer = crew?.filter((f) => f.job === "Producer");
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <>
      <div className="BannerDetails">
        {!loading ? (
          <>
            {data && (
              <>
                <div className="backdrop-img">
                  <LazyLoadImg src={url?.backdrop + data?.backdrop_path} />
                </div>
                <div className="opacity-layer"></div>
                <ContentWrapper>
                  <div className="content">
                    <div className="left">
                      {data.poster_path ? (
                        <LazyLoadImg
                          className="posterImg"
                          src={url.backdrop + data.poster_path}
                        />
                      ) : (
                        <LazyLoadImg className="posterImg" src={NoPoster} />
                      )}
                    </div>
                    <div className="right">
                      <div className="title">{`${
                        data.name || data.title
                      } - (${dayjs(data?.release_date).format("YYYY")})`}</div>
                      <div className="subtitle">{data.tagline}</div>
                      <Genres data={detail_genres} />
                      <div className="row">
                        <CircleRating rating={data.vote_average.toFixed()} />
                        <div
                          className="playbtn"
                          onClick={() => {
                            console.log(video);
                            setPlay(true);
                            setVideoId(video.key);
                          }}
                        >
                          <span className="text">Watch Trailer</span>
                          <PlayIcon />
                        </div>
                        <PaymentInfo />
                      </div>
                      <div className="overview">
                        <div className="heading">Overview</div>
                        <div className="description">{data.overview}</div>
                      </div>
                      <div className="info">
                        {data.runtime && (
                          <div className="infoItem">
                            <span className="text bold">Runtime:{"  "}</span>
                            <span className="text">
                              {toHoursAndMinutes(data.runtime)}
                            </span>
                          </div>
                        )}
                        {data.status && (
                          <div className="infoItem">
                            <span className="text bold">Status:{"  "}</span>
                            <span className="text">{data.status}</span>
                          </div>
                        )}
                        {data.release_date && (
                          <div className="infoItem">
                            <span className="text bold">
                              Release Date:{"  "}
                            </span>
                            <span className="text">
                              {dayjs(data.release_date).format("MMM DD, YYYY")}
                            </span>
                          </div>
                        )}
                      </div>
                      {producer?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Producer{"  "}: </span>
                          <span className="text">
                            {producer?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {producer.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                      {director?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Director{"  "}: </span>
                          <span className="text">
                            {director?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {director.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}

                      {writer?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Writer: </span>
                          <span className="text">
                            {writer?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {writer.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}

                      {data?.created_by?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Creator: </span>
                          <span className="text">
                            {writer?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {data?.created_by.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <PopupVideo
                    play={play}
                    setPlay={setPlay}
                    videoId={videoId}
                    setVideoId={setVideoId}
                  />
                </ContentWrapper>
              </>
            )}
          </>
        ) : (
          <div className="BannerDetailsSkeleton">
            <ContentWrapper>
              <div className="left skeleton"></div>
              <div className="right">
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
              </div>
            </ContentWrapper>
          </div>
        )}
      </div>
    </>
  );
};

export default BannerDetails;
