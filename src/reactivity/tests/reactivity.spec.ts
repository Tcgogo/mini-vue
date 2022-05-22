import { isProxy, isReactive, reactive } from "../reactivity";

describe("reactivity", () => {
  it("happy path", () => {
    const orginal = { foo: 1 };
    const observed = reactive(orginal);

    expect(orginal).not.toBe(observed);
    expect(observed.foo).toBe(1);
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(orginal)).toBe(false);

    expect(isProxy(orginal)).toBe(false);
    expect(isProxy(observed)).toBe(true);
  });

  test("nested reactive", () => {
    const orginal = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 2 }],
    };

    const observed = reactive(orginal);

    expect(isReactive(observed.nested)).toBe(true);
    expect(isReactive(observed.array[0])).toBe(true);
  });
});
