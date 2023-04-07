

import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";

import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";

import newRequest from "../../utils/utils";
import { useLocation } from "react-router-dom";


function Gigs() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
      newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then((res) => {
        return res.data;
      })
  })

  console.log(data)
  const reSort = (type) => {
    setSort(type)
    setOpen(false)
  }
  useEffect(() => {
    refetch();
  }, [sort]);
  const apply = () => {
    refetch();
  };


  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FixItPlomberie </span>
        <h1 >AI artists</h1>
        <p>
          Explore Boundaries and technology
        </p>
        <div className="menu">
          <div className="left">
            <span>Buget</span>
            <input type="text" ref={minRef} placeholder="Min" />
            <input type="text" ref={maxRef} placeholder="Max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///9RUVFLS0tOTk729vb7+/v4+PhtbW1iYmJmZmbR0dHd3d1AQEBISEjY2NhERESnp6dXV1dvb2/Ozs6Hh4d+fn6zs7NcXFydnZ29vb3n5+fh4eGpqanv7+94eHiRkZGYmJjExMTiXxhAAAAEjUlEQVR4nO2c61bqMBBGe7HCQUIRoYIKet7/JU8hBLn0ksxM2uSsb/93jZt805kWbZIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw37N/W643h8139TJC8WJRfW8Oh/Xybe+rxGKTlirL8ixT6n355KtMM/vt66l4nqky3Xj5hD8O8yy9kKv50keVFortXOW/1bP54UO8xk5d+Z0oJ/JVWvicqrviWfZXuMayTB/I0oHacZblj9XnX6I1tg2CdVTLQRQX8wbBOkOSbbKdN5U4duNCsEoLs8ZP93iKcoptgrVi7l2xMaLCQW2O6Fkx8xzUhWoVrIMqo9glWCvOvSrOmnvwcooSQW2PqDlFj0GddZ2gkGLVI+i1Fzt68KK4Y9ZY3I/aJkXlKaiLslcwTZnFi6lFDV9zcWYjmOYTVpGq8yrzW8VHUC0ieqJk5fTVrogPxd6LzKX2lFOl9zJzKSMd1JZVrQnOvPq5v5/oUJRd4KxPsEYxJobVdcYoSgbVtgd1Zfq1prCvkooucJ2r2iMZudCHfUhPilILnH37axT5iYqjodQC59KD2pD8aMrVUKYXnQUZhnvXUhILnNWqdmdIr2Y78K8US+Yptt7Rd9R8p5dbu8aUHVSnMXEm+6bX27l/oLUiI6juPVhTMh4sPjtetrUifYHruaNvQRV0w+TH4vbwUZG6wM0o1VK1ZQgme/dGTMm9SOnBuljK+6Lmi9CJxAWOMCaOlBVLMEk2pOQQFjjXVe2MWjMFk+IPLaiuCxzpKloL8p5hnHiaDtGLZMFnvmHyRDxFlwXO4Y7+mkxEkKFofYqEVe2ImnAm4Y2i56DSxoRQRHmKdkNj1B68KBKDajM0aKta3YNSEeUp9g8N8gnKCvrrxQB6kKvYPTSIq5rUmLhTJAa162aKuqqJR/SsKB5UYkSlLzL+FIMYE3eKokEljwl/grIL3OirWouiWFDJPejzBDmK9wtcgD14URRZ4KhjYuU3ojzF6wUumFWtRZHdiwGtarKKZoELalVrUaTOxdMpUsfEID1oeGYElRzRIQUZvfjp+B39r+BwET0rEoOakn5s0B5kKtIYOqJnRVpQaYLDn+CgimMJ1lfUYYI67Ji4ZZBTHKcHB1QcL6JnRd9BHVvQu+KYPWggLnCWgqP2oMFjL44fUY23oIYQUY0nxTAiqvES1FAiqvGgGJagh6CG04MG4VMMqQcNooqhRVQjGNQx7uhtEFMMMaIaoaCGKyikGGYPGgSCGt6YuIWtGHJENcyghh1RDUsxBkFWUEPvQQP5FMPvQQNRMY6IakhBjSWiGoJiPBHVOAc1pohqHBXjE3T82iauHjQ49GJsPWiwDqpaxRdRjaVijD1osApqnD1osPjaJtYeNPQGNeaIanqCGndENZ2KsUdU0xHUeMfELa2K8feg4XnS+O/S/0MPGor1479W5CXjdRYBsktv/y44L1+lX5M7NkV1fJdzfuL4LmnuewKC5KVaryY1q3X1OfbvAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB44R/NQT/Kq5uI6gAAAABJRU5ErkJggg=="
              onClick={() => setOpen(!open)}
              alt="" />
            {open && (<div className="rightMenu">
              {sort === "sales" ? (
                <span onClick={() => reSort("createdAt")}>Newest</span>
              ) : (
                <span onClick={() => reSort("sales")}>Best Selling</span>
              )}
            </div>)}
          </div>

        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
              ? "Something Happened!"
              :
              data.map((gig) => <GigCard key={gig._id} item={gig} />)};
        </div>
      </div>
    </div>
  );
}

export default Gigs