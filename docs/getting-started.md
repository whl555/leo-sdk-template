# Getting Started

## Installation

Install the leo-sdk-template globally:

```bash
npm install -g leo-sdk-template
```

## Quick Start

Create a new SDK project:

```bash
leo-sdk my-awesome-sdk
```

Follow the interactive prompts to configure your project, or use the `--defaults` flag for quick setup:

```bash
leo-sdk my-awesome-sdk --defaults
```

## Command Options

- `--defaults` - Use default values for all prompts
- `--with-examples` - Include example React application
- `--with-ci` - Include GitHub Actions CI/CD configuration
- `--org <org>` - Set organization name
- `--author <author>` - Set author name

## Project Structure

The generated project will have the following structure:

```
my-awesome-sdk/
├── src/
│   ├── core/
│   │   └── SdkCore.ts      # Main SDK class
│   ├── types/
│   │   └── index.ts        # TypeScript definitions
│   ├── __tests__/
│   │   └── index.test.ts   # Unit tests
│   └── index.ts            # Main entry point
├── example/                # React example (optional)
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── .github/                # CI/CD workflows (optional)
│   └── workflows/
│       └── ci.yml
├── dist/                   # Build output
├── package.json
├── tsconfig.json
├── rollup.config.js
├── jest.config.js
└── README.md
```

## Next Steps

1. Navigate to your project:
   ```bash
   cd my-awesome-sdk
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Development Workflow

1. **Implement your SDK logic** in `src/core/SdkCore.ts`
2. **Define types** in `src/types/index.ts`
3. **Write tests** in `src/__tests__/`
4. **Update documentation** in `README.md`
5. **Test with examples** in the `example/` directory
6. **Build and publish** when ready

## Customization

The template provides a solid foundation, but you can customize it:

- Modify the build configuration in `rollup.config.js`
- Update TypeScript settings in `tsconfig.json`
- Add more test configurations in `jest.config.js`
- Extend the example application as needed




