# 歴史資料・古典籍の字形探索

[![Netlify Status](https://api.netlify.com/api/v1/badges/dcd5499a-124b-4bd1-bfa1-11736b34c5ed/deploy-status)](https://app.netlify.com/sites/glowing-speculoos-748efc/deploys)

## 概要

オープンデータとオープンサイエンスの台頭により，史料・古典籍のテキストデータセットと画像データセットが多く公開されるとともに，WEB APIを同時に提供するサービスも増えている．それにともない，研究資源の一種として既存のWEB APIの活用方法が課題となる．漢字字体規範史データセット，平安時代漢字字書総合データベース，史的文字データベース連携検索システムの三つのプロジェクトのWEB APIを用いて，史料・古典籍に渡って，漢字部品での検索，異体字変換，検索結果のカスタマイズなどの機能を供する字形検索ウェブ・アプリケーションを開発した．

## API

* HNG
* HDIC
* 史的文字

## 開発

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## License

Source code license: [MIT License](LICENSE)

Contents license: look for the APIs manual
