const { map, join, pipe, prop, concat } = require('lodash/fp');
const package = require('../package.json');
const src = require('../src');
const srcExports = Object.keys(src);
const statusCodes = require('../httpStatusCodes.json');

const THREE_BACKTICKS = '```';

module.exports = ({
  statusCode = 200,
  methodName = 'ok',
  headerName = 'x-my-header',
  headerValue = 'some-header-value',
  bodyKey = 'foo',
  bodyValue = 'bar'
} = {}) => (
`# ${package.name}
Utilities to generate AWS lambda responses

## Usage

${THREE_BACKTICKS}js
// These imports are equivalent:

const {
  ${srcExports.join(', ')}
} = require('${package.name}');

${srcExports.map(method => `const ${method} = require('${package.name}/${method}';)`).join('\n')}

// And:

const { ${methodName} } = require('${package.name}/responses');
const ${methodName} = require('${package.name}/responses/${methodName}');

// The following are equivalent:

{ statusCode: ${statusCode} };
response(statusCode(${statusCode}));
statusCode(${statusCode});
response(${methodName}());
${methodName}();


// As are the following:

{
  statusCode: ${statusCode},
  headers: {
    '${headerName}': '${headerValue}'
  }
};

response(
  statusCode(${statusCode}), {
    headers: { '${headerName}': '${headerValue}' }
  }
);

response(
  statusCode(${statusCode}),
  headers({ '${headerName}': '${headerValue}' })
);

response(
  ${methodName}(),
  headers(header('${headerName}', '${headerValue}'))
);

${methodName}(
  headers(header('${headerName}')('${headerValue}'))
);

// As are the following:

{
  statusCode: ${statusCode},
  headers: {
    '${headerName}': '${headerValue}'
  },
  body: JSON.stringify({
    ${bodyKey}: '${bodyValue}'
  })
};

response(
  statusCode(${statusCode}), {
    headers: { '${headerName}': '${headerValue}' }
  }, {
    body: JSON.stringify({ ${bodyKey}: '${bodyValue}' })
  }
);

response(
  statusCode(${statusCode}),
  headers({ '${headerName}': '${headerValue}' }),
  body({ ${bodyKey}: '${bodyValue}' })
);

response(
  ${methodName}(),
  headers(header('${headerName}', '${headerValue}')),
  body({ ${bodyKey}: '${bodyValue}' })
);

${methodName}(
  headers(header('${headerName}')('${headerValue}')),
  body({ ${bodyKey}: '${bodyValue}' })
);

${THREE_BACKTICKS}

## API
---

### body([bodyObject])

${THREE_BACKTICKS}js
const body = require('${package.name}/body');
const { body } = require('${package.name}');
${THREE_BACKTICKS}

**Arguments**

[bodyObject] _(*)_: Any argument that can be passed to ${THREE_BACKTICKS}JSON.stringify()${THREE_BACKTICKS}. This is generally a POJO.

**Returns**

(Object): Returns an object with the single key ${THREE_BACKTICKS}body${THREE_BACKTICKS}, referencing a value of ${THREE_BACKTICKS}JSON.stringify(bodyObject)${THREE_BACKTICKS}.

**Example**

${THREE_BACKTICKS}js
body({ hello: 'world' });
// => { body: '{"hello":"world"}'  }
${THREE_BACKTICKS}

### response([objects])
${THREE_BACKTICKS}js
const response = require('${package.name}/response');
const { response } = require('${package.name}');
${THREE_BACKTICKS}

**Arguments**

[objects] _(...Object)_: A variadic arguments list of objects to merge.

**Returns**

(Object): Returns an object with all arguments merged. Essentially an immutable ${THREE_BACKTICKS}Object.assign()${THREE_BACKTICKS}.

**Example**

${THREE_BACKTICKS}js
response(statusCode(${statusCode}));
// => { statusCode: ${statusCode} };
${THREE_BACKTICKS}

### statusCode(code)
${THREE_BACKTICKS}js
const statusCode = require('${package.name}/statusCode');
const { statusCode } = require('${package.name}');
${THREE_BACKTICKS}

**Arguments**

status code _(number)_: The HTTP status code of the response.

**Returns**

(Object): Returns an object with a single key of ${THREE_BACKTICKS}statusCode${THREE_BACKTICKS} referencing the passed value.

**Example**

${THREE_BACKTICKS}js
statusCode(${statusCode});
// => { statusCode: ${statusCode} };
${THREE_BACKTICKS}

### headers([headers])
${THREE_BACKTICKS}js
const headers = require('${package.name}/headers');
const { headers } = require('${package.name}');
${THREE_BACKTICKS}

**Arguments**

[headers] _(...Object)_: A variadic arguments list of objects to collect.

**Returns**

(Object): Returns an object with a single key of ${THREE_BACKTICKS}headers${THREE_BACKTICKS} refencing a single object with all arguments merged together.

**Example**

${THREE_BACKTICKS}js
headers({ '${headerName}': ${headerValue} }, { another: 'header' });
// => {
//  headers: {
//    '${headerName}': ${headerValue},
//    another: 'header'
//  }
// };
${THREE_BACKTICKS}

### header(header, value)

${THREE_BACKTICKS}js
const header = require('${package.name}/header');
const { header } = require('${package.name}');
${THREE_BACKTICKS}

**Note**

If called with one argument, this function will return another function that accepts the missing second parameter.

**Arguments**

key _(string)_: A key to bind the value to.
value _(*)_: A value to bind against the key.

**Returns**

(Object): Returns an object with a single key of ${THREE_BACKTICKS}[key]${THREE_BACKTICKS} referencing the passed value.

**Example**

${THREE_BACKTICKS}js
header('${headerName}', '${headerValue}');
// => { '${headerName}': '${headerValue}' };

header('${headerName}')('${headerValue}');
// => { '${headerName}': '${headerValue}' };
${THREE_BACKTICKS}


### Responses

${THREE_BACKTICKS}js
const responses = require('${package.name}/responses');
${THREE_BACKTICKS}

A module of helper methods that each return a response with the associated HTTP status code.
Each method can be called with a variadic arguments list of objects that will be
merged into a single output object.

${statusCodes.map(code => (
`#### ${code.functionName}([objects])

${THREE_BACKTICKS}js
const { ${code.functionName} } = require('${package.name}/responses');
const ${code.functionName} = require('${package.name}/responses/${code.functionName}');
${THREE_BACKTICKS}

**Arguments**

[objects] (*): A variadic arguments list objects to merge into the returned object.

**Returns**

(Object): Returns an object with a key:value pair of ${THREE_BACKTICKS}statusCode: ${code.statusCode}${THREE_BACKTICKS}, with all arguments merged into the returned object.

**Example**

${THREE_BACKTICKS}js
${code.functionName}();
// => { statusCode: ${code.statusCode} };

${code.functionName}(body({ hello: 'world' }));
// => { statusCode: ${code.statusCode}, body: '{"hello":"world"}' };
${THREE_BACKTICKS}
`
)).join('\n')}
`);
