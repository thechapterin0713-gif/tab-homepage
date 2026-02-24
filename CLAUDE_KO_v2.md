# CLAUDE.md — 프론트엔드 웹사이트 규칙

## 항상 먼저 할 것
1. **`frontend-design` 스킬을 호출**한 후 프론트엔드 코드를 작성할 것. 매 세션마다, 예외 없이.
2. **인터뷰 먼저 진행** — 코드 작성 전에 반드시 아래 인터뷰 프로세스를 완료할 것.

---

## 🎤 인터뷰 프로세스 (코드 작성 전 필수)

홈페이지 제작을 시작하기 전, AskUserQuestionTool을 사용하여 요구사항을 구체화한다.

### 인터뷰 영역

| 영역 | 확인 사항 |
|------|----------|
| **1. 타겟 & 문제 정의** | 누구를 타겟으로, 어떤 문제를 해결하기 위한 웹사이트인지 명확하게 하기 |
| **2. 워크플로우 세부사항** | 단계 간 데이터 흐름, 분기 조건, 상태 관리 |
| **3. 품질 검증 기준** | 구체적인 pass/fail 조건, 자동 vs 수동 검증 |
| **4. 에지 케이스 & 실패 시나리오** | 예외 상황 대응, 롤백 전략 |
| **5. 확장성 & 유지보수** | 향후 기능 추가, 설정 변경 용이성 |

### 인터뷰 규칙

- 한 번에 **최대 2~3개 질문**
- 이미 정한 내용을 **다시 묻지 말 것**
- 구현 관점에서 **실질적으로 필요한 것만** 질문
- 사용자가 "모르겠다" 또는 "알아서 해줘" → **합리적 기본값 제안 후 확인 요청**
- 각 영역을 깊이 있게 파고들되, **불필요한 반복은 피할 것**

### 인터뷰 종료 조건

다음 중 하나를 만족하면 인터뷰 종료:
- 모든 영역이 구체화 완료
- 사용자가 **"인터뷰 종료"**라고 말할 때

### 인터뷰 완료 후

1. 수집된 정보를 바탕으로 **홈페이지 제작 시작**
2. 아래 규칙들을 따라 구현 진행

---

## 참조 이미지
- 참조 이미지가 제공된 경우: 레이아웃, 간격, 타이포그래피, 색상을 정확히 일치시킬 것. 플레이스홀더 콘텐츠로 대체 (이미지는 `https://placehold.co/` 사용, 일반 텍스트 사용). 디자인을 개선하거나 추가하지 말 것.
- 참조 이미지가 없는 경우: 높은 퀄리티로 처음부터 디자인 (아래 가드레일 참조).
- 결과물을 스크린샷 찍고, 참조와 비교하고, 불일치 수정하고, 다시 스크린샷. 최소 2회 비교 라운드 수행. 시각적 차이가 없거나 사용자가 중단 요청할 때만 종료.

## 로컬 서버
- **항상 localhost에서 서빙** — `file:///` URL은 절대 스크린샷하지 말 것.
- 개발 서버 시작: `node serve.mjs` (프로젝트 루트를 `http://localhost:3000`에서 서빙)
- `serve.mjs`는 프로젝트 루트에 위치. 스크린샷 찍기 전에 백그라운드에서 시작할 것.
- 서버가 이미 실행 중이면, 두 번째 인스턴스를 시작하지 말 것.

## 스크린샷 워크플로우
- Puppeteer는 `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`에 설치됨. Chrome 캐시는 `C:/Users/nateh/.cache/puppeteer/`에 위치.
- **항상 localhost에서 스크린샷:** `node screenshot.mjs http://localhost:3000`
- 스크린샷은 `./temporary screenshots/screenshot-N.png`에 자동 저장 (자동 증가, 덮어쓰기 없음).
- 선택적 라벨 접미사: `node screenshot.mjs http://localhost:3000 label` → `screenshot-N-label.png`으로 저장
- `screenshot.mjs`는 프로젝트 루트에 위치. 그대로 사용.
- 스크린샷 후, `temporary screenshots/`에서 PNG를 Read 도구로 읽기 — Claude가 이미지를 직접 보고 분석 가능.
- 비교 시 구체적으로: "제목이 32px인데 참조는 ~24px로 보임", "카드 간격이 16px인데 24px여야 함"
- 확인 사항: 간격/패딩, 폰트 크기/굵기/줄높이, 색상 (정확한 hex), 정렬, 테두리 반경, 그림자, 이미지 크기

