import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

export function reactive(row) {
  return ceateActiveObject(row, mutableHandlers);
}

export function readonly(row) {
  return ceateActiveObject(row, readonlyHandlers);
}

export function shallowReadonly(row) {
  return ceateActiveObject(row, shallowReadonlyHandlers);
}

export function isReactive(row) {
  return !!row[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(row) {
  return !!row[ReactiveFlags.IS_READONLY];
}

function ceateActiveObject(row, baseHandlers) {
  return new Proxy(row, baseHandlers);
}
