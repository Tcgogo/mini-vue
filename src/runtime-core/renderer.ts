import { ShapeFlags } from "../shared/shapeFlags";
import { isObject } from "../utils";
import { createComponentInstance, setupComponent } from "./component";
import { PublicInstanceProxyHandlers } from "./componentsPulicInstance";

export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode, container) {
  console.log('%c [ vnode ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', vnode)
  // 如何区分 element 类型和 components类型

  if (vnode.shapeFlags & ShapeFlags.ELEMENT) {
    // 处理 element
    proccessElement(vnode, container)
  } else if (vnode.shapeFlags & ShapeFlags.STATEFUL_COMPONENT) {
    // 处理组件
    proccessComponent(vnode, container);
  }
}


function proccessElement(vnode, container) {
  const { type, props } = vnode
  const el = (vnode.el = document.createElement(type))

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
  if (vnode.shapeFlags & ShapeFlags.TEXT_CHILDREN) {
    container.textContent = children
  } else if (vnode.shapeFlags & ShapeFlags.ARRAY_CHILDREN) {
    // vnode
    children.forEach((item) => patch(item, container))
  }
}

function proccessComponent(vnode: any, container) {
  // 挂载组件
  mountComponent(vnode, container);
}

function mountComponent(initialVNode, container) {
  // 创建组件实例
  const instance = createComponentInstance(initialVNode);

  // 代理 instance
  instance.proxy = new Proxy({
    _: instance
  }, PublicInstanceProxyHandlers)

  // 初始化组件，props、slots 等
  setupComponent(instance);

  // 初始化render
  setupRenderEffect(instance, container, initialVNode);
}
function setupRenderEffect(instance: any, container, initialVNode) {


  const { proxy } = instance

  // 把代理绑定到 render this 上, 通过 this 可以访问 setupStatus 上的属性
  const subTree = instance.render.call(proxy);

  // vode => patch
  // vnode => element => mountElement

  patch(subTree, container);

  initialVNode.el = subTree.el
}
