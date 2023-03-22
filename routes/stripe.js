const router = require("express").Router();
require("dotenv").config();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);
router.post("/payment", async (req, res) => {
  console.log(req.body.amount)
 try {
  const payment=await stripe.paymentIntents.create(
    {
      amount: req.body.amount,
      currency: "usd",
      payment_method_types : ['card'],
    }
  )
 res.status(200).json(payment)
 } catch (error) {
  console.log(error)
 }
  
});

module.exports = router;