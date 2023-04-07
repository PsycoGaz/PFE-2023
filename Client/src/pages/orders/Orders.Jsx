import React from 'react'
import './Orders.scss'
import newRequest from '../../utils/utils'
import { useQuery } from '@tanstack/react-query'
const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(`/orders`
      ).then((res) => {
        return res.data;
      })
  })
  return (

    <div className="orders">
      {isLoading ? ("Loading") : (error) ? ("erro") :
        (<div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Contact</th>
            </tr>
            {data.map(order => (
              <tr key={order._id}>
                <td>
                  <img
                    className="image"
                    src={order.img}
                    alt=""
                  />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>{currentUser.isSeller ? order.buyerId : order.sellerId}</td>
                <td>
                  <img className="message" src="https://w7.pngwing.com/pngs/975/579/png-transparent-ipma-email-telephone-message-email-icon-miscellaneous-angle-telephone-call-thumbnail.png" alt="" />
                </td>
              </tr>))}






          </table>
        </div>)}
    </div>
  );
};

export default Orders