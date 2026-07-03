interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(
          `Error on service ${url}: ${req.status} - ${req.statusText}`,
        );
      }
      console.log(`Service ${url} is up and running`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error checking service ${url}: ${error.message}`);
      }
      return false; // Return false if the error is not an instance of Error
    }
    // Implementation for checking the URL
    return true; // Placeholder return value
  }
}
