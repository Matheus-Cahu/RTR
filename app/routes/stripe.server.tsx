// app/utils/stripe.server.tsx
import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) throw new Error('Falta STRIPE_SECRET_KEY');

export const stripe = new Stripe(secretKey, { apiVersion: '2024-04-10' });