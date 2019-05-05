# @vidglo/lambda-http
Utilities to generate AWS lambda responses

## Usage

```js
// These imports are equivalent:

const {
  response, statusCode, body, header, headers
} = require('@vidglo/lambda-http');

const response = require('@vidglo/lambda-http/response';)
const statusCode = require('@vidglo/lambda-http/statusCode';)
const body = require('@vidglo/lambda-http/body';)
const header = require('@vidglo/lambda-http/header';)
const headers = require('@vidglo/lambda-http/headers';)

// And:

const { ok } = require('@vidglo/lambda-http/responses');
const ok = require('@vidglo/lambda-http/responses/ok');

// The following are equivalent:

{ statusCode: 200 };
response(statusCode(200));
statusCode(200);
response(ok());
ok();


// As are the following:

{
  statusCode: 200,
  headers: {
    'x-my-header': 'some-header-value'
  }
};

response(
  statusCode(200), {
    headers: { 'x-my-header': 'some-header-value' }
  }
);

response(
  statusCode(200),
  headers({ 'x-my-header': 'some-header-value' })
);

response(
  ok(),
  headers(header('x-my-header', 'some-header-value'))
);

ok(
  headers(header('x-my-header')('some-header-value'))
);

// As are the following:

{
  statusCode: 200,
  headers: {
    'x-my-header': 'some-header-value'
  },
  body: JSON.stringify({
    foo: 'bar'
  })
};

response(
  statusCode(200), {
    headers: { 'x-my-header': 'some-header-value' }
  }, {
    body: JSON.stringify({ foo: 'bar' })
  }
);

response(
  statusCode(200),
  headers({ 'x-my-header': 'some-header-value' }),
  body({ foo: 'bar' })
);

response(
  ok(),
  headers(header('x-my-header', 'some-header-value')),
  body({ foo: 'bar' })
);

ok(
  headers(header('x-my-header')('some-header-value')),
  body({ foo: 'bar' })
);

```

## API
---

### body([bodyObject])

```js
const body = require('@vidglo/lambda-http/body');
const { body } = require('@vidglo/lambda-http');
```

**Arguments**

[bodyObject] _(*)_: Any argument that can be passed to ```JSON.stringify()```. This is generally a POJO.

**Returns**

(Object): Returns an object with the single key ```body```, referencing a value of ```JSON.stringify(bodyObject)```.

**Example**

```js
body({ hello: 'world' });
// => { body: '{"hello":"world"}'  }
```

### response([objects])
```js
const response = require('@vidglo/lambda-http/response');
const { response } = require('@vidglo/lambda-http');
```

**Arguments**

[objects] _(...Object)_: A variadic arguments list of objects to merge.

**Returns**

(Object): Returns an object with all arguments merged. Essentially an immutable ```Object.assign()```.

**Example**

```js
response(statusCode(200));
// => { statusCode: 200 };
```

### statusCode(code)
```js
const statusCode = require('@vidglo/lambda-http/statusCode');
const { statusCode } = require('@vidglo/lambda-http');
```

**Arguments**

status code _(number)_: The HTTP status code of the response.

**Returns**

(Object): Returns an object with a single key of ```statusCode``` referencing the passed value.

**Example**

```js
statusCode(200);
// => { statusCode: 200 };
```

### headers([headers])
```js
const headers = require('@vidglo/lambda-http/headers');
const { headers } = require('@vidglo/lambda-http');
```

**Arguments**

[headers] _(...Object)_: A variadic arguments list of objects to collect.

**Returns**

(Object): Returns an object with a single key of ```headers``` refencing a single object with all arguments merged together.

**Example**

```js
headers({ 'x-my-header': some-header-value }, { another: 'header' });
// => {
//  headers: {
//    'x-my-header': some-header-value,
//    another: 'header'
//  }
// };
```

### header(header, value)

```js
const header = require('@vidglo/lambda-http/header');
const { header } = require('@vidglo/lambda-http');
```

**Note**

If called with one argument, this function will return another function that accepts the missing second parameter.

**Arguments**

key _(string)_: A key to bind the value to.
value _(*)_: A value to bind against the key.

