import React from 'react'
import './Home.scss'
import UC from '../../assets/svgUC.svg'
import Featured from '../../components/featured/Featured'
import { Link } from 'react-router-dom';

const Home = () => {console.log(UC)
  return (
    <div className='main'>
      <img className='svg' src={UC}/>
      <Featured/>
        <div className='categories' >
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
        </div>

      </div>
    
  )
}

export default Home