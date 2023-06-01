import React from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import './Messageline.scss'
const Messageline = ({ item }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const essayed = currentUser.isSeller ? item.buyerId : item.sellerId
    const queryClient = useQueryClient();

   

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
    const { isLoading, error, data } = useQuery(
        {
            queryKey: [item.buyerid, item.sellerid],
            queryFn: () =>
                newRequest.get(`/users/${currentUser.isSeller ? item.buyerid : item.sellerid}`).then((res) => res.data),
        }

    );
    console.log(item)
    return (
       
        <tr
            className={
                ((currentUser.isSeller && !item.readbyseller) ||
                    (!currentUser.isSeller && !item.readbybuyer)) &&
                "active"
            }
            key={item.id}
        >
            {isLoading ? ("loading") : error ? ("swr") :

                <td>{data.username}</td>
            }
            <td>
                <Link to={`/message/${item.id}`} className="link">
                    {item?.lastMessage?.substring(0, 100)}...
                </Link>
            </td>
            <td>{moment(item.updatedAt).fromNow()}</td>
            <td>
                {((currentUser.isSeller && !item.readbyseller) ||
                    (!currentUser.isSeller && !item.readbybuyer)) && (
                        <button onClick={() => handleRead(item.id)}>
                            Mark as Read
                        </button>
                    )}
            </td>
        </tr>
    );
};

export default Messageline;