import { beforeEach, describe, expect, test, vitest } from "vitest";

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("./args.plugin");
  return yarg;
};

describe("Test args.plugin.ts", () => {
  const originalArgv = process.argv;
  beforeEach(() => {
    vitest.resetModules();
    process.argv = [...originalArgv];
  });

  test("should return default values", async () => {
    const argv = await runCommand(["-b", "5"]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        s: false,
        l: 10,
        n: "table-5",
        d: "outputs",
      }),
    );
  });

  test("should return custom values", async () => {
    const argv = await runCommand([
      "-b",
      "3",
      "-s",
      "-l",
      "20",
      "-n",
      "custom-table-name",
      "-d",
      "custom-destination",
    ]);

    console.log(argv);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 3,
        s: true,
        l: 20,
        n: "custom-table-name",
        d: "custom-destination",
      }),
    );
  });
});
