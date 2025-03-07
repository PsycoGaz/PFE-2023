import React from "react";

import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/utils";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import './orderline.scss'

const Orderline = ({ item }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const essayed = currentUser.isSeller ? item.buyerId : item.sellerId
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
       newRequest.put(`/orders/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (res) => {
      toast.warning(res.response.data);
    }
  });
  const handleRead = (id) => {
    mutation.mutate(id);
    
  };
  const handleContact = async (item) => {
    const sellerId = item.sellerId
    const buyerId = item.buyerId
    const id = sellerId + buyerId;
    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status == 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        })
        navigate(`/meesage/${res.data.id}`);
      }
    }
  }
  const { isLoading, error, data } = useQuery(
    {
      queryKey: [essayed],
      queryFn: () =>
        newRequest.get(`/users/${currentUser.isSeller ? item.buyerId : item.sellerId}`).then((res) => res.data),
    }

  );
  console.log(item._id)
  return (



    <tr>
      <td><img src={item.img} className="image" /></td>
      <td>{item.title}</td>
      <td>{item.price}</td>
      {isLoading ? ("loading") : error ? ("swr") :

        <td>{data.username}</td>
      }
      <td>{item.isCompleted ? "Oui" : "non"}</td>
      <td>
        <img className="message" onClick={() => handleContact(item)} src="data:image/jpeg;base64,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" alt="" />
      </td>
      <td>{item.isDelivered ? "Oui" : "non"}</td>
      <td>
        {currentUser.isSeller && !item.isDelivered && (
          <button  onClick={() => handleRead(item._id) }>
            Mark as Delivered
          </button>
        )}
      </td>
    </tr>





  );
};

export default Orderline;