const { createClient } = require('@supabase/supabase-js');
const { verifyAdmin } = require('./auth.js');

const VALID_STATUSES = ['pending', 'contacted', 'enrolled', 'rejected'];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!verifyAdmin(req)) {
    return res.status(401).json({ error: '인증이 필요합니다.' });
  }

  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { id, status, notes } = req.body || {};

    if (!id) return res.status(400).json({ error: 'ID가 필요합니다.' });
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: '유효하지 않은 상태값입니다.' });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = typeof notes === 'string' ? notes.replace(/<[^>]*>/g, '').trim() : '';

    const { data, error } = await supabase
      .from('applications')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', JSON.stringify(error));
      return res.status(500).json({ error: '상태 업데이트 중 오류' });
    }

    return res.status(200).json({ data });
  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({ error: '서버 오류' });
  }
};
