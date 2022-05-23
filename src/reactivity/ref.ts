import { trackEffect, triggerEffect } from "./effect";

class Refmpl {
  private _value: any;
  private deps: Set<unknown>;
  constructor(value) {
    this.deps = new Set();
    this._value = value;
  }

  get value() {
    trackEffect(this.deps);
    return this._value;
  }

  set value(newValue) {
    triggerEffect(this.deps);
    this._value = newValue;
  }
}

export function ref(value) {
  return new Refmpl(value);
}
