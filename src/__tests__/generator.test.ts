import * as fs from 'fs-extra';
import * as path from 'path';
import { generateProject } from '../generator';

// Mock dependencies
jest.mock('fs-extra');
jest.mock('prompts', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({
    sdkName: 'TestSDK',
    org: 'test-org',
    author: 'Test Author',
    description: 'Test SDK',
    withExamples: false,
    withCI: false,
    packageManager: 'npm'
  }))
}));
jest.mock('ora', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    start: jest.fn().mockReturnThis(),
    succeed: jest.fn().mockReturnThis(),
    fail: jest.fn().mockReturnThis()
  }))
}));
jest.mock('chalk', () => ({
  blue: jest.fn((str) => str),
  green: jest.fn((str) => str),
  yellow: jest.fn((str) => str),
  red: jest.fn((str) => str),
  cyan: jest.fn((str) => str),
  white: jest.fn((str) => str)
}));
jest.mock('child_process', () => ({
  spawn: jest.fn(() => ({
    on: jest.fn((event, callback) => {
      if (event === 'close') {
        setTimeout(() => callback(0), 10);
      }
    })
  }))
}));

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Generator', () => {
  const testProjectName = 'test-sdk';
  const testProjectPath = path.resolve(process.cwd(), testProjectName);

  beforeEach(() => {
    jest.clearAllMocks();
    mockFs.ensureDir.mockResolvedValue();
    mockFs.copy.mockResolvedValue();
    mockFs.pathExists.mockResolvedValue(true);
    mockFs.readFile.mockResolvedValue('test content');
    mockFs.writeFile.mockResolvedValue();
  });

  it('should generate project with default options', async () => {
    const options = { defaults: true };
    
    await generateProject(testProjectName, options);
    
    expect(mockFs.ensureDir).toHaveBeenCalledWith(testProjectPath);
    expect(mockFs.copy).toHaveBeenCalled();
  });

  it('should handle project generation errors', async () => {
    mockFs.ensureDir.mockRejectedValue(new Error('Permission denied'));
    
    await expect(generateProject(testProjectName, {}))
      .rejects.toThrow('Permission denied');
  });

  it('should copy example files when withExamples is true', async () => {
    const options = { 
      defaults: true, 
      withExamples: true 
    };
    
    await generateProject(testProjectName, options);
    
    expect(mockFs.copy).toHaveBeenCalledWith(
      expect.stringContaining('examples'),
      expect.stringContaining('example')
    );
  });

  it('should copy CI files when withCI is true', async () => {
    const options = { 
      defaults: true, 
      withCI: true 
    };
    
    await generateProject(testProjectName, options);
    
    expect(mockFs.copy).toHaveBeenCalledWith(
      expect.stringContaining('ci'),
      expect.stringContaining('.github')
    );
  });
});
