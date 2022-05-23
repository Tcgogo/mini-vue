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
    
  });
});
