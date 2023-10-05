import { STRIPE_WEBHOOK_TOKEN } from '$env/static/private'
import type Stripe from 'stripe'
import { stripe } from './stripe'

export const signWebhookText = async (
	req: Request
): Promise<Stripe.Event | undefined> => {
	const signature = req.headers.get('Stripe-Signature')
	const body = await req.text()
	if (!signature || !body) {
		return
	}

	try {
		const event = stripe.webhooks.constructEvent(
			body,
			signature,
			STRIPE_WEBHOOK_TOKEN,
			undefined
		)

		console.log({ event })

		if (event) {
			return event
		}
	} catch (error) {
		console.error('Error en comprobar que request es de stripe', {
			error,
			req,
		})
		return
	}
}

function toBuffer(ab: any) {
	const buf = Buffer.alloc(ab.byteLength)
	const view = new Uint8Array(ab)
	for (let i = 0; i < buf.length; ++i) {
		buf[i] = view[i]
	}
	return buf
}

export const signWebhookBuffer = async (
	req: Request
): Promise<Stripe.Event | undefined> => {
	const signature = req.headers.get('Stripe-Signature')
	const preRawBody = await req.arrayBuffer()
	const rawBody = toBuffer(preRawBody)
	if (!signature || !rawBody) {
		return
	}

	try {
		const event = stripe.webhooks.constructEvent(
			rawBody,
			signature,
			STRIPE_WEBHOOK_TOKEN,
			undefined
		)

		console.log({ event })

		if (event) {
			return event
		}
	} catch (error) {
		console.error('Error en comprobar que request es de stripe', {
			error,
			req,
		})
		return
	}
}
