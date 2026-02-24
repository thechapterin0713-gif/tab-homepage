const { createClient } = require('@supabase/supabase-js');
const { verifyAdmin } = require('./auth.js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!verifyAdmin(req)) {
    return res.status(401).json({ error: '인증이 필요합니다.' });
  }

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const status = req.query.status || null;
    let query = supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', JSON.stringify(error));
      return res.status(500).json({ error: '데이터 조회 중 오류' });
    }

    return res.status(200).json({ data });
  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({ error: '서버 오류' });
  }
};
