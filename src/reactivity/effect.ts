class ReactiveEffect {
  private _fn: any;

  /** 
   * 通过 effect 的第二个参数，给定一个 scheduler 函数，
   * effect第一次执行的时候还是会执行 fn
   * 当响应式数据触发 set 时，不回执行 fn，而是执行 scheduler
   * 当执行 effect 的返回值 runner 时， 会执行 fn
   */
  private scheduler: any;

  constructor(fn, scheduler?) {
    this._fn = fn;
    this.scheduler = scheduler
  }

  run() {
    activeEffect = this;
     
    return this._fn();
  }
}

// 以这个对象为 key， targetsMap 存储所有的响应式对象
let targetsMap = new Map();

/** 收集依赖 */
export function track(target, key) {
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

  // 存储当前依赖的 ReactiveEffect 的实例
  deps.add(activeEffect);
}

/** 触发依赖 */
export function trigger(target, key) {
  const targetMap = targetsMap.get(target);
  const deps = targetMap.get(key);

  for (let dep of deps) {
    if(dep.scheduler) {
      dep.scheduler();
    } else { 
      dep.run();
    }
  }
}

// activeEffect 存储当前依赖的 ReactiveEffect 的实例
let activeEffect;
export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);

  _effect.run();

  return  _effect.run.bind(_effect)
}