**Returns**

(Object): Returns an object with a single key of ```[key]``` referencing the passed value.

**Example**

```js
header('x-my-header', 'some-header-value');
// => { 'x-my-header': 'some-header-value' };

header('x-my-header')('some-header-value');
// => { 'x-my-header': 'some-header-value' };
```


### Responses

```js
const responses = require('@vidglo/lambda-http/responses');
```

A module of helper methods that each return a response with the associated HTTP status code.
Each method can be called with a variadic arguments list of objects that will be
merged into a single output object.

#### ok([objects])

```js
const { ok } = require('@vidglo/lambda-http/responses');
const ok = require('@vidglo/lambda-http/responses/ok');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 200```, with all arguments merged into the returned object.

**Example**

```js
ok();
// => { statusCode: 200 };

ok(body({ hello: 'world' }));
// => { statusCode: 200, body: '{"hello":"world"}' };
```

#### created([objects])

```js
const { created } = require('@vidglo/lambda-http/responses');
const created = require('@vidglo/lambda-http/responses/created');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 201```, with all arguments merged into the returned object.

**Example**

```js
created();
// => { statusCode: 201 };

created(body({ hello: 'world' }));
// => { statusCode: 201, body: '{"hello":"world"}' };
```

#### accepted([objects])

```js
const { accepted } = require('@vidglo/lambda-http/responses');
const accepted = require('@vidglo/lambda-http/responses/accepted');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 202```, with all arguments merged into the returned object.

**Example**

```js
accepted();
// => { statusCode: 202 };

accepted(body({ hello: 'world' }));
// => { statusCode: 202, body: '{"hello":"world"}' };
```

#### nonAuthoritativeInformation([objects])

```js
const { nonAuthoritativeInformation } = require('@vidglo/lambda-http/responses');
const nonAuthoritativeInformation = require('@vidglo/lambda-http/responses/nonAuthoritativeInformation');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 203```, with all arguments merged into the returned object.

**Example**

```js
nonAuthoritativeInformation();
// => { statusCode: 203 };

nonAuthoritativeInformation(body({ hello: 'world' }));
// => { statusCode: 203, body: '{"hello":"world"}' };
```

#### noContent([objects])

```js
const { noContent } = require('@vidglo/lambda-http/responses');
const noContent = require('@vidglo/lambda-http/responses/noContent');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 204```, with all arguments merged into the returned object.

**Example**

```js
noContent();
// => { statusCode: 204 };

noContent(body({ hello: 'world' }));
// => { statusCode: 204, body: '{"hello":"world"}' };
```

#### resetContent([objects])

```js
const { resetContent } = require('@vidglo/lambda-http/responses');
const resetContent = require('@vidglo/lambda-http/responses/resetContent');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 205```, with all arguments merged into the returned object.

**Example**

```js
resetContent();
// => { statusCode: 205 };

resetContent(body({ hello: 'world' }));
// => { statusCode: 205, body: '{"hello":"world"}' };
```

#### partialContent([objects])

```js
const { partialContent } = require('@vidglo/lambda-http/responses');
const partialContent = require('@vidglo/lambda-http/responses/partialContent');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 206```, with all arguments merged into the returned object.

**Example**

```js
partialContent();
// => { statusCode: 206 };

partialContent(body({ hello: 'world' }));
// => { statusCode: 206, body: '{"hello":"world"}' };
```

#### multipleChoice([objects])

```js
const { multipleChoice } = require('@vidglo/lambda-http/responses');
const multipleChoice = require('@vidglo/lambda-http/responses/multipleChoice');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 300```, with all arguments merged into the returned object.

**Example**

```js
multipleChoice();
// => { statusCode: 300 };

multipleChoice(body({ hello: 'world' }));
// => { statusCode: 300, body: '{"hello":"world"}' };
```

#### movedPermanently([objects])

```js
const { movedPermanently } = require('@vidglo/lambda-http/responses');
const movedPermanently = require('@vidglo/lambda-http/responses/movedPermanently');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 301```, with all arguments merged into the returned object.

**Example**

