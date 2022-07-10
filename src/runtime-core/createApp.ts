import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(roorComponent) {
  return {
    mount(rootContainer) {
      // 先 vnode
      // 所有操作都基于 vnode

      const vnode = createVNode(rootContainer);

      render(vnode, roorComponent);
    },
  };
}
