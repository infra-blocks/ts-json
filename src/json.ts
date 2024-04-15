import { Json } from "./types.js";

type Reviver = (this: any, key: string, value: Json) => any;

/**
 * A thin wrapper over JSON.parse.
 *
 * The goal is to have a typed return for most use cases that isn't `any`. To keep things simple, the `reviver`
 * parameter is not supported.
 *
 * @param text - The text to parse.
 */
export function parse(text: string): Json;
export function parse(text: string, reviver: Reviver): any;
export function parse(text: string, reviver?: Reviver): any {
  return JSON.parse(text, reviver);
}

/**
 * A thin wrapper over JSON.stringify.
 *
 * Unlike {@link parse}, this functions has the same interface as its JSON counterpart. This is because JSON.stringify
 * supports more than just plain Json objects. It tolerates pretty much anything as its input.
 *
 * This function is merely provided to have a homologous interface as JSON.
 */
export const stringify = JSON.stringify;
