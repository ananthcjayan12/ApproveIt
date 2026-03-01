function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function fromBase64Url(input: string): Uint8Array {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const decoded = atob(padded);
  return Uint8Array.from(decoded, (char) => char.charCodeAt(0));
}

function decodeJsonSegment<T>(segment: string): T | null {
  try {
    const bytes = fromBase64Url(segment);
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

function normalizeAuthorizationHeader(header: string): string {
  const trimmed = header.trim();

  if (trimmed.toLowerCase().startsWith('bearer ')) {
    return trimmed.slice('bearer '.length).trim();
  }

  return trimmed;
}

function equalBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) {
    return false;
  }

  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left[index] ^ right[index];
  }

  return diff === 0;
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

export interface MondayJwtClaims {
  accountId?: number | string;
  userId?: number | string;
  aud?: string | string[];
  exp?: number;
  iat?: number;
  shortLivedToken?: string;
  [key: string]: unknown;
}

export async function verifyMondayJwt(params: {
  secret: string;
  authorizationHeader: string;
}): Promise<MondayJwtClaims | null> {
  const token = normalizeAuthorizationHeader(params.authorizationHeader);
  const segments = token.split('.');

  if (segments.length !== 3) {
    return null;
  }

  const [headerSegment, payloadSegment, signatureSegment] = segments;
  const header = decodeJsonSegment<{ alg?: string; typ?: string }>(headerSegment);

  if (!header || header.alg !== 'HS256') {
    return null;
  }

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(params.secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signingInput = `${headerSegment}.${payloadSegment}`;
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput));
  const expectedSignature = new Uint8Array(digest);
  const providedSignature = fromBase64Url(signatureSegment);

  if (!equalBytes(expectedSignature, providedSignature)) {
    return null;
  }

  const payload = decodeJsonSegment<MondayJwtClaims>(payloadSegment);

  if (!payload) {
    return null;
  }

  if (typeof payload.exp === 'number' && payload.exp * 1000 <= Date.now()) {
    return null;
  }

  return payload;
}
