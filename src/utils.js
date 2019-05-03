const curry = fn => (...args) => (
  args.length < fn.length
  ? curry(args.reduce((memo, arg) => memo.bind(null, arg), fn))
  : fn(...args)
);

const compose = (...fns) => fns.reverse().reduce((memo, current) => (...args) => memo(current(...args)));
const recursiveMerge = (...args) => Object.assign({}, ...args);
const hoistedMerge = object => (...args) => recursiveMerge(object, ...args);
const createKeyedObject = curry((key, value) => ({ [key]: value }));

module.exports = {
  curry,
  compose,
  recursiveMerge,
  hoistedMerge,
  createKeyedObject
};
