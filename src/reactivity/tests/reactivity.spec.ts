import { reactive } from "../reactivity";

describe("reactivity", () => {
  it("happy path", () => {
    const orginal = { foo: 1 };
    const observed = reactive(orginal);

    expect(orginal).not.toBe(observed);
    expect(observed.foo).toBe(1);
  });
});
