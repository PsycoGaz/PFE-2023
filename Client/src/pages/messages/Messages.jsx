import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/utils";
import moment from "moment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

 
 
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
    onError: (res) => {
      toast.warning(res.response.data);
    }
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c) => (
              <tr
                className={
                  ((currentUser.isSeller && !c.readbyseller) ||
                    (!currentUser.isSeller && !c.readbybuyer)) &&
                  "active"
                }
                key={c.id}
              >
                <td>{currentUser.isSeller ? c.buyerid : c.sellerid}</td>
                <td>
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isSeller && !c.readbyseller) ||
                    (!currentUser.isSeller && !c.readbybuyer)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;