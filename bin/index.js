#!/usr/bin/env node

const { program } = require('commander');
const { generateProject } = require('../dist/generator');
const chalk = require('chalk');

program
  .name('leo-sdk')
  .description('Generate a new TypeScript SDK project')
  .version('1.0.0');

program
  .argument('<project-name>', 'Name of the project to create')
  .option('-d, --defaults', 'Use default values for all prompts')
  .option('--with-examples', 'Include example components')
  .option('--with-ci', 'Include CI/CD configuration')
  .option('--org <org>', 'Organization name')
  .option('--author <author>', 'Author name')
  .action(async (projectName, options) => {
    try {
      console.log(chalk.blue('🚀 Creating new SDK project...'));
      await generateProject(projectName, options);
      console.log(chalk.green('✅ Project created successfully!'));
      console.log(chalk.yellow(`📁 cd ${projectName}`));
      console.log(chalk.yellow('📦 npm install'));
      console.log(chalk.yellow('🔧 npm run dev'));
    } catch (error) {
      console.error(chalk.red('❌ Error creating project:'), error.message);
      process.exit(1);
    }
  });

program.parse();
