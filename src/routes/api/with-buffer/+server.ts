import { signWebhookBuffer } from '$lib/server/signWebhook'
import type { Config } from '@sveltejs/adapter-vercel'
import { json } from '@sveltejs/kit'

export const config: Config = {
	runtime: 'nodejs18.x',
}

export const POST = async ({ request }) => {
	const event = await signWebhookBuffer(request)

	if (!event) {
		console.error('Error en comprobar que request es de stripe')
		return json({
			received: true,
			error: 'No se pudo verificar que el request es de stripe',
		})
	}

	return json({ received: true })
}