## 출력 기본값
- 단일 `index.html` 파일, 모든 스타일 인라인, 사용자가 다르게 요청하지 않는 한
- Tailwind CSS CDN 사용: `<script src="https://cdn.tailwindcss.com"></script>`
- 플레이스홀더 이미지: `https://placehold.co/너비x높이`
- 모바일 퍼스트 반응형

## 브랜드 에셋
- 디자인 전에 항상 `brand_assets/` 폴더 확인. 로고, 색상 가이드, 스타일 가이드, 이미지가 있을 수 있음.
- 에셋이 존재하면 사용할 것. 실제 에셋이 있는데 플레이스홀더를 사용하지 말 것.
- 로고가 있으면 사용. 색상 팔레트가 정의되어 있으면 그 정확한 값을 사용 — 브랜드 색상을 임의로 만들지 말 것.

## 안티-제너릭 가드레일
- **색상:** 기본 Tailwind 팔레트 사용 금지 (indigo-500, blue-600 등). 커스텀 브랜드 색상을 선택하고 그로부터 파생할 것.
- **그림자:** 단조로운 `shadow-md` 사용 금지. 낮은 투명도의 색상 틴트된 레이어드 그림자 사용.
- **타이포그래피:** 제목과 본문에 같은 폰트 사용 금지. 디스플레이/세리프와 깔끔한 산세리프 조합. 큰 제목에 타이트한 자간 (`-0.03em`), 본문에 넉넉한 줄높이 (`1.7`) 적용.
- **그라디언트:** 여러 개의 radial 그라디언트 레이어. 깊이감을 위해 SVG 노이즈 필터로 그레인/텍스처 추가.
- **애니메이션:** `transform`과 `opacity`만 애니메이션. `transition-all` 절대 금지. 스프링 스타일 이징 사용.
- **인터랙티브 상태:** 모든 클릭 가능한 요소에 hover, focus-visible, active 상태 필수. 예외 없음.
- **이미지:** 그라디언트 오버레이 추가 (`bg-gradient-to-t from-black/60`) 및 `mix-blend-multiply`로 색상 처리 레이어.
- **간격:** 의도적이고 일관된 간격 토큰 사용 — 무작위 Tailwind 단계 금지.
- **깊이:** 표면에 레이어링 시스템 적용 (베이스 → 상승 → 플로팅), 모두 같은 z-plane에 놓지 말 것.

## 🔧 백엔드 연동 가이드

웹 SaaS에 필요한 백엔드는 크게 두 가지: **데이터 저장소**와 **이메일 발송**

### 추천 서비스

| 용도 | 서비스 | 무료 한도 | 특징 |
|------|--------|----------|------|
| **데이터 저장** | Supabase | 충분함 | PostgreSQL 기반, Next.js 연동 쉬움 |
| **이메일 발송** | Resend | 월 3,000건 | 개발자 친화적 API, Claude Code 연동 용이 |

### Supabase 연동 순서

```
1. supabase.com → New Project 생성
2. Settings → API에서 복사:
   - Project URL: https://xxxx.supabase.co
   - anon public key: eyJhbGci...
3. Vercel 환경변수에 등록 (아래 참조)
4. Claude Code에 연동 요청
```

### Resend 연동 순서

```
1. resend.com → API Keys → Create API Key
2. 키 즉시 복사 (한 번만 표시됨!)
3. (선택) 도메인 인증 → 내 도메인으로 발송 가능
4. Vercel 환경변수에 등록
5. Claude Code에 연동 요청
```

---

## 🌐 SEO 체크리스트

검색 엔진에 사이트를 노출시키기 위한 필수 설정.

### 메타태그

| 태그 | 규칙 | 용도 |
|------|------|------|
| `title` | 50자 이내 | 검색 결과 제목 |
| `meta description` | 150자 이내 | 검색 결과 설명 |
| `og:image` | 1200x630px 권장 | 카카오톡/SNS 공유 미리보기 |

### 필수 파일

| 파일 | 용도 |
|------|------|
| `sitemap.xml` | 사이트 전체 페이지 목록 (구글에 제출) |
| `robots.txt` | 크롤러 접근 규칙 |

### 등록해야 할 곳

| 서비스 | URL | 대상 |
|--------|-----|------|
| 구글 서치 콘솔 | search.google.com/search-console | 해외 + 국내 |
| 네이버 서치어드바이저 | searchadvisor.naver.com | 국내 |

