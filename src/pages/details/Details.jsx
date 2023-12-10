import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./Style.scss";
import BannerDetails from "./bannerDetails/BannerDetails";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";
import SimilarVideo from "./carousel/SimilarVideo";
import RecommendedVideo from "./carousel/RecommendedVideo";

function Details() {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div>
      <BannerDetails crew={credits?.crew} video={data?.results[0]} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={loading} />
      <SimilarVideo mediaType={mediaType} id={id} />
      <RecommendedVideo mediaType={mediaType} id={id} />
    </div>
  );
}

export default Details;
