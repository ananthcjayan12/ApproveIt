function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function normalizeSignature(signature: string): string {
  const trimmed = signature.trim();

  if (trimmed.startsWith('sha256=')) {
    return trimmed.slice('sha256='.length);
  }

  return trimmed;
}

export async function verifyMondaySignature(params: {
  secret: string;
  payload: string;
  providedSignature: string;
}): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(params.secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(params.payload));
  const expected = toHex(digest);
  const provided = normalizeSignature(params.providedSignature).toLowerCase();

  return expected === provided;
}
