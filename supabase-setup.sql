-- ============================================
-- TAB 홈페이지 Supabase 테이블 설정
-- Supabase Dashboard → SQL Editor에서 실행
-- ============================================

-- 신청 테이블
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  stage TEXT NOT NULL,
  interest TEXT,
  referral TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'enrolled', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- 인덱스
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created ON applications(created_at DESC);

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_applications_updated
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS (Row Level Security) 활성화
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- anon 사용자는 INSERT만 가능 (신청 폼 제출)
CREATE POLICY "Allow anonymous insert" ON applications
  FOR INSERT TO anon
  WITH CHECK (true);

-- anon 사용자는 SELECT/UPDATE/DELETE 불가 (API 서버사이드에서만 접근)
-- Vercel serverless에서 service_role key로 접근
