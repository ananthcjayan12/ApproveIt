type EmailAction = 'approve' | 'reject' | 'changes';

interface EmailActionTokenPayload {
  approvalId: string;
  accountId: number;
  actorId: number;
  actorName: string;
  action: EmailAction;
  exp: number;
}

function toBase64Url(input: string): string {
  return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(input: string): string {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  return atob(padded);
}

async function sign(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function createEmailActionToken(secret: string, payload: Omit<EmailActionTokenPayload, 'exp'>): Promise<string> {
  const tokenPayload: EmailActionTokenPayload = {
    ...payload,
    exp: Date.now() + 1000 * 60 * 30,
  };

  const encodedPayload = toBase64Url(JSON.stringify(tokenPayload));
  const signature = await sign(secret, encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export async function verifyEmailActionToken(
  secret: string,
  token: string,
): Promise<{ valid: true; payload: EmailActionTokenPayload } | { valid: false }> {
  const [encodedPayload, providedSignature] = token.split('.');
  if (!encodedPayload || !providedSignature) {
    return { valid: false };
  }

  const expectedSignature = await sign(secret, encodedPayload);
  if (expectedSignature !== providedSignature) {
    return { valid: false };
  }

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as EmailActionTokenPayload;

    if (payload.exp < Date.now()) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}
