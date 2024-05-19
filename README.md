# ts-json
[![Build](https://github.com/infra-blocks/ts-json/actions/workflows/build.yml/badge.svg)](https://github.com/infra-blocks/ts-json/actions/workflows/build.yml)
[![Release](https://github.com/infra-blocks/ts-json/actions/workflows/release.yml/badge.svg)](https://github.com/infra-blocks/ts-json/actions/workflows/release.yml)
[![Update From Template](https://github.com/infra-blocks/ts-json/actions/workflows/update-from-template.yml/badge.svg)](https://github.com/infra-blocks/ts-json/actions/workflows/update-from-template.yml)
[![codecov](https://codecov.io/gh/infra-blocks/ts-json/graph/badge.svg?token=vyI1qM1EZg)](https://codecov.io/gh/infra-blocks/ts-json)

JSON related utilities package. It offers thin wrappers over `JSON.parse` and `JSON.stringifiy` and convenient types.

```typescript
import { Json, JsonObject, JsonArray, JsonPrimitive, json } from "@infra-blocks/json";

// Convenient types can be used anywhere useful.
const validJson: Json = { key: "value" };
// @ts-expect-error
const invalidJson: Json = { "undefined is not json": undefined };

// The module offers a thin wrapper that returns a type Json value when parse is used without revivers.
const result: Json = json.parse('"finally, JSON.parse does not return any anymore"');
// Type of anyResult is any, since we used a reviver.
const anyResult = json.parse('{"key": "value"}', () => { /* Insert code here */ });
// The module also offers a stringify function, although it is exactly the same as JSON.stringify. It's mostly
// for completeness.
const stringified = json.stringify(new Map()); // Tolerates non Json typed object, just like the original function.
```
