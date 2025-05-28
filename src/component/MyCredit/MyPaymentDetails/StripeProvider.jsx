import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Your Stripe public key
const stripePromise = loadStripe(
  "pk_test_51RTKiSHBbc2ftHcbzkhVXdd7qUBSYhGTzPUNRxKOgFpV4W4y4tjGN68aBCVRqlD15cokCSL2m4iL9wA0Y16tCLCD00f82XQLrk"
);

const StripeProvider = ({ children }) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);

export default StripeProvider;
