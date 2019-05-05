const _curry = fn => (...args) => (
  args.length < fn.length
  ? _curry(args.reduce((memo, arg) => memo.bind(null, arg), fn))
  : fn(...args)
);

module.exports = _curry;
