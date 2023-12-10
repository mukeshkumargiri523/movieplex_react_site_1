import { useEffect, useState } from "react";
import "./Style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import LazyLoadImg from "../../../components/lazyLoadImage/LazyLoadImg";
import ContentWrapper from "../../../contentWrapper/ContentWrapper";

function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const serachQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      <div className="backdrop_img">
        {!loading && <LazyLoadImg src={background} />}
      </div>

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Movies, TV shows collections that do not disappoint you, tons of
            movies, shows collections right at your fingertips. Happy Watching
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for Movie or TV show"
              onKeyUp={serachQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HeroBanner;
