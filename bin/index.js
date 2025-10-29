#!/usr/bin/env node

const { program } = require('commander');
const { generateProject } = require('../dist/generator');
const chalk = require('chalk');
const { version } = require('../package.json');

program
  .name('leo-sdk')
  .description('Generate a new TypeScript SDK project')
  .version(version, '-v, --version', 'Output the current CLI version');

program
  .argument('<project-name>', 'Name of the project to create')
  .option('-d, --defaults', 'Use default values for all prompts')
  .option('--with-examples', 'Include example components')
  .option('--with-ci', 'Include CI/CD configuration')
  .option('--org <org>', 'Organization name')
  .option('--author <author>', 'Author name')
  .option('--template <type>', 'Template type (ts-lib or react-lib)')
  .action(async (projectName, options) => {
    try {
      const allowedTemplates = ['ts-lib', 'react-lib'];
      const templateType = options.template;

      if (templateType && !allowedTemplates.includes(templateType)) {
        console.error(
          chalk.red(`❌ Invalid template type: ${templateType}. Allowed values: ${allowedTemplates.join(', ')}`)
        );
        process.exit(1);
      }

      const generateOptions = {
        defaults: Boolean(options.defaults),
        withExamples: Boolean(options.withExamples),
        withCI: Boolean(options.withCi),
        org: options.org,
        author: options.author,
        templateType: templateType
      };

      console.log(chalk.blue('🚀 Creating new SDK project...'));
      await generateProject(projectName, generateOptions);
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

