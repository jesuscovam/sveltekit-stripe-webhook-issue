import Stripe from 'stripe'
import { STRIPE_TEST_TOKEN } from '$env/static/private'

export const stripe = new Stripe(STRIPE_TEST_TOKEN, {
	apiVersion: '2023-08-16',
})
