export class Result<T> {
  isError: boolean;
  error: string | null;
  private value: T | null;

  constructor(isError: boolean, error: string | null, value?: T) {
    if (!isError && error) {
      throw new Error("Invalid Operation: A result can't be success and contain an error");
    }
    if (isError && !error) {
      throw new Error('Invalid Operation: A failed result needs to contain an error message');
    }

    this.isError = isError;
    this.error = error;
    this.value = value || null;
  }

  getValue(): T {
    if (this.isError) {
      throw new Error('');
    }

    return this.value as T;
  }

  getError(): string {
    if (!this.isError) {
      throw new Error('');
    }
    return this.error as string;
  }

  static success<U>(value: U): Result<U> {
    return new Result<U>(false, null, value);
  }

  static fail<U>(error: string): Result<U> {
    return new Result<U>(true, error);
  }

  public static combine(results: Result<unknown>[]): Result<unknown> {
    for (const result of results) {
      if (result.isError) return result;
    }
    return Result.success<unknown>(null);
  }
}
