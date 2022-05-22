import { effect, stop } from "../effect";
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

  it("should return runner  when call effect", () => {
    let foo = 10;
    let runner = effect(() => {
      foo++;
      return "foo";
    });

    expect(foo).toBe(11);

    const r = runner();

    expect(foo).toBe(12);
    expect(r).toBe("foo");
  });

  it("scheduler", () => {
    let dummy: any;
    let run: any;

    const scheduler = jest.fn(() => {
      run = runner;
    });

    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      {
        scheduler,
      }
    );

    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    obj.foo++;
  });

  it("stop", () => {
    let dummy: any;
    const obj = reactive({ foo: 1 });

    const runner = effect(() => {
      dummy = obj.foo + 1;
    });

    stop(runner);
    // obj.foo = 2;
    obj.foo++;
    expect(dummy).toBe(2);
  });

  it("onStop", () => {
    let dummy: any;
    const obj = reactive({ foo: 1 });
    const onStop = jest.fn();

    const runner = effect(
      () => {
        dummy = obj.foo + 1;
      },
      {
        onStop,
      }
    );
    stop(runner);
    expect(onStop).toBeCalledTimes(1);
  });
});
