import { <%= sdkName %>Options, ApiResponse, ApiError } from '../types';

/**
 * Main SDK class for <%= sdkName %>
 */
export class <%= sdkName %> {
  private options: Required<<%= sdkName %>Options>;
  
  constructor(options: <%= sdkName %>Options = {}) {
    this.options = {
      baseUrl: 'https://api.example.com',
      apiKey: '',
      timeout: 5000,
      debug: false,
      ...options
    };
    
    if (this.options.debug) {
      console.log('<%= sdkName %> initialized with options:', this.options);
    }
  }
  
  /**
   * Get configuration options
   */
  getConfig(): Required<<%= sdkName %>Options> {
    return { ...this.options };
  }
  
  /**
   * Update configuration options
   */
  updateConfig(newOptions: Partial<<%= sdkName %>Options>): void {
    this.options = { ...this.options, ...newOptions };
  }
  
  /**
   * Make HTTP request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.options.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.options.apiKey && { 'Authorization': `Bearer ${this.options.apiKey}` }),
      ...options.headers
    };
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.options.timeout);
      
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        data,
        success: true
      };
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: 0
      };
      
      if (this.options.debug) {
        console.error('<%= sdkName %> request error:', apiError);
      }
      
      throw apiError;
    }
  }
  
  /**
   * Example method - replace with your actual SDK methods
   */
  async getData(id: string): Promise<any> {
    return this.request(`/data/${id}`);
  }
  
  /**
   * Example method - replace with your actual SDK methods
   */
  async createData(data: any): Promise<any> {
    return this.request('/data', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

export default <%= sdkName %>;

