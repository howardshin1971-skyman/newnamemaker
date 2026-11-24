# 이름결 — 사주 맞춤 개명·작명 리포트 웹사이트

코딩 없이 올릴 수 있게 만든 프로젝트입니다. 설치할 패키지가 없고, Vercel에 올리면 바로 돌아갑니다.

## 폴더 구성
- `public/` 화면 (index 홈·무료 진단, success 결제 완료·리포트, my 내 리포트, terms·privacy·refund 약관)
- `public/site-config.js` **사업자 정보 입력 파일** (상호, 대표자, 사업자번호, 통신판매업 번호, 주소, 연락처)
- `api/` 서버 기능 (analyze 무료 진단, order 주문번호, confirm 결제 승인, report 다시 보기, surname 성 한자 목록, config 가격)
- `api/_lib/core.js` 사주·이름·한자 계산 엔진 / `api/_lib/hanja.json` 인명용 한자 데이터
  → 계산 엔진과 한자 데이터는 서버에만 있어서 방문자가 가져갈 수 없습니다.

## 1단계: 테스트 모드로 올리기 (사업자등록 전에도 가능)
1. github.com 가입 → 오른쪽 위 `+` → New repository → 이름 입력(비공개 Private 권장) → Create
2. 만든 저장소 화면에서 "uploading an existing file" 클릭 → 이 폴더 안의 파일과 폴더를 **전부** 끌어다 놓기 → Commit changes
3. vercel.com 에서 GitHub 계정으로 가입 → Add New → Project → 방금 만든 저장소 Import
4. Framework Preset은 **Other** 그대로, Build Command·Output Directory는 비워 둔 채 Deploy
5. 환경 변수(Settings → Environment Variables)에 아래 하나는 꼭 넣고 다시 배포(Deployments → Redeploy)
   - `TOKEN_SECRET` = 아무도 모르는 긴 문자열 (예: 비밀번호 생성기로 만든 40자)
6. 나온 주소(`○○.vercel.app`)에 들어가 무료 진단 → 결제 버튼 → 테스트 모드로 리포트가 열리는지 확인

토스 키를 넣기 전까지는 **테스트 모드**라서 돈을 받지 않고 리포트가 열립니다. 홍보를 시작하기 전에 반드시 2단계를 마치세요.

## 2단계: 실제 결제 붙이기
1. 사업자등록 → 통신판매업 신고 (정부24) → `public/site-config.js` 에 정보 입력
2. 약관 3개(`public/terms.html`, `privacy.html`, `refund.html`)의 노란 표시 부분을 채우고 법률 전문가 검토
3. 토스페이먼츠 가입 → 개발자센터 → API 키 메뉴에서 **"API 개별 연동 키"** 확인 (결제위젯 키가 아님)
   - 먼저 테스트 키(`test_ck_…`, `test_sk_…`)로 넣어 테스트 결제 → 실제 돈이 나가지 않습니다
   - 카드사 심사 통과 후 라이브 키(`live_ck_…`, `live_sk_…`)로 교체
4. Vercel 환경 변수 추가 후 Redeploy
   - `TOSS_CLIENT_KEY` = 클라이언트 키
   - `TOSS_SECRET_KEY` = 시크릿 키 (절대 다른 곳에 공개하지 마세요)
   - `PRICE` = 가격(원). 비워 두면 9900
5. 토스페이먼츠 심사 신청 시 사이트 주소, 상품(리포트) 설명, 환불정책 페이지 주소를 제출

## 3단계: 도메인 연결
가비아·호스팅케이알 등에서 도메인 구입 → Vercel 프로젝트 Settings → Domains 에 입력 → 안내대로 DNS 설정

## 내 컴퓨터에서 미리 보기 (선택)
Node.js 18 이상 설치 후 이 폴더에서 `node dev-server.js` → 브라우저에서 http://localhost:3000

## 바꾸고 싶을 때
- 가격: Vercel 환경 변수 `PRICE`
- 서비스 이름·사업자 정보: `public/site-config.js`
- 문구·디자인: `public/index.html`, `public/style.css`
- 추천 이름 목록: `api/_lib/core.js` 의 `NAMES`
수정은 GitHub 저장소에서 파일을 열고 연필 아이콘으로 고치면, Vercel이 자동으로 다시 배포합니다.

## 알아 둘 점
- 주문 기록은 토스페이먼츠 관리자 화면에서 확인합니다. 이 사이트는 데이터베이스 없이 동작하며, 입력 정보를 서버에 저장하지 않습니다.
- 리포트 다시 보기는 결제한 기기의 브라우저에 저장된 열람 정보로 동작합니다. 다른 기기에서 보려면 회원 기능이나 이메일 발송 기능을 추가해야 합니다.
- 원획·자원오행은 규칙 기반 자동 계산이라 일부 글자는 학파에 따라 다를 수 있습니다. 출시 전 명리 전문가 검수를 권장합니다.
