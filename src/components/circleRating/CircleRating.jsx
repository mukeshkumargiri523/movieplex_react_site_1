import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./Style.scss";

const CircleRating = ({ rating }) => {
  return (
    <div className="circleRating">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "yellowgreen" : "green",
        })}
      />
    </div>
  );
};

export default CircleRating;
