import { isObject } from "../utils";
import { track, trigger } from "./effect";
import { reactive, ReactiveFlags, readonly } from "./reactivity";

// 优化：只需要初始化的时候调用一次 ceateGetter
const get = ceateGetter();
const set = ceateSetter();
const readonlyGetter = ceateGetter(true);

function ceateGetter(isReadonly = false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    }

    const value = Reflect.get(target, key);

    if (!isReadonly) {
      // 收集依赖
      track(target, key);
    }

    if (isObject(value)) {
      return isReadonly ? readonly(value) : reactive(value);
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
