import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Your Stripe public key
const stripePromise = loadStripe(
  "pk_live_51RvtSuGf1poUBxLKkKI9gWvqJZrMTQIpajKGLHwk8PwVEnvQEtzP4b0xXYG0teNs4Pq6oVhdOQluJBhN4vQovYlP00Xh1xZZbc"
);

const StripeProvider = ({ children }) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);

export default StripeProvider;
