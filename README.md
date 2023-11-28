# react-utterances-client

Another React component for using [Utterances](https://utteranc.es/) 🔮 on your website!

![GitHub License](https://img.shields.io/github/license/mddanish00/react-utterances-client?style=flat-square)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/mddanish00/react-utterances-client?style=flat-square)
[![Buy Me A Coffee](https://img.shields.io/badge/mddanish00-black?style=flat-square&logo=buymeacoffee&logoColor=black&label=Buy%20Me%20A%20Coffee&labelColor=%23FFDD00)](https://www.buymeacoffee.com/mddanish00)

## Features

- Rewritten `client.js` code using React API directly in the component.
- Written fully in TypeScript.
- Build for both CommonJS and ES Module.
- Named exports only.
- Customization options.
- Placeholder when the component is loading.
- Event handler (`onLoad`, `onError`) support.

## Table of Contents

- [react-utterances-client](#react-utterances-client)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Wait, did we have `utterance-react-component` already? Is another component needed?](#wait-did-we-have-utterance-react-component-already-is-another-component-needed)
  - [Installation](#installation)
    - [Install from npm](#install-from-npm)
    - [Install from repository](#install-from-repository)
  - [Usage](#usage)
    - [Basic Usage](#basic-usage)
    - [Placeholder](#placeholder)
    - [Event Handler](#event-handler)
    - [Customization](#customization)
      - [Theme](#theme)
      - [ClassName and Style](#classname-and-style)
  - [Props](#props)
  - [Like this project?](#like-this-project)
  - [Plan](#plan)
  - [License](#license)
  - [Other Licenses](#other-licenses)

## Wait, did we have `utterance-react-component` already? Is another component needed?

That component loads the script `https://utteranc.es/client.js` and passes the props to that script. The problem is the component will have the same bugs as `client.js` and at the point I am writing this still exists.

Refer to [utterances issue #624][utterances-i#624] and [utterances-component issue #393][utterances-component-i#393].

[utterances-i#624]: https://github.com/utterance/utterances/issues/624
[utterances-component-i#393]: https://github.com/TomokiMiyauci/utterances-component/issues/393

So, I took `client.js`, rewrote that using React API, and made it into a React component.

## Installation

### Install from npm

```bash
npm install react-utterances-client
```

```bash
yarn add react-utterances-client
```

### Install from repository

Recommended to specify a version tag like this for installation from the repository like below for stability.

```bash
npm install github:mddanish00/react-utterances-client#vX.X.X
```

```bash
yarn add react-utterances-client@github:mddanish00/react-utterances-client#vX.X.X
```

Check out the repository tags list [here](https://github.com/mddanish00/react-utterances-client/tags).

Remove `#vX.X.X` to fetch the latest changes from the `main` branch. Beware of instability!

## Usage

### Basic Usage

```jsx
import { Utterances } from 'react-utterances-client';

const Comments = () => {
 return (
        <Utterances
           repo="people/example-project"
           theme="github-dark"
           issueTerm="title"
        />
 );
};
```

You just need to specify your repository that you will be using its issues for comments, optionally specify your theme (default: `github-light`), and decide on issue mapping with your current page.

For this, it is better to read `Blog Post ↔️ Issue Mapping` on the [official [site](https://utteranc.es/) for a more details explanation of the options.

You can only use one of the below props for this:

- For `pathname`, `url`, `title`, `og:title` or specific terms, you need to use `issueTerm` prop.
- For `issueNumber`, you need to provide the issue number to `issueNumber` prop.

### Placeholder

```jsx
import { Utterances } from 'react-utterances-client';

const Comments = () => {
 return (
        <Utterances
           repo="people/example-project"
           issueTerm="title"
           placeholder={true}
        />
 );
};
```

> This feature need more feedback from the users. It may be removed in later versions.

Placeholder is a component that will display when the Utterances component is loading. You need to enable this feature explicitly to use it. You can even provide your own Placeholder Component through `placeholder` prop.

### Event Handler

```jsx
import * as React from 'react';
import { Utterances } from 'react-utterances-client';

const Comments = () => {
 
    const handleLoad = React.useCallback((e)=>{
        console.log('Component is loaded!')
    }, []);

    return (
        <Utterances
           repo="people/example-project"
           theme="github-dark"
           issueTerm="title"
           onLoad={handleLoad}
        />
 );
};
```

Only two event handlers can be used right now:

- onLoad: When this component finishes loading.
- onError: When this component throws errors.

This will be attached to the iframe `onLoad` and `onError`.

The `e` will be passed down to the event handler.

### Customization

```jsx
import { Utterances } from 'react-utterances-client';

const Comments = () => {
 return (
        <Utterances
           repo="people/example-project"
           theme="gruvbox-dark"
           issueTerm="title"
           iframeClassName="text-light"
           containerStyle={{ background: '#282828'}}
        />
 );
};
```

#### Theme

List of themes that are available for use with Utterances:

- github-light
- github-dark
- preferred-color-scheme
- github-dark-orange
- icy-dark
- dark-blue
- photon-dark
- boxy-light
- gruvbox-dark

For `preferred color scheme`, it will depend on your OS's dark mode settings. If disabled, `github-light`. If enabled, `github-dark`.

You can see the Theme preview on the official [site](https://utteranc.es/).

#### ClassName and Style

This component exposes the `className` prop and `style` prop for both Container div (`containerClassName`, `containerStyle`) and iframe (`iframeClassName`, `iframeStyle`). This open up the possibility when customizing the appearance of the component.

For example, you can use the `containerStyle` prop to customize the container background.

Or, pass Bootstrap classes like `text-light` or `bg-primary` to `containerClassName` prop.

Or, you Emotion `css` function and pass the generated className to the `containerClassName` prop.

Go wild!

## Props

|Name|Type|Required / Default|Description|
|:---|:---|:-----------------|:----------|
|repo|`${string}/${string}`|required|Comments respository for use with this component.|
|label|string|`""`|Label that will be assigned to issues created by Utterances.|
|theme|[Theme](#theme)|`github-light`|Theme that will be used by Utterances.|
|issueTerm|[Term](#basic-usage) or string[]|required if issueNumber `undefined`|Mapping the current page with term like page url, page title, OpenGraph title, page pathname or evern your own list of terms. This prop cannot be used with issueNumber.|
|issueNumber|number|required if issueTerm `undefined`|Mapping the current page with specific issue number in the repository. This prop cannot be used with issueTerm.|
|loading|lazy or eager|`lazy`|Indicates when the browser should load this component. In the case, you want to modify the default behaviour for some reason.|
|onLoad|(e) => void|`undefined`|Event callback when this component finish loading.|
|onError|(e) => void|`undefined`|Event callback when this component throw errors.|
|placeholder|boolean or React.ReactElement|`false`|Placeholder when this component is still loading. You can disable, or enable it with default placeholder or provide your own placeholder component.|
|containerClassName|string|`undefined`|ClassName of the Utterances iframe container.|
|iframeClassName|string|`undefined`|ClassName of the Utterances iframe.|
|containerStyle|React.CSSProperties|`{}`|Style of the Utterances iframe container.|
|iframeStyle|React.CSSProperties|`{}`|Style of the Utterances iframe.|

## Like this project?

Star this project if it is useful for you.

Also, consider buying me a coffee!

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/mddanish00)

## Plan

I will implement everything that `client.js` can do and also any future updates for `client.js`. I also will consider any suggestions that will improve the component itself.

First, we need to break down what `client.js` does.

- Processing the provided props
- Collect attributes from the page that the script loaded from
- And, finally, construct the URL based on those information and load iframe with that URL.

As the name implies, the `client.js` is just a client. And so is this component.

I can fix it if something is wrong with the client functions above.

But if you want new features and have problems with Utterances itself, you have better luck in posting your issues in the [Utterances repository](https://github.com/utterance/utterances/issues) instead.

## License

This project is licensed under the [MIT license](./LICENSE).

## Other Licenses

Some of the functions in this library are based on the original [client.ts](https://github.com/utterance/utterances/blob/master/src/client.ts) in the [Utterances](https://github.com/utterance/utterances) repository that is licensed under the [MIT license](https://github.com/utterance/utterances/blob/master/LICENSE.md).

The types of the project are taken and modified from [TomokiMiyauci/utterance-component](https://github.com/TomokiMiyauci/utterances-component) repository that is licensed under the [MIT license](https://github.com/TomokiMiyauci/utterances-component/blob/main/LICENSE).

Icon SVG that is used as the demo icon, 🔮 is a part of the [googlefonts](https://github.com/googlefonts/noto-emoji)[/noto-emoji](https://github.com/googlefonts/noto-emoji)](<https://github.com/googlefonts/noto-emoji>) project that is licensed under the [Apache License 2.0](https://github.com/googlefonts/noto-emoji/blob/main/LICENSE).
