'use client';

import { FormEvent, useState } from 'react';
import { submitBoatBooking } from '@/lib/api';
import type { BookBoat } from '@/lib/types';

type Props = {
  boats: BookBoat[];
};

function sanitize(value: string, maxLen: number): string {
  return value.trim().slice(0, maxLen);
}

export function BoatBookingForm({ boats }: Props) {
  const [boatId, setBoatId] = useState(boats[0]?.id ?? '');
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [pending, setPending] = useState(false);

  const selected = boats.find((b) => b.id === boatId);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setStatus(null);

    const form = new FormData(e.currentTarget);
    const fullName = sanitize(String(form.get('fullName') ?? ''), 120);
    const email = sanitize(String(form.get('email') ?? ''), 254);
    const phone = sanitize(String(form.get('phone') ?? ''), 30);
    const tripDate = String(form.get('tripDate') ?? '');
    const guests = Number.parseInt(String(form.get('guests') ?? '1'), 10);
    const notes = sanitize(String(form.get('notes') ?? ''), 500);

    if (!fullName || !email || !tripDate || !selected?.priceUsd) {
      setStatus({ ok: false, message: 'Please complete all required fields.' });
      setPending(false);
      return;
    }

    const result = await submitBoatBooking({
      boatId,
      fullName,
      email,
      phone: phone || undefined,
      tripDate,
      guests: Number.isFinite(guests) && guests > 0 ? guests : 1,
      notes: notes || undefined,
      totalAmount: selected.priceUsd,
    });

    setStatus(result);
    setPending(false);
    if (result.ok) e.currentTarget.reset();
  }

  if (!boats.length) return null;

  return (
    <form
      onSubmit={onSubmit}
      style={{
        marginTop: '2.5rem',
        maxWidth: 520,
        marginInline: 'auto',
        display: 'grid',
        gap: '1rem',
      }}
    >
      <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
        SELECT BOAT
        <select
          value={boatId}
          onChange={(e) => setBoatId(e.target.value)}
          required
          style={{
            padding: '0.65rem',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
        >
          {boats.map((boat) => (
            <option key={boat.id} value={boat.id}>
              {boat.title} — ${boat.priceUsd}
            </option>
          ))}
        </select>
      </label>
      <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
        FULL NAME
        <input name="fullName" required maxLength={120} autoComplete="name" />
      </label>
      <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
        EMAIL
        <input name="email" type="email" required maxLength={254} autoComplete="email" />
      </label>
      <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
        PHONE (OPTIONAL)
        <input name="phone" type="tel" maxLength={30} autoComplete="tel" />
      </label>
      <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
        TRIP DATE
        <input name="tripDate" type="date" required />
      </label>
      <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
        GUESTS
        <input name="guests" type="number" min={1} max={50} defaultValue={1} required />
      </label>
      <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
        NOTES
        <textarea name="notes" maxLength={500} rows={3} />
      </label>
      <button className="btn-outline" type="submit" disabled={pending}>
        {pending ? 'Sending…' : 'Request Boat Booking'}
      </button>
      {status ? (
        <p style={{ color: status.ok ? 'var(--gold)' : '#e88', fontSize: '0.9rem' }} role="status">
          {status.message}
        </p>
      ) : null}
      <style jsx>{`
        input,
        textarea,
        select {
          padding: 0.65rem;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          color: var(--text);
          font-family: inherit;
        }
      `}</style>
    </form>
  );
}
