import { CheckServiceMultiple } from "./check-service-multiple";

describe("check-service-multiple.ts", () => {
  const mockRepositories = Array(3).fill({
    saveLog: vitest.fn(),
    getLogs: vitest.fn(),
  });

  const successCallback = vitest.fn();
  const errorCallback = vitest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(
    mockRepositories,
    successCallback,
    errorCallback,
  );

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  test("should call successCallback when fetch returns true", async () => {
    const response = await checkServiceMultiple.execute("https://google.com");
    expect(response).toBeTruthy();
    expect(successCallback).toHaveBeenCalled();
  });

  test("should fail successCallback when fetch returns true", async () => {
    let response: boolean;

    response = await checkServiceMultiple.execute("https://glsfsde.com");
    expect(response).toBeFalsy();
    expect(errorCallback).toHaveBeenCalled();
  });
});