### SEO 체크리스트

```
□ 각 페이지 title 태그 개별 설정
□ meta description 작성 (150자 이내)
□ og:image 설정 (소셜 공유 미리보기)
□ sitemap.xml 생성 및 구글 제출
□ robots.txt 설정
□ 페이지 로딩 속도 3초 이내
□ 구글 서치 콘솔 등록
□ 네이버 서치어드바이저 등록
```

---

## 🔑 환경변수 관리 규칙

> **중요:** API 키는 절대 코드에 직접 넣지 않는다.

### 규칙

| ❌ 하지 말 것 | ✅ 해야 할 것 |
|--------------|--------------|
| 코드에 API 키 직접 입력 | `.env` 파일에 저장 |
| `.env` 파일 GitHub에 커밋 | `.gitignore`에 `.env` 추가 |
| 키 유출 후 방치 | 즉시 재발급 |

### 필수 환경변수 목록 (웹 SaaS)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# Resend
RESEND_API_KEY=re_xxxx...

# AI API (선택)
ANTHROPIC_API_KEY=sk-ant-...
```

### Vercel 환경변수 설정

```
1. Vercel 프로젝트 → Settings → Environment Variables
2. 위 변수들 추가
3. 저장 후 반드시 Redeploy 클릭
```

---

## 👤 관리자 페이지 보안

관리자 페이지는 반드시 보안 설정을 해야 한다.

### 필수 보안 체크리스트

```
□ 비밀번호 또는 로그인 기능 적용
□ 추측 어려운 경로명 사용 (/admin 대신 /dashboard-x7k2 등)
□ Supabase에서 관리자 전용 권한 별도 설정
□ 배포 후 비밀번호 없이 접근 차단 확인
□ 세션 타임아웃 설정
```

### 관리자 페이지 기능 예시

| 탭 | 기능 |
|-----|------|
| **상담 관리** | 상담 신청 목록, AI 분류 결과, 처리 상태 변경 |
| **블로그 관리** | AI 초안 확인, 발행/수정/삭제 |
| **SEO 분석** | 키워드 추천, 메타태그 최적화 제안 |
| **방문자 통계** | 트래픽, 유입 경로, 인기 페이지 |

---

## 📝 Claude Code 프롬프트 템플릿

복사해서 사용할 수 있는 연동 요청 프롬프트.

### Supabase 연동

```
Supabase를 연동해줘. 환경변수에 NEXT_PUBLIC_SUPABASE_URL과 
NEXT_PUBLIC_SUPABASE_ANON_KEY가 등록돼 있어. 

상담 신청 폼이 제출되면 Supabase의 consultations 테이블에 
저장되도록 해줘. 테이블도 같이 만들어줘.
```

### Resend 이메일 연동

```
Resend를 써서 이메일 자동 발송을 구현해줘. 환경변수에 
RESEND_API_KEY가 있어. 

상담 신청이 Supabase에 저장될 때 두 가지 이메일을 보내줘:
1) 나(관리자)에게 새 상담 접수 알림
2) 의뢰인에게 접수 확인 자동 답장

Vercel serverless function으로 만들어줘.
```

### SEO 설정

```
next-sitemap 패키지를 써서 sitemap.xml과 robots.txt를 
자동 생성하도록 설정해줘. 배포할 때마다 자동으로 갱신되도록.

각 페이지에 SEO 메타태그를 추가해줘. title은 50자 이내, 
description은 150자 이내. 카카오톡·SNS 공유 시 미리보기용 
og:image도 설정해줘.
```

### 관리자 페이지 생성

```
관리자 페이지를 만들어줘. 
- 경로: /dashboard-[랜덤문자열] (추측 어려운 경로)
- 비밀번호 보호 필수
- Supabase에 저장된 상담 신청 목록 확인 및 처리 상태 변경
- 블로그 관리, SEO 분석, 방문자 통계 탭 포함
```

### AI 상담 자동 분류

```
상담 신청이 Supabase에 저장될 때마다 Claude API를 호출해서:
1) 응급도(1~3등급) 분류
2) 답변 초안 생성 후 ai_draft 컬럼에 저장

