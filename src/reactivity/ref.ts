import { hasChange, isObject } from "../utils";
import { isTracking, trackEffect, triggerEffect } from "./effect";
import { reactive } from "./reactivity";

class Refmpl {
  private _value: any;
  private deps: Set<unknown>;
  private _rawValue: any;
  private __is_ref = true;
  constructor(value) {
    this.deps = new Set();
    this._rawValue = value;
    this._value = isObject(value) ? reactive(value) : value;
  }

  get value() {
    trackEffect(this.deps);
    return this._value;
  }

  set value(newValue) {
    // 判断值是否有改变，改变才触发依赖。
    if (hasChange(newValue, this._rawValue)) {
      triggerEffect(this.deps);
      this._rawValue = newValue;
      this._value = isObject(newValue) ? reactive(newValue) : newValue;
    }
  }
}

export function isRef(raw) {
  return !!raw.__is_ref;
}

export function unRef(raw) {
  return isRef(raw) ? raw.value : raw;
}

export function ref(value) {
  return new Refmpl(value);
}
