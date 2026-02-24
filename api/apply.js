import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// 입력값 검증
function validate(body) {
  const errors = [];
  if (!body.name || body.name.trim().length < 1) errors.push('이름을 입력해주세요.');
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('유효한 이메일을 입력해주세요.');
  if (!body.phone || body.phone.trim().length < 8) errors.push('전화번호를 입력해주세요.');
  if (!body.stage) errors.push('사업 단계를 선택해주세요.');
  // XSS 방지: HTML 태그 제거
  for (const key of Object.keys(body)) {
    if (typeof body[key] === 'string') {
      body[key] = body[key].replace(/<[^>]*>/g, '').trim();
    }
  }
  return errors;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.SITE_URL || '*');
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

    // Supabase에 저장
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
      console.error('Supabase error:', dbError);
      return res.status(500).json({ error: '신청 저장 중 오류가 발생했습니다.' });
    }

    // Resend 이메일 발송 (API 키가 있을 때만)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        // 1) 관리자에게 알림
        await resend.emails.send({
          from: 'TAB <onboarding@resend.dev>',
          to: process.env.ADMIN_EMAIL || 'admin@example.com',
          subject: `[TAB] 새 신청: ${body.name}`,
          html: `
            <div style="font-family:'Noto Sans KR',sans-serif;max-width:500px;margin:0 auto;padding:24px;">
              <h2 style="color:#0EA5E9;margin-bottom:16px;">새 신청이 접수되었습니다</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px;border-bottom:1px solid #E0F7FF;font-weight:600;color:#334155;">이름</td><td style="padding:8px;border-bottom:1px solid #E0F7FF;">${body.name}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #E0F7FF;font-weight:600;color:#334155;">이메일</td><td style="padding:8px;border-bottom:1px solid #E0F7FF;">${body.email}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #E0F7FF;font-weight:600;color:#334155;">전화번호</td><td style="padding:8px;border-bottom:1px solid #E0F7FF;">${body.phone}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #E0F7FF;font-weight:600;color:#334155;">사업 단계</td><td style="padding:8px;border-bottom:1px solid #E0F7FF;">${body.stage}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #E0F7FF;font-weight:600;color:#334155;">관심 분야</td><td style="padding:8px;border-bottom:1px solid #E0F7FF;">${body.interest || '-'}</td></tr>
                <tr><td style="padding:8px;font-weight:600;color:#334155;">유입 경로</td><td style="padding:8px;">${body.referral || '-'}</td></tr>
              </table>
            </div>
          `,
        });

        // 2) 신청자에게 확인 메일
        await resend.emails.send({
          from: 'TAB <onboarding@resend.dev>',
          to: body.email,
          subject: '[TAB] 신청이 접수되었습니다 ✨',
          html: `
            <div style="font-family:'Noto Sans KR',sans-serif;max-width:500px;margin:0 auto;padding:24px;">
              <h2 style="color:#0EA5E9;margin-bottom:8px;">신청해주셔서 감사합니다!</h2>
              <p style="color:#64748b;line-height:1.7;margin-bottom:16px;">
                ${body.name}님, TAB 프로그램 신청이 정상적으로 접수되었습니다.<br/>
                빠른 시일 내에 안내 메일을 보내드리겠습니다.
              </p>
              <div style="padding:16px;background:#E0F7FF;border-radius:12px;text-align:center;">
                <p style="color:#0EA5E9;font-weight:700;font-size:14px;">✧ Execution is Everything ✧</p>
                <p style="color:#334155;font-size:12px;">태오의 실행 비즈니스</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        // 이메일 실패해도 신청은 성공 처리
        console.error('Email error:', emailErr);
      }
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}
