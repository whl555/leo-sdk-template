export interface SdkOptions {
  endpoint?: string;
}

const DEFAULT_LABEL = '<%= sdkName %>';

export class SdkClient {
  constructor(private readonly options: SdkOptions = {}) {}

  get endpoint(): string {
    return this.options.endpoint ?? 'https://api.example.com';
  }

  ping(): string {
    return `${DEFAULT_LABEL} → ${this.endpoint}`;
  }
}

export function createClient(options?: SdkOptions): SdkClient {
  return new SdkClient(options);
}

