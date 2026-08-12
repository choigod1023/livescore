# livescore

[한국어](README.md) · **日本語** · [English](README.en.md)

> 自分が見るために作ったライブスコア — 野球（KBO/MLB）・サッカーの試合日程とリアルタイムスコアを一目で

## 紹介

**livescore** は、野球とサッカーの日程・スコア・順位・ラインナップを確認するために個人的に作ったライブスコア Web アプリケーションです。日付ごとの試合一覧で野球／サッカーを切り替え、個々の試合を開いて詳細情報（スコアボード、ラインナップ、打者／投手成績）を確認したり、リーグのチーム順位を参照したりできます。

React + TypeScript で書かれており、ビルド／開発サーバーには Vite を使用します。試合データは外部スポーツ API（`sports-api.named.com`）から、チーム順位は Daum スポーツ（`sports.daum.net`）のプロキシ経由で取得します。

## ✨ 主な機能（コードベース）

- **日付別の試合一覧**: メイン画面で前後の日付へ移動しながら、その日の人気試合一覧を表示します。（`GetBaseballListTable`, `GetSoccerList` — `/popular-games?date=` を呼び出し）
- **野球 / サッカーの切り替え**: メイン画面上部のアイコンで野球一覧とサッカー一覧をトグルします。
- **野球の試合詳細**: 試合ごとのスコアボード、ラインナップ、打者・投手成績を表示します。（`BaseballMatchPage`, `GetBaseballMatch`, `GetBaseballLineup`, `GetBaseballBatter`, `GetBaseballPitcher`, `BaseballScoreBoard`）
- **サッカーの試合詳細**: 試合ごとの詳細情報を表示します。（`SoccerMatchPage`, `GetSoccerMatch`）
- **チーム順位**: KBO などのリーグのチーム順位を表示します。（`RankPage`, `BaseballRank`, `BaseballMLB`, `SoccerRank` — Daum スポーツの `team/rank.json` を呼び出し）
- **ログイン / 会員登録モーダル**: MUI ベースのログイン・会員登録モーダル UI を提供します。入力値を検証し `react-toastify` で成功／失敗のトーストを表示するクライアント UI で、認証バックエンドとの連携はありません。（`LoginBar`, `SignInModal`, `SignUpModal`）

## 🛠 技術スタック

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-5-007FFF?logo=mui&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white)

- **React 18**, **TypeScript**, **Vite 5**（`@vitejs/plugin-react`）
- **react-router-dom 6**（ルーティング）
- **@mui/material** · **@mui/icons-material** · **@emotion**、一部 **@material-ui/core**（v4）テーマ
- **styled-components**, **react-toastify**
- **axios**（データフェッチ）

## 🏗 動作の仕組み / アーキテクチャ

- エントリポイント `src/index.jsx` が `App.tsx` をレンダリングします。`App` は `ThemeProvider`（カスタム MUI テーマ）と `ToastContainer` で包んだ `BrowserRouter` を構成します。
- **ルーティング**（`react-router-dom`）:
  - `/` — メイン（試合一覧、`pages/index.tsx`）
  - `/match/baseball/:id` — 野球の試合詳細
  - `/match/soccer/:id` — サッカーの試合詳細
  - `/rank` — チーム順位
- **データソース**:
  - 試合一覧・詳細・ラインナップ: `https://sports-api.named.com/v1.0/...`（例: `/popular-games?date=`, `/sports/baseball/games/{id}/...`）
  - チーム順位: Daum スポーツの `team/rank.json`。`vite.config.js` のプロキシが `/api` リクエストを `https://sports.daum.net/prx/hermes/api` に転送します。
- **コンポーネント構成**: `src/components/` に一覧・詳細・順位・認証のコンポーネントがあり、`src/components/JS/`・`src/pages/js/` には TypeScript 移行前の JavaScript 版も残されています。

## 🚀 はじめかた

### 前提条件

- Node.js

### インストール

```bash
npm install
```

### 環境変数

`.env` にはソースマップ生成を無効化する設定だけが入っています。API キーやシークレットは不要です。

```env
GENERATE_SOURCEMAP=false
```

### 実行

```bash
npm start        # Vite 開発サーバー（ポート 81）
```

> `start` スクリプトは `set PORT=81 && vite` の形（Windows シェル前提）で、実際の開発サーバーのポートは `vite.config.js` で `81` に指定されています。アクセス先は `http://localhost:81` です。

### ビルド

```bash
npm run build    # vite build（出力ディレクトリ: dist, assetsDir: static）
```

## 📁 構成

```
livescore/
├── index.html
├── vite.config.js            # 開発サーバーのポート・/api プロキシ・ビルド設定
├── src/
│   ├── index.jsx             # エントリポイント
│   ├── App.tsx               # ルーティング・テーマ・トースト
│   ├── CustomMuiTheme.jsx    # MUI カスタムテーマ
│   ├── pages/                # index, BaseballMatchPage, SoccerMatchPage, RankPage
│   │   └── js/               # (レガシー) JS 版ページ
│   └── components/           # 試合一覧/詳細/順位/認証コンポーネント
│       └── JS/               # (レガシー) JS 版コンポーネント
└── public/                   # アイコン・ロゴ・スポーツ画像
```

---

## 👤 コントリビューションと開発環境

| 項目 | 内容 |
|---|---|
| **貢献比率** | **100%**（単独開発） |
| **コミット** | 15 / 15（本人 / 全人力コミット） |
| **参加人数** | 1 名 |

<sub>貢献比率はコミットの author メールアドレス基準で集計し、ボット・自動化コミットは除外しています。</sub>
