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
- `-v, --version` - Print the installed `leo-sdk` version
- `--with-examples` - Copy example assets when the template provides them (current templates omit these by default)
- `--with-ci` - Copy GitHub Actions workflows when available in the template
- `--org <org>` - Set organization name
- `--author <author>` - Set author name
- `--template <type>` - Choose between `ts-lib` (default) and `react-lib`

## Project Structure

The generated project adapts to the selected template. Below are highlights for each option.

### `ts-lib`

- Minimal class-based SDK scaffold exposing a `createClient` helper for quick customization.
- Includes `build`, `prepare`, and `release` scripts so you can publish immediately.
- Uses plain TypeScript compilation for a fast, dependency-light workflow.

### `react-lib`

- Provides a tiny `SdkSection` component that demonstrates how to ship JSX from your SDK.
- Ships with the same `build`/`prepare`/`release` scripts to streamline publishing.
- Keeps dependencies lean by compiling JSX with TypeScript only.

## Next Steps

1. Navigate to your project:
   ```bash
   cd my-awesome-sdk
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the scaffold:
   ```bash
   npm run build
   ```

4. Publish when ready:
   ```bash
   npm run release
   ```

## Development Workflow

- For `ts-lib`: extend `src/index.ts` with your SDK surface and adjust options as needed.
- For `react-lib`: build out `src/index.ts` with additional components or hooks to expose to consumers.
- Keep documentation and CI workflows aligned with your release process.

## Customization

The template provides a solid foundation, but you can customize it:

- Tune TypeScript options via `tsconfig.json` to target your consumers.
- Layer in linting, testing, or documentation scripts as your SDK grows.
- Add CI or examples by creating the expected folders before re-running the generator.
