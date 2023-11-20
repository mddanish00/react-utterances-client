# react-utterances-client

Another React component for using [Utterances 🔮](https://utteranc.es/) on your website!

## Wait, did we have `utterance-react-component` already? Is another component needed?

That component loads the script `https://utteranc.es/client.js` and passes the props to that script. The problem is the component will have the same bugs as `client.js` and at the point I am writing this still exists.

Refer to [utterances issue #624][utterances-i#624] and [utterances-component issue #393][utterances-component-i#393].

[utterances-i#624]: https://github.com/utterance/utterances/issues/624
[utterances-component-i#393]: https://github.com/TomokiMiyauci/utterances-component/issues/393

So, I took `client.js`, rewrote that using React API, and made it into a React component. No more unnecessary steps like loading the script. Also, resolved the above issues.

## Are any new features planned?

I will implement everything that `client.js` can do. I also will take suggestions that will improve the component itself.

Aside from that, none. Why?

First, we need to break down what `client.js` does.

- Processing the provided props
- Collect attributes from the page that the script loaded from
- And, finally, construct the URL based on those information and load iframe with that URL.

As the name implies, the `client.js` is just a client. And so is this component.

I can fix it if something is wrong with the client functions above.

But if you want new features and have problems with Utterances itself, you have better luck in posting your issues in the [Utterances repository](https://github.com/utterance/utterances/issues) instead.

## Installation

### Install from npm

TBA

### Install from repository

```bash
npm install github:mddanish00/react-utterances-client
```

```bash
yarn add react-utterances-client@github:mddanish00/react-utterances-client
```

## Usage

TBA

## Props

TBA

## License

This project is licensed under the [MIT license](./LICENSE).

## Other License

The types of the project are taken and modified from [utterance-component](https://github.com/TomokiMiyauci/utterances-component).

`utterances-component` is licensed under the [MIT license](https://github.com/TomokiMiyauci/utterances-component/blob/main/LICENSE).
