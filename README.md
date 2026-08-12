# livescore

**한국어** · [日本語](README.ja.md) · [English](README.en.md)

> 내가 보려고 만든 라이브스코어 — 야구(KBO/MLB)·축구 경기 일정과 실시간 스코어를 한눈에

## 소개

**livescore**는 야구와 축구 경기의 일정·스코어·순위·라인업을 확인하기 위해 개인적으로 만든 라이브스코어 웹 애플리케이션입니다. 날짜별 경기 목록에서 야구/축구를 전환하고, 개별 경기를 눌러 상세 정보(스코어보드, 라인업, 타자/투수 기록)를 확인하거나 리그 팀 순위를 조회할 수 있습니다.

React + TypeScript로 작성되었으며 빌드/개발 서버는 Vite를 사용합니다. 경기 데이터는 외부 스포츠 API(`sports-api.named.com`)에서, 팀 순위는 다음 스포츠(`sports.daum.net`) 프록시를 통해 가져옵니다.

## ✨ 주요 기능 (코드 기준)

- **날짜별 경기 목록**: 메인 화면에서 이전/다음 날짜로 이동하며 해당 날짜의 인기 경기 목록을 조회합니다. (`GetBaseballListTable`, `GetSoccerList` — `/popular-games?date=` 호출)
- **야구 / 축구 전환**: 메인 화면 상단 아이콘으로 야구 목록과 축구 목록을 토글합니다.
- **야구 경기 상세**: 경기별 스코어보드, 라인업, 타자·투수 기록을 표시합니다. (`BaseballMatchPage`, `GetBaseballMatch`, `GetBaseballLineup`, `GetBaseballBatter`, `GetBaseballPitcher`, `BaseballScoreBoard`)
- **축구 경기 상세**: 경기별 상세 정보를 표시합니다. (`SoccerMatchPage`, `GetSoccerMatch`)
- **팀 순위**: KBO 등 리그의 팀 순위를 조회합니다. (`RankPage`, `BaseballRank`, `BaseballMLB`, `SoccerRank` — 다음 스포츠 `team/rank.json` 호출)
- **로그인 / 회원가입 모달**: MUI 기반의 로그인·회원가입 모달 UI를 제공합니다. 입력값 검증 후 `react-toastify`로 성공/실패 토스트를 표시하는 클라이언트 UI로, 별도의 인증 백엔드 연동은 없습니다. (`LoginBar`, `SignInModal`, `SignUpModal`)

## 🛠 기술 스택

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-5-007FFF?logo=mui&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white)

- **React 18**, **TypeScript**, **Vite 5** (`@vitejs/plugin-react`)
- **react-router-dom 6** (라우팅)
- **@mui/material** · **@mui/icons-material** · **@emotion**, 일부 **@material-ui/core**(v4) 테마
- **styled-components**, **react-toastify**
- **axios** (데이터 페칭)

## 🏗 동작 방식 / 아키텍처

- 진입점 `src/index.jsx`가 `App.tsx`를 렌더링합니다. `App`은 `ThemeProvider`(커스텀 MUI 테마)와 `ToastContainer`로 감싼 `BrowserRouter`를 구성합니다.
- **라우팅** (`react-router-dom`):
  - `/` — 메인(경기 목록, `pages/index.tsx`)
  - `/match/baseball/:id` — 야구 경기 상세
  - `/match/soccer/:id` — 축구 경기 상세
  - `/rank` — 팀 순위
- **데이터 소스**:
  - 경기 목록·상세·라인업: `https://sports-api.named.com/v1.0/...` (예: `/popular-games?date=`, `/sports/baseball/games/{id}/...`)
  - 팀 순위: 다음 스포츠 `team/rank.json`. `vite.config.js`의 프록시가 `/api` 요청을 `https://sports.daum.net/prx/hermes/api`로 전달합니다.
- **컴포넌트 구성**: `src/components/`에 목록·상세·순위·인증 컴포넌트가 있으며, `src/components/JS/`·`src/pages/js/`에는 TypeScript 전환 이전의 JavaScript 버전이 함께 보관되어 있습니다.

## 🚀 시작하기

### 사전 요구사항

- Node.js

### 설치

```bash
npm install
```

### 환경변수

`.env`에는 소스맵 생성을 끄는 설정만 포함되어 있습니다. 별도의 API 키나 시크릿은 필요하지 않습니다.

```env
GENERATE_SOURCEMAP=false
```

### 실행

```bash
npm start        # Vite 개발 서버 (포트 81)
```

> `start` 스크립트는 `set PORT=81 && vite` 형태(Windows 셸 기준)이며, 실제 개발 서버 포트는 `vite.config.js`에서 `81`로 지정되어 있습니다. 접속 주소는 `http://localhost:81` 입니다.

### 빌드

```bash
npm run build    # vite build (출력 디렉토리: dist, assetsDir: static)
```

## 📁 구조

```
livescore/
├── index.html
├── vite.config.js            # 개발 서버 포트 · /api 프록시 · 빌드 설정
├── src/
│   ├── index.jsx             # 진입점
│   ├── App.tsx               # 라우팅 · 테마 · 토스트
│   ├── CustomMuiTheme.jsx    # MUI 커스텀 테마
│   ├── pages/                # index, BaseballMatchPage, SoccerMatchPage, RankPage
│   │   └── js/               # (레거시) JS 버전 페이지
│   └── components/           # 경기 목록/상세/순위/인증 컴포넌트
│       └── JS/               # (레거시) JS 버전 컴포넌트
└── public/                   # 아이콘 · 로고 · 스포츠 이미지
```

---

## 👤 기여도 & 개발 환경

| 항목 | 내용 |
|---|---|
| **기여 비율** | **100%** (단독 개발) |
| **커밋** | 15 / 15 (본인 / 전체 사람 커밋) |
| **참여 인원** | 1명 |

<sub>기여 비율은 커밋 author 이메일 기준 집계이며 봇·자동화 커밋은 제외했습니다.</sub>
