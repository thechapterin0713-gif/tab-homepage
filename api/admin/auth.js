import crypto from 'crypto';

// 쿠키 파싱
function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(c => {
    const [key, val] = c.trim().split('=');
    if (key && val) cookies[key] = val;
  });
  return cookies;
}

// 관리자 인증 확인 미들웨어
export function verifyAdmin(req) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.tab_admin_token;
  const expiry = cookies.tab_admin_expiry;

  if (!token || !expiry) return false;

  // 만료 확인
  if (Date.now() > parseInt(expiry, 10)) return false;

  // 토큰 검증
  const payload = `admin:${expiry}`;
  const expected = crypto
    .createHmac('sha256', process.env.ADMIN_PASSWORD)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}
