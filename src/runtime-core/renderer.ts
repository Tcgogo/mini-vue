import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode, container) {
  // 处理组件
  proccessComponent(vnode, container);
}
function proccessComponent(vnode: any, container) {
  mountComponent(vnode, container);
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);
  setupRenderEffect(instance, container);
}
function setupRenderEffect(instance: any, container) {
  const subTree = instance.render();

  // vode => pathc
  // vnode => element =>

  patch(subTree, container);
}
