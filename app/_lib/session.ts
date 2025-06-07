type Session = {
  userId?: string;
  [key: string]: unknown;
};

export async function decrypt(cookie?: string): Promise<Session | null> {
  if (!cookie) return null;
  try {
    const decoded = Buffer.from(cookie, "base64").toString("utf-8");
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}
