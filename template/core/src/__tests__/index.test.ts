import { <%= sdkName %> } from '../index';

describe('<%= sdkName %>', () => {
  let sdk: <%= sdkName %>;
  
  beforeEach(() => {
    sdk = new <%= sdkName %>({
      baseUrl: 'https://test-api.example.com',
      apiKey: 'test-key',
      debug: true
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should initialize with default options', () => {
    const defaultSdk = new <%= sdkName %>();
    const config = defaultSdk.getConfig();
    
    expect(config.baseUrl).toBe('https://api.example.com');
    expect(config.timeout).toBe(5000);
    expect(config.debug).toBe(false);
  });
  
  it('should initialize with custom options', () => {
    const config = sdk.getConfig();
    
    expect(config.baseUrl).toBe('https://test-api.example.com');
    expect(config.apiKey).toBe('test-key');
    expect(config.debug).toBe(true);
  });
  
  it('should update configuration', () => {
    sdk.updateConfig({ timeout: 10000 });
    const config = sdk.getConfig();
    
    expect(config.timeout).toBe(10000);
    expect(config.baseUrl).toBe('https://test-api.example.com'); // Should remain unchanged
  });
  
  // Add more tests for your specific SDK methods
});
