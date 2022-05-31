import { computed } from "../computed";
import { reactive } from "../reactivity";

describe("computed", () => {
  it("happy path", () => {
    const user = reactive({
      age: 1,
    });

    const age = computed(() => {
      return user.age + 1;
    });

    expect(age.value).toBe(2);
  });

  it("should compute lazily", () => {
    const value = reactive({
      foo: 1,
    });

    const getter = jest.fn(() => {
      return value.foo;
    });

    const cValue = computed(getter);

    // 创建时不会调用
    expect(getter).not.toHaveBeenCalled();

    // 读取时触发一次
    expect(cValue.value).toBe(1);
    expect(getter).toHaveBeenCalledTimes(1);

    // 如果依赖的响应式值没有改变，读取缓存
    cValue.value;
    expect(getter).toHaveBeenCalledTimes(1);

    value.foo = 2;
    expect(getter).toHaveBeenCalledTimes(1);

    expect(cValue.value).toBe(2);
    expect(getter).toHaveBeenCalledTimes(2);

    cValue.value;
    expect(getter).toHaveBeenCalledTimes(2);
  });
});
