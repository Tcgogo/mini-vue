import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

export function reactive(row) {
  return ceateActiveObject(row, mutableHandlers);
}

export function readonly(row) {
  return ceateActiveObject(row, readonlyHandlers);
}

function ceateActiveObject(row, baseHandlers) {
  return new Proxy(row, baseHandlers);
}
