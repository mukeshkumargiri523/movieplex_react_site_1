import ContentWrapper from "../../../contentWrapper/ContentWrapper";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const OnTheAir = () => {
  const [endpoint, setEndpoint] = useState("tv");

  const { data, loading } = useFetch(`/${endpoint}/on_the_air`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "TV Shows" ? "tv" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">On The Air Shows</span>
        <SwitchTab data={["TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default OnTheAir;
