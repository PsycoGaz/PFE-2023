import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import "./Navbar.scss"
import newRequest from "../../utils/utils";

const Navbar = () => {
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()
    const isactive = () => {
        window.scrollY > 10 ? setActive(true) : setActive(false)
    }
    useEffect(() => {
        window.addEventListener("scroll", isactive);
        return () => window.removeEventListener("scroll", isactive);


    }, []);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await newRequest.post("/auth/logout");
            localStorage.removeItem("currentUser");
            navigate("/")
        } catch (err) {

        }
    }

    return (
        <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>

            <div className='container'>

                <div className='logo'>
                    <Link to="/" className='link'>
                        <span className='text'>
                            FixIt
                        </span>
                    </Link>
                    <span className='dot'>
                        .
                    </span>
                </div>


                <div className='links'>
                    {/* <h3>Businesses</h3>
                    <h3>Explore</h3> */}

                    {!currentUser?.isSeller && <h3> Become a Seller </h3>}
                    {!currentUser && <> <Link to="/login" className='link'><h3>Sign in</h3></Link> <button className='btn'><Link to="/register" className='link' >Join</Link></button>  </>}
                    {currentUser &&
                        (<div className="user" onClick={() => setOpen(!open)}>
                            <img src={currentUser.img || "https://images.pexels.com/photos/448828/pexels-photo-448828.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="" />
                            <span>{currentUser?.username}</span>
                            {open && <div className="options">
                                {
                                    currentUser?.isSeller && (
                                        <>
                                            <Link className='link' to="/mygigs">My Jobs</Link>
                                            <Link className='link' to="/add">Add New Job</Link>

                                        </>
                                    )
                                }
                                <Link className='link' to="/orders" >Orders</Link>
                                <Link className='link' to="/messages" >Messages</Link>
                                <Link className='link' on onClick={handleLogout}>Logout</Link>

                            </div>}
                        </div>)}
                </div>

            </div>
            {(active || pathname !== "/" ) && (
                <>
                    <hr />
                    <div className="menu">
                        <Link className='link' to='/'>Plomberie</Link>
                        <Link className='link' to='/'>Mecanique</Link>
                        <Link className='link' to='/'>Electricité</Link>
                        <Link className='link' to='/'>Electronique</Link>

                    </div></>)}
        </div>

    );
};

export default Navbar;