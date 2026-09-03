import { describe, expect, test } from "vitest";
import { envs } from "./envs.plugin";

describe("envs.plugin.ts", () => {
  test("should return env options", () => {
    console.debug(envs);
    expect(envs.PRO).toBe(false);
  });
});
