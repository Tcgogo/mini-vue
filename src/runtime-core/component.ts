export function createComponentInstance(vnode: any) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    proxy: {},
    el: {}
  };

  return component;
}

export function setupComponent(instance) {
  // initProps();
  // initSlots();

  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  // 用户传进来的配置项
  const Component = instance.type;

  const { setup } = Component;

  if (setup) {
    // 调用setup
    const setupResult = setup();

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  // 如果是对象，就赋值到实例上
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}
function finishComponentSetup(instance: any) {
  const Component = instance.type;

  if (Component.render) {
    instance.render = Component.render;
  }
}
