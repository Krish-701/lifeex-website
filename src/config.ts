/**
 * Central config for the Lifeex site.
 *
 * TODO-CONFIRM: JOIN_ENDPOINT — set to the founder's form-service URL
 * (Formspree/Getform). Until set, the join form will show an inline error.
 */
export const JOIN_ENDPOINT = ''

// TODO-CONFIRM: contact email the founder wants public.
export const CONTACT_EMAIL = 'hello@lifeex.org'

export const AUDIENCES = [
  'I lost my job to AI',
  'I have a family',
  "I'm thinking about my kids' future",
  "We're a group",
  'I want to build this',
] as const

export type Audience = (typeof AUDIENCES)[number]
