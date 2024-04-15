import React from 'react';
import ProfilePNG from "../../../Assets/Profile.png";
import { Rating } from '@material-ui/lab';

const ReviewCard = ({ review }) => {
  const options = {
    size: "normal",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className=' hover:shadow-lg transition-all   reviewCrd p-4 shadow-md  text-center flex flex-col items-center ' style={{width:'30%'}}  >
      <img src={ProfilePNG} width={35} alt='user' /> 
      <p>{review.name}</p>
      <Rating {...options}/>
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
