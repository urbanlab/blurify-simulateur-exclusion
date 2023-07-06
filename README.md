# blurify

## Overview

This app act as an exclusion simulator : it tries to demonstrate how hard it can be to consume digital services with a visual impairment.

- This app consumes `@mediapipe/camera_utils` & `@mediapipe/face_mesh` libraries
- It is heavily inspired by **[Susanne Thierfelder's](https://www.linkedin.com/in/susanne-thierfelder-16a54b72/)** article on [Medium](https://medium.com/@susanne.thierfelder/create-your-own-depth-measuring-tool-with-mediapipe-facemesh-in-javascript-ae90abae2362) (linked code is visible [here](https://codepen.io/Susanne-Thierfelder/pen/KKegjvm) )

- For now the app is visible on https://blurify.onrender.com/

## Github Pages

In case of repository renaming :

### ViteJS config

In `vite.config.js` change base to `/REPO_NAME/`

## Development

The face detection logic is stored in `src` > `components` > `FaceDetection.vue`
It is consumed directly in `App.vue` where the rest of the logic can be configured (_bluriness_)

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Compile and Minify for Production

```sh
npm run build
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
