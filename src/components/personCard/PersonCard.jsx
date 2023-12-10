import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Style.scss";

import NoPoster from "../../assets/no-poster.png";
import LazyLoadImg from "../lazyLoadImage/LazyLoadImg";

const PersonCard = ({ data }) => {
  const { url } = useSelector((state) => state.home);
  const posterUrl = data.profile_path
    ? url.poster + data.profile_path
    : NoPoster;
  return (
    <div className="personCard">
      <div className="posterBlock">
        <LazyLoadImg className="posterImg" src={posterUrl} />
      </div>
      <div className="textBlock">
        <span className="title">{data?.name || data?.original_name}</span>
        <span style={{ color: "skyblue" }} className="title">
          {data.known_for_department}
        </span>
      </div>
    </div>
  );
};

export default PersonCard;
