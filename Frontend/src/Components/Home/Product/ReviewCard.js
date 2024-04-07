import React from 'react';
import ReactStars from "react-rating-stars-component";
import ProfilePNG from "../../../Assets/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "rgba(255, 215, 0, 1)",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className=' hover:shadow-lg transition-all   reviewCrd p-4 shadow-md  text-center flex flex-col items-center ' style={{width:'30%'}}  >
      <img src={ProfilePNG} width={35} alt='user' /> 
      <p>{review.name}</p>
      <ReactStars {...options}/>
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
