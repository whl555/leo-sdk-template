# Changelog

All notable changes to leo-sdk-template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project structure
- CLI generator with interactive prompts
- TypeScript SDK template with multiple build formats
- React example application template
- GitHub Actions CI/CD template
- Comprehensive documentation
- Jest testing configuration
- ESLint configuration
- Rollup bundling setup

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [1.0.0] - 2024-12-19

### Added
- Initial release of leo-sdk-template
- CLI tool for generating TypeScript SDK projects
- Template system with EJS variable replacement
- Support for multiple output formats (ES, CJS, UMD)
- Optional React example application
- Optional GitHub Actions CI/CD configuration
- Interactive and non-interactive CLI modes
- Comprehensive project documentation
- Testing setup with Jest and coverage reporting
- Development tools (ESLint, TypeScript, Rollup)
- Template customization options
- Environment variable support
- Package manager selection (npm, yarn, pnpm)

### Features
- 🚀 **Quick Start** - Generate SDK projects in seconds
- 📦 **Multiple Builds** - ES modules, CommonJS, and UMD output
- 🧪 **Testing Ready** - Jest configuration with coverage
- 🔧 **Dev Tools** - ESLint, TypeScript, watch mode
- 📖 **Examples** - Optional React application with Vite
- 🚀 **CI/CD** - GitHub Actions workflows included
- 📚 **Docs** - Auto-generated documentation structure
- 🎨 **Customizable** - Template variables and options

### CLI Options
- `--defaults` - Non-interactive mode with default values
- `--with-examples` - Include React example application
- `--with-ci` - Include GitHub Actions configuration
- `--org <org>` - Set organization name
- `--author <author>` - Set author name

### Project Structure
```
generated-sdk/
├── src/                    # Source code
├── example/               # React example (optional)
├── .github/               # CI/CD workflows (optional)
├── dist/                  # Build output
├── docs/                  # Documentation
├── package.json
├── tsconfig.json
├── rollup.config.js
├── jest.config.js
└── README.md
```

### Requirements
- Node.js >= 16.0.0
- npm, yarn, or pnpm




