import { render } from "./renderer";
import { createVNode } from "./vnode";

// 接收一个根节点，返回一个对象
export function createApp(roorComponent) {
  return {
    mount(rootContainer) {
      // 先转换成 vnode
      // 所有操作都基于 vnode

      const vnode = createVNode(roorComponent);

      render(vnode, rootContainer);
    },
  };
}
