const crypto = require('crypto');

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(function(c) {
    const parts = c.trim().split('=');
    if (parts[0] && parts[1]) cookies[parts[0]] = parts[1];
  });
  return cookies;
}

function verifyAdmin(req) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.tab_admin_token;
  const expiry = cookies.tab_admin_expiry;

  if (!token || !expiry) return false;
  if (Date.now() > parseInt(expiry, 10)) return false;

  const payload = 'admin:' + expiry;
  const expected = crypto
    .createHmac('sha256', process.env.ADMIN_PASSWORD)
    .update(payload)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch (e) {
    return false;
  }
}

module.exports = { verifyAdmin };
