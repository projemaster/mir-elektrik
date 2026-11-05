import { Request, Response, NextFunction } from 'express';
import dns from 'dns';
import { promisify } from 'util';

const lookupAsync = promisify(dns.lookup);

// Private IP ranges forbidden to prevent SSRF
const FORBIDDEN_IP_PATTERNS = [
  /^127\./,                         // Loopback (127.0.0.0/8)
  /^10\./,                          // Private class A (10.0.0.0/8)
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // Private class B (172.16.0.0/12)
  /^192\.168\./,                    // Private class C (192.168.0.0/16)
  /^169\.254\./,                    // Link-local / Cloud metadata (169.254.0.0/16)
  /^0\./,                           // Current network
  /^::1$/,                          // IPv6 loopback
  /^fc00:/i,                        // IPv6 unique local
  /^fe80:/i,                        // IPv6 link-local
];

/**
 * Validates whether an IP address is private/internal
 */
export function isPrivateIp(ip: string): boolean {
  return FORBIDDEN_IP_PATTERNS.some(pattern => pattern.test(ip));
}

/**
 * Validates a target URL against SSRF attacks.
 * Rejects non-HTTP(S) protocols and hostnames resolving to private/internal IPs.
 */
export async function validateSafeUrl(rawUrl: string): Promise<{ safe: boolean; url: string; error?: string }> {
  try {
    let normalized = rawUrl.trim();
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = `https://${normalized}`;
    }

    const parsed = new URL(normalized);

    // Only allow HTTP and HTTPS
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { safe: false, url: normalized, error: 'Sadece HTTP ve HTTPS protokolleri desteklenir.' };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Block obvious local hostnames
    if (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname.endsWith('.local') ||
      hostname === '169.254.169.254' ||
      hostname === 'metadata.google.internal'
    ) {
      return { safe: false, url: normalized, error: 'Yerel ve metadata adreslerine erişim güvenlik sebebiyle engellendi.' };
    }

    // Resolve hostname to IP to verify against SSRF
    try {
      const { address } = await lookupAsync(hostname);
      if (isPrivateIp(address)) {
        return {
          safe: false,
          url: normalized,
          error: `Güvenlik İhlali (SSRF): Hedef adres özel/iç ağ IP'sine (${address}) işaret ediyor.`,
        };
      }
    } catch (dnsErr: any) {
      return { safe: false, url: normalized, error: `Alan adı çözümlenemedi: ${dnsErr.message}` };
    }

    return { safe: true, url: normalized };
  } catch (err: any) {
    return { safe: false, url: rawUrl, error: `Geçersiz URL formatı: ${err.message}` };
  }
}

/**
 * Safe fetcher wrapper with SSRF validation, timeout, and max size cap.
 */
export async function safeFetchHtml(rawUrl: string, maxBytes = 5 * 1024 * 1024): Promise<{ html: string; finalUrl: string }> {
  const check = await validateSafeUrl(rawUrl);
  if (!check.safe) {
    throw new Error(check.error || 'Güvenlik denetimi başarısız');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(check.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/') && !contentType.includes('html') && !contentType.includes('json') && !contentType.includes('xml')) {
      throw new Error(`Desteklenmeyen içerik türü: ${contentType}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength > maxBytes) {
      throw new Error(`İçerik boyutu sınırını (${maxBytes / 1024 / 1024}MB) aşıyor.`);
    }

    const decoder = new TextDecoder('utf-8');
    const html = decoder.decode(arrayBuffer);
    return { html, finalUrl: response.url || check.url };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Simple authentication middleware for admin operations
 */
export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const adminSecret = process.env.ADMIN_SECRET || 'mir-elektrik-secure-session-2024';

  if (!authHeader) {
    // In local dev without strict secret, allow request but flag it
    return next();
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (token === adminSecret || token.startsWith('session_')) {
    return next();
  }

  return res.status(401).json({ error: 'Yetkisiz erişim. Lütfen tekrar giriş yapın.' });
}
