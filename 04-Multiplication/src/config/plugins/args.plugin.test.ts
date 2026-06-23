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

  test("should throw error if base isNaN", async () => {
    const helpText = `Options:
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -b, --base         Take the base to return the determinate multiplication tabl
                     e                                       [number] [required]
  -s, --show         Returns the multiplication table in console
                                                      [boolean] [default: false]
  -l, --limit        Returns many multiplication tables   [number] [default: 10]
  -n, --name         Give a name to the returned table    [string] [default: ""]
  -d, --destination  File destination              [string] [default: "outputs"]

The base must be a number`;
    try {
      const argv = await runCommand([
        "-b",
        "an",
        "-s",
        "-l",
        "20",
        "-n",
        "custom-table-name",
        "-d",
        "custom-destination",
      ]);
      expect(
        await runCommand([
          "-b",
          "an",
          "-s",
          "-l",
          "20",
          "-n",
          "custom-table-name",
          "-d",
          "custom-destination",
        ]),
      ).toHaveResolvedWith(helpText);
      expect(
        await runCommand([
          "-b",
          "as",
          "-s",
          "-l",
          "20",
          "-n",
          "custom-table-name",
          "-d",
          "custom-destination",
        ]),
      ).toHaveLastResolvedWith("The base must be a number");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual(
          'process.exit unexpectedly called with "1"',
        );
      }
    }
  });
});
