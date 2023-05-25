import React from "react";
import "./Gig.scss";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/utils";
import Reviews from "../../components/reviews/Reviews";
import { Link } from "react-router-dom";

function Gig() {

  const { id } = useParams();


  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gig'],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      })
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: [userId],
    queryFn: () =>
      newRequest.get(`/users/${data.userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });
  console.log(data)
  return (
    <div className="gig">
      {isLoading ? "Loading" : error ? "swr" :
        <div className="container">
          <div className="left">
            
            <h1>{data.title}</h1>
            {isLoadingUser ? ("user Loading") : errorUser ? ("SWR") :
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "https://i.imgur.com/6VBx3io.png"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="data:image/png;base64,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" alt="" key={i} />
                      ))}
                    <span> {Math.round(data.totalStars / data.starNumber)}</span>
                  </div>)}
              </div>}
            <Carousel>
              {
                data.gigImages.map((img, index) => (
                  <img key={index} src={img} alt="" />
                ))
              }

            </Carousel>
            <h2>About This Gig</h2>
            <p>
              {data.description}
            </p>
            {isLoadingUser ? ("user Loading") : errorUser ? ("SWR") : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img
                    src={dataUser.img || "https://i.imgur.com/6VBx3io.png"}
                    alt=""
                  />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="data:image/png;base64,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" alt="" key={i} />
                          ))}
                        <span> {Math.round(data.totalStars / data.starNumber)}</span>
                      </div>)}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>
                    {dataUser.desc}
                  </p>
                </div>
              </div>)}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.gigTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>
              {data.shortDescription}
            </p>
            <div className="details">
              <div className="item">
                <img src="data:image/png;base64,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" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="data:image/jpeg;base64,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" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features" >
              {data.Features.map((feature, index) => (
                <div className="item" key={index}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5oBYRIuhqHFcHUt_qMVSGOHzuqA5gbBafwQ&usqp=CAU" alt="Green check mark" />
                  <span>{feature}</span>
                </div>
              ))}

            </div>
            <Link to={`/pay/${id}`}>
            <button>Continue</button>
            </Link>
            
          </div>
        </div>}
    </div>
  );
}

export default Gig;