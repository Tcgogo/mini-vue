import { isProxy, isReadonly, readonly } from "../reactivity";

describe("readonly", () => {
  it("happy path", () => {
    const original = {
      foo: 1,
      bar: {
        baz: 2,
      },
    };

    const wrapper = readonly(original);

    expect(wrapper).not.toBe(original);
    expect(isReadonly(wrapper.bar)).toBe(true);
    expect(wrapper.foo).toBe(1);

    expect(isProxy(wrapper)).toBe(true);
  });

  it("warn then call set", () => {
    // mock
    console.warn = jest.fn();

    const user = readonly({
      age: 10,
    });

    user.age = 11;

    expect(user.age).toBe(10);
    expect(console.warn).toBeCalled();
    expect(isReadonly(user)).toBe(true);
  });
});
