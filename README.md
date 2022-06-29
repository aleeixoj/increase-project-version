<div align="center" id="top"> 
  <img src="./.github/app.svg" alt="Increase Project Version" />

  &#xa0;

  <!-- <a href="https://increaseprojectversion.netlify.app">Demo</a> -->
</div>

<h1 align="center">Increase Project Version</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/aleeixoj/increase-project-version?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/aleeixoj/increase-project-version?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/aleeixoj/increase-project-version?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/aleeixoj/increase-project-version?color=56BEB8">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/aleeixoj/increase-project-version?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/aleeixoj/increase-project-version?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/aleeixoj/increase-project-version?color=56BEB8" /> -->
</p>

<!-- Status -->

<!-- <h4 align="center"> 
	🚧  Increase Project Version 🚀 Under construction...  🚧
</h4> 

<hr> -->

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/aleeixoj" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

Have you had any bugs when using the npm version patch? The code version doesn't change, or changes too much!
Having trouble finding the right build to deploy to AWS?

Your troubles are over -D

With the Increase Project Version lib, you can change the version of your project in package.json, and version your project locally, to perform tests, or even deploy.

## :sparkles: Features ##

:heavy_check_mark: Performance\
:heavy_check_mark: Compatible with all builders\

## :rocket: Technologies ##

The following tools were used in this project:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Node](https://nodejs.org/en/) installed, and Yarn is optional.


## :checkered_flag: Starting ##

```bash
#Using npm
npm install --save-dev increase-project-version

#Using yarn
yarn add increase-project-version -D
```

## :checkered_flag: How to use ##

add this script in your package.json:
"build-version": "npm run build && node node_modules/increase-project-version/dist/index.js"

```bash

#Using yarn
yarn build-version

#Usin npm
npm run build-version

```

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with :heart: by <a href="https://github.com/aleeixoj" target="_blank">Aleixo</a>

&#xa0;

<a href="#top">Back to top</a>
