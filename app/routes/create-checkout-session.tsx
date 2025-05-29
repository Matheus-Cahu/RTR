import { json } from "@remix-run/node";
import { stripe } from "./stripe.server";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const priceId = formData.get("priceId");
    const quantity = formData.get("quantidade");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/failure',
    });

    return json({ url: session.url });
  } catch (err) {
    let errorMessage = "Erro desconhecido";
    if (err instanceof Error) errorMessage = err.message;
    return json({ error: errorMessage }, { status: 400 });
  }
};
