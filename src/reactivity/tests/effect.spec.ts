import { effect } from "../effect";
import { reactive } from "../reactivity";

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 1,
    });

    let currentAge;
    effect(() => {
      currentAge = user.age + 1;
    });

    expect(currentAge).toBe(2);

    user.age++;
    expect(currentAge).toBe(3);
  });
});
