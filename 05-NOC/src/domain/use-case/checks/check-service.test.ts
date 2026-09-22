import { CheckService } from "./check-service";

describe("check-service.ts", () => {
  const mockRepository = {
    saveLog: vitest.fn(),
    getLogs: vitest.fn(),
  };

  const successCallback = vitest.fn();
  const errorCallback = vitest.fn();

  const checkService = new CheckService(
    mockRepository,
    successCallback,
    errorCallback,
  );

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  test("should call successCallback when fetch returns true", async () => {
    const response = await checkService.execute("https://google.com");
    expect(response).toBeTruthy();
    expect(successCallback).toHaveBeenCalled();
  });

  test("should fail successCallback when fetch returns true", async () => {
    let response: boolean;

    response = await checkService.execute("https://glsfsde.com");
    expect(response).toBeFalsy();
    expect(errorCallback).toHaveBeenCalled();
  });
});