```js
movedPermanently();
// => { statusCode: 301 };

movedPermanently(body({ hello: 'world' }));
// => { statusCode: 301, body: '{"hello":"world"}' };
```

#### found([objects])

```js
const { found } = require('@vidglo/lambda-http/responses');
const found = require('@vidglo/lambda-http/responses/found');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 302```, with all arguments merged into the returned object.

**Example**

```js
found();
// => { statusCode: 302 };

found(body({ hello: 'world' }));
// => { statusCode: 302, body: '{"hello":"world"}' };
```

#### seeOther([objects])

```js
const { seeOther } = require('@vidglo/lambda-http/responses');
const seeOther = require('@vidglo/lambda-http/responses/seeOther');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 303```, with all arguments merged into the returned object.

**Example**

```js
seeOther();
// => { statusCode: 303 };

seeOther(body({ hello: 'world' }));
// => { statusCode: 303, body: '{"hello":"world"}' };
```

#### notModified([objects])

```js
const { notModified } = require('@vidglo/lambda-http/responses');
const notModified = require('@vidglo/lambda-http/responses/notModified');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 304```, with all arguments merged into the returned object.

**Example**

```js
notModified();
// => { statusCode: 304 };

notModified(body({ hello: 'world' }));
// => { statusCode: 304, body: '{"hello":"world"}' };
```

#### useProxy([objects])

```js
const { useProxy } = require('@vidglo/lambda-http/responses');
const useProxy = require('@vidglo/lambda-http/responses/useProxy');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 305```, with all arguments merged into the returned object.

**Example**

```js
useProxy();
// => { statusCode: 305 };

useProxy(body({ hello: 'world' }));
// => { statusCode: 305, body: '{"hello":"world"}' };
```

#### temporaryRedirect([objects])

```js
const { temporaryRedirect } = require('@vidglo/lambda-http/responses');
const temporaryRedirect = require('@vidglo/lambda-http/responses/temporaryRedirect');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 307```, with all arguments merged into the returned object.

**Example**

```js
temporaryRedirect();
// => { statusCode: 307 };

temporaryRedirect(body({ hello: 'world' }));
// => { statusCode: 307, body: '{"hello":"world"}' };
```

#### permanentRedirect([objects])

```js
const { permanentRedirect } = require('@vidglo/lambda-http/responses');
const permanentRedirect = require('@vidglo/lambda-http/responses/permanentRedirect');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 308```, with all arguments merged into the returned object.

**Example**

```js
permanentRedirect();
// => { statusCode: 308 };

permanentRedirect(body({ hello: 'world' }));
// => { statusCode: 308, body: '{"hello":"world"}' };
```

#### badRequest([objects])

```js
const { badRequest } = require('@vidglo/lambda-http/responses');
const badRequest = require('@vidglo/lambda-http/responses/badRequest');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 400```, with all arguments merged into the returned object.

**Example**

```js
badRequest();
// => { statusCode: 400 };

badRequest(body({ hello: 'world' }));
// => { statusCode: 400, body: '{"hello":"world"}' };
```

#### unauthorized([objects])

```js
const { unauthorized } = require('@vidglo/lambda-http/responses');
const unauthorized = require('@vidglo/lambda-http/responses/unauthorized');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 401```, with all arguments merged into the returned object.

**Example**

```js
unauthorized();
// => { statusCode: 401 };

unauthorized(body({ hello: 'world' }));
// => { statusCode: 401, body: '{"hello":"world"}' };
```

#### paymentRequired([objects])

```js
const { paymentRequired } = require('@vidglo/lambda-http/responses');
const paymentRequired = require('@vidglo/lambda-http/responses/paymentRequired');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 402```, with all arguments merged into the returned object.

**Example**

```js
paymentRequired();
// => { statusCode: 402 };

paymentRequired(body({ hello: 'world' }));
// => { statusCode: 402, body: '{"hello":"world"}' };
```

#### forbidden([objects])

```js
const { forbidden } = require('@vidglo/lambda-http/responses');
const forbidden = require('@vidglo/lambda-http/responses/forbidden');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 403```, with all arguments merged into the returned object.

