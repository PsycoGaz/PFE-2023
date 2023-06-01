import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import './Home.scss'
import UC from '../../assets/svgUC.svg'
import Featured from '../../components/featured/Featured'
import { Link } from 'react-router-dom';



const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          arrows: false,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          infinite: true,
        },
      },
    ],



  };
  const images = [
    {
      name: "photo1",
      url: "https://img.freepik.com/free-vector/plumbing-service-advertising-banner-repairman-uniform-standing-with-wrench-hand-tools-box-near-sink_575670-1705.jpg?size=626&ext=jpg&ga=GA1.1.1663221353.1647532696&semt=sph",
    },
    {
      name: "photo2",
      url: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "photo3",
      url: "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=600",
    }, {
      name: "photo1",
      url: "https://images.pexels.com/photos/14953886/pexels-photo-14953886.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "photo2",
      url: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "photo3",
      url: "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=600",
    }, {
      name: "photo1",
      url: "https://images.pexels.com/photos/14953886/pexels-photo-14953886.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "photo2",
      url: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "photo3",
      url: "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=600",
    }, {
      name: "photo1",
      url: "https://images.pexels.com/photos/14953886/pexels-photo-14953886.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "photo2",
      url: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "photo3",
      url: "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=600",
    }, {
      name: "photo1",
      url: "https://images.pexels.com/photos/14953886/pexels-photo-14953886.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "photo2",
      url: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "photo3",
      url: "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=600",
    }, {
      name: "photo1",
      url: "https://images.pexels.com/photos/14953886/pexels-photo-14953886.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "photo2",
      url: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "photo3",
      url: "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=600",
    }]
  return (
    <div className='main'>
      <img className='svg' src={UC} />
      <Featured />

      <div className="slider">
        <Slider {...settings} className="container-slider"  >
          {images.map((image) => {
            return (
              <div className="item-slide" >
                <img src={image.url} alt="" height={300} width={550}/>
                <div >test</div>
              </div>
            );
          })}
        </Slider></div>
      {/*  <div className='categories' >
          <Link to="/gigs?category=" className='Link'>
          <img src="https://images.pexels.com/photos/14953886/pexels-photo-14953886.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          </Link>
          <Link to="/gigs?category=hh" className='Link'>
          <img src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          </Link>
          <Link to="/gigs?category=electricite" className='Link'>
          <img src="https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          </Link>
          <Link to="/gigs?category=design" className='Link'>
          <img src="https://images.pexels.com/photos/2136243/pexels-photo-2136243.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          </Link>
          
        </div> */}

    </div>


  )
}

export default Home