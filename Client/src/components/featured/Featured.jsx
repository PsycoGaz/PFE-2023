import React from "react";
import "./Featured.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Featured() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate(`/gigs?search=${input}`)
    }
    return (
        <div className="featured">
            <div className="search">
                <div className="searchInput">
                    <img src="https://png.pngtree.com/png-clipart/20201209/original/pngtree-magnifying-glass-icon-png-image_5656240.jpg" alt="" />
                    <input type="text" placeholder='Looking For Something ?' onChange={e => setInput(e.target.value)} />
                </div>
                <button onClick={handleSubmit}>Search</button>
            </div>
        </div>

    );
}

export default Featured;