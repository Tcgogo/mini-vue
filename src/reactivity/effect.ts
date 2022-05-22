import { extend } from "../utils";

// activeEffect 存储当前依赖的 ReactiveEffect 的实例
let activeEffect;
// shouldTrack 是否应该收集依赖
let shouldTrack;
class ReactiveEffect {
  private _fn: any;

  /**
   * 通过 effect 的第二个参数，给定一个 scheduler 函数，
   * effect第一次执行的时候还是会执行 fn
   * 当响应式数据触发 set 时，不回执行 fn，而是执行 scheduler
   * 当执行 effect 的返回值 runner 时， 会执行 fn
   */
  private scheduler: any;

  private onStop: any;

  // 存储当前 stop 的状态
  active = true;

  // 存储当前 effect 对应的 deps
  deps = [];

  constructor(fn, scheduler?) {
    this._fn = fn;
    this.scheduler = scheduler;
  }

  run() {
    if (!this.active) {
      return this._fn();
    }

    activeEffect = this;
    shouldTrack = true;

    const result = this._fn();

    // reset
    shouldTrack = false;

    return result;
  }

  stop(effect) {
    if (this.active) {
      cleanUpEffect(effect);
      this.active = false;
    }

    if (this.onStop) {
      this.onStop();
    }
  }
}

/** 清除当前 effect 的依赖 */
function cleanUpEffect(effect) {
  effect.deps.forEach((dep) => {
    // 删除当前 effect 的依赖
    dep.delete(effect);
  });

  effect.deps.length = 0;
}

// 以这个对象为 key， targetsMap 存储所有的响应式对象
let targetsMap = new Map();

/** 收集依赖 */
export function track(target, key) {
  // 当没有调用 effect 时，activeEffect 为 null
  if (!isTracking()) return;

  let targetMap = targetsMap.get(target);

  if (!targetMap) {
    // 每个 target 又是一个 Map结构， 存储该对象的所有 key 的依赖
    targetMap = new Map();
    targetsMap.set(target, targetMap);
  }

  let deps = targetMap.get(key);

  if (!deps) {
    // deps 存储这该 key 对应的依赖
    deps = new Set();
    targetMap.set(key, deps);
  }

  // 避免重复收集
  if (deps.has(activeEffect)) return;

  // 存储当前依赖的 ReactiveEffect 的实例
  deps.add(activeEffect);

  // 反向存到 reactiveEffect 的 deps 属性中, 用于在 stop 时候清除
  activeEffect.deps.push(deps);
}

function isTracking() {
  return activeEffect && shouldTrack;
}

/** 触发依赖 */
export function trigger(target, key) {
  const targetMap = targetsMap.get(target);
  const deps = targetMap.get(key);

  for (let dep of deps) {
    if (dep.scheduler) {
      dep.scheduler();
    } else {
      dep.run();
    }
  }
}

/** 停止触发依赖 */
export function stop(runner) {
  activeEffect.stop(runner._effect);
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);

  _effect.run();

  // 将 options 挂载到 effect 实例上
  extend(_effect, options);

  const runner: any = _effect.run.bind(_effect);
  // 把当前的 effect 挂载到 runner 上，使得每个 runner 都能找到对应的 effect
  runner._effect = _effect;

  return runner;
}
