import { supabase } from '../supabaseClient'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { items, orderDetails, total } = req.body

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image]
        },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.VITE_BASE_URL}/order-success`,
      cancel_url: `${process.env.VITE_BASE_URL}/cart`,
      metadata: {
        orderDetails: JSON.stringify(orderDetails)
      }
    })

    // Save order to Supabase
    await supabase.from('orders').insert([
      {
        items,
        total,
        status: 'pending',
        payment_id: session.id,
        customer_details: orderDetails
      }
    ])

    res.status(200).json({ id: session.id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
