# @vidglo/lambda-http-responses
Utilities to generate AWS lambda responses

## Usage

```js
// These imports are equivalent:

const {
  response,
  statusCode,
  body,
  header,
  headers
} = require('@vidglo/lambda-http-responses');

const response = require('@vidglo/lambda-http-responses/response');
const statusCode = require('@vidglo/lambda-http-responses/statusCode');
const body = require('@vidglo/lambda-http-responses/body');
const header = require('@vidglo/lambda-http-responses/header');
const headers = require('@vidglo/lambda-http-responses/headers');

// And:

const { ok } = require('@vidglo/lambda-http-responses/responses');
const ok = require('@vidglo/lambda-http-responses/responses/ok');

// The following are equivalent:

const desiredResponse = { statusCode: 200 };
const desiredResponse = response(statusCode(200));
const desiredResponse = statusCode(200);
const desiredResponse = response(ok());
const desiredResponse = ok();

// As are the following:

const desiredResponse = {
  statusCode: 200,
  headers: {
    foo: 'bar'
  }
};

const desiredResponse = response(
  statusCode(200), {
    headers: {
      foo: 'bar'
    }
  }
);

const desiredResponse = response(
  statusCode(200),
  headers({
    foo: 'bar'
  })
);

const desiredResponse = response(
  ok(),
  headers(header('foo', 'bar'))
);

const desiredResponse = ok(
  headers(header('foo')('bar'))
);

// As are the following:

const desiredResponse = {
  statusCode: 200,
  headers: {
    foo: 'bar'
  },
  body: JSON.stringify({
    foo: 'bar'
  })
};

const desiredResponse = response(
  statusCode(200), {
    headers: {
      foo: 'bar'
    }
  }, {
    body: JSON.stringify({
      foo: 'bar'
    })
  }
);

const desiredResponse = response(
  statusCode(200),
  headers({
    foo: 'bar'
  }),
  body({ foo: 'bar' })
);

const desiredResponse = response(
  ok(),
  headers(header('foo', 'bar')),
  body({ foo: 'bar' })
);

const desiredResponse = ok(
  headers(header('foo')('bar')),
  body({ foo: 'bar' })
);

```

