import React from 'react'
import "./userProfile.scss"
import { useState } from "react";
import newRequest from "../../utils/utils";
import { useNavigate } from 'react-router-dom';

import upload from '../../utils/upload';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
 

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    try {
      const res = await newRequest.post("/auth/register", { ...user, img: url });
      navigate("/")
    } catch (err) {
      setError(err.response.data);
      toast.error("Fields with * are required",{position: toast.POSITION.TOP_CENTER});
    }
  }
  
 
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Mon Profil</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"

            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"

            onChange={handleChange}
          />
          
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"

            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </div>
        <div className="right">
          
          
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  )
}

export default UserProfile