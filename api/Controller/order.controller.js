import createError from "../utils/createError.js"
import Order from "../models/order.model.js"
import Gig from "../models/gig.model.js"
import Stripe from "stripe"

export const intent = async (req, res, next) => {
const stripe = new Stripe(
    process.env.STRIPE 
);
const gig = await Gig.findById(req.params.id);

const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.gigTitle,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
});
await newOrder.save();
res.status(200).send({
    clientSecret: paymentIntent.client_secret
})
};


export const createOrder = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.gigId);
        const newOrder = new Order({
            gigId: gig._id,
            img: gig.cover,
            title: gig.gigTitle,
            buyerId: req.userId,
            sellerId: gig.userId,
            price: gig.price,
            payment_intent: "temprary",
        });
        await newOrder.save();
        res.status(200).send("success");
    } catch (err) {
        next(err)
    }

}
export const getOrders = async (req, res, next) => {
    try {
       const orders = await Order.find({
        ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
        isCompleted: true,
       });
         res.status(200).send(orders);
    } catch (err) {
        next(err)
    }

}
export const confirm = async (req, res, next) => {
    try {
       const orders = await Order.findOneAndUpdate({payment_intent: req.body.payment_intent},
        {
            $set: {
              isCompleted: true,
            },
          } )
         res.status(200).send("Ordre Confirmé");
    } catch (err) {
        next(err)
    }

}
export const updateOrder = async (req, res, next) => {
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            isDelivered: true,
          },
        },
        { new: true }
      );
      res.status(201).send(updatedOrder);
    } catch (err) {
      next(err);
    }
  };
