# Electron Starter

Electron × React × TypeScript なアプリを素早く作るためのテンプレート  


## 使っているもの

- Electron
- TypeScript
- React
- emotion

## 使い方

```shell
  # cloneはしないほうがいいと思う
  degit konbu310/electron-starter ./PATH/TO/YOUR/APP

  cd ./PATH/TO/YOUR/APP

  # とりあえず最新する
  yarn && yarn upgrade --latest

  # webpackでビルド (yarn run watch で監視)
  yarn run build

  # electronの起動
  yarn run start
```