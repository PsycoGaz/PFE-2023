import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import './Home.scss'
import UC from '../../assets/svgUC.svg'
import Featured from '../../components/featured/Featured'
import { Link } from 'react-router-dom';
import plombier from '../../images/plombier.png';
import electricien from '../../images/electrecien.png';
import electronique from '../../images/electronique.png';
import menuisier from '../../images/menuisier.png';
import sodure  from '../../images/sodure.png';
import meca from '../../images/meca.png';
import jardinage from '../../images/jardinage.png';
import autres from '../../images/autres.png';
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
      url: '/src/images/plombier.png',
      txt: 'Plomberie',
    },
    {
      name: "photo2",
      url: '/src/images/electrecien.png',
      txt: 'Electricité',
    },
    {
      name: "photo3",
      url: '/src/images/electronique.png',
      txt: 'Electronique',
    }, {
      name: "photo1",
      url: '/src/images/jardinage.png',
      txt: 'Jardinage',
    },
    {
      name: "photo2",
      url: '/src/images/meca.png',
      txt: 'Mecanique',
    },
    {
      name: "photo3",
      url: '/src/images/menuisier.png',
      txt: 'Menuiserie',
    }, {
      name: "photo1",
      url: '/src/images/sodure.png',
      txt: 'Sodure',
    },
    {
      name: "photo2",
      url: '/src/images/autres.png',
      txt: 'Autres',
    },
   ]
    console.log(images)
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
                <h2 >{image.txt}</h2>
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