import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../../contentWrapper/ContentWrapper";
import LazyLoadImg from "../../components/lazyLoadImage/LazyLoadImg";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import "./Style.scss";
import Genres from "../genres/Genres";

function Carousel({ data, loading, endpoint, title }) {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (direct) => {
    const container = carouselContainer.current;
    const scrollAmount =
      direct === "left"
        ? container.scrollLeft - (container.offsetWidth / 2 + 10)
        : container.scrollLeft + (container.offsetWidth / 2 + 10);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skltItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item?.poster_path
                ? url.poster + item?.poster_path
                : PosterFallback;
              return (
                <div
                  key={item?.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="posterBlock">
                    <LazyLoadImg src={posterUrl} />

                    <Genres data={item.genre_ids.slice(0, 2)} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">
                      <div className="title">{item?.title || item?.name}</div>
                    </span>
                    <span className="date">
                      {dayjs(item.release_Date).format("MMM DD, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skltItem()}
            {skltItem()}
            {skltItem()}
            {skltItem()}
            {skltItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Carousel;
