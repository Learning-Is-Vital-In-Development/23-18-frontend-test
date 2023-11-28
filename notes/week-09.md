# 9주차

## End-to-end testing

- [playwright](https://playwright.dev/)로 e2e테스트 하기

### 환경 구성

- `playwright` 설치
  - `npx playwright install`
- `e2e-example` 디렉토리에 있는 설정 파일들을 복사
  - `public/mockServiceWorker.js`
  - `index.html`
  - `playwright.config.ts`
  - `vite-env.d.ts`
  - `vite.config.ts`
  - `main.tsx`
- `main.tsx` 내용 수정
- `playwright.config.ts`의 `command` 옵션 수정
  - npm script는 작성해 뒀습니다.

### 로컬 개발서버 구동

- `npm run start:{name}`
- `http://localhost:3000`로 접속

### 테스트 작성

- `e2e` 디렉토리 생성 후, 테스트 코드 작성
- `e2e-example` 예제 참고

### 테스트 실행

- `npm run test:e2e:{name}`
- `npm run test:e2e:{name} -- --headed`
- `npm run test:e2e:{name} -- --ui`
- `npm run test:e2e:{name} -- --debug`
