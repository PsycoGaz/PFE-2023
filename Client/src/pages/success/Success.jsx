import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/utils';
 const Success = () => {
  const {search} = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get('payment_intent');
  
  useEffect(() => {
const makeRequest = async () => {
  try {
    await newRequest.put("/orders/",{payment_intent} );
    setTimeout(()=>{navigate('/orders')},4000)
    
  } catch (err) {
    console.log(err)
  }
}
makeRequest();
  },[])



  return (
    <div>Paiment Valideé. Ne fermer pas cette page vous serez dirigé vers la page des ordres.</div>
  )
}
export default Success;