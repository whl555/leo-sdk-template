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
    packageManager: 'npm',
    templateType: 'ts-lib'
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
    mockFs.ensureDir.mockImplementation(async () => {});
    mockFs.copy.mockImplementation(async () => {});
    mockFs.pathExists.mockImplementation(async () => true);
    mockFs.readFile.mockImplementation(async () => 'test content');
    mockFs.writeFile.mockImplementation(async () => {});
    mockFs.move.mockImplementation(async () => {});
  });

  it('should generate project with default options', async () => {
    const options = { defaults: true };
    
    await generateProject(testProjectName, options);
    
    expect(mockFs.ensureDir).toHaveBeenCalledWith(testProjectPath);
    expect(mockFs.copy).toHaveBeenCalledWith(
      expect.stringContaining(path.join('template', 'ts-lib')),
      testProjectPath,
      expect.objectContaining({
        filter: expect.any(Function)
      })
    );

    expect(mockFs.move).toHaveBeenCalledWith(
      expect.stringContaining('_gitignore'),
      expect.stringContaining('.gitignore'),
      expect.objectContaining({ overwrite: true })
    );
  });

  it('should handle project generation errors', async () => {
    mockFs.ensureDir.mockImplementationOnce(async () => {
      throw new Error('Permission denied');
    });
    
    await expect(generateProject(testProjectName, {}))
      .rejects.toThrow('Permission denied');
  });

  it('should copy example files when withExamples is true', async () => {
    const options = { 
      defaults: true, 
      withExamples: true 
    };

    mockFs.pathExists.mockImplementation(async (targetPath) => {
      if (targetPath.includes('examples')) {
        return false;
      }
      return true;
    });
    
    await generateProject(testProjectName, options);
    
    expect(mockFs.copy).not.toHaveBeenCalledWith(
      expect.stringContaining('examples'),
      expect.any(String)
    );
  });

  it('should copy CI files when withCI is true', async () => {
    const options = { 
      defaults: true, 
      withCI: true 
    };

    mockFs.pathExists.mockImplementation(async (targetPath) => {
      if (targetPath.includes('ci')) {
        return false;
      }
      return true;
    });
    
    await generateProject(testProjectName, options);
    
    expect(mockFs.copy).not.toHaveBeenCalledWith(
      expect.stringContaining('ci'),
      expect.any(String)
    );
  });

  it('should honour templateType overrides', async () => {
    const options = {
      defaults: true,
      templateType: 'react-lib' as const
    };

    await generateProject(testProjectName, options);

    expect(mockFs.copy).toHaveBeenCalledWith(
      expect.stringContaining(path.join('template', 'react-lib')),
      testProjectPath,
      expect.objectContaining({
        filter: expect.any(Function)
      })
    );
  });
});