**Example**

```js
forbidden();
// => { statusCode: 403 };

forbidden(body({ hello: 'world' }));
// => { statusCode: 403, body: '{"hello":"world"}' };
```

#### notFound([objects])

```js
const { notFound } = require('@vidglo/lambda-http/responses');
const notFound = require('@vidglo/lambda-http/responses/notFound');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 404```, with all arguments merged into the returned object.

**Example**

```js
notFound();
// => { statusCode: 404 };

notFound(body({ hello: 'world' }));
// => { statusCode: 404, body: '{"hello":"world"}' };
```

#### methodNotAllowed([objects])

```js
const { methodNotAllowed } = require('@vidglo/lambda-http/responses');
const methodNotAllowed = require('@vidglo/lambda-http/responses/methodNotAllowed');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 405```, with all arguments merged into the returned object.

**Example**

```js
methodNotAllowed();
// => { statusCode: 405 };

methodNotAllowed(body({ hello: 'world' }));
// => { statusCode: 405, body: '{"hello":"world"}' };
```

#### notAcceptable([objects])

```js
const { notAcceptable } = require('@vidglo/lambda-http/responses');
const notAcceptable = require('@vidglo/lambda-http/responses/notAcceptable');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 406```, with all arguments merged into the returned object.

**Example**

```js
notAcceptable();
// => { statusCode: 406 };

notAcceptable(body({ hello: 'world' }));
// => { statusCode: 406, body: '{"hello":"world"}' };
```

#### proxyAuthenticationRequired([objects])

```js
const { proxyAuthenticationRequired } = require('@vidglo/lambda-http/responses');
const proxyAuthenticationRequired = require('@vidglo/lambda-http/responses/proxyAuthenticationRequired');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 407```, with all arguments merged into the returned object.

**Example**

```js
proxyAuthenticationRequired();
// => { statusCode: 407 };

proxyAuthenticationRequired(body({ hello: 'world' }));
// => { statusCode: 407, body: '{"hello":"world"}' };
```

#### requestTimeout([objects])

```js
const { requestTimeout } = require('@vidglo/lambda-http/responses');
const requestTimeout = require('@vidglo/lambda-http/responses/requestTimeout');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 408```, with all arguments merged into the returned object.

**Example**

```js
requestTimeout();
// => { statusCode: 408 };

requestTimeout(body({ hello: 'world' }));
// => { statusCode: 408, body: '{"hello":"world"}' };
```

#### conflict([objects])

```js
const { conflict } = require('@vidglo/lambda-http/responses');
const conflict = require('@vidglo/lambda-http/responses/conflict');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 409```, with all arguments merged into the returned object.

**Example**

```js
conflict();
// => { statusCode: 409 };

conflict(body({ hello: 'world' }));
// => { statusCode: 409, body: '{"hello":"world"}' };
```

#### gone([objects])

```js
const { gone } = require('@vidglo/lambda-http/responses');
const gone = require('@vidglo/lambda-http/responses/gone');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 410```, with all arguments merged into the returned object.

**Example**

```js
gone();
// => { statusCode: 410 };

gone(body({ hello: 'world' }));
// => { statusCode: 410, body: '{"hello":"world"}' };
```

#### lengthRequired([objects])

```js
const { lengthRequired } = require('@vidglo/lambda-http/responses');
const lengthRequired = require('@vidglo/lambda-http/responses/lengthRequired');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 411```, with all arguments merged into the returned object.

**Example**

```js
lengthRequired();
// => { statusCode: 411 };

lengthRequired(body({ hello: 'world' }));
// => { statusCode: 411, body: '{"hello":"world"}' };
```

#### preconditionFailed([objects])

```js
const { preconditionFailed } = require('@vidglo/lambda-http/responses');
const preconditionFailed = require('@vidglo/lambda-http/responses/preconditionFailed');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 412```, with all arguments merged into the returned object.

**Example**

```js
preconditionFailed();
// => { statusCode: 412 };

preconditionFailed(body({ hello: 'world' }));
// => { statusCode: 412, body: '{"hello":"world"}' };
```

#### payloadTooLarge([objects])

