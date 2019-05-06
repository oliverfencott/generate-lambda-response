module.exports = (...fns) => fns.reverse().reduce((memo, curr) => (...args) => memo(curr(...args)));
