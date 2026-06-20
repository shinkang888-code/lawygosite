# LawyGo Marketing Site (lawygosite)

LawyGo 송무 플랫폼 마케팅 랜딩 + CMS 관리자 콘솔

## 로컬 개발

```bash
npm install
cp .env.example .env.local   # Supabase 키 입력
npm run dev
```

## 관리자 계정 생성

```bash
npm run admin:create
```

계정 정보가 `Downloads/LawyGo-Site-Admin-*.txt`에 저장됩니다.

## Supabase 마이그레이션

```bash
supabase login
supabase link --project-ref tvyktmwubzsfyfayhark
npm run db:push
npm run admin:create
```

## Render 배포

1. GitHub `lawygosite` 리포 연결
2. Blueprint (`render.yaml`) 적용 또는 Web Service 생성
3. 환경 변수 설정:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CMS_SESSION_SECRET`

```bash
render login
render blueprints validate
# Render Dashboard에서 Blueprint 생성 후 deploy
```

## URL

- 사이트: `/`
- 관리자: `/admin/login` → `/admin/console`