```js
const { payloadTooLarge } = require('@vidglo/lambda-http/responses');
const payloadTooLarge = require('@vidglo/lambda-http/responses/payloadTooLarge');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 413```, with all arguments merged into the returned object.

**Example**

```js
payloadTooLarge();
// => { statusCode: 413 };

payloadTooLarge(body({ hello: 'world' }));
// => { statusCode: 413, body: '{"hello":"world"}' };
```

#### uriTooLong([objects])

```js
const { uriTooLong } = require('@vidglo/lambda-http/responses');
const uriTooLong = require('@vidglo/lambda-http/responses/uriTooLong');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 414```, with all arguments merged into the returned object.

**Example**

```js
uriTooLong();
// => { statusCode: 414 };

uriTooLong(body({ hello: 'world' }));
// => { statusCode: 414, body: '{"hello":"world"}' };
```

#### unsupportedMediaType([objects])

```js
const { unsupportedMediaType } = require('@vidglo/lambda-http/responses');
const unsupportedMediaType = require('@vidglo/lambda-http/responses/unsupportedMediaType');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 415```, with all arguments merged into the returned object.

**Example**

```js
unsupportedMediaType();
// => { statusCode: 415 };

unsupportedMediaType(body({ hello: 'world' }));
// => { statusCode: 415, body: '{"hello":"world"}' };
```

#### requestedRangeNotSatisfiable([objects])

```js
const { requestedRangeNotSatisfiable } = require('@vidglo/lambda-http/responses');
const requestedRangeNotSatisfiable = require('@vidglo/lambda-http/responses/requestedRangeNotSatisfiable');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 416```, with all arguments merged into the returned object.

**Example**

```js
requestedRangeNotSatisfiable();
// => { statusCode: 416 };

requestedRangeNotSatisfiable(body({ hello: 'world' }));
// => { statusCode: 416, body: '{"hello":"world"}' };
```

#### expectationFailed([objects])

```js
const { expectationFailed } = require('@vidglo/lambda-http/responses');
const expectationFailed = require('@vidglo/lambda-http/responses/expectationFailed');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 417```, with all arguments merged into the returned object.

**Example**

```js
expectationFailed();
// => { statusCode: 417 };

expectationFailed(body({ hello: 'world' }));
// => { statusCode: 417, body: '{"hello":"world"}' };
```

#### imATeapot([objects])

```js
const { imATeapot } = require('@vidglo/lambda-http/responses');
const imATeapot = require('@vidglo/lambda-http/responses/imATeapot');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 418```, with all arguments merged into the returned object.

**Example**

```js
imATeapot();
// => { statusCode: 418 };

imATeapot(body({ hello: 'world' }));
// => { statusCode: 418, body: '{"hello":"world"}' };
```

#### misdirectedRequest([objects])

```js
const { misdirectedRequest } = require('@vidglo/lambda-http/responses');
const misdirectedRequest = require('@vidglo/lambda-http/responses/misdirectedRequest');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 421```, with all arguments merged into the returned object.

**Example**

```js
misdirectedRequest();
// => { statusCode: 421 };

misdirectedRequest(body({ hello: 'world' }));
// => { statusCode: 421, body: '{"hello":"world"}' };
```

#### unprocessableEntity([objects])

```js
const { unprocessableEntity } = require('@vidglo/lambda-http/responses');
const unprocessableEntity = require('@vidglo/lambda-http/responses/unprocessableEntity');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 422```, with all arguments merged into the returned object.

**Example**

```js
unprocessableEntity();
// => { statusCode: 422 };

unprocessableEntity(body({ hello: 'world' }));
// => { statusCode: 422, body: '{"hello":"world"}' };
```

#### locked([objects])

```js
const { locked } = require('@vidglo/lambda-http/responses');
const locked = require('@vidglo/lambda-http/responses/locked');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 423```, with all arguments merged into the returned object.

**Example**

```js
locked();
// => { statusCode: 423 };

locked(body({ hello: 'world' }));
// => { statusCode: 423, body: '{"hello":"world"}' };
```

#### failedDependency([objects])

