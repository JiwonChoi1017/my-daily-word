// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // テスト環境の next.config.js と .env ファイルを読み込むために、Next.js アプリケーションへのパスを記載する
  dir: "./",
});

// Jest に渡すカスタム設定を追加する
const customJestConfig = {
  // 各テストの実行前に渡すオプションを追加
  // TypeScript の設定で baseUrl をルートディレクトリに設定している場合、alias を動作させるためには以下のようにする必要があります
  moduleDirectories: ["node_modules", "<rootDir>/"],
  // @をルートにしてパスエイリアスを使えるようにする
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};

// createJestConfig は、非同期で next/jest が Next.js の設定を読み込めるようにするため、下記のようにエクスポートします
module.exports = createJestConfig(customJestConfig);
