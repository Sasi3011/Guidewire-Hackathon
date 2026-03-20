// ── Base URL ─────────────────────────────────────────────────────────────────
// Development: your machine's LAN IP so the Android emulator/device can reach it.
// Production: replace with your deployed backend URL.
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000';

// ── Auth ──────────────────────────────────────────────────────────────────────
export interface VerifyOtpResponse {
  accessToken: string;
  user: { id: string; phone: string };
}

export async function verifyOtpWithBackend(
  idToken: string,
  phone: string,
): Promise<VerifyOtpResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken, phone }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? `Server error ${res.status}`);
  }

  return res.json() as Promise<VerifyOtpResponse>;
}
