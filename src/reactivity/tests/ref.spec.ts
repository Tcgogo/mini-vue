import { effect, isTracking } from "../effect";
import { reactive } from "../reactivity";
import { isRef, proxyRefs, ref, unRef } from "../ref";

describe("ref", () => {
  it("happy path", () => {
    const foo = ref(1);

    expect(foo.value).toBe(1);
  });

  it("should be a reactive", () => {
    const a = ref(1);
    let dummy;
    let calls = 0;

    effect(() => {
      calls++;
      dummy = a.value + 1;
    });

    expect(calls).toBe(1);
    expect(dummy).toBe(2);

    a.value = 3;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
    a.value = 3;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
  });

  it("should make nested properties reactive", () => {
    const a = ref({
      b: 1,
    });

    let dummy;
    effect(() => {
      dummy = a.value.b + 1;
    });

    a.value.b = 2;
    expect(dummy).toBe(3);
  });

  it("isRef", () => {
    const a = ref(1);
    const user = reactive({
      c: 1,
    });

    expect(isRef(a)).toBe(true);
    expect(isRef(user)).toBe(false);
    expect(isRef(1)).toBe(false);
  });

  it("unRef", () => {
    const a = ref(1);

    expect(unRef(a)).toBe(1);
    expect(unRef(1)).toBe(1);
  });

  it("proxyRef", () => {
    const user = {
      age: ref(1),
    };

    const newUser = proxyRefs(user);

    expect(user.age.value).toBe(1);
    expect(newUser.age).toBe(1);

    newUser.age = ref(10);
    expect(newUser.age).toBe(10);
    expect(user.age.value).toBe(10);

    newUser.age = 20;
    expect(newUser.age).toBe(20);
    expect(user.age.value).toBe(20);
  });
});
