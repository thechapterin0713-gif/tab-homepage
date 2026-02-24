import crypto from 'crypto';

// 간단한 토큰 생성 (세션 대용)
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// 메모리 기반 토큰 저장 (Vercel serverless 환경에서는 요청마다 초기화됨)
// → 실제로는 쿠키 기반 인증 사용
export function verifyPassword(password) {
  return password === process.env.ADMIN_PASSWORD;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.SITE_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: '비밀번호를 입력해주세요.' });
  }

  if (!verifyPassword(password)) {
    return res.status(401).json({ error: '비밀번호가 올바르지 않습니다.' });
  }

  // HMAC 기반 토큰 생성 (시간 제한: 24시간)
  const expiry = Date.now() + 24 * 60 * 60 * 1000;
  const payload = `admin:${expiry}`;
  const token = crypto
    .createHmac('sha256', process.env.ADMIN_PASSWORD)
    .update(payload)
    .digest('hex');

  // HttpOnly 쿠키 설정
  res.setHeader('Set-Cookie', [
    `tab_admin_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
    `tab_admin_expiry=${expiry}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
  ]);

  return res.status(200).json({ success: true });
}