```js
const { failedDependency } = require('@vidglo/lambda-http/responses');
const failedDependency = require('@vidglo/lambda-http/responses/failedDependency');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 424```, with all arguments merged into the returned object.

**Example**

```js
failedDependency();
// => { statusCode: 424 };

failedDependency(body({ hello: 'world' }));
// => { statusCode: 424, body: '{"hello":"world"}' };
```

#### tooEarly([objects])

```js
const { tooEarly } = require('@vidglo/lambda-http/responses');
const tooEarly = require('@vidglo/lambda-http/responses/tooEarly');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 425```, with all arguments merged into the returned object.

**Example**

```js
tooEarly();
// => { statusCode: 425 };

tooEarly(body({ hello: 'world' }));
// => { statusCode: 425, body: '{"hello":"world"}' };
```

#### upgradeRequired([objects])

```js
const { upgradeRequired } = require('@vidglo/lambda-http/responses');
const upgradeRequired = require('@vidglo/lambda-http/responses/upgradeRequired');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 426```, with all arguments merged into the returned object.

**Example**

```js
upgradeRequired();
// => { statusCode: 426 };

upgradeRequired(body({ hello: 'world' }));
// => { statusCode: 426, body: '{"hello":"world"}' };
```

#### preconditionRequired([objects])

```js
const { preconditionRequired } = require('@vidglo/lambda-http/responses');
const preconditionRequired = require('@vidglo/lambda-http/responses/preconditionRequired');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 428```, with all arguments merged into the returned object.

**Example**

```js
preconditionRequired();
// => { statusCode: 428 };

preconditionRequired(body({ hello: 'world' }));
// => { statusCode: 428, body: '{"hello":"world"}' };
```

#### tooManyRequests([objects])

```js
const { tooManyRequests } = require('@vidglo/lambda-http/responses');
const tooManyRequests = require('@vidglo/lambda-http/responses/tooManyRequests');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 429```, with all arguments merged into the returned object.

**Example**

```js
tooManyRequests();
// => { statusCode: 429 };

tooManyRequests(body({ hello: 'world' }));
// => { statusCode: 429, body: '{"hello":"world"}' };
```

#### requestHeaderFieldsTooLarge([objects])

```js
const { requestHeaderFieldsTooLarge } = require('@vidglo/lambda-http/responses');
const requestHeaderFieldsTooLarge = require('@vidglo/lambda-http/responses/requestHeaderFieldsTooLarge');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 431```, with all arguments merged into the returned object.

**Example**

```js
requestHeaderFieldsTooLarge();
// => { statusCode: 431 };

requestHeaderFieldsTooLarge(body({ hello: 'world' }));
// => { statusCode: 431, body: '{"hello":"world"}' };
```

#### unavailableForLegalReasons([objects])

```js
const { unavailableForLegalReasons } = require('@vidglo/lambda-http/responses');
const unavailableForLegalReasons = require('@vidglo/lambda-http/responses/unavailableForLegalReasons');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 451```, with all arguments merged into the returned object.

**Example**

```js
unavailableForLegalReasons();
// => { statusCode: 451 };

unavailableForLegalReasons(body({ hello: 'world' }));
// => { statusCode: 451, body: '{"hello":"world"}' };
```

#### internalServerError([objects])

```js
const { internalServerError } = require('@vidglo/lambda-http/responses');
const internalServerError = require('@vidglo/lambda-http/responses/internalServerError');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 500```, with all arguments merged into the returned object.

**Example**

```js
internalServerError();
// => { statusCode: 500 };

internalServerError(body({ hello: 'world' }));
// => { statusCode: 500, body: '{"hello":"world"}' };
```

#### notImplemented([objects])

```js
const { notImplemented } = require('@vidglo/lambda-http/responses');
const notImplemented = require('@vidglo/lambda-http/responses/notImplemented');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 501```, with all arguments merged into the returned object.

**Example**

```js
notImplemented();
// => { statusCode: 501 };

notImplemented(body({ hello: 'world' }));
// => { statusCode: 501, body: '{"hello":"world"}' };
```

#### badGateway([objects])

