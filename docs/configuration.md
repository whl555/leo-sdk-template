# Configuration Guide

## Template Variables

The leo-sdk-template uses EJS templating to replace variables in generated files. Here are the available variables:

### Required Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `projectName` | string | Name of the project directory | `my-awesome-sdk` |
| `sdkName` | string | Name of the SDK class | `MyAwesomeSDK` |
| `org` | string | Organization name | `my-company` |
| `author` | string | Author name | `John Doe` |

### Optional Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `description` | string | `${projectName} SDK` | Project description |
| `withExamples` | boolean | `false` | Include example application |
| `withCI` | boolean | `false` | Include CI/CD configuration |
| `packageManager` | string | `npm` | Package manager (npm, yarn, pnpm) |

## CLI Options

### Interactive Mode (Default)

```bash
leo-sdk my-project
```

The CLI will prompt you for all configuration options.

### Non-Interactive Mode

```bash
leo-sdk my-project --defaults
```

Uses default values for all options.

### Partial Configuration

```bash
leo-sdk my-project --org=my-company --author="John Doe" --with-examples
```

Specify some options via flags, CLI will prompt for the rest.

## Environment Variables

You can set default values using environment variables:

```bash
export LEO_SDK_ORG="my-company"
export LEO_SDK_AUTHOR="John Doe"
leo-sdk my-project --defaults
```

Available environment variables:
- `LEO_SDK_ORG`
- `LEO_SDK_AUTHOR`
- `LEO_SDK_WITH_EXAMPLES` (true/false)
- `LEO_SDK_WITH_CI` (true/false)
- `LEO_SDK_PACKAGE_MANAGER` (npm/yarn/pnpm)

## Template Customization

### Adding New Variables

1. Update `template/meta.json`:
```json
{
  "variables": {
    "myNewVariable": {
      "type": "string",
      "required": false,
      "default": "default-value",
      "description": "My new variable"
    }
  }
}
```

2. Update the generator prompts in `src/generator.ts`

3. Use the variable in template files: `<%= myNewVariable %>`

### Custom Template Files

You can customize any template file by modifying files in the `template/` directory:

- `template/core/` - Core SDK files
- `template/examples/` - Example application files
- `template/ci/` - CI/CD configuration files

### Build Configuration

The template includes multiple build targets:

- **ES Modules** (`dist/index.esm.js`) - For modern bundlers
- **CommonJS** (`dist/index.js`) - For Node.js
- **UMD** (`dist/index.umd.js`) - For browser usage
- **TypeScript Definitions** (`dist/index.d.ts`) - Type definitions

Customize the build in `template/core/rollup.config.js`.

## Package.json Scripts

Generated projects include these npm scripts:

- `npm run build` - Build the SDK
- `npm run dev` - Watch mode for development
- `npm run test` - Run tests
- `npm run lint` - Lint the code
- `npm run prepublishOnly` - Pre-publish checks
- `npm run version:patch/minor/major` - Version bumping

## Testing Configuration

The template includes Jest configuration for:

- TypeScript support
- Coverage reporting
- DOM testing environment (for React components)
- Test file patterns

Customize in `template/core/jest.config.js`.

## Linting Configuration

ESLint is configured with:

- TypeScript support
- Recommended rules
- React hooks rules (for examples)
- Custom rule overrides

Customize in the `eslintConfig` section of `package.json`.
