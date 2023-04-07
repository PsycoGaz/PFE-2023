import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import newRequest from '../../utils/utils';
import Review from '../review/Review';
import './Reviews.scss'
import { toast } from 'react-toastify';


export const Reviews = ({ gigId }) => {

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['reviews'],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      })
  });
 const mutation = useMutation({
    mutationFn: (review) =>{
       
      return newRequest.post(`/reviews`, review)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews'])
    }
 })
 
 
 
 
 
  const handleSubmit = (e) => {
    e.preventDefault ()
    const desc = e.target[0].value
    const star = e.target[1].value
   try{mutation.mutate({gigId,desc, star})} 
   catch(err){toast.error("Something went wrong",{
    position: toast.POSITION.TOP_CENTER
});}
  }

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading ? "Loading" : error ? "SWR" : data.map((review) => <Review key={review._id} review={review} />)}
      <div className='add'>
        <h3>Add a Review</h3>
        <form action="" className='addForm' onSubmit={handleSubmit}>
          <input type="text" placeholder="Give us your opinion"/>
          <div className='gaz'><select name="" id="" className="">
            <option value={1} className="">1</option>
            <option value={2} className="">2</option>
            <option value={3} className="">3</option>
            <option value={4} className="">4</option>
            <option value={5} className="">5</option>
            
          </select>
          <button className="">send</button></div>
        </form>
      </div>
    </div>
  )
};
export default Reviews
