import "./Style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import OnTheAir from "./onTheAir/OnTheAir";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Trending from "./trending/Trending";
import Upcoming from "./upcoming/Upcoming";

function Home() {
  return (
    <div className="homePage">
      <HeroBanner />
      <Popular />
      <Upcoming />
      <Trending />
      <TopRated />
      <OnTheAir />
    </div>
  );
}

export default Home;
