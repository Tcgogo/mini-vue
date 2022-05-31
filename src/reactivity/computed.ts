import { ReactiveEffect } from "./effect";

class ComputedRefImpl {
  private _getter: any;

  // 缓存
  private _dirty = true;
  private _value: any;
  private _effect: any;

  constructor(getter) {
    this._getter = getter;
  }

  get value() {
    // 利用 scheduler ，避免重复触发getter，且依赖的值发生变化时，改变缓存状态
    this._effect = new ReactiveEffect(this._getter, () => {
      this._dirty = true;
    });

    if (this._dirty) {
      this._dirty = false;
      this._value = this._effect.run();
    }

    return this._value;
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter);
}
