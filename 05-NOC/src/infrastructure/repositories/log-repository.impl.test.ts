import { LogDataSource } from "../../domain/datasources/log.datasource.js";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../domain/entities/log.entity.js";
import { LogRepositoryImpl } from "./log-repository.impl.js";

describe("log-repository.impl.test.ts", () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  const logDataSourceMock: LogDataSource = {
    saveLog: vitest.fn(),
    getLogs: vitest.fn(),
  };

  const mockRepository = new LogRepositoryImpl(logDataSourceMock);
  test("saveLog should call the datasource with arguments", () => {
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.high,
      origin: "file-system.datasource.test.ts",
    });

    mockRepository.saveLog(log);

    expect(logDataSourceMock.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call the datasource with arguments", () => {
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.high,
      origin: "file-system.datasource.test.ts",
    });

    mockRepository.saveLog(log);
    mockRepository.getLogs(LogSeverityLevel.high);

    expect(logDataSourceMock.saveLog).toHaveBeenCalled();
    expect(logDataSourceMock.getLogs).toHaveBeenCalledWith(
      LogSeverityLevel.high,
    );
  });
});
