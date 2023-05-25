import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/utils";
import {useParams} from "react-router-dom";
import './pay.scss'
import CheckoutForm from "../../components/checkoutForm/checkoutForm.jsx";

const stripePromise = loadStripe("pk_test_51N8h05Ffd7KAMX0KwbMkfjvpRmG8ZivJvvc7vSvH3RH7b0gPuQ5xXhlYcC7FDtomxslc2oIS9JVcoPZ4jqUR2PuW00aENtCD5K");

const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");
    const {id} = useParams()
useEffect(()=>{
const makeRequest = async () => {
    try {
        const res = await newRequest.post(`/orders/create-payment-intent/${id}` );
        setClientSecret(res.data.clientSecret);
    } catch (err) {
        console.log(err)
    }
};
makeRequest();
},[])
const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="pay">
         {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Pay