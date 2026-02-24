const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

function validate(body) {
  const errors = [];
  if (!body || typeof body !== 'object') return ['잘못된 요청입니다.'];
  if (!body.name || String(body.name).trim().length < 1) errors.push('이름을 입력해주세요.');
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('유효한 이메일을 입력해주세요.');
  if (!body.phone || String(body.phone).trim().length < 8) errors.push('전화번호를 입력해주세요.');
  if (!body.stage) errors.push('사업 단계를 선택해주세요.');
  for (const key of Object.keys(body)) {
    if (typeof body[key] === 'string') {
      body[key] = body[key].replace(/<[^>]*>/g, '').trim();
    }
  }
  return errors;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body;
    const errors = validate(body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(' ') });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const { data, error: dbError } = await supabase
      .from('applications')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        stage: body.stage,
        interest: body.interest || null,
        referral: body.referral || null,
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('Supabase error:', JSON.stringify(dbError));
      return res.status(500).json({ error: '신청 저장 중 오류가 발생했습니다.' });
    }

    // Resend 이메일 발송
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: 'TAB <onboarding@resend.dev>',
          to: process.env.ADMIN_EMAIL || 'admin@example.com',
          subject: '[TAB] 새 신청: ' + body.name,
          html: '<div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;"><h2 style="color:#0EA5E9;">새 신청이 접수되었습니다</h2><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:8px;border-bottom:1px solid #E0F7FF;font-weight:600;">이름</td><td style="padding:8px;border-bottom:1px solid #E0F7FF;">' + body.name + '</td></tr><tr><td style="padding:8px;border-bottom:1px solid #E0F7FF;font-weight:600;">이메일</td><td style="padding:8px;border-bottom:1px solid #E0F7FF;">' + body.email + '</td></tr><tr><td style="padding:8px;border-bottom:1px solid #E0F7FF;font-weight:600;">전화번호</td><td style="padding:8px;border-bottom:1px solid #E0F7FF;">' + body.phone + '</td></tr><tr><td style="padding:8px;border-bottom:1px solid #E0F7FF;font-weight:600;">사업 단계</td><td style="padding:8px;border-bottom:1px solid #E0F7FF;">' + body.stage + '</td></tr><tr><td style="padding:8px;font-weight:600;">관심 분야</td><td style="padding:8px;">' + (body.interest || '-') + '</td></tr></table></div>',
        });

        await resend.emails.send({
          from: 'TAB <onboarding@resend.dev>',
          to: body.email,
          subject: '[TAB] 신청이 접수되었습니다',
          html: '<div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;"><h2 style="color:#0EA5E9;">신청해주셔서 감사합니다!</h2><p style="color:#64748b;line-height:1.7;">' + body.name + '님, TAB 프로그램 신청이 정상적으로 접수되었습니다. 빠른 시일 내에 안내를 보내드리겠습니다.</p></div>',
        });
      } catch (emailErr) {
        console.error('Email error:', emailErr.message);
      }
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Server error:', err.message, err.stack);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
};