Vercel serverless function으로 만들어줘.
```

---

## 🔒 보안 체크리스트 (웹 SaaS 필수)

웹 SaaS 개발 시 반드시 아래 보안 사항을 모두 반영하고, 테스트까지 통과한 결과만 제공할 것.

### 인증 & 권한
| 항목 | 설명 |
|------|------|
| **AuthN/AuthZ** | 인증(Authentication)과 인가(Authorization) 분리 구현 |
| **RBAC/ABAC** | 역할 기반 또는 속성 기반 접근 제어 |
| **테넌트 격리** | 멀티테넌트 환경에서 데이터 격리 보장 |
| **최소 권한 원칙** | 필요한 최소한의 권한만 부여 |

### 공격 방어
| 항목 | 설명 |
|------|------|
| **CORS/Preflight** | Cross-Origin 요청 정책 올바르게 설정 |
| **CSRF** | Cross-Site Request Forgery 토큰 적용 |
| **XSS + CSP** | Cross-Site Scripting 방어 + Content Security Policy 헤더 |
| **SSRF** | Server-Side Request Forgery 방어 |
| **SQLi 방어** | SQL Injection 방지 (Parameterized Query, ORM 사용) |
| **Validation** | 모든 입력값 서버사이드 검증 |

### 인프라 & 통신 보안
| 항목 | 설명 |
|------|------|
| **HTTPS/HSTS** | TLS 강제 + HTTP Strict Transport Security |
| **보안 헤더** | X-Content-Type-Options, X-Frame-Options 등 |
| **쿠키 보안** | `HttpOnly`, `Secure`, `SameSite` 속성 필수 |
| **세션 보안** | 세션 하이재킹 방지, 타임아웃 설정 |

### 운영 보안
| 항목 | 설명 |
|------|------|
| **Rate Limit** | API 요청 제한으로 Brute Force 방어 |
| **Secret 관리** | 환경변수 또는 Secret Manager 사용, 주기적 Rotation |
| **Audit Log** | 주요 행위 로깅 (로그인, 권한 변경, 데이터 접근) |
| **에러 노출 차단** | 스택 트레이스, 내부 경로 등 민감 정보 숨김 |
| **의존성 취약점** | npm audit, Snyk 등으로 정기 점검 |

### 보안 테스트 체크
```
□ CORS 정책 테스트 완료
□ CSRF 토큰 동작 확인
□ XSS 필터링 테스트 완료
□ SQL Injection 테스트 완료
□ 인증/인가 우회 테스트 완료
□ Rate Limit 동작 확인
□ 보안 헤더 설정 확인
□ 의존성 취약점 스캔 완료
```

> **중요:** 위 항목을 전부 반영하고 테스트까지 통과한 결과만 제공할 것. 보안이 검증되지 않은 코드는 전달 금지.

---

## 엄격한 규칙
- 참조에 없는 섹션, 기능, 콘텐츠를 추가하지 말 것
- 참조 디자인을 "개선"하지 말 것 — 일치시킬 것
- 한 번의 스크린샷 패스 후 멈추지 말 것
- `transition-all` 사용 금지
- 기본 Tailwind blue/indigo를 메인 색상으로 사용 금지
- **인터뷰 없이 코드 작성 시작 금지**
- **보안 체크리스트 미준수 코드 전달 금지**
- **API 키를 코드에 직접 입력 금지 — 반드시 환경변수 사용**
- **관리자 페이지 비밀번호 없이 배포 금지**
- **SEO 메타태그 없이 프로덕션 배포 금지**

---

## 전체 워크플로우 요약

```
1. frontend-design 스킬 호출
        ↓
2. 🎤 인터뷰 진행 (AskUserQuestionTool)
   - 타겟 & 문제 정의
   - 워크플로우 세부사항
   - 품질 검증 기준
   - 에지 케이스 & 실패 시나리오
   - 확장성 & 유지보수
        ↓
3. brand_assets/ 폴더 확인
        ↓
4. 참조 이미지 확인 (있으면 매칭, 없으면 가드레일 따라 디자인)
        ↓
5. HTML/CSS 작성 (안티-제너릭 가드레일 준수)
        ↓
6. 🔧 백엔드 연동 (Supabase, Resend 등)
        ↓
7. 🔑 환경변수 설정 (API 키는 절대 코드에 직접 넣지 말 것)
        ↓
8. 🔒 보안 체크리스트 검증
        ↓
9. 🌐 SEO 설정 (메타태그, sitemap, robots.txt)
        ↓
10. 👤 관리자 페이지 생성 (필요 시)
        ↓
11. localhost에서 서빙 → 스크린샷 → 비교 → 수정
        ↓
12. 최소 2회 비교 라운드 후 완료
```
