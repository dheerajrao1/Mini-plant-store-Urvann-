const BASE = import.meta.env.VITE_API_BASE || '/api';

export async function fetchPlants(params = {}) {
  const qs = new URLSearchParams();
  if (params.q) qs.append('q', params.q);
  if (params.cat) qs.append('cat', params.cat);
  const res = await fetch(`${BASE}/plants?${qs.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch plants');
  return res.json();
}

export async function addPlant(payload) {
  const res = await fetch(`${BASE}/plants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown' }));
    throw new Error(err.error || 'Failed to add plant');
  }
  return res.json();
}
