import { isReadonly, shallowReadonly } from "../reactivity";

describe("shallowReadonly", () => {
  it("happy path", () => {
    const original = {
      foo: 1,
      bar: {
        baz: 2,
      },
    };

    const wrapper = shallowReadonly(original);

    expect(wrapper).not.toBe(original);
    expect(isReadonly(wrapper.bar)).toBe(false);
    expect(wrapper.foo).toBe(1);
  });
});
