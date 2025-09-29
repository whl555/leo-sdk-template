/**
 * Configuration options for <%= sdkName %>
 */
export interface <%= sdkName %>Options {
  /**
   * API base URL
   */
  baseUrl?: string;
  
  /**
   * API key for authentication
   */
  apiKey?: string;
  
  /**
   * Timeout in milliseconds
   */
  timeout?: number;
  
  /**
   * Enable debug mode
   */
  debug?: boolean;
}

/**
 * Response wrapper interface
 */
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  code?: number;
}

/**
 * Error response interface
 */
export interface ApiError {
  message: string;
  code: number;
  details?: any;
}

/**
 * Base result interface
 */
export interface BaseResult {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
