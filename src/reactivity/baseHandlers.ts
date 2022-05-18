import { track, trigger } from "./effect";
import { ReactiveFlags } from "./reactivity";

// 优化：只需要初始化的时候调用一次 ceateGetter
const get = ceateGetter();
const set = ceateSetter();
const readonlyGetter = ceateGetter(true);

function ceateGetter(isReadonly = false) {
  return function get(target, key) {
    const value = Reflect.get(target, key);

    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    }

    if (!isReadonly) {
      // 收集依赖
      track(target, key);
    }

    return value;
  };
}

function ceateSetter() {
  return function get(target, key, value) {
    const res = Reflect.set(target, key, value);

    // 触发依赖
    trigger(target, key);

    return res;
  };
}

export const mutableHandlers = {
  get,
  set,
};

export const readonlyHandlers = {
  get: readonlyGetter,

  set: (target, key, value) => {
    console.warn(`${target} is readonly， key:${key} set fail`, target);
    return true;
  },
};
