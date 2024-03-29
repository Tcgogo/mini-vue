const publicPropertierMap = {
  $el: (i) => i.vnode.el
}


export const PublicInstanceProxyHandlers = {
  get: ({ _: instance }, key) => {
    const { setupState } = instance
    if (key in setupState) {
      return setupState[key]
    }

    const pubilcGetter = publicPropertierMap[key];

    if (pubilcGetter) {
      return pubilcGetter(instance)
    }
  }
}