```js
const { badGateway } = require('@vidglo/lambda-http/responses');
const badGateway = require('@vidglo/lambda-http/responses/badGateway');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 502```, with all arguments merged into the returned object.

**Example**

```js
badGateway();
// => { statusCode: 502 };

badGateway(body({ hello: 'world' }));
// => { statusCode: 502, body: '{"hello":"world"}' };
```

#### serviceUnavailable([objects])

```js
const { serviceUnavailable } = require('@vidglo/lambda-http/responses');
const serviceUnavailable = require('@vidglo/lambda-http/responses/serviceUnavailable');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 503```, with all arguments merged into the returned object.

**Example**

```js
serviceUnavailable();
// => { statusCode: 503 };

serviceUnavailable(body({ hello: 'world' }));
// => { statusCode: 503, body: '{"hello":"world"}' };
```

#### gatewayTimeout([objects])

```js
const { gatewayTimeout } = require('@vidglo/lambda-http/responses');
const gatewayTimeout = require('@vidglo/lambda-http/responses/gatewayTimeout');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 504```, with all arguments merged into the returned object.

**Example**

```js
gatewayTimeout();
// => { statusCode: 504 };

gatewayTimeout(body({ hello: 'world' }));
// => { statusCode: 504, body: '{"hello":"world"}' };
```

#### httpVersionNotSupported([objects])

```js
const { httpVersionNotSupported } = require('@vidglo/lambda-http/responses');
const httpVersionNotSupported = require('@vidglo/lambda-http/responses/httpVersionNotSupported');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 505```, with all arguments merged into the returned object.

**Example**

```js
httpVersionNotSupported();
// => { statusCode: 505 };

httpVersionNotSupported(body({ hello: 'world' }));
// => { statusCode: 505, body: '{"hello":"world"}' };
```

#### variantAlsoNegotiates([objects])

```js
const { variantAlsoNegotiates } = require('@vidglo/lambda-http/responses');
const variantAlsoNegotiates = require('@vidglo/lambda-http/responses/variantAlsoNegotiates');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 506```, with all arguments merged into the returned object.

**Example**

```js
variantAlsoNegotiates();
// => { statusCode: 506 };

variantAlsoNegotiates(body({ hello: 'world' }));
// => { statusCode: 506, body: '{"hello":"world"}' };
```

#### insufficientStorage([objects])

```js
const { insufficientStorage } = require('@vidglo/lambda-http/responses');
const insufficientStorage = require('@vidglo/lambda-http/responses/insufficientStorage');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 507```, with all arguments merged into the returned object.

**Example**

```js
insufficientStorage();
// => { statusCode: 507 };

insufficientStorage(body({ hello: 'world' }));
// => { statusCode: 507, body: '{"hello":"world"}' };
```

#### loopDetected([objects])

```js
const { loopDetected } = require('@vidglo/lambda-http/responses');
const loopDetected = require('@vidglo/lambda-http/responses/loopDetected');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 508```, with all arguments merged into the returned object.

**Example**

```js
loopDetected();
// => { statusCode: 508 };

loopDetected(body({ hello: 'world' }));
// => { statusCode: 508, body: '{"hello":"world"}' };
```

#### notExtended([objects])

```js
const { notExtended } = require('@vidglo/lambda-http/responses');
const notExtended = require('@vidglo/lambda-http/responses/notExtended');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 510```, with all arguments merged into the returned object.

**Example**

```js
notExtended();
// => { statusCode: 510 };

notExtended(body({ hello: 'world' }));
// => { statusCode: 510, body: '{"hello":"world"}' };
```

#### networkAuthenticationRequired([objects])

```js
const { networkAuthenticationRequired } = require('@vidglo/lambda-http/responses');
const networkAuthenticationRequired = require('@vidglo/lambda-http/responses/networkAuthenticationRequired');
```

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ```statusCode: 511```, with all arguments merged into the returned object.

**Example**

```js
networkAuthenticationRequired();
// => { statusCode: 511 };

networkAuthenticationRequired(body({ hello: 'world' }));
// => { statusCode: 511, body: '{"hello":"world"}' };
```

