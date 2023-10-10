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

export const signWebhookUint8Array = async (req: Request) => {
	const signature = req.headers.get('Stripe-Signature')
	const body = new Uint8Array(await req.arrayBuffer())
	if (!signature || !body) {
		return
	}

	try {
		const event = stripe.webhooks.constructEvent(
			body as Buffer,
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

export const signWebhookBase64 = async (req: Request) => {
	const signature = req.headers.get('Stripe-Signature')
	const body = new Buffer(await req.arrayBuffer()).toString('base64')
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
// https://github.com/supabase-community/sveltekit-subscription-payments/blob/main/src/routes/api/webhooks/%2Bserver.ts
export const signWebhookBuffer2 = async (req: Request) => {
	const signature = req.headers.get('stripe-signature')
	const body = Buffer.from(await req.arrayBuffer())
	if (!signature || !body) {
		return
	}

	try {
		const event = await stripe.webhooks.constructEventAsync(
			body,
			signature,
			STRIPE_WEBHOOK_TOKEN
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
