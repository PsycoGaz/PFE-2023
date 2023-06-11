import React from 'react'
import './Orders.scss'
import newRequest from '../../utils/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Orderline from '../../components/orderline/orderline'

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(`/orders`
      ).then((res) => {
        return res.data;
      })
  });
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/orders/completed/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Orders"]);
    },
    onError: (res) => {
      toast.warning(res.response.data);
    }
  });
  const handleRead = (id) => {
    mutation.mutate(id);
    
  };
  
  const navigate = useNavigate()
  const handleContact = async (order) => {
    const sellerId = order.sellerId
    const buyerId = order.buyerId
    const id = sellerId + buyerId;
    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        })
        navigate(`/meesage/${res.data.id}`);
      }
    }

  }
  return (

    <div className="orders">
      <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Completed ?</th>
              <th>Contact</th>
              <th>Delivered?</th>
            </tr>
            {isLoading
            ? "loading"
            : error
              ? "Something Happened!"
              :
              data.map((order) => <Orderline key={order._id} item={order}/>)};






          </table>
        </div>
    </div>
  );
};

export default Orders