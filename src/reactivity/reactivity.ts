import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}

export function reactive(row) {
  return ceateActiveObject(row, mutableHandlers);
}

export function readonly(row) {
  return ceateActiveObject(row, readonlyHandlers);
}

export function isReactive(row) {
  return row[ReactiveFlags.IS_REACTIVE];
}

function ceateActiveObject(row, baseHandlers) {
  return new Proxy(row, baseHandlers);
}
