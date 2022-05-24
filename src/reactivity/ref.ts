import { hasChange } from "../utils";
import { isTracking, trackEffect, triggerEffect } from "./effect";

class Refmpl {
  private _value: any;
  private deps: Set<unknown>;
  constructor(value) {
    this.deps = new Set();
    this._value = value;
  }

  get value() {
    if (isTracking()) {
      trackEffect(this.deps);
      return this._value;
    }
  }

  set value(newValue) {
    if (hasChange(newValue, this._value)) {
      triggerEffect(this.deps);
      this._value = newValue;
    }
  }
}

export function ref(value) {
  return new Refmpl(value);
}
