import React from "react";
import ReactStars from "react-rating-stars-component";

const RatingPage = () => {
  return (
    <ReactStars
      count={5}
      size={50}
      emptyIcon={<i className="far fa-star"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700"
    />
  );
};

export default RatingPage;
