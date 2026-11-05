"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const inputClass =
  "h-12 w-full rounded-md border border-[#302117]/20 bg-[#FFF9F0] px-4 text-sm text-[#302117] outline-none transition-colors duration-150 placeholder:text-[#302117]/35 focus:border-[#302117] focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 motion-reduce:transition-none"

export default function GuestDetails({
  name,
  email,
  phone,
  notes,
  errors,
  onChange,
}: {
  name: string
  email: string
  phone: string
  notes: string
  errors: { name?: string; email?: string; phone?: string }
  onChange: (field: "name" | "email" | "phone" | "message", value: string) => void
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-tempus text-xl text-[#302117]">Contact</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="name"
            label="Full name"
            required
            error={errors.name}
            className="sm:col-span-2"
          >
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              onChange={(e) => onChange("name", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field id="phone" label="Phone" required error={errors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              value={phone}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              onChange={(e) => onChange("phone", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field id="email" label="Email" required error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              onChange={(e) => onChange("email", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div>
        <h3 className="font-tempus text-xl text-[#302117]">Notes</h3>
        <p className="mt-1 text-sm text-[#302117]/60">Optional. High chair, allergies, a window if we have one.</p>
        <label htmlFor="message" className="sr-only">
          Notes
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={500}
          value={notes}
          onChange={(e) => onChange("message", e.target.value)}
          className={cn(inputClass, "mt-4 h-auto min-h-[6.5rem] resize-none py-3")}
        />
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm text-[#302117]/70">
        {label}
        {required ? <span className="text-[#302117]"> *</span> : <span className="text-[#302117]/45"> (optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#9b2c2c]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
