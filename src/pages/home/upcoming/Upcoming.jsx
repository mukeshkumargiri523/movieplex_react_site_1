import ContentWrapper from "../../../contentWrapper/ContentWrapper";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Upcoming = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/upcoming`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movie" ? "movie" : "movie");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Upcoming Movies</span>
        <SwitchTab data={["Movies"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Upcoming;
