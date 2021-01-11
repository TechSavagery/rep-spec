import React, { useState } from 'react';
import { useCurrentUser } from '@/hooks/index';

export default function RepSpecEditor() {
  const [user] = useCurrentUser();

  const [msg, setMsg] = useState(null);

  if (!user) {
    return (
      <div style={{ color: '#555', textAlign: 'center' }}>
        Create Account To Calculate One Rep Max
      </div>
    );
  }

  async function hanldeSubmit(e) {
    e.preventDefault();
    const body = {
      inputWeight: e.currentTarget.inputWeight.value,
      inputReps: e.currentTarget.inputReps.value,
    };
    if (!e.currentTarget.inputWeight.value || !e.currentTarget.inputReps.value) return;
    e.currentTarget.inputWeight.value = null;
    e.currentTarget.inputReps.value = null;

    const res = await fetch('/api/rep-specs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg('Max Added!');
      setTimeout(() => setMsg(null), 5000);
    }
  }

  return (
    <>
      <p style={{ color: '#0070f3', textAlign: 'center' }}>
        {msg}
      </p>
      <form onSubmit={hanldeSubmit} style={{ flexDirection: 'row' }} autoComplete="off">
        <label htmlFor="name">
          <input
            name="inputWeight"
            type="number"
            placeholder="Weight"
          />
        </label>
        <label htmlFor="name">
          <input
            name="inputReps"
            type="number"
            placeholder="Reps"
          />
        </label>
        <button type="submit" style={{ marginLeft: '0.5rem' }}>Max</button>
      </form>
    </>
  );
}
