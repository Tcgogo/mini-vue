import { isObject } from "../utils";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode, container) {
  console.log('%c [ vnode ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', vnode)
  // 如何区分 element 类型和 components类型

  if (typeof vnode.type === 'string') {
    // 处理 element
    proccessElement(vnode, container)
  } else if (isObject(vnode)) {
    // 处理组件
    proccessComponent(vnode, container);
  }
}


function proccessElement(vnode, container) {
  const { type, props } = vnode
  const el = document.createElement(type)
  console.log('%c [ el ]-24', 'font-size:13px; background:pink; color:#bf2c9f;', el)

  // props
  for (let p in props) {
    el.setAttribute(p, props[p])
  }

  // children
  mountChildren(vnode, el)

  container.append(el)
}

// 处理 children
function mountChildren(vnode, container) {
  const { children } = vnode
  if (typeof children === 'string') {
    container.textContent = children
  } else if (Array.isArray(children)) {
    // vnode
    children.forEach((item) => patch(item, container))
  }
}

function proccessComponent(vnode: any, container) {
  // 挂载组件
  mountComponent(vnode, container);
}

function mountComponent(vnode, container) {
  // 创建组件实例
  const instance = createComponentInstance(vnode);

  // 初始化组件，props、slots 等
  setupComponent(instance);

  // 初始化render
  setupRenderEffect(instance, container);
}
function setupRenderEffect(instance: any, container) {
  const subTree = instance.render();

  // vode => patch
  // vnode => element => mountElement

  patch(subTree, container);
}
