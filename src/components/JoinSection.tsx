import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import { JOIN_ENDPOINT, AUDIENCES } from '../config'

type Props = {
  email: string
  audience: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function JoinSection({ email, audience }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    region: '',
    audience,
    message: '',
    consent: false,
    company: '', // honeypot
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    setForm((f) => ({ ...f, audience }))
  }, [audience])
  useEffect(() => {
    if (email) setForm((f) => ({ ...f, email }))
  }, [email])

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.region.trim()) e.region = 'Enter your country and region.'
    if (!form.consent) e.consent = 'Tick the box so we can reply to you.'
    return e
  }

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    if (!JOIN_ENDPOINT) {
      setErrors({ form: 'Sign-up is not connected yet. It will be soon.' })
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(JOIN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          region: form.region,
          audience: form.audience,
          message: form.message,
          consent: form.consent,
          source: 'lifeex-site',
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
    } catch {
      setStatus('error')
      setErrors({ form: 'Something went wrong sending your details. Try again in a minute.' })
    }
  }

  const fieldClass =
    'liquid-glass rounded-full px-6 py-3 w-full bg-transparent outline-none text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/60'

  return (
    <section id="join" className="relative py-28 md:py-40 px-6">
      <img
        src="/media/join-bg.webp"
        alt="A single lit farmhouse window in a wide dark field under stars."
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" aria-hidden="true" />

      <div className="relative max-w-2xl mx-auto">
        <FadeIn y={40}>
          <div className="liquid-glass rounded-3xl p-8 md:p-12">
            <h2 className="font-serif tracking-tight text-3xl md:text-5xl">
              Start now, <em className="italic text-white/60">while you still have the time.</em>
            </h2>

            {status === 'success' ? (
              <p className="mt-8 text-white/80 text-lg leading-relaxed">
                You're on the list. We'll email you at <span className="text-white">{form.email}</span> with what
                happens next.
              </p>
            ) : (
              <form className="mt-8 flex flex-col gap-5" onSubmit={submit} noValidate>
                <div>
                  <label htmlFor="join-name" className="block text-sm text-white/60 mb-2">
                    Name
                  </label>
                  <input
                    id="join-name"
                    className={fieldClass}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="join-email" className="block text-sm text-white/60 mb-2">
                    Email
                  </label>
                  <input
                    id="join-email"
                    type="email"
                    className={fieldClass}
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="join-region" className="block text-sm text-white/60 mb-2">
                    Country and region
                  </label>
                  <input
                    id="join-region"
                    className={fieldClass}
                    value={form.region}
                    onChange={(e) => set('region', e.target.value)}
                  />
                  {errors.region && <p className="text-error text-sm mt-1">{errors.region}</p>}
                </div>
                <div>
                  <label htmlFor="join-audience" className="block text-sm text-white/60 mb-2">
                    Which of these is closest to you?
                  </label>
                  <select
                    id="join-audience"
                    className={`${fieldClass} appearance-none [&>option]:bg-black`}
                    value={form.audience}
                    onChange={(e) => set('audience', e.target.value)}
                  >
                    {AUDIENCES.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="join-message" className="block text-sm text-white/60 mb-2">
                    Message <span className="text-white/40">(optional)</span>
                  </label>
                  <textarea
                    id="join-message"
                    rows={4}
                    className="liquid-glass rounded-2xl px-6 py-3 w-full bg-transparent outline-none text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/60"
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                  />
                </div>

                {/* Honeypot: hidden from humans, catches bots */}
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={(e) => set('company', e.target.value)}
                  className="absolute opacity-0 -z-10 h-0 w-0"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="flex items-start gap-3">
                  <input
                    id="join-consent"
                    type="checkbox"
                    className="mt-1 accent-[#E8A92A]"
                    checked={form.consent}
                    onChange={(e) => set('consent', e.target.checked)}
                  />
                  {/* TODO-CONFIRM: exact consent wording */}
                  <label htmlFor="join-consent" className="text-sm text-white/60 leading-relaxed">
                    I agree to be contacted about Lifeex. We use your email only to reply about Lifeex; we don't
                    share it or send unrelated mail.
                  </label>
                </div>
                {errors.consent && <p className="text-error text-sm -mt-3">{errors.consent}</p>}

                {errors.form && <p className="text-error text-sm">{errors.form}</p>}

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="self-start rounded-full px-8 py-3 text-sm font-semibold bg-marigold text-black disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: status === 'sending' ? 1 : 1.05 }}
                  whileTap={{ scale: status === 'sending' ? 1 : 0.95 }}
                >
                  {status === 'sending' ? 'Sending…' : 'Join Lifeex'}
                </motion.button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
