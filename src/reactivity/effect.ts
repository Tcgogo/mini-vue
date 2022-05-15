class ReactiveEffect {
  private _fn: any;

  constructor(fn) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    this._fn();
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
    dep.run();
  }
}

// activeEffect 存储当前依赖的 ReactiveEffect 的实例
let activeEffect;
export function effect(fn) {
  const _effect = new ReactiveEffect(fn);

  _effect.run();
}
