import {
  isArray,
  each,
  isFunction,
  initial,
  reduceRight,
  last,
} from 'lodash';

function compose(...middlewares) {
  each(middlewares, (middleware) => {
    if (!isFunction(middleware)) throw new TypeError("middlewares must be composed of functions!");
  });

  if (middlewares.length === 1) return last(middlewares);

  return (...args) =>
    reduceRight(initial(middlewares), (composed, f) =>
      f(composed), last(middlewares)(...args));
}

export default compose;
