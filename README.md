<div align="center">
  
  ![banner](assets/ts-js-k6.png)

# Template to use TypeScript with k6

</div>

This repository provides a scaffolding project to start using TypeScript in your k6 scripts.

1. [gRPC Example](./src/examples/grpc-example.px.md)
2. [socket.io Example](./src/examples/socketio-example.px.md)

[Read the k6 Documentation](https://k6.io/docs/), it's great!

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation)
- [NodeJS](https://nodejs.org/en/download/)

## Installation

**Install dependencies**

Clone the generated repository on your local machine, move to the project root folder and install the dependencies defined in [`package.json`](./package.json)

```bash
npm install
```

## Running the test

The following command will build and run your test.

```bash
npm run go dist/your-test.px.js
```

### Transpiling and Bundling

By default, k6 can only run ES5.1 JavaScript code. To use TypeScript, we have to set up a bundler that converts TypeScript to JavaScript code.

This project uses `Babel` and `Webpack` to bundle the different files - using the configuration of the [`webpack.config.js`](./webpack.config.js) file.

If you want to learn more, check out [Bundling node modules in k6](https://k6.io/docs/using-k6/modules#bundling-node-modules).

## Linting

The project uses [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [husky](https://github.com/typicode/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged).

To format the whole project, run:

```
npm run format
```

However this is also done on commit.

I have also pushed the `.vscode` folder so your changes will also be formatted on save if you use this IDE (which is recommended).

You can also check your TypeScript by running the following command:

```
npm run check-types
```

## Best Practices

### Read the Docs

In order to start building more comprehensive performance tests (using [Scenarios](https://k6.io/docs/using-k6/scenarios) and [Groups](https://k6.io/docs/using-k6/tags-and-groups) etc.), it's important to understand the [Using k6](https://k6.io/docs/) section of the documentation, which starts with [HTTP Requests](https://k6.io/docs/using-k6/http-requests).

### Parameterize your Test Data

I highly recommend parameterizing your test data so that they can be run multiple times against the same environment without the need to clear the environment of data in between test, or rebuild the environment.

If you take this approach, you can run your test against a local environment as you build it (with a much reduced duration and VUs, e.g. 2 VUs and 2 iterations).  Then, if the test fails, you know it's the code that you just added.

This can be easily done by adding an `attempt` value to the end of any Test Data generated in your test (e.g. user names, site names, folder names).  This value can then be passed through as an environment variable with each test run.

Add this code to the top of your script:

```typescript
const attempt = __ENV.ATTEMPT ? __ENV.ATTEMPT : '1';
```

Example usage:

```typescript
const siteName = `pxSite${attempt}`;
```

And then pass the variable through when you run the test:

```bash
npm run go dist/any-test.js -e ATTEMPT=2
```

### Add Validation (Optional, But Useful)

I also recommend taking the `Pre-req` and `Post-req` validation approach to writing your methods.

For example, use the [k6 checks](https://k6.io/docs/using-k6/checks) calls to ensure that the parameters are as expected before a request is sent, and that they are correctly updated after a response is received.  This will help tremendously when thing go wrong (e.g. the API changes).

An example of this can be found in the [best-practice.ts](./src/examples/best-practice.ts) k6 test.


### Document your Tests and Methods

Any functions in the `libs` folder must have [JSDoc](https://jsdoc.app/) style documentation associated with it describing what it does.

Each Performance Test must have an associated markdown file with it that is stored in the same folder and given the same name.  Use this to describe what this test is for, how the test is run, and any context and test run details.  Not only is this useful when a colleague needs to run your test, it is also used by the TestRail Integration tool to document the test run.

There is an example markdown file for the [best practice test](./src/examples/best-practice.md).

## Testing with Jest

Each new module in the `libs` folder should have an associated unit test file containing tests for each function.  We are using the [Jest](https://jestjs.io/en/) framework on the project.  All the `k6` classes will be automatically replaced by mocks.  These mocks can be found in the `__mocks__` folder.

To run the tests, just run:

```
npm test
```

Or run:

```
npm run test:watch
```

To have the tests run automatically when the code is changed.
## Change Log

This project has been set up with a Change Log.  Before a branch can be merged, you will need to update the [project version](./VERSION.txt) and the [Change Log](CHANGELOG.md) as this will be checked in the pipeline and an appropriate [version tag](https://docs.gitlab.com/ee/university/training/topics/tags.html) assiged.

The pipeline will also lint the `YAML` in your gitlab pipeline file.

## Debugging Your Tests

To debug your tests, use the `--http-debug`. If you need to see the response bodies, use `--http-debug="full"`.

For example:

```bash
npm run go dist/your-test.px.js --http-debug="full"
```

## Useful Links

1. [k6 Extensions](https://github.com/topics/xk6)
2. [Awesome k6](https://github.com/k6io/awesome-k6)
3. [k6 Libs](https://jslib.k6.io/) including some for Functional testing.
