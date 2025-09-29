import * as fs from 'fs-extra';
import * as path from 'path';
import * as ejs from 'ejs';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';

interface ProjectConfig {
  projectName: string;
  sdkName: string;
  org: string;
  author: string;
  description: string;
  withExamples: boolean;
  withCI: boolean;
  packageManager: 'npm' | 'pnpm' | 'yarn';
}

export async function generateProject(projectName: string, options: any): Promise<void> {
  const config = await collectConfig(projectName, options);
  const spinner = ora('Generating project files...').start();

  try {
    // Create project directory
    const projectPath = path.resolve(process.cwd(), config.projectName);
    await fs.ensureDir(projectPath);

    // Copy and process template files
    await copyTemplateFiles(config, projectPath);
    
    // Process template variables
    await processTemplateVariables(config, projectPath);

    // Initialize git repository
    await initGitRepository(projectPath);

    spinner.succeed('Project generated successfully!');
    
    console.log(chalk.green('\n🎉 Your SDK project is ready!'));
    console.log(chalk.cyan('\nNext steps:'));
    console.log(chalk.white(`  cd ${config.projectName}`));
    console.log(chalk.white(`  ${config.packageManager} install`));
    console.log(chalk.white(`  ${config.packageManager} run dev`));
    
  } catch (error) {
    spinner.fail('Failed to generate project');
    throw error;
  }
}

async function collectConfig(projectName: string, options: any): Promise<ProjectConfig> {
  if (options.defaults) {
    return {
      projectName,
      sdkName: projectName,
      org: options.org || 'my-org',
      author: options.author || 'Developer',
      description: `${projectName} SDK`,
      withExamples: options.withExamples || false,
      withCI: options.withCI || false,
      packageManager: 'npm'
    };
  }

  const questions = [
    {
      type: 'text' as const,
      name: 'sdkName',
      message: 'SDK name:',
      initial: projectName
    },
    {
      type: 'text' as const,
      name: 'org',
      message: 'Organization name:',
      initial: options.org || 'my-org'
    },
    {
      type: 'text' as const,
      name: 'author',
      message: 'Author name:',
      initial: options.author || 'Developer'
    },
    {
      type: 'text' as const,
      name: 'description',
      message: 'Description:',
      initial: `${projectName} SDK`
    },
    {
      type: 'confirm' as const,
      name: 'withExamples',
      message: 'Include example components?',
      initial: options.withExamples || false
    },
    {
      type: 'confirm' as const,
      name: 'withCI',
      message: 'Include CI/CD configuration?',
      initial: options.withCI || false
    },
    {
      type: 'select' as const,
      name: 'packageManager',
      message: 'Package manager:',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'pnpm', value: 'pnpm' },
        { title: 'yarn', value: 'yarn' }
      ],
      initial: 0
    }
  ];

  const answers = await prompts(questions);
  
  return {
    projectName,
    sdkName: answers.sdkName || projectName,
    org: answers.org || 'my-org',
    author: answers.author || 'Developer',
    description: answers.description || `${projectName} SDK`,
    withExamples: answers.withExamples || false,
    withCI: answers.withCI || false,
    packageManager: answers.packageManager || 'npm'
  };
}

async function copyTemplateFiles(config: ProjectConfig, projectPath: string): Promise<void> {
  const templatePath = path.join(__dirname, '../template');
  
  // Copy core files
  await fs.copy(path.join(templatePath, 'core'), projectPath);
  
  // Copy examples if requested
  if (config.withExamples) {
    await fs.copy(path.join(templatePath, 'examples'), path.join(projectPath, 'example'));
  }
  
  // Copy CI configuration if requested
  if (config.withCI) {
    await fs.copy(path.join(templatePath, 'ci'), path.join(projectPath, '.github'));
  }
}

async function processTemplateVariables(config: ProjectConfig, projectPath: string): Promise<void> {
  const templateFiles = [
    'package.json',
    'README.md',
    'tsconfig.json',
    'src/index.ts',
    'src/types/index.ts'
  ];

  for (const file of templateFiles) {
    const filePath = path.join(projectPath, file);
    if (await fs.pathExists(filePath)) {
      const content = await fs.readFile(filePath, 'utf-8');
      const processed = ejs.render(content, config);
      await fs.writeFile(filePath, processed);
    }
  }
}

async function initGitRepository(projectPath: string): Promise<void> {
  const { spawn } = require('child_process');
  
  return new Promise((resolve, reject) => {
    const git = spawn('git', ['init'], { cwd: projectPath, stdio: 'ignore' });
    git.on('close', (code: number) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Git init failed with code ${code}`));
      }
    });
  });
}
