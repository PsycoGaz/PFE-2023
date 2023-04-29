import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import newRequest from "../../utils/utils";
import { useQuery } from "@tanstack/react-query";

const GigCard = ({ item }) => {
  const{isLoading, error, data}= useQuery(
    {
      queryKey: [item.userId],
      queryFn: () => 
      newRequest.get(`/users/${item.userId}`).then((res) => res.data),
    }
    
  );
  
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
         {isLoading ? ("loading") : error ? ("swr") : <div className="user">
            <img src={data.img || "data:image/jpeg;base64,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" } alt="" />
            <span>{data.username}</span>
          </div>}
          <p>{item.shortDescription}</p>
          <div className="star">
            <img src="data:image/png;base64,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" alt="" />
            <span>{!isNaN (item.totalStars/item.starNumber) && Math.round(item.totalStars/item.starNumber) }</span>
          </div>
        </div>
       <hr/>
        <div className="detail">
          <img src="data:image/png;base64,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" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
            </h2>
          </div>
        </div>  
      </div>
    </Link>
  );
};

export default GigCard;