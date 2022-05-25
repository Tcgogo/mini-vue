import { effect } from "../effect";
import { ref } from "../ref";

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
});
