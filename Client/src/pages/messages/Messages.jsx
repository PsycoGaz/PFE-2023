import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/utils";
import moment from "moment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Messageline from "../../components/messageline/Messageline";
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
            {isLoading
            ? "loading"
            : error
              ? "Something Happened!"
              :
              data.map((c) => <Messageline key={c._id} item={c}/>)}
          </table>
        </div>
      
    </div>
  );
};

export default Messages;