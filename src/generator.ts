import * as fs from 'fs-extra';
import * as path from 'path';
import * as ejs from 'ejs';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';

const TEMPLATE_TYPES = ['react-lib', 'ts-lib'] as const;

type TemplateType = typeof TEMPLATE_TYPES[number];

interface ProjectConfig {
  projectName: string;
  sdkName: string;
  org: string;
  author: string;
  description: string;
  withExamples: boolean;
  withCI: boolean;
  packageManager: 'npm' | 'pnpm' | 'yarn';
  templateType: TemplateType;
  copyrightYear: number;
}

interface GenerateOptions {
  defaults?: boolean;
  withExamples?: boolean;
  withCI?: boolean;
  org?: string;
  author?: string;
  templateType?: TemplateType;
}

export async function generateProject(projectName: string, options: GenerateOptions): Promise<void> {
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
    spinner.fail(`Failed to generate project: ${error}`);
    throw error;
  }
}

function resolveTemplateType(candidate?: TemplateType): TemplateType {
  return candidate && TEMPLATE_TYPES.includes(candidate) ? candidate : 'ts-lib';
}

async function collectConfig(projectName: string, options: GenerateOptions): Promise<ProjectConfig> {
  if (options.defaults) {
    return {
      projectName,
      sdkName: projectName,
      org: options.org || 'hollywood',
      author: options.author || 'holly',
      description: `${projectName} SDK`,
      withExamples: options.withExamples || false,
      withCI: options.withCI || false,
      packageManager: 'npm',
      templateType: resolveTemplateType(options.templateType),
      copyrightYear: new Date().getFullYear()
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
      initial: options.org || 'hollywood'
    },
    {
      type: 'text' as const,
      name: 'author',
      message: 'Author name:',
      initial: options.author || 'holly'
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
      name: 'templateType',
      message: 'Template type:',
      choices: TEMPLATE_TYPES.map((value) => ({
        title: value === 'react-lib' ? 'React component SDK' : 'TypeScript library SDK',
        value
      })),
      initial: Math.max(0, TEMPLATE_TYPES.indexOf(resolveTemplateType(options.templateType)))
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
    org: answers.org || 'hollywood',
    author: answers.author || 'holly',
    description: answers.description || `${projectName} SDK`,
    withExamples: answers.withExamples || false,
    withCI: answers.withCI || false,
    packageManager: answers.packageManager || 'npm',
    templateType: resolveTemplateType(answers.templateType),
    copyrightYear: new Date().getFullYear()
  };
}

async function copyTemplateFiles(config: ProjectConfig, projectPath: string): Promise<void> {
  const templateRoot = path.join(__dirname, '../template', config.templateType);

  const optionalDirectories = new Set(['examples', 'ci']);

  await fs.copy(templateRoot, projectPath, {
    filter: (src) => {
      const relative = path.relative(templateRoot, src);
      if (!relative) {
        return true;
      }

      const topLevel = relative.split(path.sep)[0];
      return !optionalDirectories.has(topLevel);
    }
  });

  // Copy examples if requested
  if (config.withExamples) {
    const examplesPath = path.join(templateRoot, 'examples');
    if (await fs.pathExists(examplesPath)) {
      await fs.copy(examplesPath, path.join(projectPath, 'example'));
    }
  }

  // Copy CI configuration if requested
  if (config.withCI) {
    const ciPath = path.join(templateRoot, 'ci');
    if (await fs.pathExists(ciPath)) {
      await fs.copy(ciPath, path.join(projectPath, '.github'));
    }
  }
}

async function processTemplateVariables(config: ProjectConfig, projectPath: string): Promise<void> {
  const templateFilesMap: Record<TemplateType, {
    core: string[];
    examples?: string[];
    ci?: string[];
  }> = {
    'ts-lib': {
      core: ['package.json', 'README.md', 'tsconfig.json', 'src/index.ts', 'src/__tests__/sdkClient.test.ts', 'LICENSE']
    },
    'react-lib': {
      core: ['package.json', 'README.md', 'tsconfig.json', 'src/index.ts', 'src/__tests__/sdkSection.test.tsx', 'LICENSE']
    }
  };

  const templateConfig = templateFilesMap[config.templateType];
  if (!templateConfig) {
    return;
  }

  const filesToProcess = new Set<string>(templateConfig.core);

  if (config.withExamples && templateConfig.examples) {
    templateConfig.examples.forEach((file) => filesToProcess.add(file));
  }

  if (config.withCI && templateConfig.ci) {
    templateConfig.ci.forEach((file) => filesToProcess.add(file));
  }

  for (const file of filesToProcess) {
    const filePath = path.join(projectPath, file);
    if (await fs.pathExists(filePath)) {
      const content = await fs.readFile(filePath, 'utf-8');
      const processed = ejs.render(content, config);
      await fs.writeFile(filePath, processed);
    }
  }
}

async function initGitRepository(projectPath: string): Promise<void> {
  const { spawn } = await import('child_process');
  
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
